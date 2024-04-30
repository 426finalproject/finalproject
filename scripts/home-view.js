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
            body.style.backgroundImage = `url('https://426finalproject.github.io/finalproject/forecast-screen.png')`;
            // Hiding
            title_div.style.display = 'none';
            title.style.display = 'none';
            button5.style.display = 'none';
            // Audio
            let audio = new Audio('https://426finalproject.github.io/finalproject/marys-theme.mp3');
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
        let fetch_result = await fetch('http://localhost:3000/forecast');  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to call API with ID
    async getForecastsId(specific) {
        let fetch_result = await fetch(`http://localhost:3000/forecast/${specific}`);  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    async postStatus(post) {
        let fetch_result = await fetch(`http://localhost:3000/forecast/`);  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to postStatus!");
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

            // See more button
            let button1 = document.createElement('button');
            button1.setAttribute('id', 'day'+i)
            button1.textContent= 'See more';
            button1.style.padding = '5px';
            button1.style.borderRadius = '10px';
            button1.addEventListener('click', async () => {
                // Hiding
                while(render_div.firstChild) {
                    render_div.removeChild(render_div.firstChild);
                }
                let forecast_data_specific = await this.getForecastsId(i);
                this.showMore(render_div, forecast_data_specific);
                
            });
            // Post button
            let post_button = document.createElement('button');
            post_button.textContent= 'Post';
            post_button.style.padding = '5px';
            post_button.style.borderRadius = '10px';
            post_button.addEventListener('click', async () => {
                // Hiding
                while(render_div.firstChild) {
                    render_div.removeChild(render_div.firstChild);
                }
                let post_data = await this.postStatus(i);
                this.showStatus(render_div, post_data);
            });

            day.append(day_label);
            day.append(button1);
            day.append(post_button);
            forecast_div.append(day);
        });
        render_div.append(forecast_div);
    }

    showMore(render_div, forecast_data_specific) {
        // Header
        let text = `${forecast_data_specific.month}/${forecast_data_specific.day} Forecast`;
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
        let plantLength = plants.length;
        for (let i=0; i < plantLength; i++) {
            if (i != plantLength - 1) {
                plantsString += plants[i] + ", ";

            }
            else {
                plantsString += plants[i]
            }
        }
        
        day_label.innerHTML = `
            Description: ${indexDescription}
            <br>
            <br>
            Health Recommendation: ${healthRecommendationsString}
            <br>
            <br>
            Plants To Watch Out For: ${plantsString}
        `;

        // Button
        let button_div = document.createElement('div');
        button_div.classList.add('button');
        let back_button = document.createElement('button');
        back_button.setAttribute('id', 'back_button');
        back_button.textContent= 'Back';

        // Event Listener
        back_button.addEventListener('click', async () => {
            // Hiding
            while(render_div.firstChild) {
                render_div.removeChild(render_div.firstChild);
            }
            // API
            let forecast_data = await this.getForecasts();
            this.show5DayForecast(render_div, forecast_data);
        });

        day.append(day_label);
        day.append(back_button);
        forecast_div.append(day);
        render_div.append(forecast_div);
    }

    showStatus(render_div, post_data) {
        
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