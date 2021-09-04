DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teas CASCADE;
DROP TABLE IF EXISTS brews CASCADE;

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT
);

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
  elevation INTEGER,
  user_id INTEGER NOT NULL REFERENCES users(id)
);
CREATE TABLE brews(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tea_id INTEGER NOT NULL REFERENCES teas(id),
  user_id INTEGER NOT NULL REFERENCES users,
  weight DECIMAL(3,2),
  water_volume INTEGER,
  temperature INTEGER,
  time INTEGER,
  infusions INTEGER,
  notes TEXT,
  tags TEXT,
  rating DECIMAL(2,1)
);

