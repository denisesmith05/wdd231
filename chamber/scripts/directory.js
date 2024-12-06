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
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data.businesses);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    
//Line 21 to 39 is from temple example 
    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
    const display = document.querySelector("article");

    // The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

    gridbutton.addEventListener("click", () => {
        // example using arrow function
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", showList); // example using defined function

    function showList() {
        display.classList.add("list");
        display.classList.remove("grid");
    }

    const displayMembers = (members) => {
        members.forEach((member) => {
            let card = document.createElement('h3');
            let industry = document.createElement('p');
            let logo = document.createElement('img');
            let address = document.createElement('h3');
            let card = document.createElement('h3');
            let card = document.createElement('h3');
            let card = document.createElement('h3');
            let card = document.createElement('h3');
        });
    }



    // Footer code
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = 'Last modified: ${document.lastModified}';

    // Display members
    function displayMembers(members) {
        directory.innerHTML = members.map(member => `
            <div class="card">
                <img src="images/${member.image}" alt="${member.name}" class="business-image">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
        `).join("");
    }

    // Toggle between grid and list views
    toggleViewButton.addEventListener("click", () => {
        directory.classList.toggle("list-view");
        directory.classList.toggle("grid-view");
    });

    // Initial fetch and rendering
    fetchMembers();
});