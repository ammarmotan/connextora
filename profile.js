        // Tab Switching Functionality
        document.querySelectorAll('.profile-nav-item').forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all nav items
                document.querySelectorAll('.profile-nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked nav item
                this.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Show the selected tab content
                const tabId = this.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
                
                // For mobile, hide sidebar and show main content
                if (window.innerWidth < 1024) {
                    document.querySelector('.profile-sidebar').style.display = 'none';
                    document.querySelector('.profile-main').style.display = 'block';
                    
                    // If clicking a sidebar tab, show sidebar and hide main
                    const sidebarTabs = ['about', 'experience', 'education', 'skills'];
                    if (sidebarTabs.includes(this.getAttribute('data-tab'))) {
                        document.querySelector('.profile-sidebar').style.display = 'block';
                        document.querySelector('.profile-main').style.display = 'none';
                    } else {
                        document.querySelector('.profile-sidebar').style.display = 'none';
                        document.querySelector('.profile-main').style.display = 'block';
                    }
                }
            });
        });
        
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        themeToggle.addEventListener('click', function() {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
        
        // Check for saved theme preference or use system preference
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Save theme preference
        themeToggle.addEventListener('click', function() {
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
        });
        
        // Like Button Functionality
        document.querySelectorAll('.post-action-btn.secondary').forEach(button => {
            button.addEventListener('click', function() {
                if (this.innerHTML.includes('Like')) {
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
                    this.style.color = 'var(--primary)';
                    this.style.borderColor = 'var(--primary)';
                }
            });
        });
        
        // Mobile Responsive Adjustments
        function handleMobileView() {
            if (window.innerWidth < 1024) {
                // Hide desktop nav items
                document.querySelector('.nav-items').style.display = 'none';
                
                // Show mobile nav
                document.querySelector('.mobile-nav').style.display = 'flex';
                
                // Default to showing main content (posts)
                document.querySelector('.profile-sidebar').style.display = 'none';
                document.querySelector('.profile-main').style.display = 'block';
                
                // Adjust search bar
                document.querySelector('.search-bar').style.order = '3';
                document.querySelector('.search-bar').style.width = '100%';
                document.querySelector('.search-bar').style.marginTop = 'var(--space-sm)';
                
                // Hide logo text on very small screens
                if (window.innerWidth < 480) {
                    document.querySelector('.logo span').style.display = 'none';
                } else {
                    document.querySelector('.logo span').style.display = 'inline';
                }
            } else {
                // Show desktop nav items
                document.querySelector('.nav-items').style.display = 'flex';
                
                // Hide mobile nav
                document.querySelector('.mobile-nav').style.display = 'none';
                
                // Show both sidebar and main content
                document.querySelector('.profile-sidebar').style.display = 'block';
                document.querySelector('.profile-main').style.display = 'block';
                document.querySelector('.profile-main').style.gridColumn = '2 / -1';
                
                // Reset search bar
                document.querySelector('.search-bar').style.order = 'initial';
                document.querySelector('.search-bar').style.width = 'initial';
                document.querySelector('.search-bar').style.marginTop = 'initial';
                
                // Ensure logo text is visible
                document.querySelector('.logo span').style.display = 'inline';
            }
        }
        
        window.addEventListener('resize', handleMobileView);
        handleMobileView();

        // Simulate loading for better UX
        document.addEventListener('DOMContentLoaded', function() {
            // Add shimmer effect to elements that might load slowly
            const loadingElements = document.querySelectorAll('.profile-banner img, .profile-pic, .experience-logo, .education-logo, .certificate-image');
            
            loadingElements.forEach(el => {
                el.classList.add('shimmer');
                el.addEventListener('load', function() {
                    this.classList.remove('shimmer');
                });
            });
        });

        // Connection button functionality
        document.querySelectorAll('.connection-btn.secondary').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.innerHTML.includes('Follow')) {
                    this.innerHTML = '<i class="fas fa-check"></i> Following';
                    this.style.color = 'var(--primary)';
                    this.style.borderColor = 'var(--primary)';
                }
            });
        });

        // Task checkbox functionality
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskItem = this.closest('.task-item');
                const taskReward = taskItem.querySelector('.task-reward span');
                
                if (this.checked) {
                    // Change reward text to "Earned" when task is checked
                    if (taskReward.textContent.includes('Potential Reward')) {
                        taskReward.textContent = taskReward.textContent.replace('Potential Reward', 'Earned');
                    }
                } else {
                    // Change back to "Potential Reward" when unchecked
                    if (taskReward.textContent.includes('Earned')) {
                        taskReward.textContent = taskReward.textContent.replace('Earned', 'Potential Reward');
                    }
                }
                
                // Update completed tasks count
                const totalTasks = document.querySelectorAll('.task-item').length;
                const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
                const tasksCount = document.querySelector('#tasks-tab .section-edit');
                
                if (tasksCount) {
                    tasksCount.textContent = `${completedTasks}/${totalTasks} completed`;
                }
            });
        });