const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route GET /api/hops
router.get('/', (req, res) => {
    const queryText = `
    SELECT
        hops.*,
        country.country_name AS country,
        brewing_role.description AS brewing_role
    FROM hops
    JOIN country ON hops.country_id = country.id
    LEFT OUTER JOIN brewing_role ON hops.brewing_role_id = brewing_role.id
    ORDER BY hops.id;
    `;
    pool.query(queryText).then((queryResponse) => {
        res.send(queryResponse.rows);
    }).catch((queryError) => {
        const errorMessage = `SQL error using GET /api/hops, ${queryError}`;
        console.log(errorMessage);
        res.sendStatus(500);
    });
});


module.exports = router;