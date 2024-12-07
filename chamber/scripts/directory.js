// import * as members from '../data/members.json';

document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    // const toggleViewButton = document.getElementById("toggleView");
    const year = document.getElementById("year");
    const lastModified = document.getElementById("lastModified");
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");


    // Update year and last modified date
    year.textContent = new Date().getFullYear();
    lastModified.textContent = `Last modified: ${document.lastModified}`;

    // Fetch members data
    async function fetchMembers() {
        try {
            const response = await fetch('./data/members.json');
            if (!response.ok) throw new Error("Failed to load JSON data");
            return await response.json();
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
                    <li><strong>Adress:</strong> ${member.address}</li>
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
        fetchMembers().then((members) => {
            displayMembers(members);
        }).catch((error) => {
            console.error("Error fetching members:", error);
        });
    }

    gridButton.addEventListener("click", () => toggleView("grid"));
    listButton.addEventListener("click", () => toggleView("list"));

    document.addEventListener("DOMContentLoaded", () => {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector("nav ul");
    
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    });

});

    // Initial fetch and rendering
    // fetchMembers();
    // // Fetch and display members
    // async function fetchMembers() {
    //     try {
    //         const data = fetch("../data/members.json").then((response) => response.json());
            
    //         displayMembers(data.businesses);
    //     } catch (error) {
    //         console.error("Error fetching members:", error);
    //     }
    // }
// //Line 21 to 39 is from temple example 
//     const gridbutton = document.querySelector("#grid");
//     const listbutton = document.querySelector("#list");
//     const display = document.querySelector("article");

//     // The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

//     gridbutton.addEventListener("click", () => {
//         // example using arrow function
//         display.classList.add("grid");
//         display.classList.remove("list");
//     });

//     listbutton.addEventListener("click", showList); // example using defined function

//     function showList() {
//         display.classList.add("list");
//         display.classList.remove("grid");
//     }

//     const displayMembers = (members) => {
//         members.forEach((member) => {
//             let card = document.createElement('article');
//             let businessName = document.createElement('h3');
//             let industry = document.createElement('p');
//             let logo = document.createElement('img');
//             let address = document.createElement('ul');
//             let email = document.createElement('li');
//             let phone = document.createElement('li');
//             let website = document.createElement('li');

//             businessName.textContent = '${member.businessName}';
//             industry.textContent = '${member.industry}';
//             address.textContent = '';
//             email.innerHTML = '<strong>Email:</strong> ${member.email}';
//             phone.innerHTML = '<strong>Phone:</strong> ${member.phone}';
//             website.innerHTML = '<strong>Website:</strong> ${member.website}';
//             logo.setAttribute('src', member.logo);
//             logo.setAttribute('alt', 'Logo of {member.businessName}');
//             logo.setAttribute('lazy', 'loading');
//             logo.setAttribute('width', '340');
//             logo.setAttribute('height', '440');

//             card.appendChild(businessName);
//             card.appendChild(industry);
//             card.appendChild(logo);
//             address.appendChild(email);
//             address.appendChild(phone);
//             address.appendChild(website);
//             card.appendChild(address);
            
//             cards.appendChild(card);
//         });
//     }



//     // Footer code
//     document.getElementById('currentyear').textContent = new Date().getFullYear();
//     document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

//     // Toggle between grid and list views
//     toggleViewButton.addEventListener("click", () => {
//         directory.classList.toggle("list-view");
//         directory.classList.toggle("grid-view");
//     });

//     // Initial fetch and rendering
//     fetchMembers();