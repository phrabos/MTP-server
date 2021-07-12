const { Router } = require('express');
const { addTea } = require('../models/Tea');
// const Tea = require('../models/Tea');

module.exports = Router()
	.post('/', async (req, res) => {
		const tea = await addTea({
			name: req.body.name,
			vendorName: req.body.vendor,
			teaType: req.body.type,
			inStock: req.body.inStock,
			quantity: req.body.quantity,
			harvestYear: req.body.harvestYear,
			origin: req.body.origin,
			cultivar: req.body.cultivar,
			elevation: req.body.elevation,
		});

		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from tyr-catch error: ${err}`);
		}
	})
	.get('/', (req, res) => {
		res.json({
			status: 200,
			message: 'good job',
		});
	});
