const pool = require('../../pool');

module.exports = class Brew {
	id;
	teaID;
	userID;
	weight;
	waterVolume;
	temperature;
	time;
	infusions;
	notes;
	tags;
	rating;

	constructor({
		id,
		tea_id,
		user_id,
		weight,
		water_volume,
		temperature,
		time,
		infusions,
		notes,
		tags,
		rating,
	}) {
		this.id = id;
		this.teaID = tea_id;
		this.userID = user_id;
		this.weight = weight;
		this.waterVolume = water_volume;
		this.temperature = temperature;
		this.time = time;
		this.infusions = infusions;
		this.notes = notes;
		this.tags = tags;
		this.rating = rating;
	}

	static async addBrew({
		teaID,
		userID,
		weight,
		waterVolume,
		temperature,
		time,
		infusions,
		notes,
		tags,
		rating,
	}) {
		const brew = await pool.query(
			`
    INSERT INTO brews(tea_id, user_id, weight, water_volume, temperature, time, infusions, notes, tags, rating)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
			[
				teaID,
				userID,
				weight,
				waterVolume,
				temperature,
				time,
				infusions,
				notes,
				tags,
				rating,
			]
		);

		return new Brew(brew.rows[0]);
	}

	static async updateBrew(obj, id) {
		const keysArr = Object.keys(obj);
		const promArr = keysArr.map((el) => {
			return pool.query(
				`
        UPDATE brews
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
	static async removeBrew(id) {
		const brew = await pool.query(
			`
        DELETE from brews
        WHERE id=$1
        RETURNING *
        `,
			[id]
		);
		return brew;
	}
	static async getAllBrews(id) {
		const brew = await pool.query(
			`
        SELECT * FROM brews
				WHERE user_id=$1
        `,
			[id]
		);

		return brew.rows.map((row) => new Brew(row));
	}
};
