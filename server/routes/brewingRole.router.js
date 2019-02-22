const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route GET /api/brewing_role
// Returns a list of possible roles for hops in the brewing process
router.get('/', (req, res) => {
    const queryText = `
    SELECT 
        id, description
    FROM brewing_role;
    `;
    pool.query(queryText).then((queryResponse) => {
        res.send(queryResponse.rows);
    }).catch((queryError) => {
        const errorMessage = `SQL error using GET /api/brewing_role, ${queryError}`;
        console.log(errorMessage);
        res.sendStatus(500);
    });
});

module.exports = router;