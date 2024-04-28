export class FeedView {
    
    render(render_div) {
        let body = document.body

        // Title
        let header_div = document.createElement('div');
        header_div.classList.add('header');

        let header = document.createElement('h1');
        header.textContent = "Check out your feed.";

        header_div.append(header);
        render_div.append(header_div);

        
    }
}