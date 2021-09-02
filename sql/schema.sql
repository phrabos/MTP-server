DROP TABLE IF EXISTS teas;
DROP TABLE IF EXISTS users;

CREATE TABLE teas(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  vendor_name TEXT,
  tea_type TEXT,
  in_stock BOOLEAN,
  quantity INTEGER,
  harvest_year TEXT,
  origin TEXT,
  cultivar TEXT,
  elevation INTEGER
);

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT
);