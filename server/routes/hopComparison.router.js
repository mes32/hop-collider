const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route POST /api/hop_comparison
router.post('/', (req, res) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const selectedHops = req.body.selectedHops;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN')
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
                }
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch(e => console.error(e.stack));
    }
});

// Route GET /api/hop_comparison
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
router.get('/:id', (req, res) => {
    if (req.isAuthenticated) {
        const user_id = req.user.id;
        const comparison_id = req.params.id;
        const queryText = `
        SELECT hop_comparison.*, hops.id AS hops_id, hops.variety_name FROM
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

module.exports = router;