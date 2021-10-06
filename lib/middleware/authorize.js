const fetch = require('node-fetch');

async function authenticate(req, res, next) {
	try {
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
		req.authData = data;

		console.log(
			'------------dataTop---------',
			data,
			'_________data_______________'
		);

		if (data.error) throw new Error(data.error.message);
		// console.log(payload);

		next();
	} catch (err) {
		res.status(400).send({ error: err.message });
		console.error(`login error: ${err.message}`);
	}
}

module.exports = authenticate;
