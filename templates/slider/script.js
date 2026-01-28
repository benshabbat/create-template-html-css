let slideIndex = 1;
let autoSlideTimer;

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    startAutoSlide();
});

// Next/previous controls
function changeSlide(n) {
    clearTimeout(autoSlideTimer);
    showSlide(slideIndex += n);
    startAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    clearTimeout(autoSlideTimer);
    showSlide(slideIndex = n);
    startAutoSlide();
}

// Display slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Wrap around
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Auto slide every 5 seconds
function startAutoSlide() {
    autoSlideTimer = setTimeout(() => {
        slideIndex++;
        showSlide(slideIndex);
        startAutoSlide();
    }, 5000);
}

// Stop auto slide on user interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('slide') || e.target.classList.contains('dot')) {
        clearTimeout(autoSlideTimer);
        startAutoSlide();
    }
});
