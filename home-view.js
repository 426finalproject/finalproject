export class HomeView {

    constructor() {
    }
    
    render(render_div) {
        let title = document.createElement('h1');
        title.textContent = "Allergy Forecast";
        render_div.append(title);
    }
}