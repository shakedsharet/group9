document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("password_verif");

    form.addEventListener("submit", (event) => {
        let valid = true;
        let errorMessage = "";

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        // בדיקת אימייל
        if (!validateEmail(emailInput.value)) {
            errorMessage = "נא להזין כתובת אימייל תקינה.";
            displayError(emailInput, errorMessage);
            valid = false;
        }

        // בדיקת סיסמה
        if (passwordInput.value.length < 6) {
            errorMessage = "הסיסמה חייבת להיות לפחות באורך 6 תווים.";
            displayError(passwordInput, errorMessage);
            valid = false;
        }

        // בדיקת אישור סיסמה
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage = "הסיסמאות אינן תואמות.";
            displayError(confirmPasswordInput, errorMessage);
            valid = false;
        }

        // אם הטופס לא תקין, מונעים שליחה, אחרת ממשיכים לדף הבא
        if (!valid)
            event.preventDefault();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }
});
