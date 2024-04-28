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

        // LABEL (for input)
        let input_label = document.createElement('label');
        input_label.textContent = "Post your comment!";
        input_label.setAttribute('for', 'input');
        
        // INPUT (for name)
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'input')

        

        
    }
}