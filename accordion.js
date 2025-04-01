// Accordion Logic - js/accordion.js

document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Toggle active class on the clicked header
                this.classList.toggle('active');

                // Get the content panel (sibling element)
                const content = this.nextElementSibling;

                // Toggle display of the content panel
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                    // Optional: Scroll into view if needed, but can be jerky
                    // content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // --- Optional: Close other accordion items --- 
                /*
                if (this.classList.contains('active')) { // Only close others if the current one was opened
                    accordionHeaders.forEach(otherHeader => {
                        if (otherHeader !== this && otherHeader.classList.contains('active')) {
                            otherHeader.classList.remove('active');
                            otherHeader.nextElementSibling.style.display = 'none';
                        }
                    });
                }
                */
            });

            // Ensure content associated with initially active headers is shown
            // (If you want accordions to start open based on HTML class)
            if (header.classList.contains('active')) {
                 const content = header.nextElementSibling;
                 if (content) {
                     content.style.display = 'block';
                 }
            } else {
                 // Ensure content is initially hidden if header is not active
                 const content = header.nextElementSibling;
                 if (content) {
                     content.style.display = 'none';
                 }
            }
        });
    } else {
        // console.log("No accordion headers found.");
    }
}); 