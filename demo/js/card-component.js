// CARD Component Script

document.addEventListener('DOMContentLoaded', function() {
    // Action buttons functionality
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            const card = this.closest('.card');
            
            if (action === 'like') {
                this.classList.toggle('liked');
                this.textContent = this.classList.contains('liked') ? '❤️ Liked' : '🤍 Like';
            } else if (action === 'share') {
                showNotification('Shared!');
            } else if (action === 'save') {
                this.classList.toggle('saved');
                this.textContent = this.classList.contains('saved') ? '✓ Saved' : '🔖 Save';
            }
        });
    });

    // Social buttons functionality
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            showNotification(`Opening ${platform}...`);
        });
    });

    // Tags click functionality
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', function() {
            showNotification(`Filtered by: ${this.textContent}`);
        });
    });

    // Card click animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transition = 'all 0.1s ease';
        });
        card.addEventListener('mouseup', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Categories click
    const categories = document.querySelectorAll('.card-category');
    categories.forEach(cat => {
        cat.style.cursor = 'pointer';
        cat.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification(`Category: ${this.textContent}`);
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Add animation styles
    if (!document.getElementById('card-animations')) {
        const style = document.createElement('style');
        style.id = 'card-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
            .action-btn.liked, .action-btn.saved {
                border-color: #667eea;
                background: rgba(102, 126, 234, 0.1);
                color: #667eea;
            }
        `;
        document.head.appendChild(style);
    }

    console.log('✨ Card interactions loaded successfully!');
});
