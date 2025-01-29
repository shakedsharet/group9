document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".user-details-form");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", (event) => {
        let valid = true;

        document.querySelectorAll(".error").forEach(error => error.remove());

        if (!validateHebrewName(firstNameInput.value)) {
            displayError(firstNameInput, "נא להזין שם פרטי תקין (אותיות בעברית בלבד).");
            valid = false;
        }

        if (!validateHebrewName(lastNameInput.value)) {
            displayError(lastNameInput, "נא להזין שם משפחה תקין (אותיות בעברית בלבד).");
            valid = false;
        }

        if (!validatePhone(phoneInput.value)) {
            displayError(phoneInput, "נא להזין מספר טלפון ישראלי תקין (מס' בלבד).");
            valid = false;
        }

        if (!validateEmail(emailInput.value)) {
            displayError(emailInput, "נא להזין כתובת אימייל תקינה.");
            valid = false;
        }

        if (!valid)
            event.preventDefault();
        else {
            event.preventDefault();
            const successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "הנתונים נשמרו בהצלחה, מועבר לאזור האישי.";
            form.appendChild(successMessage);
            setTimeout(() => { form.submit(); }, 1000);
        }
    });


    function validateHebrewName(name) {
        const re = /^[א-ת\s]+$/;
        return re.test(name.trim());
    }

    function validatePhone(phone) {
        const re = /^0\d{9}$/;
        return re.test(phone.trim());
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }
});
