// function confirmDeletion(event, apartmentId) {
//     // מונע באופן מוחלט כל התנהגות דיפולטיבית
//     event.preventDefault();
//     event.stopPropagation();
//
//     console.log('Starting deletion process');
//
//     if (confirm("האם אתה בטוח שברצונך למחוק את המודעה? פעולה זו אינה ניתנת לשחזור.")) {
//         console.log('User confirmed deletion');
//
//         fetch(`/delete/${apartmentId}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             // מונע caching
//             cache: 'no-cache'
//         })
//         .then(response => {
//             console.log('Response received:', response);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Parsed response:', data);
//
//             if (data.success) {
//                 // מוצא את אלמנט ה-link המכיל
//                 const linkElement = event.target.closest('.ad-link');
//                 console.log('Found link element:', linkElement);
//
//                 if (linkElement) {
//                     // מסיר את האלמנט מה-DOM
//                     linkElement.remove();
//                     console.log('Element removed from DOM');
//                     alert(data.message);
//                 } else {
//                     console.error('Could not find parent link element');
//                     alert('המודעה נמחקה אבל יש צורך לרענן את העמוד');
//                 }
//             } else {
//                 throw new Error(data.error || 'Failed to delete');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('אירעה שגיאה במחיקת המודעה');
//         });
//     }
// }


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