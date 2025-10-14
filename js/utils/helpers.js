/**
 * Utility Helper Functions
 */

/**
 * Truncate text to a specified word limit
 * @param {string} text - The text to truncate
 * @param {number} wordLimit - Maximum number of words
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
        return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}

/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format category strings (e.g., 'public-agency' -> 'Public Agency')
 * @param {string} category - Category string with hyphens
 * @returns {string} Formatted category
 */
export function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generate a unique ID based on timestamp
 * @returns {string} Unique ID
 */
export function generateId() {
    return Date.now().toString();
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Read a file as Data URL
 * @param {File} file - File object
 * @returns {Promise<string>} Promise resolving to data URL
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            reject(new Error('Invalid image file'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

/**
 * Get form data as an object
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Form data as key-value pairs
 */
export function getFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    return data;
}

/**
 * Get all checked checkbox values from a container
 * @param {string} selector - CSS selector for checkboxes
 * @returns {Array<string>} Array of checked values
 */
export function getCheckedValues(selector) {
    return Array.from(document.querySelectorAll(`${selector}:checked`))
        .map(cb => cb.value);
}

/**
 * Close all elements matching a selector
 * @param {string} selector - CSS selector
 */
export function closeAll(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove('active');
    });
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
