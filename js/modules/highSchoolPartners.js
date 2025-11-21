/**
 * High School Partners Module
 * Business logic and rendering for high school partners
 */

import { state } from './state.js';
import { MAX_HIGH_SCHOOL_PARTNERS } from '../config/constants.js';
import { generateId, closeAll } from '../utils/helpers.js';
import { hsPartnerCardTemplate, emptyStateTemplate } from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';

export class HighSchoolPartnersManager {
    constructor() {
        this.modal = new ModalManager('hs-partner-modal', 'hs-partner-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('hs-partners-list');
        this.editingPartnerId = null;

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-hs-partner-modal', 'cancel-hs-partner-btn']);
        this.modal.setSubmitHandler(() => this.handleAddPartner());
        this.modal.setCloseHandler(() => this.resetForm());

        // Add partner button
        document.getElementById('add-hs-partner-btn')?.addEventListener('click', () => this.openPartnerModal());

        // Event delegation for partner actions
        this.container?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const partnerId = e.target.closest('[data-partner-id]')?.dataset.partnerId;

            if (action && partnerId) {
                this.handleAction(action, partnerId, e);
            }
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.member-menu')) {
                closeAll('.member-menu-dropdown');
            }
        });
    }

    setupStateSubscriptions() {
        state.subscribe('highSchoolPartners', () => this.render());
    }

    handleAction(action, partnerId, event) {
        switch (action) {
            case 'toggle-partner-menu':
                this.togglePartnerMenu(event, partnerId);
                break;
            case 'edit-partner':
                this.editPartner(partnerId);
                break;
            case 'delete-partner':
                this.deletePartner(partnerId);
                break;
        }
    }

    togglePartnerMenu(event, partnerId) {
        event.stopPropagation();
        const menu = document.getElementById(`menu-${partnerId}`);
        if (menu) {
            const isActive = menu.classList.contains('active');
            closeAll('.member-menu-dropdown');
            if (!isActive) {
                menu.classList.add('active');
            }
        }
    }

    openPartnerModal() {
        if (state.highSchoolPartners.length >= MAX_HIGH_SCHOOL_PARTNERS) {
            this.errorModal.show(`You have reached the maximum limit of ${MAX_HIGH_SCHOOL_PARTNERS} high school partners. Please remove a partner before adding a new one.`);
            return;
        }

        this.modal.open();
    }

    resetForm() {
        this.editingPartnerId = null;
        this.modal.setTitle('Add High School Partner');
        this.modal.setSubmitText('Add Partner');
    }

    handleAddPartner() {
        const formData = this.modal.getFormData();

        const partnerData = {
            name: formData['hs-partner-name'] || '',
            school: formData['hs-partner-school'] || '',
            title: formData['hs-partner-title'] || '',
            email: formData['hs-partner-email'] || '',
            phone: formData['hs-partner-phone'] || '',
            role: formData['hs-partner-role'] || ''
        };

        // Basic validation
        if (!partnerData.name || !partnerData.school || !partnerData.title || !partnerData.email || !partnerData.phone) {
            this.errorModal.show('Please fill in all required fields.');
            return;
        }

        if (this.editingPartnerId) {
            // Update existing partner
            state.updateHighSchoolPartner(this.editingPartnerId, partnerData);
        } else {
            // Add new partner
            const partner = {
                id: generateId(),
                ...partnerData
            };
            state.addHighSchoolPartner(partner);
        }

        this.modal.close();
        this.resetForm();
    }

    editPartner(partnerId) {
        const partner = state.getHighSchoolPartnerById(partnerId);
        if (!partner) return;

        this.editingPartnerId = partnerId;

        // Populate form with partner data
        this.modal.populateForm({
            'hs-partner-name': partner.name,
            'hs-partner-school': partner.school,
            'hs-partner-title': partner.title,
            'hs-partner-email': partner.email,
            'hs-partner-phone': partner.phone,
            'hs-partner-role': partner.role || ''
        });

        this.modal.setTitle('Edit High School Partner');
        this.modal.setSubmitText('Update Partner');
        this.modal.open();
    }

    deletePartner(partnerId) {
        if (confirm('Are you sure you want to delete this partner?')) {
            state.deleteHighSchoolPartner(partnerId);
        }
    }

    render() {
        if (!this.container) return;

        const partners = state.highSchoolPartners;

        if (partners.length === 0) {
            this.container.innerHTML = emptyStateTemplate('school', 'No high school partners yet. Add a partner to get started.');
            return;
        }

        this.container.innerHTML = partners.map(hsPartnerCardTemplate).join('');
    }
}
