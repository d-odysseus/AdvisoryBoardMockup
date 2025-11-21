/**
 * High School Interactions Module
 * Business logic and rendering for high school interactions
 */

import { state } from './state.js';
import { MAX_HIGH_SCHOOL_INTERACTIONS, MAX_INTERACTION_ARTIFACTS, INTERACTION_TYPES } from '../config/constants.js';
import { generateId, getCheckedValues } from '../utils/helpers.js';
import { hsInteractionCardTemplate, emptyStateTemplate, checkboxItemTemplate, artifactItemTemplate } from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';

export class HighSchoolInteractionsManager {
    constructor() {
        this.modal = new ModalManager('hs-interaction-modal', 'hs-interaction-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('hs-interactions-list');
        this.editingInteractionId = null;
        this.selectedArtifacts = [];

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-hs-interaction-modal', 'cancel-hs-interaction-btn']);
        this.modal.setSubmitHandler(() => this.handleAddInteraction());
        this.modal.setCloseHandler(() => this.resetForm());

        // Add interaction button
        document.getElementById('add-hs-interaction-btn')?.addEventListener('click', () => this.openInteractionModal());

        // Artifacts upload button
        document.getElementById('upload-artifacts-btn')?.addEventListener('click', () => {
            document.getElementById('hs-interaction-artifacts')?.click();
        });

        // File input change
        document.getElementById('hs-interaction-artifacts')?.addEventListener('change', (e) => {
            this.handleArtifactsSelect(e);
        });

        // Event delegation for interaction actions
        this.container?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const interactionId = e.target.closest('[data-interaction-id]')?.dataset.interactionId;

            if (action && interactionId) {
                this.handleAction(action, interactionId);
            }
        });

