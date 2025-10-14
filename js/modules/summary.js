/**
 * Summary Cards Module
 * Handles the summary statistics display
 */

import { state } from './state.js';

export class SummaryManager {
    constructor() {
        this.memberCountElement = document.getElementById('member-count');
        this.goalCountElement = document.getElementById('goal-count');
        this.meetingCountElement = document.getElementById('meeting-count');

        this.setupStateSubscriptions();
    }

    setupStateSubscriptions() {
        state.subscribe('boardMembers', () => this.update());
        state.subscribe('priorityGoals', () => this.update());
        state.subscribe('meetings', () => this.update());
    }

    update() {
        const summary = state.getSummary();

        if (this.memberCountElement) {
            this.memberCountElement.textContent = summary.memberCount;
        }

        if (this.goalCountElement) {
            this.goalCountElement.textContent = summary.goalCount;
        }

        if (this.meetingCountElement) {
            this.meetingCountElement.textContent = summary.meetingCount;
        }
    }
}
