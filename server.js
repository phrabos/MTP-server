const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`spinning on port ${PORT}`);
});

module.exports = app;