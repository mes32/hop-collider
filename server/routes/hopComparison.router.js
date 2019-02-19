const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route POST /api/hop_comparison
router.post('/', (req, res) => {
    const user_id = req.user.id;
    const selectedHops = req.body.selectedHops;
    console.log(`user_id: ${user_id}`);
    console.log(`user_id: ${user_id}`);
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

});

module.exports = router;