/**
 * Advisory Board Dashboard - Main Application
 * Refactored with modular architecture for better maintainability
 */

import { GoalsManager } from './js/modules/goals.js';
import { MembersManager } from './js/modules/members.js';
import { SpecialSessionMembersManager } from './js/modules/specialSessionMembers.js';
import { MeetingsManager } from './js/modules/meetings.js';
import { SummaryManager } from './js/modules/summary.js';
import { VolunteerHoursFilter } from './js/modules/volunteerHoursFilter.js';
import { MeetingsDateFilter } from './js/modules/meetingsDateFilter.js';
import { DataLoader } from './js/modules/dataLoader.js';

/**
 * Main Application Class
 */
class AdvisoryBoardApp {
    constructor() {
        this.managers = {};
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize all module managers
        this.managers.summary = new SummaryManager();
        this.managers.goals = new GoalsManager();
        this.managers.members = new MembersManager();
        this.managers.specialSessionMembers = new SpecialSessionMembersManager();
        this.managers.meetings = new MeetingsManager();
        this.managers.volunteerHoursFilter = new VolunteerHoursFilter();
        this.managers.meetingsDateFilter = new MeetingsDateFilter();

        // Load mock data
        DataLoader.loadMockData();

        // Initial render
        this.render();
    }

    /**
     * Render all modules
     */
    render() {
        this.managers.summary.update();
        this.managers.goals.render();
        this.managers.members.render();
        this.managers.specialSessionMembers.render();
        this.managers.meetings.render();
    }
}

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = new AdvisoryBoardApp();
    app.init();
});
