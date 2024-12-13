// Responsive Navigation
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Footer: Last Updated
document.getElementById("lastUpdated").textContent = document.lastModified;

// Courses Filter
const courses = [
    { code: "CSE 110", type: "CSE", completed: true, credits: 2 },
    { code: "WDD 130", type: "WDD", completed: true, credits: 2 },
    { code: "CSE 111", type: "CSE", completed: true, credits: 2 },
    { code: "CSE 210", type: "CSE", completed: true, credits: 2 },
    { code: "WDD 131", type: "WDD", completed: false, credits: 2 },
    { code: "WDD 231", type: "WDD", completed: false, credits: 2 }
];

function displayCourses(filteredCourses) {
    // const courseContainer = document.getElementById("courses");
    // courseContainer.innerHTML = "";
    // filteredCourses.forEach((course) => {
    //     const courseCard = document.createElement("div");
    //     courseCard.className = "course";
    //     if (course.completed) courseCard.classList.add("completed");
    //     courseCard.textContent = `${course.code}`;
    //     courseContainer.appendChild(courseCard);
    // });
    // updateTotalCredits(filteredCourses);
    const courseContainer = document.getElementById("courses");
    courseContainer.innerHTML = ""; // Clear the container

    filteredCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.className = "course";

        // Create a span for the course title
        const courseTitle = document.createElement("span");
        courseTitle.textContent = course.code;

        // If the course is completed, add a checkmark
        if (course.completed) {
            const checkmark = document.createElement("span");
            checkmark.textContent = " ✓"; // Add the checkmark
            checkmark.className = "checkmark"; // Optional: for styling
            courseTitle.appendChild(checkmark);
        }

        // Append the course title to the course card
        courseCard.appendChild(courseTitle);
        courseContainer.appendChild(courseCard);

        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });
    });

    updateTotalCredits(filteredCourses); // Update total credits
}

function filterCourses(filter) {
    if (filter === "all") displayCourses(courses);
    else displayCourses(courses.filter((course) => course.type === filter));
}

function updateTotalCredits(filteredCourses) {
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent = `Total Credits: ${total}`;
}
function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();
    
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });
  }
// Initial Load
filterCourses("all");