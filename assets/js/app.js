// User login
const loginBtn = document.getElementById("login-btn");
const loginIdInput = document.getElementById("login-id");
const loginPassInput = document.getElementById("login-pass");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const loginId = loginIdInput.value.trim();
        const loginPass = loginPassInput.value.trim();

        // Verify username & password
        if (loginId === "admin" && loginPass === "admin123") {
            window.location.assign("/main.html");
        } else {
            alert("Incorrect Login Details!");
        }
    });
}

// Spinner
const showSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("all-issues-container").classList.add("hidden");
    } else {
        document.getElementById("all-issues-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};