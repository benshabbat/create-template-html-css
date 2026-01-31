// ACCORDION Component Script

// Accordion Component

const accordionHeaders = document.querySelectorAll('.accordion-header');

// Toggle accordion
function toggleAccordion(e) {
    const header = e.currentTarget;
    const item = header.parentElement;
    
    // Close all other items
    document.querySelectorAll('.accordion-item').forEach(accordionItem => {
        if (accordionItem !== item) {
            accordionItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    item.classList.toggle('active');
}

// Add event listeners
accordionHeaders.forEach(header => {
    header.addEventListener('click', toggleAccordion);
});

// Optional: Open first item by default
if (accordionHeaders.length > 0) {
    accordionHeaders[0].parentElement.classList.add('active');
}
