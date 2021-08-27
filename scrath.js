const data = {
	name: 'new name',
	vendorName: null ?? null,
	teaType: 'green' ?? null,
	inStock: true ?? null,
	quantity: 100 ?? null,
	harvestYear: '2012' ?? null,
	origin: 'Taiwan' ?? null,
	cultivar: 'Si Ji Chun' ?? null,
	elevation: 4000 ?? null,
};

const teaName = data['name'];

console.log({
	...(data.name && { name: data.name }),
	...(data.vendorName && { vendorName: data.vendorName }),
	...(data.teaType && { teaType: data.teaType }),
	...(data.inStock && { inStock: data.inStock }),
	...(data.quantity && { quantity: data.quantity }),
	...(data.harvesYear && { harvestYear: data.harvesYear }),
	...(data.origin && { origin: data.origin }),
	...(data.cultivar && { cultivar: data.cultivar }),
	...(data.elevation && { elevation: data.elevation }),
});

const dog = {
	name: 'spot',
	age: 3,
	breed: 'terrier',
};

console.log({ ...{ namedog: dog.name } });
