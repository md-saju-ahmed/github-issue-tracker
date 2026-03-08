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

// Toggle filter buttons
const toggleFilter = (btnId) => {

    // Inactive button
    document.querySelectorAll("#filter-btns button").forEach(btn => {
        btn.classList.remove("bg-[#4A00FF]", "hover:bg-[#3C00D6]", "text-white");
        btn.classList.add("text-[#64748b]", "border-[#e4e4e7]");
    });

    // Active button
    const activeBtn = document.getElementById(btnId);
    activeBtn.classList.remove("text-[#64748b]", "border-[#e4e4e7]");
    activeBtn.classList.add("bg-[#4A00FF]", "hover:bg-[#3C00D6]", "text-white");

    // Show spinner
    showSpinner(true);

    // Issue filtering
    setTimeout(() => {
        if (btnId === "all-filter-btn") {
            displayIssues(allIssuesData);
        } else if (btnId === "open-filter-btn") {
            const openIssues = allIssuesData.filter(issue => issue.status === "open");
            displayIssues(openIssues);
        } else if (btnId === "closed-filter-btn") {
            const closedIssues = allIssuesData.filter(issue => issue.status === "closed");
            displayIssues(closedIssues);
        }
        showSpinner(false); // Hide spinner
    }, 100);
};