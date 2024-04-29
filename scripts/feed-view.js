export class FeedView {
    
    render(render_div) {
        // Header
        let text = "Check out your feed.";
        this.createHeader(render_div, text);

        // Label (for input)
        let input_label = document.createElement('label');
        input_label.textContent = "Write your comment!";
        input_label.setAttribute('for', 'input');
        render_div.append(input_label);
        render_div.append(document.createElement('br'));
        
        // Input (for name)
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'input')
        render_div.append(input);
        render_div.append(document.createElement('br'));

        // Submit
        let submit = document.createElement('button');
        submit.textContent = 'Post';
        submit.addEventListener('click', (event) => {
            let comment_text = input.value.trim();
            showComments(comment_text, render_div);
        });
        render_div.append(document.createElement('br'));
        render_div.append(submit);

        let comment_div = document.createElement('div');
        comment_div.classList.add('comment-holder');
        render_div.append(comment_div);
    }

    createHeader(render_div, text) {
        let header_div = document.createElement('div');
        header_div.classList.add('header');
        let header = document.createElement('h1');
        header.textContent = text;
        header_div.append(header);
        render_div.append(header_div);
    }

    showComments(comment_text, render_div, comment_div) {
        let comment = document.createElement('p');
        comment.textContent = comment_text;
        comment.classList.add('comment');

        comment_div.add(comment);
        render_div.add(comment_div);
    }
}