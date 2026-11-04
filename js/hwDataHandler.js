// TODO; om script will auto update json file, needs same static path
export const getHwData = async () => {
	const hwData = await fetch('../hwDataMock.json')
		.then(res => res.json())
		.then(data => {
			return data;
		});

	return hwData;
}

export const generateWeatherPerDayList = (hwData) => {
	const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let weatherPerDay = [];
	const dailyUnits = hwData.daily_units
	const dailyVals = hwData.daily;

	// get all keys besides time
	const dailyKeys = Object.keys(hwData.daily);
	const dailyKeysTimeIndex = dailyKeys.findIndex((elem) => elem === "time");
	dailyKeys.splice(dailyKeysTimeIndex, 1)

	weatherPerDay = hwData.daily.time.map((day, idx) => {
		console.log("daily time map start", day)
		const today = new Date(day + " 00:00:00");
		const dayOfTheWeek = daysOfTheWeek[today.getDay()];

		const singleDayWeather = {
			time: day,
			dayOfTheWeek
		};
		dailyKeys.forEach((key) => {
			const unit = dailyUnits[key];
			const val = dailyVals[key][idx];

			// should use string concat
			const completeDaily = val + " " + unit;
			singleDayWeather[key] = completeDaily
		})

		return singleDayWeather;
	})

	return weatherPerDay;
}

// this creates ONE node given data of a single day
export const createDayNode = () => { };

export default {
	getHwData,
	generateWeatherPerDayList,
	createDayNode
}
