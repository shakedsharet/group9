function markAsRead(element, requestId) {
    const newStatus = element.classList.contains('status-new') ? 'נקרא' : 'חדש';
    fetch(`/update_status/${requestId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    })
        .then((response) => {
            if (response.ok) {
                if (newStatus === 'נקרא') {
                    element.classList.remove('status-new');
                    element.classList.add('status-read');
                } else {
                    element.classList.remove('status-read');
                    element.classList.add('status-new');
                }
                element.textContent = newStatus;
            } else {
                alert('שגיאה בעדכון הסטטוס');
            }
        })
        .catch(() => alert('שגיאה בתקשורת עם השרת'));
}