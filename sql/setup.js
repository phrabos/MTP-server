const fs = require('fs');

function setup(pool) {
	fs.readFile(`${__dirname}/schema.sql`, { encoding: 'utf-8' }, (err, data) => {
		if (err) console.log(err);
		pool.query(data);
	});
}

module.exports = setup;
