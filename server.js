const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./pool');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`spinning on port ${PORT}`);
});

process.on('exit', () => {
	console.log('pool closed');
	pool.end();
});

module.exports = app;
