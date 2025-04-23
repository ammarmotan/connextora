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

// Like Button Interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-heart') || e.target.closest('.fa-heart')) {
        const heart = e.target.classList.contains('fa-heart') ? e.target : e.target.closest('.fa-heart');
        heart.classList.toggle('fas');
        heart.classList.toggle('far');
        
        const countElement = heart.nextElementSibling;
        if (countElement && countElement.tagName === 'SPAN') {
            let count = parseInt(countElement.textContent);
            countElement.textContent = heart.classList.contains('fas') ? count + 1 : count - 1;
        }
    }
});

// Follow Button Interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('follow-btn') || e.target.closest('.follow-btn')) {
        const btn = e.target.classList.contains('follow-btn') ? e.target : e.target.closest('.follow-btn');
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

// Story Click Interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('story-avatar') || e.target.closest('.story-avatar') || 
        e.target.classList.contains('story') || e.target.closest('.story')) {
        const story = e.target.closest('.story');
        const username = story.querySelector('.story-username').textContent;
        
        if (username === 'Your Story') {
            console.log('Create a new story');
        } else {
            console.log(`Viewing ${username}'s story`);
        }
    }
});

// Post Options Menu
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('post-options') || e.target.closest('.post-options')) {
        console.log('Post options clicked');
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