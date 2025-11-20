/**
 * Volunteer Hours Filter Module
 * Handles date range filtering for volunteer hours calculation
 */

import { state } from './state.js';
import { ModalManager } from '../utils/modalManager.js';

export class VolunteerHoursFilter {
    constructor() {
        this.modal = new ModalManager('date-range-modal', 'date-range-form');
        this.filterBtn = document.getElementById('volunteer-hours-filter-btn');
        this.startDateInput = document.getElementById('start-date');
        this.endDateInput = document.getElementById('end-date');
        this.resetBtn = document.getElementById('reset-date-range-btn');

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-date-range-modal']);
        this.modal.setSubmitHandler(() => this.applyFilter());

        // Filter button
        this.filterBtn?.addEventListener('click', () => this.openFilterModal());

        // Reset button
        this.resetBtn?.addEventListener('click', () => this.resetFilter());
    }

    openFilterModal() {
        // Populate current values
        const currentRange = state.volunteerHoursDateRange;

        if (this.startDateInput) {
            this.startDateInput.value = currentRange.startDate || '';
        }

        if (this.endDateInput) {
            this.endDateInput.value = currentRange.endDate || '';
        }

        this.modal.open();
    }

    applyFilter() {
        const startDate = this.startDateInput?.value || null;
        const endDate = this.endDateInput?.value || null;

        // Validate that end date is after start date if both are set
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            alert('End date must be after start date.');
            return;
        }

        state.volunteerHoursDateRange = { startDate, endDate };
        this.modal.close();
    }

    resetFilter() {
        state.volunteerHoursDateRange = { startDate: null, endDate: null };

        if (this.startDateInput) {
            this.startDateInput.value = '';
        }

        if (this.endDateInput) {
            this.endDateInput.value = '';
        }

        this.modal.close();
    }
}
