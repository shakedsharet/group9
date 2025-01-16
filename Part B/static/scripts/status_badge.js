function markAsRead(element) {
    if (element.classList.contains('status-new')) {
        element.classList.remove('status-new');
        element.classList.add('status-read');
        element.textContent = 'נקרא';
    } else {
        element.classList.remove('status-read');
        element.classList.add('status-new');
        element.textContent = 'חדש';
    }
}