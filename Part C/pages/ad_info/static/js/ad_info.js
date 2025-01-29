document.getElementById('heart-icon').addEventListener('click', function () {
    var heartImage = this;
    var apartmentId = heartImage.dataset.apartmentId;
    var action = heartImage.getAttribute('src').includes('empty-heart') ? 'add' : 'remove';

    fetch('/ad_info/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apartment_id: apartmentId,
            action: action
        })
    })
    .then(response => {
        if (response.ok) {
            if (action === 'add') {
                    heartImage.setAttribute('src', '/ad_info/static/img/full-heart.png');
            } else {
                heartImage.setAttribute('src', '/ad_info/static/img/empty-heart.png');
            }
        } else {
            alert("לא ניתן לעדכן את המועדפים. יש להתחבר תחילה.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
