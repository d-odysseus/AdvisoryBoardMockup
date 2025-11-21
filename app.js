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
import { HighSchoolPartnersManager } from './js/modules/highSchoolPartners.js';
import { HighSchoolInteractionsManager } from './js/modules/highSchoolInteractions.js';
import { TabManager } from './js/modules/tabManager.js';
import { DepartmentManager } from './js/modules/departmentManager.js';
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
        // Initialize department manager first (before loading data)
        this.managers.department = new DepartmentManager();

        // Initialize tab manager
        this.managers.tabs = new TabManager();

        // Initialize all module managers
        this.managers.summary = new SummaryManager();
        this.managers.goals = new GoalsManager();
        this.managers.members = new MembersManager();
        this.managers.specialSessionMembers = new SpecialSessionMembersManager();
        this.managers.meetings = new MeetingsManager();
        this.managers.volunteerHoursFilter = new VolunteerHoursFilter();
        this.managers.meetingsDateFilter = new MeetingsDateFilter();
        this.managers.highSchoolPartners = new HighSchoolPartnersManager();
        this.managers.highSchoolInteractions = new HighSchoolInteractionsManager();

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
        this.managers.highSchoolPartners.render();
        this.managers.highSchoolInteractions.render();
    }
}

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = new AdvisoryBoardApp();
    app.init();
});
