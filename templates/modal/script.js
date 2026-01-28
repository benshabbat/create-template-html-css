// Open modal
document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    });
});

// Close modal on X click
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// Close modal on button click
document.querySelectorAll('.modal-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.type || this.type !== 'submit') {
            this.closest('.modal').classList.remove('active');
        }
    });
});

// Handle form submission
document.querySelectorAll('.modal-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        alert('הטופס נשלח בהצלחה!');
        this.closest('.modal').classList.remove('active');
        this.reset();
    });
});

// Cancel button
document.querySelectorAll('.btn-cancel').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

// Confirm button
document.querySelectorAll('.btn-confirm').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Action confirmed');
        alert('הפריט נמחק בהצלחה');
        this.closest('.modal').classList.remove('active');
    });
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
