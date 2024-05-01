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
            bee_div.style.display = 'none';
            // Audio
            let audio = new Audio('https://426finalproject.github.io/finalproject/marys-theme.mp3');
            audio.play();
            // API
            let forecast_data = await this.getForecasts();
            this.show5DayForecast(render_div, forecast_data);
        });

        button_div.append(button5);
        render_div.append(button_div);

        let bee_div = document.createElement('div');
        bee_div.classList.add('bee_div');

        for (let i=0; i < 3; i++) {
            let bee = document.createElement('img');
            bee.classList.add('bee');
            bee.src = 'bee.gif';
            bee_div.append(bee);
        }
        render_div.append(bee_div)
    }

    // Async function to get info from 3rd-party API
    async getForecasts() {
        let fetch_result = await fetch('http://localhost:3000/forecast');  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to get info from 3rd-party API with ID
    async getForecastsId(specific) {
        let fetch_result = await fetch(`http://localhost:3000/forecast/${specific}`);  // send HTTP GET request to /forecast endpoint
        if (!fetch_result.ok) {
            console.log("Failed to getForecasts!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to get status
    async getSymptom(specific) {
        let fetch_result = await fetch(`http://localhost:3000/symptom/${specific}`);
        if (!fetch_result.ok) {
            console.log("Failed to getSymptoms!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to post status
    async postSymptom(specific) {
        let fetch_result = await fetch(`http://localhost:3000/symptom/${specific}`, {
            method: 'POST',
            body: JSON.stringify({text: document.querySelector('#symptom_input').value.trim()}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!fetch_result.ok) {
            console.log("Failed to postSymptoms!");
        }
        let result_json = await fetch_result.json();
        return result_json;
    }

    // Async function to post status
    async putSymptom(specific) {
        let fetch_result = await fetch(`http://localhost:3000/symptom/${specific}`, {
            method: 'PUT',
            body: JSON.stringify({text: document.querySelector('#symptom_input').value.trim()}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!fetch_result.ok) {
            console.log("Failed to putSymptoms!");
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
            day_label.innerHTML = `
                Date: ${forecast.month}/${forecast.day}
                <br>
                <br>
                Index: ${forecast.index}
                <br>
                <br>
                Status: ${forecast.status}
            `;

            // See more button
            let more_button = document.createElement('button');
            more_button.classList.add('small_button');
            more_button.setAttribute('id', 'day' + i)
            more_button.textContent = 'See more';
            more_button.addEventListener('click', async () => {
                // Hiding
                while(render_div.firstChild) {
                    render_div.removeChild(render_div.firstChild);
                }
                let forecast_data_specific = await this.getForecastsId(i);
                this.showMore(render_div, forecast_data_specific, i);
                
            });

            day.append(day_label);
            day.append(more_button);
            forecast_div.append(day);
        });
        render_div.append(forecast_div);
    }

    showMore(render_div, forecast_data_specific, id) {
        // Header
        let text = `${forecast_data_specific.month}/${forecast_data_specific.day} Forecast`;
        this.createHeader(render_div, text);

        // Forecast Div
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast2');
     
        // Forcasts
        let day = document.createElement('div');
        day.classList.add('day');
        let day_label = document.createElement('div');
        day_label.classList.add('day-label');

        // Data
        let indexDescription = forecast_data_specific.description;
        let healthRecommendations = forecast_data_specific.healthRecs;
        let plants = forecast_data_specific.plants;

        // Health Recs
        let healthRecommendationsString = ""
        healthRecommendations.forEach(rec => {
            healthRecommendationsString += rec + "\n";
        });

        // Plants
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
        back_button.textContent = 'Back';

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

        // Forecast Div
        let post_div = document.createElement('div');
        post_div.classList.add('post_div');

        // Post symptoms
        let symptom_input = document.createElement('input');
        symptom_input.setAttribute('type', 'text');
        symptom_input.setAttribute('id', 'symptom_input')
        
        // Post button
        let post_button = document.createElement('button');
        post_button.textContent = 'Post your symptoms';
        post_button.addEventListener('click', async () => {
            // Hiding
            while(render_div.firstChild) {
                render_div.removeChild(render_div.firstChild);
            }
            let get_symptom_data = await this.getSymptom(id);
            let postPut = this.checkPostPut(get_symptom_data);

            if (postPut) {  // post
                let post_data = await this.postSymptom(id);
                day_label.innerHTML = `
                    Description: ${indexDescription}
                    <br>
                    <br>
                    Health Recommendation: ${healthRecommendationsString}
                    <br>
                    <br>
                    Plants To Watch Out For: ${plantsString}
                    <br>
                    <br>
                    Symptoms: ${post_data.text}
                `;
            }
            else {  // put
                let put_data = await this.putSymptom(id);
                day_label.innerHTML = `
                Description: ${indexDescription}
                <br>
                <br>
                Health Recommendation: ${healthRecommendationsString}
                <br>
                <br>
                Plants To Watch Out For: ${plantsString}
                <br>
                <br>
                Symptoms: ${put_data.text}
            `;
            }
        });

        day.append(day_label);
        day.append(back_button);
        post_div.append(symptom_input);
        post_div.append(post_button);
        forecast_div.append(day);
        render_div.append(forecast_div);
        render_div.append(post_div);
    }

    checkPostPut(get_symptom_data) {
        let post_or_put = false;  // post = true, put = false
        if (get_symptom_data.id != -1) {
            post_or_put = true;
        }
        return post_or_put;
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