const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route POST /api/hop_comparison
// Inserts a new hop comparison (i.e. data analysis) into the database. This 
// requires making entries into the tables "hop_comparison" and 
// "hop_in_comparison". As a minor effect also increases the popularity rating 
// of any saved hops.
router.post('/', (req, res) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const selectedHops = req.body.selectedHops;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const insertComparisonText = `
                INSERT INTO hop_comparison
                    (user_id)
                VALUES
                    ($1) RETURNING id;
                `;
                const { rows } = await client.query(insertComparisonText, [user_id]);
                const hop_comparison_id = rows[0].id;
                for (let hop of selectedHops) {
                    const insertHopText = `
                    INSERT INTO hop_in_comparison
                        (hop_comparison_id, hop_id)
                    VALUES
                        ($1, $2);
                    `;
                    await client.query(insertHopText, [hop_comparison_id, hop.id]);
                    const incrementPopularity = `
                    UPDATE hops
                    SET comparison_popularity = comparison_popularity + 1
                    WHERE id = $1;
                    `;
                    await client.query(incrementPopularity, [hop.id]);
                }
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                res.sendStatus(201);
            }
        })().catch((error) => {
            console.error(error.stack);
        });
    }
});

// Route GET /api/hop_comparison
// Returns all saved hop comparisons for the current user
router.get('/', (req, res) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const queryText = `
        SELECT hop_comparison.*, hops.id AS hops_id, hops.variety_name FROM
        hop_comparison
        JOIN hop_in_comparison
        ON hop_comparison.id = hop_in_comparison.hop_comparison_id
        JOIN hops
        ON hop_in_comparison.hop_id = hops.id
        WHERE hop_comparison.user_id = $1
        ORDER BY created_at DESC;
        `;
        pool.query(queryText, [user_id]).then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log(`Error on route GET /api/hop_comparison. ${error}`);
            res.sendStatus(500);
        });
    }
});

// Route GET /api/hop_comparison/:id
// Returns a specific hop comparison based on its ID
router.get('/:id', (req, res) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const comparison_id = req.params.id;
        const queryText = `
        SELECT hops.* FROM
        hop_comparison
        JOIN hop_in_comparison
        ON hop_comparison.id = hop_in_comparison.hop_comparison_id
        JOIN hops
        ON hop_in_comparison.hop_id = hops.id
        WHERE hop_comparison.user_id = $1
        AND hop_comparison.id = $2;
        `;
        pool.query(queryText, [user_id, comparison_id]).then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log(`Error on route GET /api/hop_comparison/:id. ${error}`);
            res.sendStatus(500);
        });
    }
});

// Route DELETE /api/hop_comparison/:id
// Deletes a specific hop anslisis based on its ID. Also deletes entries that 
// would be orphaned in the table "hop_in_comparison". As a minor effect also 
// reduces the popularity rating of any removed hops. 
router.delete('/:id', (req, res, config) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const comparison_id = req.params.id;
        const selectedHops = req.body.hops;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                for (let hop of selectedHops) {
                    const decrementPopularity = `
                    UPDATE hops
                    SET comparison_popularity = comparison_popularity - 1
                    WHERE id = $1;
                    `;
                    await client.query(decrementPopularity, [hop.id]);
                }
                const deleteHopsText = `
                DELETE FROM hop_in_comparison
                WHERE hop_comparison_id = $1;
                `;
                await client.query(deleteHopsText, [comparison_id]);
                const deleteComparisonText = `
                DELETE FROM hop_comparison
                WHERE user_id = $1 AND id = $2;
                `;
                await client.query(deleteComparisonText, [user_id, comparison_id]);
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                res.sendStatus(200);
            }
        })().catch((error) => {
            console.error(error.stack);
        });
    }
});

module.exports = router;