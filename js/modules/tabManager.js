/**
 * Tab Manager Module
 * Handles tab navigation and content switching
 */

export class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Remove active class from all buttons and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to selected button and content
        const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        const selectedContent = document.getElementById(`${tabName}-tab`);

        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');

            // Emit custom event for tab change
            window.dispatchEvent(new CustomEvent('tabChanged', { detail: { tabName } }));
        }
    }
}
