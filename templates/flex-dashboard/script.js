// Flex Dashboard Component JavaScript
console.log('Flex Dashboard Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        console.log('Sidebar toggled');
    });

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            console.log('Navigation clicked:', this.querySelector('.nav-text').textContent);
        });
    });

    // Animate stat cards on load
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 100);
    });

    // Chart bar interactions
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.addEventListener('mouseenter', function() {
            const height = this.style.height;
            console.log(`Day ${index + 1} height:`, height);
        });
    });

    // Filter select
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            console.log('Filter changed to:', this.value);
            
            // Animate chart bars again
            chartBars.forEach((bar, index) => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = `growUp 1s ease ${index * 0.1}s`;
                }, 10);
            });
        });
    }

    // Activity items interaction
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.activity-title').textContent;
            console.log('Activity clicked:', title);
            
            // Add pulse effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Product rows interaction
    const productRows = document.querySelectorAll('.product-row');
    productRows.forEach(row => {
        row.addEventListener('click', function() {
            const productName = this.querySelector('.product-name').textContent;
            console.log('Product clicked:', productName);
        });
    });

    // Quick action buttons
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.querySelector('.action-text').textContent;
            console.log('Action:', action);
            
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Search query:', this.value);
        });
    }

    // Icon buttons
    const iconButtons = document.querySelectorAll('.icon-btn');
    iconButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Icon button clicked:', this.textContent.trim());
            
            // Add notification badge (example)
            if (this.textContent.includes('🔔')) {
                alert('You have 3 new notifications!');
            }
        });
    });

    console.log('Dashboard initialized with:', {
        stats: statCards.length,
        activities: activityItems.length,
        products: productRows.length,
        actions: actionItems.length
    });
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes growUp {
        from {
            height: 0 !important;
        }
    }
`;
document.head.appendChild(style);
