function confirmDeletion(event, apartmentId) {
    event.preventDefault();
    event.stopPropagation();

    if (confirm("האם אתה בטוח שברצונך למחוק את המודעה? פעולה זו אינה ניתנת לשחזור.")) {
        fetch(`/delete/${apartmentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            cache: 'no-cache'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const linkElement = event.target.closest('.ad-link');
                if (linkElement) {
                    linkElement.remove();
                }

                // בדיקה אם כל המודעות נמחקו
                if (document.querySelectorAll('.ad-link').length === 0) {
                    document.querySelector("#ads-title").insertAdjacentHTML("afterend", "<h2 id='no-ads-message'>לא הועלו על ידך מודעות עדיין.</h2>");
                }

                alert(data.message);
            } else {
                alert('המודעה נמחקה אבל יש צורך לרענן את העמוד');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('אירעה שגיאה במחיקת המודעה');
        });
    }
}