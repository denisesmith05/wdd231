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

    // Check the last visit using localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    const lastVisitMessage = document.getElementById('last-visit-message');

    if (lastVisit) {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysSinceLastVisit = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit === 0) {
            lastVisitMessage.textContent = "Welcome back! You last visited today.";
        } else if (daysSinceLastVisit === 1) {
            lastVisitMessage.textContent = "Welcome back! You last visited yesterday.";
        } else {
            lastVisitMessage.textContent = `Welcome back! It's been ${daysSinceLastVisit} days since your last visit.`;
        }
    } else {
        lastVisitMessage.textContent = "Welcome to our Discover page! This is your first visit.";
    }

    // Update the last visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toString());

    function generateCalendar(year, month) {
        const calendarContainer = document.getElementById('calendar-container');
        calendarContainer.innerHTML = ''; // Clear any existing content
      
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
      
        // Create the header with days of the week
        const table = document.createElement('table');
        table.classList.add('calendar');
      
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
          const th = document.createElement('th');
          th.textContent = day;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
      
        // Fill in the days
        let currentDay = 1;
        for (let i = 0; i < 6; i++) { // Max 6 rows
          const row = document.createElement('tr');
          for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay || currentDay > daysInMonth) {
              cell.textContent = ''; // Empty cells
            } else {
              cell.textContent = currentDay;
              currentDay++;
            }
            row.appendChild(cell);
          }
          table.appendChild(row);
          if (currentDay > daysInMonth) break; // Stop if all days are filled
        }
      
        calendarContainer.appendChild(table);
      }
      
      // Generate the current month's calendar
      const today = new Date();
      generateCalendar(today.getFullYear(), today.getMonth());
      
});