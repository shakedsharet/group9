document.addEventListener("DOMContentLoaded", () => {
    const publishDateSpan = document.getElementById("publishDate");
    const today = new Date();

    // היפוך לפורמט תקין
    const formattedDate = [
        String(today.getDate()).padStart(2, '0'),
        String(today.getMonth() + 1).padStart(2, '0'),
        today.getFullYear()
    ].join("-");

    publishDateSpan.textContent = formattedDate;
});
