export class HomeView {

    render(render_div) {
        let body = document.body

        // Title
        let title_div = document.createElement('div');
        title_div.classList.add('title');

        let title = document.createElement('h1');
        title.textContent = "Welcome!";
    
        title_div.append(title);
        render_div.append(title_div);

        // Button
        let button_div = document.createElement('div');
        button_div.classList.add('button');

        let button1 = document.createElement('button');
        button1.setAttribute('id', 'start');
        button1.textContent= '1-Day Forecast';
        button1.addEventListener('click', () => {
            body.style.backgroundImage = 'url(/assets/forecast-screen.png)';
            title_div.style.display = 'none';
            title.style.display = 'none';
            button1.style.display = 'none';
            button5.style.display = 'none';

            // Audio
            let audio = new Audio('assets/marys-theme.mp3');
            audio.play();
            
            this.show1Forecast(render_div);
        });

        let button5 = document.createElement('button');
        button5.setAttribute('id', 'start');
        button5.textContent= '5-Day Forecast';
        button5.addEventListener('click', () => {
            body.style.backgroundImage = 'url(/assets/forecast-screen.png)';
            title_div.style.display = 'none';
            title.style.display = 'none';
            button1.style.display = 'none';
            button5.style.display = 'none';

            // Audio
            let audio = new Audio('assets/marys-theme.mp3');
            audio.play();
            
            this.show5Forecast(render_div);
        });

        button_div.append(button1);
        button_div.append(button5);
        render_div.append(button_div);
    }

    show1Forecast(render_div) {
        // Header
        let header_div = document.createElement('div');
        header_div.classList.add('header');

        let header = document.createElement('h1');
        header.textContent = "1-Day Pollen Forecast";

        header_div.append(header);
        render_div.append(header_div);

        // Forecast Boxes
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');
        
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
            <br>
            <br>
            Health Recommendation: ${healthRecommendations}
        `;


        day.append(day_label);
        forecast_div.append(day);
        render_div.append(forecast_div);
    }

    show5Forecast(render_div) {
        // Header
        let header_div = document.createElement('div');
        header_div.classList.add('header');

        let header = document.createElement('h1');
        header.textContent = "5-Day Pollen Forecast";

        header_div.append(header);
        render_div.append(header_div);

        // Forecast Boxes
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');
        
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
            let healthRecommendations = "Pollen levels are very low right now. It's a great day to enjoy the outdoors!";
            
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
                <br>
                <br>
                Health Recommendation: ${healthRecommendations}
            `;

            day.append(day_label);
            forecast_div.append(day);
        }
        render_div.append(forecast_div);
    }
}