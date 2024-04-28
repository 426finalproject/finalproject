export class HomeView {
    
    render(render_div) {
        let my_title = document.createElement('h1');
        let heart_animation = document.createElement('img');
        heart_animation.setAttribute('src', 'images/sparkling-heart.gif')
        heart_animation.style.width = '35px';
        my_title.textContent = "Game of ";
        my_title.append(heart_animation)
    }
}