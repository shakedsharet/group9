document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    form.addEventListener("submit", (event) => {
        let valid = true;
        let errorMessage = "";

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        if (!validateFullName(fullNameInput.value)) {
            errorMessage = "נא להזין שם מלא בעברית.";
            displayError(fullNameInput, errorMessage);
            valid = false;
        }

        if (!validateEmail(emailInput.value)) {
            errorMessage = "נא להזין כתובת אימייל תקינה.";
            displayError(emailInput, errorMessage);
            valid = false;
        }

        if (!validatePhone(phoneInput.value)) {
            errorMessage = "נא להזין מספר טלפון נייד תקין.";
            displayError(phoneInput, errorMessage);
            valid = false;
        }

        if (!valid)
            event.preventDefault();
        else {
            event.preventDefault();
            const successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "הפניה נשלחה בהצלחה.";
            form.appendChild(successMessage);
            setTimeout(() => { form.submit(); }, 2000);
        }
    });

    // בודק אם כולל רק אותיות בעברית ומינימום שתי מילים
    function validateFullName(name) {
        const re = /^[א-ת\s]+$/;
        return name.split(' ').length >= 2 && re.test(name);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^0\d{9}$/;
        return re.test(phone);
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }
});
