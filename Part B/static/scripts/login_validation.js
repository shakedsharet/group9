document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        let valid = true;

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        // בדיקת תקינות אימייל
        if (!validateEmail(emailInput.value)) {
            displayError(emailInput, "נא להזין כתובת אימייל תקינה.");
            valid = false;
        }

        // בדיקת תקינות סיסמה
        if (!validatePassword(passwordInput.value)) {
            displayError(passwordInput, "הסיסמה חייבת להיות לפחות 6 תווים.");
            valid = false;
        }

        // מניעת שליחה אם יש שגיאות
        if (!valid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }
});

/*נצטרך להוסיף ולידציה שבאמת המייל והסיסמה תואמים למה שיש ב-DB*/