document.getElementById('lastUpdated').textContent = new Date().toLocaleString();

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelector('.navigation ul');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggles visibility of navigation links
    });
});
