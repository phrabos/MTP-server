const pool = require('../../pool');

module.exports = class Tea {
	id;
	name;
	vendorName;
	teaType;
	inStock;
	quantity;
	harvestYear;
	origin;
	cultivar;
	elevation;

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
	}) {
		this.id = id;
		this.name = name;
		this.vendorName = vendor_name;
		this.teaType = tea_type;
		this.inStock = in_stock;
		this.quantity = quantity;
		this.harvestYear = harvest_year;
		this.origin = origin;
		this.cultivar = cultivar;
		this.elevation = elevation;
	}

	static async addTea({
		name,
		vendorName,
		teaType,
		inStock,
		quantity,
		harvestYear,
		origin,
		cultivar,
		elevation,
	}) {
		const tea = await pool.query(
			`
    INSERT INTO teas(name, vendor_name, tea_type, in_stock, quantity, harvest_year, origin, cultivar, elevation)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `,
			[
				name,
				vendorName,
				teaType,
				inStock,
				quantity,
				harvestYear,
				origin,
				cultivar,
				elevation,
			]
		);
		console.log('row for constructor', tea.rows[0]);
		return new Tea(tea.rows[0]);
	}
};
