// Destination Filtering Logic - js/filter.js

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.region-filter');
    const destinationCards = document.querySelectorAll('.explore-card'); // Use the specific card class

    if (filterButtons.length > 0 && destinationCards.length > 0) {

        const filterDestinations = (filter) => {
            // Update active state on buttons
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Filter cards
            destinationCards.forEach(card => {
                const cardRegion = card.dataset.region;
                if (filter === 'all' || cardRegion === filter) {
                    // Show card (remove hidden class)
                    card.classList.remove('hidden');
                    // Optional: Add a subtle animation for appearing cards
                    // card.style.display = 'flex'; // Or block, depending on your base styles
                } else {
                    // Hide card (add hidden class)
                    card.classList.add('hidden');
                     // Optional: Remove inline display style if using animation
                    // card.style.display = 'none';
                }
            });
        };

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.dataset.filter;
                filterDestinations(filterValue);
            });
        });

        // Optional: Initialize with the 'all' filter active
        // filterDestinations('all');
    } else {
        // console.log("Filter buttons or destination cards not found.");
    }
}); 