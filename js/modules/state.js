/**
 * Application State Management
 * Centralized state with observer pattern for reactive updates
 */

import { DEFAULT_TACTIC_YEAR } from '../config/constants.js';

class AppState {
    constructor() {
        this._boardMembers = [];
        this._priorityGoals = [];
        this._meetings = [];
        this._selectedTacticYear = DEFAULT_TACTIC_YEAR;
        this._currentProfileImage = null;
        this._editingMeetingId = null;
        this._observers = new Map();
    }

    // Observer pattern for reactive updates
    subscribe(key, callback) {
        if (!this._observers.has(key)) {
            this._observers.set(key, []);
        }
        this._observers.get(key).push(callback);
    }

    _notify(key) {
        if (this._observers.has(key)) {
            this._observers.get(key).forEach(callback => callback());
        }
    }

    // Board Members
    get boardMembers() {
        return [...this._boardMembers];
    }

    set boardMembers(value) {
        this._boardMembers = value;
        this._notify('boardMembers');
    }

    addMember(member) {
        this._boardMembers.push(member);
        this._notify('boardMembers');
    }

    updateMember(id, updatedData) {
        const index = this._boardMembers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._boardMembers[index] = { ...this._boardMembers[index], ...updatedData };
            this._notify('boardMembers');
        }
    }

    deleteMember(id) {
        this._boardMembers = this._boardMembers.filter(m => m.id !== id);
        this._notify('boardMembers');
    }

    getMemberById(id) {
        return this._boardMembers.find(m => m.id === id);
    }

    // Priority Goals
    get priorityGoals() {
        return [...this._priorityGoals];
    }

    set priorityGoals(value) {
        this._priorityGoals = value;
        this._notify('priorityGoals');
    }

    addGoal(goal) {
        if (!this._priorityGoals.find(g => g.id === goal.id)) {
            this._priorityGoals.push(goal);
            this._notify('priorityGoals');
        }
    }

    removeGoal(id) {
        this._priorityGoals = this._priorityGoals.filter(g => g.id !== id);
        this._notify('priorityGoals');
    }

    hasGoal(id) {
        return this._priorityGoals.some(g => g.id === id);
    }

    // Meetings
    get meetings() {
        return [...this._meetings];
    }

    set meetings(value) {
        this._meetings = value;
        this._notify('meetings');
    }

    addMeeting(meeting) {
        this._meetings.push(meeting);
        this._sortMeetings();
        this._notify('meetings');
    }

    updateMeeting(id, updatedData) {
        const index = this._meetings.findIndex(m => m.id === id);
        if (index !== -1) {
            this._meetings[index] = { ...this._meetings[index], ...updatedData };
            this._sortMeetings();
            this._notify('meetings');
        }
    }

    getMeetingById(id) {
        return this._meetings.find(m => m.id === id);
    }

    _sortMeetings() {
        this._meetings.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // UI State
    get selectedTacticYear() {
        return this._selectedTacticYear;
    }

    set selectedTacticYear(value) {
        this._selectedTacticYear = value;
        this._notify('selectedTacticYear');
    }

    get currentProfileImage() {
        return this._currentProfileImage;
    }

    set currentProfileImage(value) {
        this._currentProfileImage = value;
    }

    get editingMeetingId() {
        return this._editingMeetingId;
    }

    set editingMeetingId(value) {
        this._editingMeetingId = value;
    }

    // Summary counts
    getSummary() {
        return {
            memberCount: this._boardMembers.length,
            goalCount: this._priorityGoals.length,
            meetingCount: this._meetings.length
        };
    }
}

// Singleton instance
export const state = new AppState();
