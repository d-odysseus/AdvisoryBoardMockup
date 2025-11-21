/**
 * Department Manager Module
 * Handles department selection and updates program name display
 */

import { state } from './state.js';
import { DEPARTMENTS, AVAILABLE_TACTICS } from '../config/constants.js';
import { DEPARTMENT_DATA } from '../config/mockData.js';

export class DepartmentManager {
    constructor() {
        this.dropdown = document.getElementById('department-selector');
        this.programNameDisplay = document.querySelector('.program-name');
        this.perkinsSchoolsList = document.getElementById('perkins-schools-list');

        this.setupEventListeners();
        this.setupStateSubscriptions();
        this.setupTabListener();

        // Initial render
        this.updateProgramName();
        this.updatePerkinsSchoolsList();
    }

    setupEventListeners() {
        this.dropdown?.addEventListener('change', (e) => {
            this.handleDepartmentChange(e.target.value);
        });
    }

    setupStateSubscriptions() {
        state.subscribe('currentDepartment', () => {
            this.updateProgramName();
            this.updatePerkinsSchoolsList();
        });
    }

    setupTabListener() {
        // Listen for tab changes to enable/disable department selector
        window.addEventListener('tabChanged', (e) => {
            const tabName = e.detail.tabName;
            if (this.dropdown) {
                // Only enable dropdown on advisory-board tab
                this.dropdown.disabled = tabName !== 'advisory-board';
            }
        });
    }

    handleDepartmentChange(departmentId) {
        // Update state
        state.currentDepartment = departmentId;

        // Load department-specific data
        this.loadDepartmentData(departmentId);
    }

    loadDepartmentData(departmentId) {
        const data = DEPARTMENT_DATA[departmentId];
        if (!data) {
            console.error(`No data found for department: ${departmentId}`);
            return;
        }

        // Update all state with department-specific data
        state.boardMembers = [...data.members];
        state.specialSessionMembers = [...data.specialSessionMembers];

        // Map goal IDs to goal objects
        const goals = data.goals.map(tacticId =>
            AVAILABLE_TACTICS.find(t => t.id === tacticId)
        ).filter(Boolean);
        state.priorityGoals = goals;

        // Map meetings with populated attendees
        const meetings = data.meetings.map(meeting => ({
            ...meeting,
            attendees: meeting.attendeeIds
                ?.map(id => data.members.find(m => m.id === id))
                .filter(Boolean) || []
        }));
        state.meetings = meetings;

        state.highSchoolPartners = [...data.highSchoolPartners];
        state.highSchoolInteractions = [...data.highSchoolInteractions];
    }

    updateProgramName() {
        if (!this.programNameDisplay) return;

        const department = DEPARTMENTS.find(d => d.id === state.currentDepartment);
        if (department) {
            this.programNameDisplay.textContent = `${department.name} Program`;
        }
    }

    updatePerkinsSchoolsList() {
        if (!this.perkinsSchoolsList) return;

        const department = DEPARTMENTS.find(d => d.id === state.currentDepartment);
        if (!department) return;

        this.perkinsSchoolsList.innerHTML = department.perkinsEligibleSchools
            .map(school => `<li>${school}</li>`)
            .join('');
    }
}
