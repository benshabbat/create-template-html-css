// Dashboard Grid Component JavaScript
console.log('Dashboard Grid Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            console.log('Navigation:', this.textContent.trim());
        });
    });

    // Animate stat cards on load
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.1}s`;
        
        bar.addEventListener('mouseenter', function() {
            // Show tooltip or value (can be expanded)
            console.log('Chart bar clicked:', index + 1);
        });
    });

    // Filter select handling
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
            const title = this.querySelector('h4').textContent;
            console.log('Activity clicked:', title);
            
            // Add pulse effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Product items interaction
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            console.log('Product clicked:', productName);
        });
    });

    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log('Action:', action);
            
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // You can add modal or action functionality here
            alert(`Action: ${action}`);
        });
    });

    // Mobile sidebar toggle (if needed)
    if (window.innerWidth <= 768) {
        const logo = document.querySelector('.logo');
        const sidebar = document.querySelector('.sidebar');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 20px;
            border-radius: 10px;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        document.body.appendChild(hamburger);
        
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Auto-update time (simulated)
    setInterval(() => {
        const timeElements = document.querySelectorAll('.time');
        timeElements.forEach(el => {
            // This is just a demo - in real app, you'd calculate actual time
            console.log('Time updated');
        });
    }, 60000); // Update every minute

    // Initialize tooltips or additional features
    console.log('Dashboard fully loaded with', {
        stats: statCards.length,
        activities: activityItems.length,
        products: productItems.length,
        actions: actionButtons.length
    });
});

// Real-time data simulation (optional)
function simulateRealtimeData() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    setInterval(() => {
        statCards.forEach(stat => {
            const currentValue = stat.textContent;
            // Add your real-time update logic here
            console.log('Real-time update:', currentValue);
        });
    }, 5000); // Update every 5 seconds
}

// Uncomment to enable real-time simulation
// simulateRealtimeData();
