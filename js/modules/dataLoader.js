/**
 * Data Loader Module
 * Handles loading mock data into application state
 */

import { state } from './state.js';
import { DEPARTMENT_DATA } from '../config/mockData.js';
import { AVAILABLE_TACTICS } from '../config/constants.js';

export class DataLoader {
    /**
     * Load mock data for the current department
     */
    static loadMockData() {
        const departmentId = state.currentDepartment;
        const data = DEPARTMENT_DATA[departmentId];

        if (!data) {
            console.error(`No data found for department: ${departmentId}`);
            return;
        }

        // Load members
        state.boardMembers = [...data.members];

        // Load special session members
        state.specialSessionMembers = [...data.specialSessionMembers];

        // Load goals
        const goals = data.goals
            .map(tacticId => AVAILABLE_TACTICS.find(t => t.id === tacticId))
            .filter(Boolean);
        state.priorityGoals = goals;

        // Load meetings with populated attendees
        const meetings = data.meetings.map(meeting => ({
            ...meeting,
            attendees: meeting.attendeeIds
                ?.map(id => data.members.find(m => m.id === id))
                .filter(Boolean) || []
        }));
        state.meetings = meetings;

        // Load high school partners
        state.highSchoolPartners = [...data.highSchoolPartners];

        // Load high school interactions
        state.highSchoolInteractions = [...data.highSchoolInteractions];
    }

    /**
     * Clear all data from the application state
     */
    static clearData() {
        state.boardMembers = [];
        state.specialSessionMembers = [];
        state.priorityGoals = [];
        state.meetings = [];
        state.highSchoolPartners = [];
        state.highSchoolInteractions = [];
    }
}
