document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let valid = true;
        let errorMessage = "";

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        // בדיקת שם מלא
        if (!validateFullName(fullNameInput.value)) {
            errorMessage = "נא להזין שם מלא בעברית.";
            displayError(fullNameInput, errorMessage);
            valid = false;
        }

        // בדיקת אימייל
        if (!validateEmail(emailInput.value)) {
            errorMessage = "נא להזין כתובת אימייל תקינה.";
            displayError(emailInput, errorMessage);
            valid = false;
        }

        // בדיקת טלפון
        if (!validatePhone(phoneInput.value)) {
            errorMessage = "נא להזין מספר טלפון נייד תקין.";
            displayError(phoneInput, errorMessage);
            valid = false;
        }

        // אם הטופס לא תקין, מונעים שליחה, אחרת ממשיכים לדף הבא
        if (!valid)
            event.preventDefault();
        else {
            const successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "הפניה נשלחה בהצלחה.";
            form.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 5000);
        }
    });

    // פונקציה לבדיקה אם השם מלא תקין (כולל רק אותיות בעברית ומינימום שתי מילים)
    function validateFullName(name) {
        const re = /^[א-ת\s]+$/;  // מאפשר רק אותיות בעברית ורווחים
        return name.split(' ').length >= 2 && re.test(name);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // פונקציה לבדיקה אם הטלפון תקין (מספר טלפון ישראלי)
    function validatePhone(phone) {
        const re = /^0\d{9}$/;  // חייב להתחיל ב-0 ולכלול בדיוק 9 ספרות נוספות
        return re.test(phone);
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }
});
