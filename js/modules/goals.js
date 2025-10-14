/**
 * Goals/Tactics Module
 * Business logic and rendering for priority goals/tactics
 */

import { state } from './state.js';
import { AVAILABLE_TACTICS, MAX_PRIORITY_TACTICS, TACTIC_TRUNCATE_WORDS } from '../config/constants.js';
import { truncateText } from '../utils/helpers.js';
import { goalBadgeTemplate, emptyStateTemplate, dropdownOptionTemplate } from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';

export class GoalsManager {
    constructor() {
        this.modal = new ModalManager('goal-modal', 'goal-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('priority-goals-container');

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-goal-modal', 'cancel-goal-btn']);
        this.modal.setSubmitHandler(() => this.handleAddGoal());

        // Add goal button
        document.getElementById('add-goal-btn')?.addEventListener('click', () => this.openGoalModal());

        // Year toggle buttons
        document.querySelectorAll('.year-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleYearToggle(e));
        });

        // Event delegation for goal actions
        this.container?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const goalId = e.target.closest('[data-goal-id]')?.dataset.goalId;

            if (action && goalId) {
                this.handleAction(action, goalId);
            }
        });
    }

    setupStateSubscriptions() {
        state.subscribe('priorityGoals', () => this.render());
        state.subscribe('selectedTacticYear', () => this.populateGoalDropdown());
    }

    handleAction(action, goalId) {
        switch (action) {
            case 'toggle-goal':
                this.toggleGoalBadge(goalId);
                break;
            case 'remove-goal':
                this.removeGoal(goalId);
                break;
        }
    }

    openGoalModal() {
        if (state.priorityGoals.length >= MAX_PRIORITY_TACTICS) {
            this.errorModal.show(`You have reached the maximum limit of ${MAX_PRIORITY_TACTICS} priority tactics. Please remove a tactic before adding a new one.`);
            return;
        }

        this.populateGoalDropdown();
        this.modal.open();
    }

    populateGoalDropdown() {
        const select = document.getElementById('goal-select');
        if (!select) return;

        const filteredTactics = AVAILABLE_TACTICS.filter(
            tactic => tactic.year === state.selectedTacticYear
        );

        const options = filteredTactics
            .filter(tactic => !state.hasGoal(tactic.id))
            .map(tactic => {
                const truncatedName = truncateText(tactic.name, TACTIC_TRUNCATE_WORDS);
                return dropdownOptionTemplate(tactic.id, truncatedName, tactic.name);
            })
            .join('');

        select.innerHTML = '<option value="">Select a tactic</option>' + options;
    }

    handleYearToggle(event) {
        // Update active state
        document.querySelectorAll('.year-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update selected year
        state.selectedTacticYear = parseInt(event.target.getAttribute('data-year'));
    }

    handleAddGoal() {
        const tacticId = document.getElementById('goal-select')?.value;
        if (!tacticId) return;

        const tactic = AVAILABLE_TACTICS.find(t => t.id === tacticId);
        if (tactic && !state.hasGoal(tactic.id)) {
            state.addGoal(tactic);
            this.modal.close();
        }
    }

    removeGoal(tacticId) {
        state.removeGoal(tacticId);
    }

    toggleGoalBadge(goalId) {
        const badge = this.container?.querySelector(`[data-goal-id="${goalId}"]`);
        if (!badge) return;

        const nameSpan = badge.querySelector('.goal-badge-name');
        const fullText = nameSpan?.getAttribute('data-full-text');
        const isExpanded = badge.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
            nameSpan.textContent = truncateText(fullText, TACTIC_TRUNCATE_WORDS);
            badge.setAttribute('data-expanded', 'false');
        } else {
            nameSpan.textContent = fullText;
            badge.setAttribute('data-expanded', 'true');
        }
    }

    render() {
        if (!this.container) return;

        const goals = state.priorityGoals;

        if (goals.length === 0) {
            this.container.innerHTML = emptyStateTemplate('', 'No priority tactics selected. Click "Add Tactic" to get started.');
            return;
        }

        this.container.innerHTML = goals.map(goalBadgeTemplate).join('');
    }
}
