const app = require('./lib/app');
const pool = require('./pool');

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`spinning on port ${PORT}`);
});

process.on('exit', () => {
	console.log('pool closed');
	pool.end();
});

module.exports = app;
