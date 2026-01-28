// Flex Cards Component JavaScript
console.log('Flex Cards Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.card, .pricing-card, .product-card, .team-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Card button interactions
    const cardButtons = document.querySelectorAll('.card-btn, .pricing-btn, .product-btn');
    cardButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            console.log('Button clicked:', this.textContent);
        });
    });

    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Social link clicked');
        });
    });

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            console.log('Product clicked:', productName);
        });
    });

    // Pricing card selection
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            const plan = this.querySelector('.pricing-badge').textContent;
            console.log('Pricing plan selected:', plan);
        });
    });

    console.log('Total cards loaded:', cards.length);
});

// Add animations and ripple effect styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        from {
            width: 0;
            height: 0;
            opacity: 0.5;
        }
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    .pricing-card.selected {
        border: 3px solid #667eea;
    }
`;
document.head.appendChild(style);
