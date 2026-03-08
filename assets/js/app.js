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

// Search issue
const searchInput = document.getElementById("input-search");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.trim().toLowerCase();

        // Set filter button to "All"
        toggleFilter("all-filter-btn");

        // Display all issues if search input is empty
        if (searchQuery === "") {
            displayIssues(allIssuesData);
            return;
        }

        // Show spinner
        showSpinner(true);

        setTimeout(() => {
            fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    displayIssues(data.data);
                    showSpinner(false); // Hide spinner
                });
        }, 100);
    });
};

// Issue label's style
const labelStyles = {
    bug: { color: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5", icon: "bug.svg" },
    enhancement: { color: "#1D4ED8", bg: "#DBEAFE", border: "#93C5FD", icon: "rocket.svg" },
    documentation: { color: "#6B21A8", bg: "#F3E8FF", border: "#D8B4FE", icon: "book.svg" },
    "help wanted": { color: "#D97706", bg: "#FFF8DB", border: "#FDE68A", icon: "help.svg" },
    "good first issue": { color: "#047857", bg: "#D1FAE5", border: "#6EE7B7", icon: "tree.svg" },
};

// Create label html
const createLabels = (arr) => {
    const htmlElements = arr.map((label) => {
        const style = labelStyles[label];

        if (!style) {
            return "";
        };

        return `
        <div class="flex justify-center items-center gap-1 p-2 h-6 border rounded-[100px] border-[${style.border}] bg-[${style.bg}]">
            <img src="./assets/img/${style.icon}" alt="" width="12" height="12">
            <span class="text-[12px] text-[${style.color}] uppercase">${label}</span>
        </div>
        `;
    });

    return htmlElements.join("");
};

// All issues
let allIssuesData = [];

const allIssues = () => {
    // Show spinner
    showSpinner(true);

    setTimeout(() => {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((json) => {
                allIssuesData = json.data;
                displayIssues(allIssuesData);
                showSpinner(false); // Hide spinner
            });
    }, 100);
};

const displayIssues = (issues) => {
    // Show total issue number
    const issueCount = document.getElementById("issue-count");
    issueCount.innerText = issues.length;

    const allIssuesContainer = document.getElementById("all-issues-container");
    allIssuesContainer.innerHTML = "";

    for (let issue of issues) {
        const btnDiv = document.createElement("div");
        btnDiv.className = `issue-card bg-white h-full rounded-sm border-t-3 ${issue.status === 'open' ? 'border-[#00a96e]' : 'border-[#A855F7]'} shadow-[0px_3px_6px_0px_#00000014] hover:shadow-lg transition cursor-pointer`;
        btnDiv.dataset.id = issue.id;
        btnDiv.innerHTML = `
        <div class="p-4 space-y-3">
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center w-6 h-6 rounded-full ${issue.status === 'open' ? 'bg-[#CBFADB]' : 'bg-[#ECE4FF]'}">
                    <img src="${issue.status === 'open' ? './assets/img/circle-dashed.svg' : './assets/img/check-circle.svg'}" alt="${issue.status}" width="16" height="16">
                </div>
                <div class="flex justify-center items-center px-4 py-1 h-6 p-2 rounded-[100px] ${issue.priority === 'high' ? 'bg-[#FEECEC]' : issue.priority === 'medium' ? 'bg-[#FFF6D1]' : 'bg-[#EEEFF2]'}">
                    <span class="text-[12px] font-medium ${issue.priority === 'high' ? 'text-[#EF4444]' : issue.priority === 'medium' ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'} uppercase">${issue.priority}</span>
                </div>
            </div>
            <div class="space-y-3">
                <div class="space-y-2">
                    <h3 class="text-[14px] font-semibold leading-[18px] capitalize">${issue.title}</h3>
                    <p class="text-[#64748B] text-[12px] leading-4">${issue.description}</p>
                </div>
                <div class="flex items-center flex-wrap gap-1">${createLabels(issue.labels)}</div>
            </div>
        </div>
        <div class="border-t border-[#e4e4e7]"></div>
        <div class="p-4 space-y-2">
            <p class="text-[#64748B] text-[12px] leading-4">#${issue.id} by ${issue.author}</p>
            <p class="text-[#64748B] text-[12px] leading-4">${new Date(issue.createdAt).toLocaleDateString('en-US')}</p>
        </div>
        `;

        allIssuesContainer.append(btnDiv);

        btnDiv.addEventListener("click", () => {
            openIssueModal(issue.id);
        });
    }
};
allIssues();

// Popup issue modal
const openIssueModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then((res) => res.json())
        .then((json) => {
            const issue = json.data;
            showModal(issue);
        });
};

const showModal = (issue) => {
    const modal = document.getElementById("issue-modal");
    modal.classList.remove("opacity-0", "pointer-events-none");
    const modalContent = document.getElementById("issue-modal-content");

    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="space-y-2">
                <h3 class="text-[24px] font-bold leading-[29px]">${issue.title}</h3>
                <div class="flex items-center gap-2 text-[#64748B]">
                    <div class="flex justify-center items-center px-4 py-1 h-6 p-2 rounded-[100px] ${issue.status === 'open' ? 'bg-[#00a96e]' : 'bg-[#A855F7]'}">
                        <span class="text-[12px] font-medium text-white capitalize">${issue.status}</span>
                    </div> •
                    <p class="text-[12px] leading-3.5">${issue.status === 'open' ? "Opened" : "Closed"} by ${issue.author}</p> •
                    <p class="text-[12px] leading-3.5">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="flex flex-wrap gap-1">${createLabels(issue.labels)}</div>
            <p class="text-[#64678b] leading-[19px]">${issue.description}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 bg-[#f8fafc] p-4 gap-4 rounded-lg">
                <div class="space-y-1">
                    <p class="text-[#64748B]">Assignee:</p>
                    <h3 class="font-semibold">${issue.assignee}</h3>
                </div>
                <div class="space-y-1">
                    <p class="text-[#64748B]">Priority:</p>
                    <div class="flex justify-center items-center w-20 h-6 p-2 rounded-[100px] ${issue.priority === 'high' ? 'bg-[#FEECEC]' : issue.priority === 'medium' ? 'bg-[#FFF6D1]' : 'bg-[#EEEFF2]'}">
                        <span class="text-[12px] font-medium ${issue.priority === 'high' ? 'text-[#EF4444]' : issue.priority === 'medium' ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'} uppercase">${issue.priority}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-end items-center">
                <button onclick="closeModal()" class="px-4 py-3 font-semibold bg-[#4A00FF] hover:bg-[#3C00D6] text-white shadow-none rounded-sm cursor-pointer">Close</button>
            </div>
        </div>
    `;

    modal.classList.remove("opacity-0", "pointer-events-none");
};

const closeModal = () => {
    const modal = document.getElementById("issue-modal");
    modal.classList.add("opacity-0", "pointer-events-none");
};