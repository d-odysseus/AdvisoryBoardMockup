/**
 * Modal Manager
 * Centralized modal management to reduce code duplication
 */

export class ModalManager {
    constructor(modalId, formId) {
        this.modalId = modalId;
        this.formId = formId;
        this.modal = document.getElementById(modalId);
        this.form = formId ? document.getElementById(formId) : null;
        this.onSubmit = null;
        this.onClose = null;
    }

    /**
     * Open the modal
     */
    open() {
        this.modal.classList.add('active');
        this._focusFirstInput();
    }

    /**
     * Close the modal
     */
    close() {
        this.modal.classList.remove('active');
        if (this.form) {
            this.form.reset();
        }
        if (this.onClose) {
            this.onClose();
        }
    }

    /**
     * Setup modal event listeners
     */
    setupEventListeners(closeButtonIds) {
        // Close button listeners
        closeButtonIds.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => this.close());
            }
        });

        // Form submit listener - will use this.onSubmit when form is submitted
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.onSubmit) {
                    this.onSubmit(e);
                }
            });
        }

        // Click outside to close
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    /**
     * Set the submit handler
     */
    setSubmitHandler(handler) {
        this.onSubmit = handler;
    }

    /**
     * Set the close handler
     */
    setCloseHandler(handler) {
        this.onClose = handler;
    }

    /**
     * Set modal title
     */
    setTitle(title) {
        const titleElement = this.modal.querySelector('.modal-header h2');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    /**
     * Set submit button text
     */
    setSubmitText(text) {
        const submitButton = this.form?.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = text;
        }
    }

    /**
     * Get form data as object
     */
    getFormData() {
        if (!this.form) return {};

        const formData = new FormData(this.form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    }

    /**
     * Populate form with data
     */
    populateForm(data) {
        if (!this.form) return;

        Object.entries(data).forEach(([key, value]) => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = value;
            }
        });
    }

    /**
     * Focus first input in the modal
     * @private
     */
    _focusFirstInput() {
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

/**
 * Error Modal Manager
 */
export class ErrorModal {
    constructor() {
        this.modal = document.getElementById('error-modal');
        this.messageElement = document.getElementById('error-message');
        this.closeButton = document.getElementById('close-error-modal');

        this.closeButton?.addEventListener('click', () => this.close());
    }

    /**
     * Show error modal with message
     */
    show(message) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
        this.modal?.classList.add('active');
    }

    /**
     * Close error modal
     */
    close() {
        this.modal?.classList.remove('active');
    }
}
