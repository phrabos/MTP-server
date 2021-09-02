const { Router } = require('express');
const fetch = require('node-fetch');
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 48;

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
		// console.log(payload);
		console.log(
			'------------dataTop---------',
			data,
			'_________data_______________'
		);
		try {
			if (payload.status === 200) {
				res.cookie('session', data.idToken, {
					// domain: '.app.localhost',
					httpOnly: true,
					maxAge: 1000,
					// sameSite: 'Lax' | 'None' | 'Strict',
					sameSite: 'None',
					secure: true,
				});
				const user = await User.addUser({
					email: req.body.email,
					username: req.body.username ?? '',
				});
				res.send({ data, user, errors: '' });
			} else
				res.status(400).send({ data: '', user, errors: data.error.message });
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
				const user = await User.findUser(req.body.email);
				res.send({ data, user, errors: '' });
			} else
				res.status(400).send({ data: '', user, errors: data.error.message });
		} catch (err) {
			console.error(`from try-catch error: ${err}`);
		}
	})
	.get('/logout', async (req, res, next) => {
		res.clearCookie('session');
		res
			.status(200)
			.send({ success: true, message: 'Logged out succcessfully!' });
	});
