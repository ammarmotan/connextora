// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const alertItems = document.querySelectorAll('.alert-item');
const alertFilters = document.querySelectorAll('.alert-filter');

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Check for saved theme preference or use preferred color scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
body.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Mobile Search Toggle
mobileSearchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Mobile Navigation
mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.mobile-nav-item.active').classList.remove('active');
        this.classList.add('active');
    });
});

// Alert Item Interaction
alertItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('alert-action-btn')) {
            this.classList.remove('unread');
            const dot = this.querySelector('.alert-dot');
            if (dot) dot.style.display = 'none';
        }
    });
});

// Alert Filter Interaction
alertFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        alertFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        // In a real app, you would filter notifications here
        const filterType = this.textContent.toLowerCase();
        console.log(`Showing ${filterType} notifications`);
    });
});

// Follow Button Interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('follow-btn')) {
        const btn = e.target;
        const isFollowing = btn.textContent === 'Following';
        btn.textContent = isFollowing ? 'Follow' : 'Following';
        btn.style.background = isFollowing ? 'var(--gradient-primary)' : 'var(--bg-light)';
        btn.style.color = isFollowing ? 'white' : 'var(--text-medium)';
        
        if (!isFollowing) {
            const personName = btn.closest('.person-item').querySelector('.person-name').textContent;
            console.log(`You are now following ${personName}`);
        }
    }
});

// Responsive adjustments
function handleResize() {
    // Close search modal if window is resized to desktop
    if (window.innerWidth >= 1024 && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', handleResize);

// Initialize with fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
});