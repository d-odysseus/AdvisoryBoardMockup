/**
 * Members Module
 * Business logic and rendering for board members
 */

import { state } from './state.js';
import { MAX_BOARD_MEMBERS } from '../config/constants.js';
import { generateId, readFileAsDataURL, closeAll } from '../utils/helpers.js';
import { memberCardTemplate, emptyStateTemplate } from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';

export class MembersManager {
    constructor() {
        this.modal = new ModalManager('member-modal', 'member-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('members-list');

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-member-modal', 'cancel-member-btn']);
        this.modal.setSubmitHandler(() => this.handleAddMember());
        this.modal.setCloseHandler(() => this.resetProfileImage());

        // Add member button
        document.getElementById('add-member-btn')?.addEventListener('click', () => this.openMemberModal());

        // Profile image upload
        document.getElementById('upload-profile-image-btn')?.addEventListener('click', () => {
            document.getElementById('member-profile-image')?.click();
        });

        document.getElementById('member-profile-image')?.addEventListener('change', (e) => {
            this.handleProfileImageSelect(e);
        });

        // Event delegation for member actions
        this.container?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const memberId = e.target.closest('[data-member-id]')?.dataset.memberId;

            if (action && memberId) {
                this.handleAction(action, memberId, e);
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
        state.subscribe('boardMembers', () => this.render());
    }

    handleAction(action, memberId, event) {
        switch (action) {
            case 'toggle-member-menu':
                this.toggleMemberMenu(event, memberId);
                break;
            case 'edit-member':
                this.editMember(memberId);
                break;
            case 'delete-member':
                this.deleteMember(memberId);
                break;
            case 'delete-profile-image':
                this.deleteProfileImage(memberId);
                break;
        }
    }

    openMemberModal() {
        if (state.boardMembers.length >= MAX_BOARD_MEMBERS) {
            this.errorModal.show(`You have reached the maximum limit of ${MAX_BOARD_MEMBERS} board members. Please remove a member before adding a new one.`);
            return;
        }

        this.modal.open();
    }

    async handleProfileImageSelect(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const dataUrl = await readFileAsDataURL(file);
            state.currentProfileImage = dataUrl;

            const preview = document.getElementById('profile-image-preview');
            if (preview) {
                preview.innerHTML = `<img src="${dataUrl}" alt="Profile Preview">`;
            }
        } catch (error) {
            console.error('Error reading image file:', error);
            this.errorModal.show('Invalid image file. Please select a valid image.');
        }
    }

    resetProfileImage() {
        state.currentProfileImage = null;
        const preview = document.getElementById('profile-image-preview');
        if (preview) {
            preview.innerHTML = '<span class="material-icons">person</span>';
        }
    }

    handleAddMember() {
        const formData = this.modal.getFormData();

        const member = {
            id: generateId(),
            name: formData['member-name'] || '',
            organization: formData['member-organization'] || '',
            title: formData['member-title'] || '',
            email: formData['member-email'] || '',
            phone: formData['member-phone'] || '',
            category: formData['member-category'] || '',
            status: formData['member-status'] || '',
            expertise: formData['member-expertise'] || '',
            profileImage: state.currentProfileImage
        };

        // Basic validation
        if (!member.name || !member.organization) {
            this.errorModal.show('Please fill in all required fields.');
            return;
        }

        state.addMember(member);
        this.modal.close();
    }

    toggleMemberMenu(event, memberId) {
        event.stopPropagation();

        // Close all other menus
        closeAll('.member-menu-dropdown');

        // Toggle current menu
        const menu = document.getElementById(`menu-${memberId}`);
        menu?.classList.toggle('active');
    }

    editMember(memberId) {
        console.log('Edit member:', memberId);
        // Close menu
        document.getElementById(`menu-${memberId}`)?.classList.remove('active');
        // TODO: Implement edit functionality (non-functional for mockup)
    }

    deleteMember(memberId) {
        console.log('Delete member:', memberId);
        // Close menu
        document.getElementById(`menu-${memberId}`)?.classList.remove('active');
        // TODO: Implement delete functionality (non-functional for mockup)
    }

    deleteProfileImage(memberId) {
        state.updateMember(memberId, { profileImage: null });
    }

    render() {
        if (!this.container) return;

        const members = state.boardMembers;

        if (members.length === 0) {
            this.container.innerHTML = emptyStateTemplate('people_outline', 'No board members added yet. Click "Add Member" to get started.');
            return;
        }

        this.container.innerHTML = members.map(memberCardTemplate).join('');
    }
}
