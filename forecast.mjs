import {db} from './db.mjs';
export class Forecast {

    #month
    #day
    #index
    #category
    #description

    // Arrays
    #healthRecs
    #plants

    static #forecasts = []

    constructor (month, day, index, category, description, healthRecs, plants) {
        this.#month = month;
        this.#day = day;
        this.#index = index;
        this.#category = category;
        this.#description = description;
        this.#healthRecs = healthRecs;
        this.#plants = plants;
    }

    // For 5-day view
    static async getAll() {
        let forecasts = await Forecast.#updateData();
        if (forecasts === null) {
            return null;
        }

        return forecasts.map(forecast => {
            return {
                month: forecast.#month,
                day: forecast.#day,
                index: forecast.#index,
                category: forecast.#category
            }
        });
    }

    // For details about 1 day
    static async getDay(day) {
        let forecasts = await Forecast.#updateData();
        if (forecasts === null) {
            return null;
        }

        let result = forecasts[day];
        return {
            month: result.#month,
            day: result.#day,
            index: result.#index,
            category: result.#category,
            description: result.#description,
            healthRecs: result.#healthRecs,
            plants: result.#plants
        }
    }

    static async #updateData() {
        let data = await (await fetch("https://pollen.googleapis.com/v1" +
            "/forecast:lookup?key=AIzaSyCbsdRDtvAbwGxSjiMhWtXuGQMnTWuptxI" +
            "&location.longitude=-79.05&location.latitude=35.91&days=5" +
            "&plantsDescription=0")).json();
        if (data === undefined || !data instanceof Object) {
            return null;
        }

        // Each of the 5 days
        for (let day = 0; day < 5; day++) {
            let dailyInfo = data.dailyInfo[day];

            // Find the pollen type with the highest index
            let highestType = dailyInfo.pollenTypeInfo[0];
            let highestIndex = 0;
            dailyInfo.pollenTypeInfo.forEach(type => {
                let index = type.indexInfo.value;
                if (index !== undefined && index > highestIndex) {
                    highestType = type;
                    highestIndex = index;
                }
            });

            // Plants that cause pollen
            let plants = [];
            dailyInfo.plantInfo.forEach(plant => {
                if (plant.indexInfo !== undefined) {
                    plants.push(plant.displayName);
                }
            });

            // Create forecast
            Forecast.#forecasts[day] = new Forecast(
                dailyInfo.date.month,
                dailyInfo.date.day,
                highestIndex,
                highestType.indexInfo.category,
                highestType.indexInfo.indexDescription,
                highestType.healthRecommendations,
                plants
            );
        }
        return Forecast.#forecasts;
    }
}