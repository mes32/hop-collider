DROP TABLE IF EXISTS hops;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS brewing_role;
DROP TABLE IF EXISTS person;

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