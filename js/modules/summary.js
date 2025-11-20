/**
 * Summary Cards Module
 * Handles the summary statistics display
 */

import { state } from './state.js';

export class SummaryManager {
    constructor() {
        this.memberCountElement = document.getElementById('member-count');
        this.specialSessionMemberCountElement = document.getElementById('special-session-member-count');
        this.goalCountElement = document.getElementById('goal-count');
        this.meetingCountElement = document.getElementById('meeting-count');
        this.volunteerHoursElement = document.getElementById('volunteer-hours');
        this.volunteerHoursDateRangeElement = document.getElementById('volunteer-hours-date-range');

        this.setupStateSubscriptions();
    }

    setupStateSubscriptions() {
        state.subscribe('boardMembers', () => this.update());
        state.subscribe('specialSessionMembers', () => this.update());
        state.subscribe('priorityGoals', () => this.update());
        state.subscribe('meetings', () => this.update());
        state.subscribe('volunteerHoursDateRange', () => this.update());
    }

    formatDateRange() {
        const range = state.volunteerHoursDateRange;

        if (!range.startDate && !range.endDate) {
            return 'All Time';
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

        return 'All Time';
    }

    update() {
        const summary = state.getSummary();

        if (this.memberCountElement) {
            this.memberCountElement.textContent = summary.memberCount;
        }

        if (this.specialSessionMemberCountElement) {
            this.specialSessionMemberCountElement.textContent = summary.specialSessionMemberCount;
        }

        if (this.goalCountElement) {
            this.goalCountElement.textContent = summary.goalCount;
        }

        if (this.meetingCountElement) {
            this.meetingCountElement.textContent = summary.meetingCount;
        }

        if (this.volunteerHoursElement) {
            this.volunteerHoursElement.textContent = summary.totalVolunteerHours.toFixed(1);
        }

        if (this.volunteerHoursDateRangeElement) {
            const dateRangeText = this.formatDateRange();
            this.volunteerHoursDateRangeElement.textContent = dateRangeText;
        }
    }
}
