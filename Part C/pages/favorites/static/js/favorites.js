document.querySelectorAll('.remove-favorite-btn').forEach(button => {
    button.addEventListener('click', function () {
        const apartmentId = this.dataset.apartmentId;

        fetch('/favorites/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ apartment_id: apartmentId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert("שגיאה: לא ניתן להסיר את המודעה מהמועדפים.");
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

