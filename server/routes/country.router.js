const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route GET /api/country
router.get('/', (req, res) => {
    const queryText = `
    SELECT 
        id, country_name
    FROM country;
    `;
    pool.query(queryText).then((queryResponse) => {
        res.send(queryResponse.rows);
    }).catch((queryError) => {
        const errorMessage = `SQL error using GET /api/country, ${queryError}`;
        console.log(errorMessage);
        res.sendStatus(500);
    });
});

module.exports = router;