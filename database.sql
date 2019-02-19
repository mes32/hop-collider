DROP TABLE IF EXISTS hops;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS brewing_role;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS hop_comparison;
DROP TABLE IF EXISTS hop_in_comparison;
DROP TABLE IF EXISTS note;

CREATE TABLE "person" 
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE country
(
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(20) NOT NULL UNIQUE
);
INSERT INTO country
    (country_name)
VALUES
    ('Australia'),
    ('Czech Republic'),
    ('France'),
    ('Germany'),
    ('New Zealand'),
    ('Slovenia'),
    ('United Kingdom'),
    ('United States');

CREATE TABLE brewing_role
(
    id SERIAL PRIMARY KEY,
    description VARCHAR(20) NOT NULL UNIQUE
);
INSERT INTO brewing_role
    ("description")
VALUES
    ('aroma'),
    ('bittering'),
    ('dual use');

CREATE TABLE hops
(
    id SERIAL PRIMARY KEY,
    variety_name VARCHAR(50) NOT NULL,
    country_id INT REFERENCES country(id),
    UNIQUE(variety_name, country_id),
    aromas VARCHAR(250),
    brewing_role_id INT REFERENCES brewing_role(id),
    comparison_popularity INT NOT NULL DEFAULT 0,
    alpha_acid_min DECIMAL(6,3) CHECK(alpha_acid_min >= 0.0 AND alpha_acid_min <= 100),
    alpha_acid_max DECIMAL(6,3) CHECK(alpha_acid_max >= 0.0 AND alpha_acid_max <= 100 AND alpha_acid_max > alpha_acid_min),
    beta_acid_min DECIMAL(6,3) CHECK(beta_acid_min >= 0 AND beta_acid_min <= 100),
    beta_acid_max DECIMAL(6,3) CHECK(beta_acid_max >= 0 AND beta_acid_max <= 100 AND beta_acid_max > beta_acid_min),
    cohumulone_min DECIMAL(6,3) CHECK(cohumulone_min >= 0 AND cohumulone_min <= 100),
    cohumulone_max DECIMAL(6,3) CHECK(cohumulone_max >= 0 AND cohumulone_max <= 100 AND cohumulone_max > cohumulone_min),
    total_oil_min DECIMAL(6,3) CHECK(total_oil_min >= 0),
    total_oil_max DECIMAL(6,3) CHECK(total_oil_max >= 0 AND total_oil_max > total_oil_min),
    beta_pinene_min DECIMAL(6,3) CHECK(beta_pinene_min >= 0 AND beta_pinene_min <= 100),
    beta_pinene_max DECIMAL(6,3) CHECK(beta_pinene_max >= 0 AND beta_pinene_max <= 100 AND beta_pinene_max > beta_pinene_min),
    myrcene_min DECIMAL(6,3) CHECK(myrcene_min >= 0 AND myrcene_min <= 100),
    myrcene_max DECIMAL(6,3) CHECK(myrcene_max >= 0 AND myrcene_max <= 100 AND myrcene_max > myrcene_min),
    linalool_min DECIMAL(6,3) CHECK(linalool_min >= 0 AND linalool_min <= 100),
    linalool_max DECIMAL(6,3) CHECK(linalool_max >= 0 AND linalool_max <= 100 AND linalool_max > linalool_min),
    caryophyllene_min DECIMAL(6,3) CHECK(caryophyllene_min >= 0 AND caryophyllene_min <= 100),
    caryophyllene_max DECIMAL(6,3) CHECK(caryophyllene_max >= 0 AND caryophyllene_max <= 100 AND caryophyllene_max > caryophyllene_min),
    farnesene_min DECIMAL(6,3) CHECK(farnesene_min >= 0 AND farnesene_min <= 100),
    farnesene_max DECIMAL(6,3) CHECK(farnesene_max >= 0 AND farnesene_max <= 100 AND farnesene_max > farnesene_min),
    humulene_min DECIMAL(6,3) CHECK(humulene_min >= 0 AND humulene_min <= 100),
    humulene_max DECIMAL(6,3) CHECK(humulene_max >= 0 AND humulene_max <= 100 AND humulene_max > humulene_min),
    geraniol_min DECIMAL(6,3) CHECK(geraniol_min >= 0 AND geraniol_min <= 100),
    geraniol_max DECIMAL(6,3) CHECK(geraniol_max >= 0 AND geraniol_max <= 100 AND geraniol_max > geraniol_min),
    selinene_min DECIMAL(6,3) CHECK(selinene_min >= 0 AND selinene_min <= 100),
    selinene_max DECIMAL(6,3) CHECK(selinene_max >= 0 AND selinene_max <= 100 AND selinene_max > selinene_min),
    other_oils_min DECIMAL(6,3) CHECK(other_oils_min >= 0 AND other_oils_min <= 100),
    other_oils_max DECIMAL(6,3) CHECK(other_oils_max >= 0 AND other_oils_max <= 100 AND other_oils_max > other_oils_min)
);

CREATE TABLE hop_comparison
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES person(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hop_in_comparison
(
    id SERIAL PRIMARY KEY,
    hop_id INT REFERENCES hops(id),
    hop_comparison_id INT REFERENCES hop_comparison(id)
);

CREATE TABLE note
(
    id SERIAL PRIMARY KEY,
    hop_comparison_id INT REFERENCES hop_comparison(id),
    user_id INT REFERENCES person(id),
    body_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hop_compound
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    chemical_class VARCHAR(250) NOT NULL,
    description TEXT NOT NULL
);
INSERT INTO hop_compound
    (name, chemical_class, description)
VALUES
    ('Alpha Acid', 'Hop Bitterness Acid', 'The primary chemical compound responsible for hop bitterness.'),
    ('Beta Acid', 'Hop Bitterness Acid', 'The secondary chemical compound responsible for hop bitterness.'),
    ('Cohumulone', 'Hop Bitterness Acid', 'An aromatic essential oil found in a number of plants including: mango, lemon grass, wild thyme, bay leaves, parsley, cannabis, ylang-ylang, cardamom, and hops. Myrcene contributes citrus, flowery, or piney aroma to beer. Other sources suggest it contributes a peppery and balsam aroma.'),
    ('β-pinene', 'Terpene Essential Oil', 'An aromatic essential oil producing a pine-like smell.'),
    ('Caryophyllene', 'Terpene Essential Oil', 'An aromatic essential oil found in cloves, rosemary, and hops.'),
    ('Farnesene', 'Terpene Essential Oil', 'An aromatic essential oil. It is released by aphids as an alarm pheremone to warn other nearby aphids of threats. It is also synthesized by several plant species as a natural insect repellent.'),
    ('Geraniol', 'Terpene Essential Oil', 'An aromatic essential oil with a rose-like scent. It is found in rose oil, palmarosa oil, and citronella oil.'),
    ('Humulene', 'Terpene Essential Oil', 'An aromatic essential oil found in hops and other plants. It is responsible for the typical hoppy aroma of noble hops.'),
    ('Linalool', 'Terpene Essential Oil', 'An aromatic essential oil found in flowers and spices. It''s aroma is floral with some spiciness.'),
    ('Myrcene', 'Terpene Essential Oil', 'An aromatic essential oil found in a number of plants including: mango, lemon grass, wild thyme, bay leaves, parsley, cannabis, ylang-ylang, cardamom, and hops. Myrcene contributes citrus, flowery, or piney aroma to beer. Other sources suggest it contributes a peppery and balsam aroma.'),
    ('Selinene', 'Terpene Essential Oil', 'An aromatic essential oil found in celery seeds.');