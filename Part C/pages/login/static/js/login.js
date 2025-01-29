document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (event) => {
        let valid = true;

        document.querySelectorAll(".error").forEach(error => error.remove());

        if (!validateEmail(emailInput.value)) {
            displayError(emailInput, "נא להזין כתובת אימייל תקינה.");
            valid = false;
        }

        if (!validatePassword(passwordInput.value)) {
            displayError(passwordInput, "הסיסמה חייבת להיות לפחות 6 תווים.");
            valid = false;
        }

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