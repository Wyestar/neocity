export const getHwData = async () => {
	const hwData = await fetch('../hwDataMock.json')
		.then(res => res.json())
		.then(data => {
			return data;
		});

	return hwData;
}

export default {
	getHwData
}
