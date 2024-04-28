export class HomeView {

    constructor() {
    }
    
    render(render_div) {
        // Title
        let title_div = document.createElement('div');
        title_div.classList.add('title');
        let break1 = document.createElement('br');

        let title = document.createElement('h1');
        title.textContent = "Welcome";
    
        title_div.append(break1);
        title_div.append(title);
        render_div.append(title_div);

    }
}