document.addEventListener("DOMContentLoaded", () => {
    const imageUploadInput = document.getElementById("imageUpload");
    const selectedFilesText = document.getElementById("selectedFilesText");

    imageUploadInput.addEventListener("change", () => {
        const files = imageUploadInput.files;
        const numberOfFiles = files.length;

        if (numberOfFiles > 0) {
            selectedFilesText.textContent = `נבחרו ${numberOfFiles} תמונות`;
        } else {
            selectedFilesText.textContent = "לא נבחרו תמונות";
        }
    });
});