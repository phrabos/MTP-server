DROP TABLE IF EXISTS teas;

CREATE TABLE teas(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  vendor_name TEXT,
  tea_type TEXT,
  in_stock BOOLEAN,
  quantity INTEGER,
  harvest_year INTEGER,
  origin TEXT,
  cultivar TEXT,
  elevation INTEGER
);