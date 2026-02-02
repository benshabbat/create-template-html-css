// Register Form Handler
const registerForm = document.getElementById('registerForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const matchMessage = document.getElementById('matchMessage');
const passwordRequirements = document.querySelector('.password-requirements');
const submitBtn = document.getElementById('submitBtn');

// Password validation requirements
const passwordRequirements_obj = {
    length: /^.{8,}$/,
    uppercase: /[A-Z]/,
    number: /\d/,
    special: /[@#$%]/
};

// Password input event listener
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Show requirements
        if (password.length > 0) {
            passwordRequirements.classList.add('show');
        } else {
            passwordRequirements.classList.remove('show');
        }
        
        // Check each requirement
        updateRequirement('length', passwordRequirements_obj.length.test(password));
        updateRequirement('uppercase', passwordRequirements_obj.uppercase.test(password));
        updateRequirement('number', passwordRequirements_obj.number.test(password));
        updateRequirement('special', passwordRequirements_obj.special.test(password));
        
        // Check if passwords match
        if (confirmPasswordInput.value) {
            checkPasswordMatch();
        }
        
        updateSubmitButton();
    });
}

// Confirm password input event listener
if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
}

// Update requirement UI
function updateRequirement(reqName, isValid) {
    const reqElement = document.getElementById(`req-${reqName}`);
    if (reqElement) {
        if (isValid) {
            reqElement.classList.add('valid');
        } else {
            reqElement.classList.remove('valid');
        }
    }
}

// Check password match
function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
        matchMessage.textContent = '';
        matchMessage.className = 'password-match-message';
        return false;
    }
    
    if (password === confirmPassword) {
        matchMessage.textContent = '✓ Passwords match';
        matchMessage.className = 'password-match-message success';
        return true;
    } else {
        matchMessage.textContent = '✗ Passwords do not match';
        matchMessage.className = 'password-match-message error';
        return false;
    }
}

// Validate all requirements met
function isPasswordValid(password) {
    return (
        passwordRequirements_obj.length.test(password) &&
        passwordRequirements_obj.uppercase.test(password) &&
        passwordRequirements_obj.number.test(password) &&
        passwordRequirements_obj.special.test(password)
    );
}

// Update submit button state
function updateSubmitButton() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = document.getElementById('username').value;
    const termsChecked = document.getElementById('terms').checked;
    
    const isFormValid = (
        fullName &&
        email &&
        isPasswordValid(password) &&
        password === confirmPassword &&
        username &&
        termsChecked
    );
    
    submitBtn.disabled = !isFormValid;
}

// Register form submit
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const username = document.getElementById('username').value;
        const newsletter = document.getElementById('newsletter').checked;
        
        // Validate all inputs
        if (!fullName || !email || !password || !confirmPassword || !username) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Check passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Check password validity
        if (!isPasswordValid(password)) {
            alert('Password does not meet all requirements');
            return;
        }
        
        // Username validation (alphanumeric and underscore only, 3-20 characters)
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            alert('Username must be 3-20 characters and contain only letters, numbers, and underscores');
            return;
        }
        
        console.log('Registration attempt:', {
            fullName: fullName,
            email: email,
            username: username,
            newsletter: newsletter,
            password: '***'
        });
        
        // Here you would send the registration request to your backend
        alert('Account created successfully! (This is a demo)');
        
        // Reset form
        registerForm.reset();
        passwordRequirements.classList.remove('show');
        matchMessage.textContent = '';
        submitBtn.disabled = true;
    });
}

// Social button handlers
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
        console.log(`Register with ${provider}`);
        alert(`${provider} registration initiated (This is a demo)`);
    });
});

// Terms link handlers
const termsLinks = document.querySelectorAll('.terms-link');
termsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.textContent.includes('Terms') ? 'Terms of Service' : 'Privacy Policy';
        alert(`${type} - Full content would be shown here`);
    });
});

// Enable/disable submit button on form change
const formInputs = registerForm.querySelectorAll('input');
formInputs.forEach(input => {
    input.addEventListener('change', updateSubmitButton);
});

// Initialize submit button state
updateSubmitButton();
