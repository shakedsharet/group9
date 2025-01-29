document.addEventListener("DOMContentLoaded", function () {
    const redirectDiv = document.getElementById("redirect-url");
    const loginUrl = redirectDiv ? redirectDiv.dataset.url : "/";

    const userConfirmed = confirm("לפני הגעה לעמוד זה, יש להתחבר לאתר. האם ברצונך להתחבר?");
    if (userConfirmed) {
        window.location.href = loginUrl;
    } else {
        window.history.back();
    }
});