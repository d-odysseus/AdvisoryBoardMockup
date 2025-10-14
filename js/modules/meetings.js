/**
 * Meetings Module
 * Business logic and rendering for meetings
 */

import { state } from './state.js';
import { generateId, truncateText, getCheckedValues, closeAll } from '../utils/helpers.js';
import {
    meetingCardTemplate,
    emptyStateTemplate,
    checkboxItemTemplate,
    recommendationSectionTemplate
} from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';
import { TACTIC_TRUNCATE_WORDS } from '../config/constants.js';

export class MeetingsManager {
    constructor() {
        this.modal = new ModalManager('meeting-modal', 'meeting-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('meetings-list');

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-meeting-modal', 'cancel-meeting-btn']);
        this.modal.setSubmitHandler(() => this.handleAddMeeting());
        this.modal.setCloseHandler(() => this.resetModal());

        // Add meeting button
        document.getElementById('add-meeting-btn')?.addEventListener('click', () => this.openMeetingModal());

        // Tactics checkboxes change event
        document.getElementById('tactics-checkboxes')?.addEventListener('change', () => {
            this.handleTacticsChange();
        });

        // Event delegation for meeting actions
        this.container?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const meetingId = e.target.closest('[data-meeting-id]')?.dataset.meetingId;

            if (action && meetingId) {
                this.handleAction(action, meetingId, e);
            }
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.meeting-menu')) {
                closeAll('.meeting-menu-dropdown');
            }
        });
    }

    setupStateSubscriptions() {
        state.subscribe('meetings', () => this.render());
    }

    handleAction(action, meetingId, event) {
        switch (action) {
            case 'toggle-meeting-menu':
                this.toggleMeetingMenu(event, meetingId);
                break;
            case 'edit-meeting':
                this.editMeeting(meetingId);
                break;
        }
    }

    openMeetingModal() {
        if (state.boardMembers.length === 0) {
            this.errorModal.show('Please add board members before creating a meeting.');
            return;
        }

        if (state.priorityGoals.length === 0) {
            this.errorModal.show('Please add priority tactics before creating a meeting.');
            return;
        }

        this.populateAttendees();
        this.populateTactics();
        this.modal.open();
    }

    resetModal() {
        state.editingMeetingId = null;
        document.getElementById('recommendations-container').innerHTML = '';
        this.modal.setTitle('Add Meeting');
        this.modal.setSubmitText('Add Meeting');
    }

    populateAttendees() {
        const container = document.getElementById('attendees-checkboxes');
        if (!container) return;

        const checkboxes = state.boardMembers.map(member => {
            const label = `${member.name} - ${member.organization}`;
            return checkboxItemTemplate(`attendee-${member.id}`, member.id, label);
        }).join('');

        container.innerHTML = checkboxes;
    }

    populateTactics() {
        const container = document.getElementById('tactics-checkboxes');
        if (!container) return;

        const checkboxes = state.priorityGoals.map(goal => {
            const truncatedName = truncateText(goal.name, TACTIC_TRUNCATE_WORDS);
            return checkboxItemTemplate(`tactic-${goal.id}`, goal.id, truncatedName, goal.name);
        }).join('');

        container.innerHTML = checkboxes;
    }

    handleTacticsChange() {
        const recommendationsContainer = document.getElementById('recommendations-container');
        if (!recommendationsContainer) return;

        recommendationsContainer.innerHTML = '';

        const checkedTactics = getCheckedValues('#tactics-checkboxes input');

        checkedTactics.forEach(tacticId => {
            const tactic = state.priorityGoals.find(g => g.id === tacticId);
            if (tactic) {
                const section = document.createElement('div');
                section.innerHTML = recommendationSectionTemplate(tactic);
                recommendationsContainer.appendChild(section.firstElementChild);
            }
        });
    }

    handleAddMeeting() {
        // Get selected attendees
        const attendeeIds = getCheckedValues('#attendees-checkboxes input');
        if (attendeeIds.length === 0) {
            this.errorModal.show('Please select at least one attendee.');
            return;
        }

        const attendees = state.boardMembers.filter(m => attendeeIds.includes(m.id));

        // Get selected tactics with recommendations
        const tacticIds = getCheckedValues('#tactics-checkboxes input');
        if (tacticIds.length === 0) {
            this.errorModal.show('Please select at least one priority tactic.');
            return;
        }

        const tacticsDiscussed = tacticIds.map(tacticId => {
            const tactic = state.priorityGoals.find(g => g.id === tacticId);
            const recommendations = document.getElementById(`rec-${tacticId}`)?.value || '';

            return {
                id: tacticId,
                name: tactic.name,
                recommendations: recommendations
            };
        });

        const meetingDate = document.getElementById('meeting-date')?.value;
        if (!meetingDate) {
            this.errorModal.show('Please select a meeting date.');
            return;
        }

        if (state.editingMeetingId) {
            // Edit existing meeting
            state.updateMeeting(state.editingMeetingId, {
                date: meetingDate,
                attendees: attendees,
                tacticsDiscussed: tacticsDiscussed
            });
        } else {
            // Add new meeting
            const meeting = {
                id: generateId(),
                date: meetingDate,
                attendees: attendees,
                tacticsDiscussed: tacticsDiscussed
            };
            state.addMeeting(meeting);
        }

        this.modal.close();
    }

    toggleMeetingMenu(event, meetingId) {
        event.stopPropagation();

        // Close all other menus
        closeAll('.meeting-menu-dropdown');

        // Toggle current menu
        const menu = document.getElementById(`meeting-menu-${meetingId}`);
        menu?.classList.toggle('active');
    }

    editMeeting(meetingId) {
        // Close menu
        document.getElementById(`meeting-menu-${meetingId}`)?.classList.remove('active');

        const meeting = state.getMeetingById(meetingId);
        if (!meeting) return;

        // Set editing mode
        state.editingMeetingId = meetingId;

        // Update modal
        this.modal.setTitle('Edit Meeting');
        this.modal.setSubmitText('Update Meeting');

        // Populate form fields
        const dateField = document.getElementById('meeting-date');
        if (dateField) {
            dateField.value = meeting.date;
        }

        // Populate attendees
        this.populateAttendees();
        meeting.attendees.forEach(attendee => {
            const checkbox = document.getElementById(`attendee-${attendee.id}`);
            if (checkbox) checkbox.checked = true;
        });

        // Populate tactics
        this.populateTactics();
        meeting.tacticsDiscussed.forEach(tactic => {
            const checkbox = document.getElementById(`tactic-${tactic.id}`);
            if (checkbox) checkbox.checked = true;
        });

        // Trigger tactics change to show recommendations sections
        this.handleTacticsChange();

        // Populate recommendations
        meeting.tacticsDiscussed.forEach(tactic => {
            const recommendationField = document.getElementById(`rec-${tactic.id}`);
            if (recommendationField && tactic.recommendations) {
                recommendationField.value = tactic.recommendations;
            }
        });

        // Open modal
        this.modal.open();
    }

    render() {
        if (!this.container) return;

        const meetings = state.meetings;

        if (meetings.length === 0) {
            this.container.innerHTML = emptyStateTemplate('event_note', 'No meetings recorded yet. Click "Add Meeting" to get started.');
            return;
        }

        this.container.innerHTML = meetings.map(meetingCardTemplate).join('');
    }
}