        // Event delegation for artifact removal
        document.getElementById('artifacts-list')?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action === 'remove-artifact') {
                const index = parseInt(e.target.closest('[data-index]')?.dataset.index);
                if (!isNaN(index)) {
                    this.removeArtifact(index);
                }
            }
        });
    }

    setupStateSubscriptions() {
        state.subscribe('highSchoolInteractions', () => this.render());
        state.subscribe('highSchoolPartners', () => this.renderPartnerCheckboxes());
    }

    handleAction(action, interactionId) {
        switch (action) {
            case 'edit-interaction':
                this.editInteraction(interactionId);
                break;
            case 'delete-interaction':
                this.deleteInteraction(interactionId);
                break;
        }
    }

    openInteractionModal() {
        if (state.highSchoolInteractions.length >= MAX_HIGH_SCHOOL_INTERACTIONS) {
            this.errorModal.show(`You have reached the maximum limit of ${MAX_HIGH_SCHOOL_INTERACTIONS} high school interactions. Please remove an interaction before adding a new one.`);
            return;
        }

        this.renderPartnerCheckboxes();
        this.renderInteractionTypeCheckboxes();
        this.modal.open();
    }

    renderPartnerCheckboxes() {
        const container = document.getElementById('hs-partners-checkboxes');
        if (!container) return;

        const partners = state.highSchoolPartners;

        if (partners.length === 0) {
            container.innerHTML = '<p class="field-explanation">No partners available. Add partners first.</p>';
            return;
        }

        container.innerHTML = partners.map(partner =>
            checkboxItemTemplate(
                `partner-${partner.id}`,
                partner.name,
                `${partner.name} (${partner.school})`,
                'hs-partners'
            )
        ).join('');
    }

    renderInteractionTypeCheckboxes() {
        const container = document.getElementById('interaction-types-checkboxes');
        if (!container) return;

        container.innerHTML = INTERACTION_TYPES.map((type, index) =>
            checkboxItemTemplate(
                `interaction-type-${index}`,
                type,
                type,
                'interaction-types'
            )
        ).join('');
    }

    handleArtifactsSelect(event) {
        const files = Array.from(event.target.files || []);

        if (this.selectedArtifacts.length + files.length > MAX_INTERACTION_ARTIFACTS) {
            this.errorModal.show(`You can only upload up to ${MAX_INTERACTION_ARTIFACTS} artifacts.`);
            event.target.value = '';
            return;
        }

        files.forEach(file => {
            this.selectedArtifacts.push(file.name);
        });

        this.renderArtifactsList();
        event.target.value = '';
    }

    removeArtifact(index) {
        this.selectedArtifacts.splice(index, 1);
        this.renderArtifactsList();
    }

    renderArtifactsList() {
        const container = document.getElementById('artifacts-list');
        if (!container) return;

        if (this.selectedArtifacts.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.selectedArtifacts.map((fileName, index) =>
            artifactItemTemplate(index, fileName)
        ).join('');
    }

    resetForm() {
        this.editingInteractionId = null;
        this.selectedArtifacts = [];
        this.renderArtifactsList();
        this.modal.setTitle('Add High School Interaction');
        this.modal.setSubmitText('Add Interaction');
    }

    handleAddInteraction() {
        const formData = this.modal.getFormData();

        // Get selected partners
        const selectedPartners = getCheckedValues('input[name="hs-partners"]:checked');

        // Get selected interaction types
        const selectedTypes = getCheckedValues('input[name="interaction-types"]:checked');

        const interactionData = {
            date: formData['hs-interaction-date'] || '',
            partners: selectedPartners,
            otherParticipants: formData['hs-interaction-other-participants'] || '',
            types: selectedTypes,
            description: formData['hs-interaction-description'] || '',
            artifacts: [...this.selectedArtifacts]
        };

        // Basic validation
        if (!interactionData.date) {
            this.errorModal.show('Please select a date.');
            return;
        }

        if (interactionData.types.length === 0) {
            this.errorModal.show('Please select at least one interaction type.');
            return;
        }

        if (!interactionData.description) {
            this.errorModal.show('Please enter a description.');
            return;
        }

        if (this.editingInteractionId) {
            // Update existing interaction
            state.updateHighSchoolInteraction(this.editingInteractionId, interactionData);
        } else {
            // Add new interaction
            const interaction = {
                id: generateId(),
                ...interactionData
            };
            state.addHighSchoolInteraction(interaction);
        }

        this.modal.close();
        this.resetForm();
    }

    editInteraction(interactionId) {
        const interaction = state.getHighSchoolInteractionById(interactionId);
        if (!interaction) return;

        this.editingInteractionId = interactionId;
        this.selectedArtifacts = [...(interaction.artifacts || [])];

        // Render checkboxes first
        this.renderPartnerCheckboxes();
        this.renderInteractionTypeCheckboxes();

        // Populate form with interaction data
        this.modal.populateForm({
            'hs-interaction-date': interaction.date,
            'hs-interaction-other-participants': interaction.otherParticipants || '',
            'hs-interaction-description': interaction.description
        });

        // Check the appropriate partner checkboxes
        interaction.partners?.forEach(partnerName => {
            const checkbox = Array.from(document.querySelectorAll('input[name="hs-partners"]'))
                .find(cb => cb.value === partnerName);
            if (checkbox) checkbox.checked = true;
        });

        // Check the appropriate interaction type checkboxes
        interaction.types?.forEach(type => {
            const checkbox = Array.from(document.querySelectorAll('input[name="interaction-types"]'))
                .find(cb => cb.value === type);
            if (checkbox) checkbox.checked = true;
        });

        this.renderArtifactsList();

        this.modal.setTitle('Edit High School Interaction');
        this.modal.setSubmitText('Update Interaction');
        this.modal.open();
    }

    deleteInteraction(interactionId) {
        if (confirm('Are you sure you want to delete this interaction?')) {
            state.deleteHighSchoolInteraction(interactionId);
        }
    }

    render() {
        if (!this.container) return;

        const interactions = state.highSchoolInteractions;

        if (interactions.length === 0) {
            this.container.innerHTML = emptyStateTemplate('school', 'No high school interactions yet. Add an interaction to get started.');
            return;
        }

        // Sort interactions by date (newest first)
        const sortedInteractions = [...interactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        this.container.innerHTML = sortedInteractions.map(hsInteractionCardTemplate).join('');
    }
}
