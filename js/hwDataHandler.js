// TODO; there is a cli ruby gem for automated updates
// cron om req => save res as json => upload file to nc
export const getHwData = async () => {
	const hwData = await fetch('../hwDataMock.json')
		.then(res => res.json())
		.then(data => {
			return data;
		});

	return hwData;
}

// this takes JSON of weather data and parses it into an array of objects.
// each object is a day and its weather values, with units.
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
		const today = new Date(day + " 00:00:00");
		const dayOfTheWeek = daysOfTheWeek[today.getDay()];

		const singleDayWeather = {
			time: day,
			dayOfTheWeek
		};

		dailyKeys.forEach((key) => {
			const unit = dailyUnits[key];
			const val = dailyVals[key][idx];

			if (unit && val) {
				const completeDaily = val + "" + unit;
				singleDayWeather[key] = completeDaily;
			}
		})

		return singleDayWeather;
	})

	return weatherPerDay;
}

// this creates ONE node given data of a single day
export const createDayNode = (dayData) => {
	const dayOfTheWeek = dayData.dayOfTheWeek;
	const time = dayData.time;

	const temperature_2m_mean = dayData.temperature_2m_mean;
	// const uv_index_max = dayData.uv_index_max;
	const leaf_wetness_probability_mean = dayData.leaf_wetness_probability_mean;
	const pressure_msl_mean = dayData.pressure_msl_mean;
	const visibility_mean = dayData.visibility_mean;

	// start panel generation
	const dayNode = document.createElement("div");
	dayNode.classList.add("hw-panel")

	const panelSingleWeatherDataNodeGenerator = (singleWeatherDataKey, singleDayWeatherValue) => {
		const mainNode = document.createElement("div");
		mainNode.classList.add("hw-panel-item");

		const keyNode = document.createElement("div");
		keyNode.textContent = singleWeatherDataKey;

		const valueNode = document.createElement("div");
		valueNode.textContent = singleDayWeatherValue;

		mainNode.append(keyNode, valueNode);

		return mainNode;
	}

	const timeNode = panelSingleWeatherDataNodeGenerator(dayOfTheWeek, time);
	const temperature_2m_meanNode = panelSingleWeatherDataNodeGenerator("temperature", temperature_2m_mean);
	// const uv_index_maxNode = panelSingleWeatherDataNodeGenerator("temperature", uv_index_max);
	const leaf_wetness_probability_meanNode = panelSingleWeatherDataNodeGenerator("leaf wetness probability", leaf_wetness_probability_mean);
	const pressure_msl_meanNode = panelSingleWeatherDataNodeGenerator("pressure", pressure_msl_mean);
	const visibility_meanNode = panelSingleWeatherDataNodeGenerator("visibility", visibility_mean);

	dayNode.append(
		timeNode,
		temperature_2m_meanNode,
		// uv_index_maxNode,
		leaf_wetness_probability_meanNode,
		pressure_msl_meanNode,
		visibility_meanNode
	);

	return dayNode;
};

export default {
	getHwData,
	generateWeatherPerDayList,
	createDayNode
}
