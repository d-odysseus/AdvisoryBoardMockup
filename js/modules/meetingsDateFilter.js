/**
 * Meetings Date Filter Module
 * Handles date range filtering for meetings display
 */

import { state } from './state.js';
import { ModalManager } from '../utils/modalManager.js';

export class MeetingsDateFilter {
    constructor() {
        this.modal = new ModalManager('meetings-date-range-modal', 'meetings-date-range-form');
        this.filterBtn = document.getElementById('meetings-filter-btn');
        this.startDateInput = document.getElementById('meetings-start-date');
        this.endDateInput = document.getElementById('meetings-end-date');
        this.resetBtn = document.getElementById('reset-meetings-date-range-btn');
        this.dateRangeDisplay = document.getElementById('meetings-date-range');

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-meetings-date-range-modal']);
        this.modal.setSubmitHandler(() => this.applyFilter());

        // Filter button
        this.filterBtn?.addEventListener('click', () => this.openFilterModal());

        // Reset button
        this.resetBtn?.addEventListener('click', () => this.resetFilter());
    }

    setupStateSubscriptions() {
        state.subscribe('meetingsDateRange', () => this.updateDateRangeDisplay());
    }

    openFilterModal() {
        // Populate current values
        const currentRange = state.meetingsDateRange;

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

        state.meetingsDateRange = { startDate, endDate };
        this.modal.close();
    }

    resetFilter() {
        state.meetingsDateRange = { startDate: null, endDate: null };

        if (this.startDateInput) {
            this.startDateInput.value = '';
        }

        if (this.endDateInput) {
            this.endDateInput.value = '';
        }

        this.modal.close();
    }

    formatDateRange() {
        const range = state.meetingsDateRange;

        if (!range.startDate && !range.endDate) {
            return '';
        }

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };

        if (range.startDate && range.endDate) {
            return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
        } else if (range.startDate) {
            return `Since ${formatDate(range.startDate)}`;
        } else if (range.endDate) {
            return `Until ${formatDate(range.endDate)}`;
        }

        return '';
    }

    updateDateRangeDisplay() {
        if (this.dateRangeDisplay) {
            const dateRangeText = this.formatDateRange();
            this.dateRangeDisplay.textContent = dateRangeText;
        }
    }
}
