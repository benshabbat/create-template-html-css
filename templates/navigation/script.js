// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const loginModalBtn = document.getElementById('loginModalBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const modalOverlay = document.getElementById('modalOverlay');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Login Modal Functions
function openLoginModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Login modal button
if (loginModalBtn) {
    loginModalBtn.addEventListener('click', openLoginModal);
}

// Close button
if (closeLoginModal) {
    closeLoginModal.addEventListener('click', closeModal);
}

// Close on overlay click
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        closeModal();
    }
});

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        console.log('Login attempt:', {
            email: email,
            password: '***',
            remember: remember
        });
        
        // Here you would send the login request to your backend
        alert('Login successful! (This is a demo)');
        
        // Reset form and close modal
        loginForm.reset();
        closeModal();
    });
}

// Forgot password link
const forgotLink = document.querySelector('.forgot-link');
if (forgotLink) {
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (email) {
            alert(`Password reset link will be sent to: ${email}`);
        } else {
            alert('Please enter your email address first');
        }
    });
}

// Social button handlers
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
        console.log(`Login with ${provider}`);
        alert(`${provider} login initiated (This is a demo)`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link:not(.login-btn)').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link:not(.login-btn)').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to section
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link:not(.login-btn)');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
