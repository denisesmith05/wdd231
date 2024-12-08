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
            const isOpen = navButton.getAttribute("aria-expanded") === "true";
            navButton.setAttribute("aria-expanded", !isOpen);
            navButton.classList.toggle("open");
            navMenu.classList.toggle("open");
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


// document.addEventListener("DOMContentLoaded", () => {
//     const directory = document.getElementById("directory");
//     // const toggleViewButton = document.getElementById("toggleView");
//     const year = document.getElementById("year");
//     const lastModified = document.getElementById("lastModified");
//     const gridButton = document.getElementById("grid");
//     const listButton = document.getElementById("list");


//     // Update year and last modified date
//     year.textContent = new Date().getFullYear();
//     lastModified.textContent = `Last modified: ${document.lastModified}`;

//     // Fetch members data
//     async function fetchMembers() {
//         try {
//             const response = await fetch('./data/members.json');
//             if (!response.ok) throw new Error("Failed to load JSON data");
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     }

//     // Display members
//     function displayMembers(members) {
//         directory.innerHTML = ""; // Clear existing content
//         members.forEach((member) => {
//             const card = document.createElement("article");
//             card.className = "member-card";

//             card.innerHTML = `
//                 <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" width="340" height="440">
//                 <h3>${member.name}</h3>
//                 <p>${member.additional_info}</p>
//                 <ul>
//                     <li><strong>Adress:</strong> ${member.address}</li>
//                     <li><strong>Phone:</strong> ${member.phone}</li>
//                     <li><strong>Membership level:</strong> ${member.membership_level}</li>
//                     <li><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></li>
//                 </ul>
//             `;
//             directory.appendChild(card);
//         });
//     }

//     // Toggle between grid and list views
//     function toggleView(view) {
//         directory.classList.remove("grid-view", "list-view");
//         directory.classList.add(`${view}-view`);
//         fetchMembers().then((members) => {
//             displayMembers(members);
//         }).catch((error) => {
//             console.error("Error fetching members:", error);
//         });
//     }

//     gridButton.addEventListener("click", () => toggleView("grid"));
//     listButton.addEventListener("click", () => toggleView("list"));

//     document.addEventListener("DOMContentLoaded", () => {
//     const navButton = document.getElementById("navButton");
//     const navMenu = document.querySelector(".nav-menu");

//     // Toggle navigation menu on button click
//     navButton.addEventListener("click", () => {
//         const isOpen = navButton.getAttribute("aria-expanded") === "true";

//         // Update the aria-expanded attribute for accessibility
//         navButton.setAttribute("aria-expanded", !isOpen);

//         // Toggle the open class on the button and menu
//         navButton.classList.toggle("open");
//         navMenu.classList.toggle("open");
//     });

//     // Dynamic footer year and last modified date
//     const yearElement = document.getElementById("year");
//     const lastModifiedElement = document.getElementById("lastModified");

//     if (yearElement) {
//         yearElement.textContent = new Date().getFullYear();
//     }

//     if (lastModifiedElement) {
//         lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
//     }
// });

//     // document.addEventListener("DOMContentLoaded", () => {
//     //     const navButton = document.getElementById("navButton");
//     //     const navMenu = document.getElementById("navMenu");
         
//     //         navButton.addEventListener("click", () => {
//     //     const isOpen = navButton.getAttribute("aria-expanded") === "true";
//     //             navButton.setAttribute("aria-expanded", !isOpen);
//     //             navButton.classList.toggle("open");
//     //             navMenu.classList.toggle("open");
//     //         });
//     // });

//     document.addEventListener("DOMContentLoaded", () => {
//         const navButton = document.getElementById("navButton");
//         const navMenu = document.querySelector(".nav-menu");
    
//         navButton.addEventListener("click", () => {
//             // Toggle 'open' class on the button and menu
//             navButton.classList.toggle("open");
//             navMenu.classList.toggle("open");
//         });
//     });

// });
