// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('הטופס נשלח בהצלחה! נחזור אליך בקרוב.');
    
    // Reset form
    this.reset();
});

// Real-time validation
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.checkValidity()) {
            this.classList.add('valid');
            this.classList.remove('invalid');
        } else {
            this.classList.add('invalid');
            this.classList.remove('valid');
        }
    });
});
