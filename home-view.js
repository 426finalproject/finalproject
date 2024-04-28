export class HomeView {
    #status = false;

    constructor() {
    }
    
    render(render_div) {
        let body = document.body

        // Title
        let title_div = document.createElement('div');
        title_div.classList.add('title');

        let title = document.createElement('h1');
        title.textContent = "Welcome";
    
        title_div.append(title);
        render_div.append(title_div);

        // Button
        let button_div = document.createElement('div');
        button_div.classList.add('button');

        let start_button = document.createElement('button');
        start_button.setAttribute('id', 'start');
        start_button.textContent= 'Start';
        start_button.addEventListener('click', () => {
            this.#status = true;
            body.style.backgroundImage = 'url(/assets/forecast-screen.png)';
            title_div.style.display = 'none';
            title.style.display = 'none';
            start_button.style.display = 'none';
            this.showForecast(render_div);
        });
        button_div.append(start_button);
        render_div.append(button_div);
    }

    showForecast(render_div) {
        // Audio
        let audio = new Audio('assets/marys-theme.mp3');
        audio.play();

        // Header
        let header_div = document.createElement('div');
        header_div.classList.add('header');

        let header = document.createElement('h1');
        header.textContent = "5-Day Pollen Forecast";

        header_div.append(header);
        render_div.append(header_div);

        // Forecast
        let forecast_div = document.createElement('div');
        forecast_div.classList.add('forecast');
        
        for (let i=0; i < 5; i++) {
            let day = document.createElement('div');
            day.classList.add('day');

            let day_label = document.createElement('div');
            day_label.classList.add('day-label');
            day_label.innerHTML()

            day.append(day_label);
            forecast_div.append(day);
        }
        render_div.append(forecast_div);
    }
}