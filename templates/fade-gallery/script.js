// Animated Gallery Component JavaScript

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Callback function for intersection observer
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}

// Create observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Function to observe elements
function observeElements() {
    const fadeInUpElements = document.querySelectorAll('.fade-in-up');
    const slideInLeftElements = document.querySelectorAll('.slide-in-left');
    
    fadeInUpElements.forEach(element => {
        observer.observe(element);
    });
    
    slideInLeftElements.forEach(element => {
        observer.observe(element);
    });
}

// Replay animations
function replayAnimations() {
    const animatedElements = document.querySelectorAll('.gallery-item, .scroll-item');
    
    animatedElements.forEach(element => {
        element.classList.remove('visible');
        // Force reflow
        void element.offsetWidth;
    });
    
    // Re-observe elements
    setTimeout(() => {
        observeElements();
    }, 100);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Animated Gallery Component initialized');
    
    // Observe elements
    observeElements();
    
    // Replay button
    const animateBtn = document.getElementById('animateBtn');
    if (animateBtn) {
        animateBtn.addEventListener('click', () => {
            replayAnimations();
        });
    }
    
    // Add click handlers to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Gallery item ${index + 1} clicked`);
            // You can add modal or lightbox functionality here
        });
    });
    
    // Smooth scroll for horizontal gallery
    const horizontalScroll = document.querySelector('.horizontal-scroll');
    if (horizontalScroll) {
        let isScrolling = false;
        let scrollLeft = 0;
        let startX = 0;
        
        horizontalScroll.addEventListener('mousedown', (e) => {
            isScrolling = true;
            startX = e.pageX - horizontalScroll.offsetLeft;
            scrollLeft = horizontalScroll.scrollLeft;
        });
        
        horizontalScroll.addEventListener('mouseleave', () => {
            isScrolling = false;
        });
        
        horizontalScroll.addEventListener('mouseup', () => {
            isScrolling = false;
        });
        
        horizontalScroll.addEventListener('mousemove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.pageX - horizontalScroll.offsetLeft;
            const walk = (x - startX) * 2;
            horizontalScroll.scrollLeft = scrollLeft - walk;
        });
    }
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.placeholder-image');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

console.log('Gallery animations ready');
