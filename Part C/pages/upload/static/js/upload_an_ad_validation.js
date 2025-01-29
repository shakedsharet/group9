document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const roomsInput = document.getElementById("rooms");
    const sizeInput = document.getElementById("size");
    const distanceInput = document.getElementById("distance");
    const neighborhoodSelect = document.getElementById("neighborhood-select");
    const imageUploadInput = document.getElementById("imageUpload");

    form.addEventListener("submit", (event) => {
        let valid = true;
        let errorMessage = "";

        // איפוס הודעות שגיאה
        document.querySelectorAll(".error").forEach(error => error.remove());

        // בדיקת שם
        if (!validateName(nameInput.value)) {
            errorMessage = "נא להזין שם מלא באופן תקין.";
            displayError(nameInput, errorMessage);
            valid = false;
        }

        // בדיקת כתובת
        if (!validateAddress(addressInput.value)) {
            errorMessage = "נא להזין כתובת תקינה (רחוב מס', עיר).";
            displayError(addressInput, errorMessage);
            valid = false;
        }

        // בדיקת מספר חדרים
        if (!validateRooms(roomsInput.value)) {
            errorMessage = "נא להזין מספר חדרים תקין.";
            displayError(roomsInput, errorMessage);
            valid = false;
        }

        // בדיקת גודל דירה
        if (!validateSize(sizeInput.value)) {
            errorMessage = "נא להזין גודל דירה תקין";
            displayError(sizeInput, errorMessage);
            valid = false;
        }

        // בדיקת מרחק מהאוניברסיטה
        if (!validateDistance(distanceInput.value)) {
            errorMessage = "נא להזין מרחק תקין";
            displayError(distanceInput, errorMessage);
            valid = false;
        }

        if (neighborhoodSelect.value === "בחר") {
            errorMessage = "נא לבחור שכונה";
            displayError(neighborhoodSelect, errorMessage);
            valid = false;
        }

        if (!validateImageUpload(imageUploadInput.files)) {
            errorMessage = "נא להעלות לפחות 2 קבצים מסוג תמונה";
            displayError(imageUploadInput, errorMessage);
            valid = false;
        }

        if (!valid)
            event.preventDefault();
    });

    function validateName(name) {
        const hasTwoWords = name && name.trim().split(' ').length >= 2;
        const noNumbersInName = /^[א-ת\s]+$/.test(name);
        return hasTwoWords && noNumbersInName;
}

    function validateAddress(address) {
        const hasTwoWords = address && address.trim().split(' ').length > 1;
        const containsNumber = /\d/.test(address);

        return hasTwoWords && containsNumber;
}

    function validateRooms(rooms) {
        return rooms && rooms > 0;
    }

    function validateSize(size) {
        return size && size > 15;
    }

    function validateDistance(distance) {
        return distance && distance > 0;
    }

    function validateImageUpload(files) {
        if (files.length === 0) {
            return false;
        }

        if (files.length < 2)
            return false;

        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith('image/'))
                return false;
        }
        return true;
    }

    function displayError(inputElement, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;

        if (inputElement === imageUploadInput) {
            const imageUploadLabel = document.querySelector("label[for='imageUpload']");
            imageUploadLabel.insertAdjacentElement("afterend", errorElement);
        } else
            inputElement.parentElement.appendChild(errorElement);

    }

});
