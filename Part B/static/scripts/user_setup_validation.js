document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".user-details-form");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let valid = true;

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        // בדיקת שם פרטי
        if (!validateHebrewName(firstNameInput.value)) {
            displayError(firstNameInput, "נא להזין שם פרטי תקין (אותיות בעברית בלבד).");
            valid = false;
        }

        // בדיקת שם משפחה
        if (!validateHebrewName(lastNameInput.value)) {
            displayError(lastNameInput, "נא להזין שם משפחה תקין (אותיות בעברית בלבד).");
            valid = false;
        }

        // בדיקת טלפון
        if (!validatePhone(phoneInput.value)) {
            displayError(phoneInput, "נא להזין מספר טלפון ישראלי תקין.");
            valid = false;
        }

        // בדיקת אימייל
        if (!validateEmail(emailInput.value)) {
            displayError(emailInput, "נא להזין כתובת אימייל תקינה.");
            valid = false;
        }

        // בדיקת בחירת צ'קבוקס
        if (!Array.from(checkboxes).some(checkbox => checkbox.checked)) {
            displayError(checkboxes[0].parentElement, "יש לבחור לפחות אפשרות אחת.");
            valid = false;
        }

        if (!valid)
            event.preventDefault();
        else {
            const successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "הנתונים נשמרו בהצלחה.";
            form.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 5000);
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
