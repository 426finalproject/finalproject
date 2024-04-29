export class HomeView {
    render(render_div) {
        let body = document.body

        // Title
        let title_div = document.createElement('div');
        title_div.classList.add('title');
        let title = document.createElement('h1');
        title.innerHTML = `Welcome!<br>Forecast your allergies.`;
        title_div.append(title);
        render_div.append(title_div);

        // Button
        let button_div = document.createElement('div');
        button_div.classList.add('button');
        let button5 = document.createElement('button');
        button5.setAttribute('id', 'button5');
        button5.textContent= 'Forecast';

        // Event Listener
        button5.addEventListener('click', async () => {
            // Change Background
            body.style.backgroundImage = `url('../assets/forecast-screen.png')`;
            // Hiding
            title_div.style.display = 'none';
            title.style.display = 'none';
            button5.style.display = 'none';
            // Audio
            let audio = new Audio('../assets/marys-theme.mp3');
            audio.play();
            // API
            let forecast_data = await this.getForecasts();
            this.show5DayForecast(render_div, forecast_data);
        });

        button_div.append(button5);
        render_div.append(button_div);
    }

    // Async function to call API
    async getForecasts() {
        let fetch_result = await fetch('/forecast');  // send HTTP GEt request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to call API with ID
    async getForecastsId(specific) {
        let fetch_result = await fetch(`/forecast/${specific}`);  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    show5DayForecast(render_div, forecast_data) {
        // Header
        let text = "5-Day Pollen Forecast";
        this.createHeader(render_div, text);

        // Forecast Div
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');

        // Forecasts
        forecast_data.forEach((forecast, i) => {
            let day = document.createElement('div');
            day.classList.add('day');
            let day_label = document.createElement('div');
            day_label.classList.add('day-label');

            // Data
            let month = forecast.month;
            let label = forecast.day;
            let value = forecast.index;
            let category = forecast.category;
            
            day_label.innerHTML = `
                Date: ${month}/${label}
                <br>
                <br>
                Index: ${value}
                <br>
                <br>
                Status: ${category}
            `;

            let button1 = document.createElement('button');
            button1.setAttribute('id', 'day'+i)
            button1.textContent= 'See more';
            button1.style.padding = '5px';
            button1.style.borderRadius = '10px';
            button1.addEventListener('click', async () => {
                while(render_div.firstChild) {
                    render_div.removeChild(render_div.firstChild);
                }
                let forecast_data_specific = await this.getForecastsId(i);
                this.showMore(render_div, forecast_data_specific);
                
            });
            day.append(day_label);
            day.append(button1);
            forecast_div.append(day);
        });
        render_div.append(forecast_div);
    }

    showMore(render_div, forecast_data_specific) {
        // Header
        let text = "1-Day Pollen Forecast";
        this.createHeader(render_div, text);

        // Forecast Div
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');
     
        // Forcasts
        let day = document.createElement('div');
        day.classList.add('day');
        let day_label = document.createElement('div');
        day_label.classList.add('day-label');

        // Data
        let indexDescription = forecast_data_specific.description;
        let healthRecommendations = forecast_data_specific.healthRecs;
        let plants = forecast_data_specific.plants;

        let healthRecommendationsString = ""
        healthRecommendations.forEach(rec => {
            healthRecommendationsString += rec + "\n";
        });

        let plantsString = ""
        plants.forEach(plant => {
            plantsString += plant + ", ";
        });

        
        day_label.innerHTML = `
            Description: ${indexDescription}
            <br>
            <br>
            Health Recommendation: ${healthRecommendationsString}
            <br>
            <br>
            Plants: ${plantsString}
        `;

        day.append(day_label);
        forecast_div.append(day);
        render_div.append(forecast_div);
    }

    createHeader(render_div, text) {
        let header_div = document.createElement('div');
        header_div.classList.add('header');
        let header = document.createElement('h1');
        header.textContent = text;
        header_div.append(header);
        render_div.append(header_div);
    }
}