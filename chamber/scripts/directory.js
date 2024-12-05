document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const toggleViewButton = document.getElementById("toggleView");
    const year = document.getElementById("year");
    const lastModified = document.getElementById("lastModified");

    // Update year and last modified date
    year.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    // Fetch member data
    async function fetchMembers() {
        const response = await fetch("data/members.json");
        const members = await response.json();

        directory.innerHTML = members.map(member => `
            <div class="card">
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `).join("");
    }

    // Toggle view
    toggleViewButton.addEventListener("click", () => {
        directory.classList.toggle("list-view");
        directory.classList.toggle("grid-view");
    });

    fetchMembers();
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleViewButton = document.getElementById('toggleView');
    const directory = document.getElementById('directory');

    // Populate directory with example data
    const members = [
        { name: "Business 1", email: "info@business1.com", phone: "123-456-7890" },
        { name: "Business 2", email: "info@business2.com", phone: "098-765-4321" },
    ];

    function populateDirectory() {
        directory.innerHTML = members.map(member => `
            <div class="member-card">
                <h3>${member.name}</h3>
                <p>Email: ${member.email}</p>
                <p>Phone: ${member.phone}</p>
            </div>
        `).join('');
    }

    // Toggle between grid and list views
    toggleViewButton.addEventListener('click', () => {
        directory.classList.toggle('grid-view');
        directory.classList.toggle('list-view');
    });

    populateDirectory();
});
