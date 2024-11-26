// Courses Array
const courses = [
    { code: "CSE 110", type: "CSE", completed: true, credits: 3 },
    { code: "WDD 130", type: "WDD", completed: true, credits: 3 },
    { code: "CSE 210", type: "CSE", completed: false, credits: 3 },
    { code: "WDD 230", type: "WDD", completed: false, credits: 3 },
  ];
  
  // Display Courses
  const courseContainer = document.getElementById("courses");
  
  function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";
    filteredCourses.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.className = "course";
      if (course.completed) courseCard.classList.add("completed");
      courseCard.textContent = `${course.code}`;
      courseContainer.appendChild(courseCard);
    });
  
    updateTotalCredits(filteredCourses);
  }
  
  // Filter Courses
  function filterCourses(filter) {
    if (filter === "all") {
      displayCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.type === filter);
      displayCourses(filtered);
    }
  }
  
  // Update Total Credits
  function updateTotalCredits(filteredCourses) {
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent = `Total Credits: ${total}`;
  }
  
  // Footer: Current Year and Last Modified
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
  
  // Responsive Navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
  
  // Initial Load
  filterCourses("all");
  