const { Router } = require('express');
const { addTea, updateTea, removeTea, getAllTea } = require('../models/Tea');

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
	.patch('/:id', async (req, res) => {
		const tea = await updateTea(
			{
				name: req.body.name,
				vendor_name: req.body.vendor,
				tea_type: req.body.type,
				inStock: req.body.inStock,
				quantity: req.body.quantity,
				harvestYear: req.body.harvestYear,
				origin: req.body.origin,
				cultivar: req.body.cultivar,
				elevation: req.body.elevation,
			},
			req.params.id
		);

		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from tyr-catch error: ${err}`);
		}
	})
	.delete('/:id', async (req, res) => {
		const tea = await removeTea(req.params.id);

		try {
			if (tea.rowCount === 0) {
				res.status(500).json({ message: 'error deleting item from database' });
			} else res.status(200).send(tea.rows);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.get('/', async (req, res) => {
		const tea = await getAllTea();
		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	});
