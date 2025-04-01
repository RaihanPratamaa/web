// General Sitewide Javascript - js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header --- //
    const header = document.querySelector('.main-header');
    if (header) {
        const scrollThreshold = 50; // Pixels to scroll before header becomes sticky

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check in case page loads scrolled
    }

    // --- Mobile Navigation Toggle --- //
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('active');
            // Optional: Change icon on toggle (e.g., bars to times)
            const icon = navbarToggler.querySelector('i');
            if (icon) {
                if (navbarCollapse.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            // Optional: Prevent body scroll when mobile menu is open
            // document.body.classList.toggle('no-scroll', navbarCollapse.classList.contains('active'));
        });

        // Close mobile menu if clicking outside of it (optional)
        document.addEventListener('click', function(event) {
            if (navbarCollapse.classList.contains('active') && 
                !navbarCollapse.contains(event.target) && 
                !navbarToggler.contains(event.target)) {
                navbarCollapse.classList.remove('active');
                const icon = navbarToggler.querySelector('i');
                 if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                // document.body.classList.remove('no-scroll');
            }
        });
    }

    // --- Back to Top Button --- //
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        const scrollThreshold_BTT = 300; // Pixels to scroll before button appears

        const handleBackToTopScroll = () => {
            if (window.scrollY > scrollThreshold_BTT) {
                // Using a class for visibility allows for transitions
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', handleBackToTopScroll);
        backToTopButton.addEventListener('click', scrollToTop);
        handleBackToTopScroll(); // Initial check
    }

});
