document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.getElementById("navButton");
    const navMenu = document.querySelector(".nav-menu");
    const year = document.getElementById("year");
    const lastModified = document.getElementById("lastModified");
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const directory = document.getElementById("directory");

    // Update footer year and last modified
    if (year) year.textContent = new Date().getFullYear();
    if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;

    // Navigation toggle functionality
    if (navButton && navMenu) {
        navButton.addEventListener("click", () => {
            const isActive = navButton.getAttribute("aria-expanded") === "true";
            navButton.setAttribute("aria-expanded", !isActive);
            navButton.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Fetch members data
    let cachedMembers = null;
    async function fetchMembers() {
        if (cachedMembers) return cachedMembers;
        try {
            const response = await fetch('./data/members.json');
            if (!response.ok) throw new Error("Failed to load JSON data");
            cachedMembers = await response.json();
            return cachedMembers;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Display members
    function displayMembers(members) {
        directory.innerHTML = ""; // Clear existing content
        members.forEach((member) => {
            const card = document.createElement("article");
            card.className = "member-card";

            card.innerHTML = `
                <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" width="340" height="440">
                <h3>${member.name}</h3>
                <p>${member.additional_info}</p>
                <ul>
                    <li><strong>Address:</strong> ${member.address}</li>
                    <li><strong>Phone:</strong> ${member.phone}</li>
                    <li><strong>Membership level:</strong> ${member.membership_level}</li>
                    <li><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></li>
                </ul>
            `;
            directory.appendChild(card);
        });
    }

    // Toggle between grid and list views
    function toggleView(view) {
        directory.classList.remove("grid-view", "list-view");
        directory.classList.add(`${view}-view`);
        fetchMembers().then(displayMembers).catch(console.error);
    }

    if (gridButton && listButton) {
        gridButton.addEventListener("click", () => toggleView("grid"));
        listButton.addEventListener("click", () => toggleView("list"));
    }
});