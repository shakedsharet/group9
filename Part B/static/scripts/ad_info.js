document.getElementById('heart-icon').addEventListener('click', function() {
    var heartImage = this; // התמונה של הלב
    var src = heartImage.getAttribute('src');

    if (src === '../static/pictures/empty-heart.png') {
        heartImage.setAttribute('src', '../static/pictures/full-heart.png');
    } else {
        heartImage.setAttribute('src', '../static/pictures/empty-heart.png');
    }
});
