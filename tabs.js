// Tab Switching Logic - js/tabs.js

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {

        const switchTab = (tabId) => {
            // Deactivate all buttons and content
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Activate the selected button and content
            const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            const activeContent = document.getElementById(tabId);

            if (activeButton) {
                activeButton.classList.add('active');
            }
            if (activeContent) {
                activeContent.classList.add('active');
            }
        };

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTabId = this.dataset.tab;
                switchTab(targetTabId);
            });
        });

        // Optional: Activate the first tab by default if needed
        // This assumes the first button and content already have the 'active' class in HTML
        // If not, you could uncomment the line below:
        // if (tabButtons.length > 0) switchTab(tabButtons[0].dataset.tab);

    } else {
       // console.log("Tab buttons or content panes not found.");
    }
}); 