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