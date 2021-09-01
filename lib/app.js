const express = require('express');
const app = express();
const cors = require('cors');

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/teas', require('./controllers/teas'));
app.use('/account', require('./controllers/account'));

module.exports = app;
