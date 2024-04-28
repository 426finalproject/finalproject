export class HomeView {
    #status = false;

    constructor() {
    }
    
    render(render_div) {
        let body = document.body;

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
            title.textContent = "Select your location.";
            start_button.style.display = 'none';
        })

        button_div.append(start_button);
        render_div.append(button_div);

    }
}