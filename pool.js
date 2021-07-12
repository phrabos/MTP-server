require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
	ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
	console.log('db connected...');
});

module.exports = pool;
