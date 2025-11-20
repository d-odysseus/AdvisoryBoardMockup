/**
 * Special Session Members Module
 * Business logic and rendering for special session members
 */

import { state } from './state.js';
import { MAX_SPECIAL_SESSION_MEMBERS } from '../config/constants.js';
import { generateId, readFileAsDataURL, closeAll } from '../utils/helpers.js';
import { memberCardTemplate, emptyStateTemplate } from '../utils/templates.js';
import { ModalManager, ErrorModal } from '../utils/modalManager.js';

export class SpecialSessionMembersManager {
    constructor() {
        this.modal = new ModalManager('special-session-member-modal', 'special-session-member-form');
        this.errorModal = new ErrorModal();
        this.container = document.getElementById('special-session-members-list');
        this.editingMemberId = null;

        this.setupEventListeners();
        this.setupStateSubscriptions();
    }

    setupEventListeners() {
        // Modal event listeners
        this.modal.setupEventListeners(['close-special-session-member-modal', 'cancel-special-session-member-btn']);
        this.modal.setSubmitHandler(() => this.handleAddMember());
        this.modal.setCloseHandler(() => this.resetProfileImage());

        // Add member button
        document.getElementById('add-special-session-member-btn')?.addEventListener('click', () => this.openMemberModal());

        // Profile image upload
        document.getElementById('upload-special-session-profile-image-btn')?.addEventListener('click', () => {
            document.getElementById('special-session-member-profile-image')?.click();
        });

        document.getElementById('special-session-member-profile-image')?.addEventListener('change', (e) => {
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
        state.subscribe('specialSessionMembers', () => this.render());
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
        if (state.specialSessionMembers.length >= MAX_SPECIAL_SESSION_MEMBERS) {
            this.errorModal.show(`You have reached the maximum limit of ${MAX_SPECIAL_SESSION_MEMBERS} special session members. Please remove a member before adding a new one.`);
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

            const preview = document.getElementById('special-session-profile-image-preview');
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
        this.editingMemberId = null;
        const preview = document.getElementById('special-session-profile-image-preview');
        if (preview) {
            preview.innerHTML = '<span class="material-icons">person</span>';
        }
        this.modal.setTitle('Add Special Session Member');
        this.modal.setSubmitText('Add Member');
    }

    handleAddMember() {
        const formData = this.modal.getFormData();

        const memberData = {
            name: formData['special-session-member-name'] || '',
            organization: formData['special-session-member-organization'] || '',
            title: formData['special-session-member-title'] || '',
            email: formData['special-session-member-email'] || '',
            phone: formData['special-session-member-phone'] || '',
            category: formData['special-session-member-category'] || '',
            status: 'special-session',
            expertise: formData['special-session-member-expertise'] || '',
            profileImage: state.currentProfileImage
        };

        // Basic validation
        if (!memberData.name || !memberData.organization) {
            this.errorModal.show('Please fill in all required fields.');
            return;
        }

        if (this.editingMemberId) {
            // Update existing member
            state.updateSpecialSessionMember(this.editingMemberId, memberData);
        } else {
            // Add new member
            const member = {
                id: generateId(),
                ...memberData
            };
            state.addSpecialSessionMember(member);
        }

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
        console.log('Edit special session member:', memberId);
        // Close menu
        document.getElementById(`menu-${memberId}`)?.classList.remove('active');

        // Get member data
        const member = state.getSpecialSessionMemberById(memberId);
        if (!member) return;

        // Set editing mode
        this.editingMemberId = memberId;

        // Update modal title and button
        this.modal.setTitle('Edit Special Session Member');
        this.modal.setSubmitText('Update Member');

        // Populate form with member data
        document.getElementById('special-session-member-name').value = member.name || '';
        document.getElementById('special-session-member-organization').value = member.organization || '';
        document.getElementById('special-session-member-title').value = member.title || '';
        document.getElementById('special-session-member-email').value = member.email || '';
        document.getElementById('special-session-member-phone').value = member.phone || '';
        document.getElementById('special-session-member-category').value = member.category || '';
        document.getElementById('special-session-member-expertise').value = member.expertise || '';

        // Handle profile image
        if (member.profileImage) {
            state.currentProfileImage = member.profileImage;
            const preview = document.getElementById('special-session-profile-image-preview');
            if (preview) {
                preview.innerHTML = `<img src="${member.profileImage}" alt="Profile Preview">`;
            }
        }

        // Open modal
        this.modal.open();
    }

    deleteMember(memberId) {
        console.log('Delete special session member:', memberId);
        // Close menu
        document.getElementById(`menu-${memberId}`)?.classList.remove('active');

        // Confirm deletion
        if (confirm('Are you sure you want to delete this member?')) {
            state.deleteSpecialSessionMember(memberId);
        }
    }

    deleteProfileImage(memberId) {
        state.updateSpecialSessionMember(memberId, { profileImage: null });
    }

    render() {
        if (!this.container) return;

        const members = state.specialSessionMembers;

        if (members.length === 0) {
            this.container.innerHTML = emptyStateTemplate('people_outline', 'No special session members added yet. Click "Add Member" to get started.');
            return;
        }

        this.container.innerHTML = members.map(memberCardTemplate).join('');
    }
}
