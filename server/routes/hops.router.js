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
    LEFT JOIN country ON hops.country_id = country.id
    LEFT JOIN brewing_role ON hops.brewing_role_id = brewing_role.id
    ORDER BY hops.variety_name, country;
    `;
    pool.query(queryText).then((queryResponse) => {
        res.send(queryResponse.rows);
    }).catch((queryError) => {
        const errorMessage = `SQL error using GET /api/hops, ${queryError}`;
        console.log(errorMessage);
        res.sendStatus(500);
    });
});

// Route GET /api/hops/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `
    SELECT
        hops.*,
        country.country_name AS country,
        brewing_role.description AS brewing_role
    FROM hops
    LEFT JOIN country ON hops.country_id = country.id
    LEFT JOIN brewing_role ON hops.brewing_role_id = brewing_role.id
    WHERE hops.id = $1;
    `;
    pool.query(queryText, [id]).then((queryResponse) => {
        res.send(queryResponse.rows);
    }).catch((queryError) => {
        const errorMessage = `SQL error using GET /api/hops/:id, ${queryError}`;
        console.log(errorMessage);
        res.sendStatus(500);
    });
});

// Route POST /api/hops/
router.post('/', (req, res) => {
    if (req.isAuthenticated && req.user.is_admin) {
        const hop = req.body;
        const queryArray = [
            hop.variety_name, hop.country_id, 
            hop.aromas, hop.brewing_role_id,
            hop.alpha_acid_min, hop.alpha_acid_max,
            hop.beta_acid_min, hop.beta_acid_max,
            hop.cohumulone_min, hop.cohumulone_max,
            hop.total_oil_min, hop.total_oil_max,
            hop.beta_pinene_min, hop.beta_pinene_max,
            hop.myrcene_min, hop.myrcene_max,
            hop.linalool_min, hop.linalool_max,
            hop.caryophyllene_min, hop.caryophyllene_max,
            hop.farnesene_min, hop.farnesene_max,
            hop.humulene_min, hop.humulene_max,
            hop.geraniol_min, hop.geraniol_max,
            hop.selinene_min, hop.selinene_max,
            hop.other_oils_min, hop.other_oils_max
        ];
        const queryText = `
        INSERT INTO hops (
            "variety_name", "country_id", 
            "aromas", "brewing_role_id", 
            "alpha_acid_min", "alpha_acid_max", 
            "beta_acid_min", "beta_acid_max", 
            "cohumulone_min", "cohumulone_max", 
            "total_oil_min", "total_oil_max", 
            "beta_pinene_min", "beta_pinene_max", 
            "myrcene_min", "myrcene_max", 
            "linalool_min", "linalool_max", 
            "caryophyllene_min", "caryophyllene_max", 
            "farnesene_min", "farnesene_max", 
            "humulene_min", "humulene_max", 
            "geraniol_min", "geraniol_max", 
            "selinene_min", "selinene_max", 
            "other_oils_min", "other_oils_max"
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
        );
        `;
        pool.query(queryText, queryArray).then((queryResponse) => {
            res.sendStatus(200);
        }).catch((queryError) => {
            const errorMessage = `SQL error using POST /api/hops/. ${queryError}`;
            console.log(errorMessage);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// Route PUT /api/hops/
router.put('/', (req, res) => {
    if (req.isAuthenticated && req.user.is_admin) {
        const hop = req.body;
        const queryArray = [
            hop.variety_name, hop.country_id,
            hop.aromas, hop.brewing_role_id,
            hop.alpha_acid_min, hop.alpha_acid_max,
            hop.beta_acid_min, hop.beta_acid_max,
            hop.cohumulone_min, hop.cohumulone_max,
            hop.total_oil_min, hop.total_oil_max,
            hop.beta_pinene_min, hop.beta_pinene_max,
            hop.myrcene_min, hop.myrcene_max,
            hop.linalool_min, hop.linalool_max,
            hop.caryophyllene_min, hop.caryophyllene_max,
            hop.farnesene_min, hop.farnesene_max,
            hop.humulene_min, hop.humulene_max,
            hop.geraniol_min, hop.geraniol_max,
            hop.selinene_min, hop.selinene_max,
            hop.other_oils_min, hop.other_oils_max,
            hop.id
        ];
        const queryText = `
        UPDATE hops
        SET
            "variety_name" = $1, "country_id" = $2, 
            "aromas" = $3, "brewing_role_id" = $4, 
            "alpha_acid_min" = $5, "alpha_acid_max" = $6, 
            "beta_acid_min" = $7, "beta_acid_max" = $8, 
            "cohumulone_min" = $9, "cohumulone_max" = $10, 
            "total_oil_min" = $11, "total_oil_max" = $12, 
            "beta_pinene_min" = $13, "beta_pinene_max" = $14, 
            "myrcene_min" = $15, "myrcene_max" = $16, 
            "linalool_min" = $17, "linalool_max" = $18, 
            "caryophyllene_min" = $19, "caryophyllene_max" = $20, 
            "farnesene_min" = $21, "farnesene_max" = $22, 
            "humulene_min" = $23, "humulene_max" = $24, 
            "geraniol_min" = $25, "geraniol_max" = $26, 
            "selinene_min" = $27, "selinene_max" = $28, 
            "other_oils_min" = $29, "other_oils_max" = $30
        WHERE
            id = $31
        ;
        `;
        pool.query(queryText, queryArray).then((queryResponse) => {
            res.sendStatus(200);
        }).catch((queryError) => {
            const errorMessage = `SQL error using PUT /api/hops/. ${queryError}`;
            console.log(errorMessage);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// Route DELETE /api/hops/:id
router.delete('/:id', (req, res) => {
    if (req.isAuthenticated && req.user.is_admin) {
        const id = req.params.id;
        const queryText = `
        DELETE FROM hops
        WHERE id = $1;
        `;
        pool.query(queryText, [id]).then((queryResponse) => {
            res.sendStatus(200);
        }).catch((queryError) => {
            const errorMessage = `SQL error using DELETE /api/hops/:id, ${queryError}`;
            console.log(errorMessage);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;