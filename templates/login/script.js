// Login Form Handler
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
        
        // Reset form
        loginForm.reset();
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

// Password visibility toggle (optional enhancement)
const passwordInput = document.getElementById('password');
if (passwordInput) {
    const togglePassword = function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };
    
    // You can bind this to a button if needed
    // passwordToggleBtn.addEventListener('click', togglePassword);
}
