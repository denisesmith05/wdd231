document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.getElementById("navButton");
    const navMenu = document.querySelector(".nav-menu");
    const year = document.getElementById("year");
    const lastModified = document.getElementById("lastModified");
    // const gridButton = document.getElementById("grid");
    // const listButton = document.getElementById("list");
    // const directory = document.getElementById("directory");

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

    // // Display members
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

    document.addEventListener("DOMContentLoaded", displayMembers)

    async function fetchWeather() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/fb448353c3284df8e55d5ec6d595b299`;
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Weather data fetch failed");
            const data = await response.json();
    
            // Extract current weather and 3-day forecast
            const currentWeather = data.list[0];
            const forecast = data.list.slice(1, 4); // Next 3 periods (each is 3 hours)
    
            // Update weather section
            document.querySelector(".weather div").textContent = `${currentWeather.weather[0].description}, ${currentWeather.main.temp.toFixed(0)}°F`;
    
            // Update forecast section
            const forecastContainer = document.querySelector(".forecast div");
            forecastContainer.innerHTML = "";
            forecast.forEach((day, index) => {
                const forecastDay = document.createElement("li");
                forecastDay.textContent = `Day ${index + 1}: ${day.main.temp.toFixed(0)}°F - ${day.weather[0].description}`;
                forecastContainer.appendChild(forecastDay);
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
    
    // Call the function on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", fetchWeather);    

    async function displaySpotlights() {
        const spotlightSection = document.querySelector(".members");
        try {
            const members = await fetchMembers();
            
            // Filter Gold/Silver members
            const eligibleMembers = members.filter(member => 
                member.membership_level === "3" || member.membership_level === "2"
            );
    
            // Shuffle and select two or three members
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    
            // Create spotlight cards
            spotlightSection.innerHTML = ""; // Clear existing content
            shuffled.forEach(member => {
                const card = document.createElement("article");
                card.className = "spotlight-card";
                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                    <h3>${member.name}</h3>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membership_level}</p>
                `;
                spotlightSection.appendChild(card);
            });
        } catch (error) {
            console.error("Error displaying spotlights:", error);
        }
    }
    
    // Call the function on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", displaySpotlights);    

    // // Toggle between grid and list views
    // function toggleView(view) {
    //     directory.classList.remove("grid-view", "list-view");
    //     directory.classList.add(`${view}-view`);
    //     fetchMembers().then(displayMembers).catch(console.error);
    // }

    // if (gridButton && listButton) {
    //     gridButton.addEventListener("click", () => toggleView("grid"));
    //     listButton.addEventListener("click", () => toggleView("list"));
    // }
});