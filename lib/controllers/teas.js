const { Router } = require('express');
const { addTea, updateTea, removeTea, getAllTea } = require('../models/Tea');

module.exports = Router()
	.post('/', async (req, res) => {
		console.log(req.body);
		const tea = await addTea({
			teaName: req.body.teaName,
			vendorName: req.body.vendorName ?? 'unknown',
			teaType: req.body.teaType ?? 'unknown',
			inStock: req.body.inStock,
			quantity: req.body.quantity ?? 0,
			harvestYear: req.body.harvestYear ?? 0,
			origin: req.body.origin ?? 'unknown',
			cultivar: req.body.cultivar ?? 'unknown',
			elevation: req.body.elevation ?? 0,
			userID: req.body.userID,
		});

		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.patch('/:id', async (req, res) => {
		const tea = await updateTea(
			{
				...(req.body.teaName && { name: req.body.teaName }),
				...(req.body.vendorName && { vendor_name: req.body.vendorName }),
				...(req.body.teaType && { tea_type: req.body.teaType }),
				...(req.body.inStock && { in_tock: req.body.inStock }),
				...(req.body.quantity && { quantity: req.body.quantity }),
				...(req.body.harvesYear && { harvest_year: req.body.harvesYear }),
				...(req.body.origin && { origin: req.body.origin }),
				...(req.body.cultivar && { cultivar: req.body.cultivar }),
				...(req.body.elevation && { elevation: req.body.elevation }),
			},
			req.params.id
		);

		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
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
	.get('/:userId', async (req, res) => {
		const tea = await getAllTea(req.params.userId);
		try {
			res.status(200).send(tea);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	});
