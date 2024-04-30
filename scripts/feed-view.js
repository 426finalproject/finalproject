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
        
        // Input (for comment)
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'input')
        render_div.append(input);
        render_div.append(document.createElement('br'));

        // Submit button
        let submit = document.createElement('button');
        submit.textContent = 'Post';
        submit.addEventListener('click', async (event) => {
            if (input.value.trim() === '') {
                return;
            }
            await fetch('http://localhost:3000/comments', {
                method: 'POST',
                body: JSON.stringify({text: input.value.trim()}),
                headers: {'Content-Type': 'application/json'}
            });
            this.showComments(document.querySelector('.comment-holder'));
        });
        render_div.append(document.createElement('br'));
        render_div.append(submit);

        // Comments
        let comment_div = document.createElement('div');
        comment_div.classList.add('comment-holder');
        render_div.append(comment_div);
        this.showComments(comment_div);
    }

    createHeader(render_div, text) {
        let header_div = document.createElement('div');
        header_div.classList.add('header');
        let header = document.createElement('h1');
        header.textContent = text;
        header_div.append(header);
        render_div.append(header_div);
    }

    async showComments(comment_div) {
        let comments = await (await fetch('http://localhost:3000/comments')).json();

        comment_div.innerHTML = '';
        comments.reverse().forEach(comment => {
            let commentP = document.createElement('p');
            commentP.textContent = comment.text;
            commentP.classList.add('comment');

            let delete_button = document.createElement('button');
            delete_button.classList.add('delete_button');
            delete_button.classList.add('small_button');
            delete_button.textContent = 'Delete';

            delete_button.addEventListener('click', async (event) => {
                await fetch('http://localhost:3000/comments', {
                    method: 'DELETE',
                    body: JSON.stringify(comment),
                    headers: {'Content-Type': 'application/json'}
                });
            });

            commentP.append(delete_button);
            comment_div.append(commentP);
        });
    }
}