/**
 * Data Loader Module
 * Handles loading mock data into application state
 */

import { state } from './state.js';
import { MOCK_MEMBERS, MOCK_SPECIAL_SESSION_MEMBERS, MOCK_GOALS, MOCK_MEETINGS } from '../config/mockData.js';
import { AVAILABLE_TACTICS } from '../config/constants.js';

export class DataLoader {
    /**
     * Load all mock data into the application state
     */
    static loadMockData() {
        // Load members
        state.boardMembers = [...MOCK_MEMBERS];

        // Load special session members
        state.specialSessionMembers = [...MOCK_SPECIAL_SESSION_MEMBERS];

        // Load goals
        const goals = MOCK_GOALS
            .map(tacticId => AVAILABLE_TACTICS.find(t => t.id === tacticId))
            .filter(Boolean);
        state.priorityGoals = goals;

        // Load meetings with populated attendees
        const meetings = MOCK_MEETINGS.map(meeting => ({
            ...meeting,
            attendees: meeting.attendeeIds
                .map(id => state.boardMembers.find(m => m.id === id))
                .filter(Boolean)
        }));
        state.meetings = meetings;
    }

    /**
     * Clear all data from the application state
     */
    static clearData() {
        state.boardMembers = [];
        state.specialSessionMembers = [];
        state.priorityGoals = [];
        state.meetings = [];
    }
}
