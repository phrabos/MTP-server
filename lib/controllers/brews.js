const { Router } = require('express');
const {
	addBrew,
	updateBrew,
	removeBrew,
	getAllBrews,
} = require('../models/Brew');

module.exports = Router()
	.post('/', async (req, res) => {
		console.log(req.body);
		const brew = await addBrew({
			weight: req.body.weight ?? 0,
			waterVolume: req.body.waterVolume ?? 0,
			temperature: req.body.temperature ?? 0,
			time: req.body.time ?? 0,
			infusions: req.body.infusions ?? 0,
			notes: req.body.notes ?? 'not provided',
			tag: req.body.tag ?? 'not provided',
			teaID: req.body.teaID,
			userID: req.body.userID,
		});

		try {
			res.status(200).send(brew);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.patch('/:id', async (req, res) => {
		const brew = await updateBrew(
			{
				...(req.body.weight && { weight: req.body.weight }),
				...(req.body.waterVolume && { water_volume: req.body.waterVolume }),
				...(req.body.temperature && { temperature: req.body.temperature }),
				...(req.body.time && { time: req.body.time }),
				...(req.body.infusions && { infusions: req.body.infusions }),
				...(req.body.notes && { notes: req.body.notes }),
				...(req.body.tag && { tag: req.body.tag }),
			},
			req.params.id
		);

		try {
			res.status(200).send(brew);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.delete('/:id', async (req, res) => {
		const brew = await removeBrew(req.params.id);

		try {
			if (tea.rowCount === 0) {
				res.status(500).json({ message: 'error deleting item from database' });
			} else res.status(200).send(brew.rows);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.get('/:userId', async (req, res) => {
		const brew = await getAllBrews(req.params.userId);
		try {
			res.status(200).send(brew);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	});
