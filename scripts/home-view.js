export class HomeView {
    render(render_div) {
        let body = document.body

        // Title
        let text = `Welcome!<br>Forcast your Allergies.`;
        this.createTitle(render_div, text);

        // Button
        let button_div = document.createElement('div');
        button_div.classList.add('button');
        let button5 = document.createElement('button');
        button5.setAttribute('id', 'button5');
        button5.textContent= 'Forecast';
        button5.addEventListener('click', () => {
            // Change Background
            body.style.backgroundImage = 'url(/assets/forecast-screen.png)';
            // Hide
            title_div.style.display = 'none';
            title.style.display = 'none';
            button5.style.display = 'none';
            // Audio
            let audio = new Audio('assets/marys-theme.mp3');
            audio.play();
            // let forecast_data = await this.getForecasts();
            this.show5DayForecast(render_div);
        });

        button_div.append(button5);
        render_div.append(button_div);
    }

    createTitle(render_div, text) {
        let title_div = document.createElement('div');
        title_div.classList.add('title');
        let title = document.createElement('h1');
        title.innerHTML = text;
        title_div.append(title);
        render_div.append(title_div);
    }

    createHeader(render_div, text) {
        let header_div = document.createElement('div');
        header_div.classList.add('header');
        let header = document.createElement('h1');
        header.textContent = text;
        header_div.append(header);
        render_div.append(header_div);
    }

    show5DayForecast(render_div) {
        // Header
        let text = "5-Day Pollen Forecast";
        this.createHeader(render_div, text);

        // Forecast Div
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');

        // Forecasts
        for (let i=0; i < 5; i++) {
            let day = document.createElement('div');
            day.classList.add('day');

            let day_label = document.createElement('div');
            day_label.classList.add('day-label');

            // Data
            let label = "Monday";
            let value = "1";
            let category = "Very Low";
            let indexDescription = "People with very high allergy to pollen are likely to experience symptoms";
            
            day_label.innerHTML = `
                Day: ${label}
                <br>
                <br>
                Level: ${value}
                <br>
                <br>
                Category: ${category}
                <br>
                <br>
                Description: ${indexDescription}
            `;

            let button1 = document.createElement('button');
            button1.setAttribute('id', 'day'+i)
            button1.textContent= 'See more';
            button1.style.padding = '5px';
            button1.style.borderRadius = '10px';
            button1.addEventListener('click', () => {
                while(render_div.firstChild) {
                    render_div.removeChild(render_div.firstChild);
                }
                this.showMore(render_div);
            });

            day.append(day_label);
            day.append(button1);
            forecast_div.append(day);
        }
        render_div.append(forecast_div);
    }

    showMore(render_div) {
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
        let label = "Monday";
        let value = "1";
        let category = "Very Low";
        let indexDescription = "People with very high allergy to pollen are likely to experience symptoms";
        let healthRecommendations = "Pollen levels are very low right now. It's a great day to enjoy the outdoors!";
        let plants = [];
        
        day_label.innerHTML = `
            Description: ${indexDescription}
            <br>
            <br>
            Health Recommendation: ${healthRecommendations}
            <br>
            <br>
            Plants:
        `;

        day.append(day_label);
        forecast_div.append(day);
        render_div.append(forecast_div);
    }
}