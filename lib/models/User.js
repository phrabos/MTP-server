const pool = require('../../pool');

module.exports = class User {
	id;
	email;
	username;

	constructor({ id, email, username }) {
		this.id = id;
		this.email = email;
		this.username = username;
	}

	static async addUser({ email, username }) {
		const user = await pool.query(
			`
    INSERT INTO users(email, username)
    VALUES($1, $2)
    RETURNING *
    `,
			[email, username]
		);

		return new User(user.rows[0]);
	}

	static async updateUser(obj, id) {
		const keysArr = Object.keys(obj);
		const promArr = keysArr.map((el) => {
			return pool.query(
				`
        UPDATE users
        SET ${el}=$1
        WHERE id=$2
        RETURNING *
        `,
				[obj[el], id]
			);
		});
		const resArr = await Promise.all(promArr);

		return resArr[resArr.length - 1].rows[0];
	}
	static async removeUser(id) {
		const res = await pool.query(
			`
        DELETE from users
        WHERE id=$1
        RETURNING *
        `,
			[id]
		);
		return res;
	}
	static async findUser(email) {
		const user = await pool.query(
			`
        SELECT * FROM users
        WHERE email=$1
        `,
			[email]
		);
		return new User(user.rows[0]);
	}
	static async getAllUsers() {
		const res = await pool.query(
			`
        SELECT * FROM users
        `
		);

		return res.rows.map((row) => new User(row));
	}
};
