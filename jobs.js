// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const messagesNavItem = document.getElementById('messagesNavItem');
const mobileMessagesBtn = document.getElementById('mobileMessagesBtn');
const messagingModal = document.getElementById('messagingModal');
const closeMessaging = document.getElementById('closeMessaging');
const filterBtns = document.querySelectorAll('.filter-btn');
const saveBtns = document.querySelectorAll('.job-save-btn');
const applyBtns = document.querySelectorAll('.job-apply-btn');

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

// Messaging Modal Toggle
function toggleMessagingModal() {
    messagingModal.classList.toggle('active');
}

messagesNavItem.addEventListener('click', toggleMessagingModal);
mobileMessagesBtn.addEventListener('click', toggleMessagingModal);
closeMessaging.addEventListener('click', toggleMessagingModal);

// Conversation Item Click
document.querySelectorAll('.conversation-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.conversation-item.active').classList.remove('active');
        this.classList.add('active');
    });
});

// Job Filter Buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.filter-btn.active').classList.remove('active');
        this.classList.add('active');
        // In a real app, you would filter job listings here
        console.log(`Filtering by: ${this.textContent}`);
    });
});

// Save Job Buttons
saveBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const icon = this.querySelector('i');
        const isSaved = icon.classList.contains('fas');
        
        if (isSaved) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.classList.remove('saved');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.classList.add('saved');
        }
        
        const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
        console.log(isSaved ? `Unsaved job: ${jobTitle}` : `Saved job: ${jobTitle}`);
    });
});

// Apply Job Buttons
applyBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
        const company = this.closest('.job-card').querySelector('.company-info h4').textContent;
        console.log(`Applying to ${jobTitle} at ${company}`);
        
        // Show confirmation
        this.textContent = 'Applied ✓';
        this.style.background = 'var(--bg-light)';
        this.style.color = 'var(--primary)';
        setTimeout(() => {
            this.textContent = 'Apply Now';
            this.style.background = 'var(--gradient-primary)';
            this.style.color = 'white';
        }, 2000);
    });
});

// Job Card Click
document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', function() {
        const jobTitle = this.querySelector('.job-title').textContent;
        console.log(`Viewing details for: ${jobTitle}`);
        // In a real app, this would navigate to job details page
    });
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