/**
 * Application State Management
 * Centralized state with observer pattern for reactive updates
 */

import { DEFAULT_TACTIC_YEAR } from '../config/constants.js';

class AppState {
    constructor() {
        this._boardMembers = [];
        this._specialSessionMembers = [];
        this._priorityGoals = [];
        this._meetings = [];
        this._selectedTacticYear = DEFAULT_TACTIC_YEAR;
        this._currentProfileImage = null;
        this._editingMeetingId = null;
        this._volunteerHoursDateRange = { startDate: null, endDate: null };
        this._meetingsDateRange = { startDate: null, endDate: null };
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

    // Special Session Members
    get specialSessionMembers() {
        return [...this._specialSessionMembers];
    }

    set specialSessionMembers(value) {
        this._specialSessionMembers = value;
        this._notify('specialSessionMembers');
    }

    addSpecialSessionMember(member) {
        this._specialSessionMembers.push(member);
        this._notify('specialSessionMembers');
    }

    updateSpecialSessionMember(id, updatedData) {
        const index = this._specialSessionMembers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._specialSessionMembers[index] = { ...this._specialSessionMembers[index], ...updatedData };
            this._notify('specialSessionMembers');
        }
    }

    deleteSpecialSessionMember(id) {
        this._specialSessionMembers = this._specialSessionMembers.filter(m => m.id !== id);
        this._notify('specialSessionMembers');
    }

    getSpecialSessionMemberById(id) {
        return this._specialSessionMembers.find(m => m.id === id);
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

    // Volunteer Hours Date Range
    get volunteerHoursDateRange() {
        return { ...this._volunteerHoursDateRange };
    }

    set volunteerHoursDateRange(value) {
        this._volunteerHoursDateRange = value;
        this._notify('volunteerHoursDateRange');
    }

    // Meetings Date Range
    get meetingsDateRange() {
        return { ...this._meetingsDateRange };
    }

    set meetingsDateRange(value) {
        this._meetingsDateRange = value;
        this._notify('meetingsDateRange');
    }

    // Filter meetings by date range
    getFilteredMeetings() {
        if (!this._meetingsDateRange.startDate && !this._meetingsDateRange.endDate) {
            return [...this._meetings];
        }

        return this._meetings.filter(meeting => {
            const meetingDate = new Date(meeting.date);

            if (this._meetingsDateRange.startDate && this._meetingsDateRange.endDate) {
                const startDate = new Date(this._meetingsDateRange.startDate);
                const endDate = new Date(this._meetingsDateRange.endDate);
                return meetingDate >= startDate && meetingDate <= endDate;
            } else if (this._meetingsDateRange.startDate) {
                const startDate = new Date(this._meetingsDateRange.startDate);
                return meetingDate >= startDate;
            } else if (this._meetingsDateRange.endDate) {
                const endDate = new Date(this._meetingsDateRange.endDate);
                return meetingDate <= endDate;
            }

            return true;
        });
    }

    // Summary counts
    getSummary() {
        // Filter meetings by date range if set
        let filteredMeetings = this._meetings;

        if (this._volunteerHoursDateRange.startDate || this._volunteerHoursDateRange.endDate) {
            filteredMeetings = this._meetings.filter(meeting => {
                const meetingDate = new Date(meeting.date);

                if (this._volunteerHoursDateRange.startDate && this._volunteerHoursDateRange.endDate) {
                    const startDate = new Date(this._volunteerHoursDateRange.startDate);
                    const endDate = new Date(this._volunteerHoursDateRange.endDate);
                    return meetingDate >= startDate && meetingDate <= endDate;
                } else if (this._volunteerHoursDateRange.startDate) {
                    const startDate = new Date(this._volunteerHoursDateRange.startDate);
                    return meetingDate >= startDate;
                } else if (this._volunteerHoursDateRange.endDate) {
                    const endDate = new Date(this._volunteerHoursDateRange.endDate);
                    return meetingDate <= endDate;
                }

                return true;
            });
        }

        // Calculate total volunteer hours from filtered meetings
        const totalVolunteerHours = filteredMeetings.reduce((total, meeting) => {
            const attendeeCount = meeting.attendees ? meeting.attendees.length : 0;
            const duration = meeting.duration || 0;
            return total + (attendeeCount * duration);
        }, 0);

        return {
            memberCount: this._boardMembers.length,
            specialSessionMemberCount: this._specialSessionMembers.length,
            goalCount: this._priorityGoals.length,
            meetingCount: this._meetings.length,
            totalVolunteerHours: totalVolunteerHours
        };
    }
}

// Singleton instance
export const state = new AppState();
