// Smooth scroll for hero scroll indicator
document.querySelectorAll('.hero-scroll').forEach(scroll => {
    scroll.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

// Hero buttons
document.querySelectorAll('.hero-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') {
            console.log('Hero button clicked:', this.textContent);
            alert(`נלחץ על: ${this.textContent}`);
        }
    });
});

// Hero form submission
document.querySelectorAll('.hero-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        console.log('Form submitted with email:', email);
        alert(`תודה! נשלח לך מידע לכתובת: ${email}`);
        this.reset();
    });
});

// Parallax effect for hero sections
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.hero').forEach(hero => {
        const rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const content = hero.querySelector('.hero-content');
            if (content) {
                const offset = scrolled * 0.5;
                content.style.transform = `translateY(${offset}px)`;
            }
        }
    });
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const h3 = stat.querySelector('h3');
            const finalValue = h3.textContent;
            
            // Animate number if it's numeric
            if (!isNaN(parseInt(finalValue))) {
                let current = 0;
                const target = parseInt(finalValue);
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        h3.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        h3.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                    }
                }, 30);
            }
            
            statsObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});
