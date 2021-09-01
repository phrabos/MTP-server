const { Router } = require('express');
const fetch = require('node-fetch');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
	.post('/signup', async (req, res) => {
		console.log(req.body);
		const payload = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_KEY}
  `,
			{
				method: 'POST',
				body: JSON.stringify({
					email: req.body.email,
					password: req.body.password,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await payload.json();
		console.log(payload);
		try {
			if (payload.ok) res.send(data);
			else res.status(400).send(data);
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.post('/login', async (req, res) => {
		console.log(req.body);
		const payload = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}
  `,
			{
				method: 'POST',
				body: JSON.stringify({
					email: req.body.email,
					password: req.body.password,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await payload.json();
		console.log(payload);
		console.log(
			'------------dataTop---------',
			data.idToken,
			'_________data_______________'
		);
		try {
			if (payload.status === 200) {
				res.cookie('session', data.idToken, {
					// domain: '.app.localhost',
					httpOnly: true,
					maxAge: ONE_DAY_IN_MS,
					// sameSite: 'Lax' | 'None' | 'Strict',
					sameSite: 'None',
					secure: true,
				});
				res.send({ data, errors: '' });
			} else res.status(400).send({ data: '', errors: data.error.message });
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	});