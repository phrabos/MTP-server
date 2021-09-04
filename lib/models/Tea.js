const pool = require('../../pool');

module.exports = class Tea {
	id;
	teaName;
	vendorName;
	teaType;
	inStock;
	quantity;
	harvestYear;
	origin;
	cultivar;
	elevation;
	userID;

	constructor({
		id,
		name,
		vendor_name,
		tea_type,
		in_stock,
		quantity,
		harvest_year,
		origin,
		cultivar,
		elevation,
		user_id,
	}) {
		this.id = id;
		this.teaName = name;
		this.vendorName = vendor_name;
		this.teaType = tea_type;
		this.inStock = in_stock;
		this.quantity = quantity;
		this.harvestYear = harvest_year;
		this.origin = origin;
		this.cultivar = cultivar;
		this.elevation = elevation;
		this.userID = user_id;
	}

	static async addTea({
		teaName,
		vendorName,
		teaType,
		inStock,
		quantity,
		harvestYear,
		origin,
		cultivar,
		elevation,
		userID,
	}) {
		const tea = await pool.query(
			`
    INSERT INTO teas(name, vendor_name, tea_type, in_stock, quantity, harvest_year, origin, cultivar, elevation, user_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
			[
				teaName,
				vendorName,
				teaType,
				inStock,
				quantity,
				harvestYear,
				origin,
				cultivar,
				elevation,
				userID,
			]
		);

		return new Tea(tea.rows[0]);
	}

	static async updateTea(obj, id) {
		const keysArr = Object.keys(obj);
		const promArr = keysArr.map((el) => {
			return pool.query(
				`
        UPDATE teas
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
	static async removeTea(id) {
		const res = await pool.query(
			`
        DELETE from teas
        WHERE id=$1
        RETURNING *
        `,
			[id]
		);
		return res;
	}
	static async getAllTea(id) {
		const res = await pool.query(
			`
        SELECT * FROM teas
				WHERE user_id=$1
        `,
			[id]
		);

		return res.rows.map((row) => new Tea(row));
	}
};
