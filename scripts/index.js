document.getElementById('lastUpdated').textContent = new Date().toLocaleString();

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('#navbar-toggler'); // Use correct ID
    const navLinks = document.querySelector('.navigation ul');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggles visibility of navigation links
    });
});