const elements = {
    form: document.querySelector("form"),
    nameInput: document.getElementById("fullName"),
    emailInput: document.getElementById("emailAddress"),
    nameErrorMsg: document.createElement("span"),
    emailErrorMsg: document.createElement("span")
};

const userSession = {
    savedName: localStorage.getItem("userName")
};

const allowedDomains = ["com", "org", "net", "edu"];
let errors = [];

elements.nameErrorMsg.style.color = "red";
elements.emailErrorMsg.style.color = "red";
elements.nameInput.parentNode.insertBefore(elements.nameErrorMsg, elements.nameInput.nextSibling);
elements.emailInput.parentNode.insertBefore(elements.emailErrorMsg, elements.emailInput.nextSibling);

function loadStoredData() {
    if (userSession.savedName && elements.nameInput) {
        elements.nameInput.value = userSession.savedName;
    }
}

function validateForm(event) {
    elements.nameErrorMsg.textContent = "";
    elements.emailErrorMsg.textContent = "";
    errors = [];

    const nameValue = elements.nameInput.value.trim();
    const emailValue = elements.emailInput.value.trim();

    if (nameValue.length < 2) {
        errors.push("Name must be at least 2 characters long");
        elements.nameErrorMsg.textContent = " *Name must be at least 2 characters long";
    }

    if (!emailValue.includes("@") || !emailValue.includes(".")) {
        errors.push("Please enter a valid email address.");
        elements.emailErrorMsg.textContent = " *Please enter a valid email address";
    }

    if (errors.length > 0) {
        event.preventDefault();
    } else {
        localStorage.setItem("userName", nameValue);
        alert("Form submitted successfully");
    }
}

if (elements.form) {
    window.addEventListener("load", loadStoredData);
    elements.form.addEventListener("submit", validateForm);
}
