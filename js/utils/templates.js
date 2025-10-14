/**
 * HTML Template Functions
 * Separated rendering logic for better maintainability
 */

import { formatCategory, formatDate, truncateText, escapeHtml } from './helpers.js';
import { TACTIC_TRUNCATE_WORDS } from '../config/constants.js';

/**
 * Generate empty state HTML
 */
export function emptyStateTemplate(icon, message) {
    return `
        <div class="empty-state">
            ${icon ? `<span class="material-icons">${icon}</span>` : ''}
            <p>${message}</p>
        </div>
    `;
}

/**
 * Generate goal badge HTML
 */
export function goalBadgeTemplate(goal) {
    const outdatedClass = goal.outdated ? 'outdated' : '';
    const yearLabel = goal.outdated ? 'Outdated' : goal.year;
    const truncatedName = truncateText(goal.name, TACTIC_TRUNCATE_WORDS);
    const escapedFullText = escapeHtml(goal.name);

    return `
        <div class="goal-badge ${outdatedClass}" data-expanded="false" data-goal-id="${goal.id}">
            <div class="goal-badge-content" data-action="toggle-goal" data-goal-id="${goal.id}">
                <span class="goal-badge-name" data-full-text="${escapedFullText}">${truncatedName}</span>
                <span class="goal-badge-year">${yearLabel}</span>
            </div>
            <span class="material-icons goal-badge-close" data-action="remove-goal" data-goal-id="${goal.id}">close</span>
        </div>
    `;
}

/**
 * Generate member card HTML
 */
export function memberCardTemplate(member) {
    return `
        <div class="member-card">
            <div class="member-profile-section">
                <div class="member-profile-image">
                    ${member.profileImage
                        ? `<img src="${member.profileImage}" alt="${escapeHtml(member.name)}">`
                        : '<span class="material-icons">person</span>'}
                </div>
                <div class="member-profile-info">
                    <div class="member-card-header">
                        <h3>${escapeHtml(member.name)}</h3>
                        <div class="member-menu">
                            <button class="member-menu-btn" data-action="toggle-member-menu" data-member-id="${member.id}">
                                <span class="material-icons">more_vert</span>
                            </button>
                            <div class="member-menu-dropdown" id="menu-${member.id}">
                                <div class="member-menu-item" data-action="edit-member" data-member-id="${member.id}">
                                    <span class="material-icons">edit</span>
                                    <span>Edit</span>
                                </div>
                                <div class="member-menu-item" data-action="delete-member" data-member-id="${member.id}">
                                    <span class="material-icons">delete</span>
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="member-title">${escapeHtml(member.title)}</div>
                    <div class="member-org">${escapeHtml(member.organization)}</div>
                    ${member.profileImage ? `
                    <div class="member-image-actions">
                        <button class="btn-delete-image" data-action="delete-profile-image" data-member-id="${member.id}">
                            <span class="material-icons">delete</span>
                            Delete Image
                        </button>
                    </div>` : ''}
                </div>
            </div>
            <div class="member-contact">
                <span class="material-icons">email</span>
                ${escapeHtml(member.email)}
            </div>
            <div class="member-contact">
                <span class="material-icons">phone</span>
                ${escapeHtml(member.phone)}
            </div>
            <div class="member-badges">
                <span class="member-category">${formatCategory(member.category)}</span>
                <span class="member-status ${member.status}">${formatCategory(member.status)}</span>
            </div>
            ${member.expertise ? `<div class="member-expertise"><strong>Expertise:</strong> ${escapeHtml(member.expertise)}</div>` : ''}
        </div>
    `;
}

/**
 * Generate attendee chip HTML
 */
export function attendeeChipTemplate(attendee) {
    return `
        <span class="attendee-chip">
            <div class="attendee-chip-image">
                ${attendee.profileImage
                    ? `<img src="${attendee.profileImage}" alt="${escapeHtml(attendee.name)}">`
                    : '<span class="material-icons">person</span>'}
            </div>
            ${escapeHtml(attendee.name)}
        </span>
    `;
}

/**
 * Generate tactic item HTML for meetings
 */
export function tacticItemTemplate(tactic) {
    return `
        <div class="tactic-item">
            <h5>${escapeHtml(tactic.name)}</h5>
            ${tactic.recommendations ? `
                <div class="tactic-recommendations">
                    <strong>Recommendations:</strong> ${escapeHtml(tactic.recommendations)}
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Generate meeting card HTML
 */
export function meetingCardTemplate(meeting) {
    return `
        <div class="meeting-card">
            <div class="meeting-header">
                <div class="meeting-date">
                    <span class="material-icons">event</span>
                    <span>${formatDate(meeting.date)}</span>
                </div>
                <div class="meeting-menu">
                    <button class="meeting-menu-btn" data-action="toggle-meeting-menu" data-meeting-id="${meeting.id}">
                        <span class="material-icons">more_vert</span>
                    </button>
                    <div class="meeting-menu-dropdown" id="meeting-menu-${meeting.id}">
                        <div class="meeting-menu-item" data-action="edit-meeting" data-meeting-id="${meeting.id}">
                            <span class="material-icons">edit</span>
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="meeting-attendees">
                <h4>Attendees (${meeting.attendees.length})</h4>
                <div class="attendee-list">
                    ${meeting.attendees.map(attendeeChipTemplate).join('')}
                </div>
            </div>

            <div class="meeting-tactics">
                <h4>Priority Tactics Discussed</h4>
                ${meeting.tacticsDiscussed.map(tacticItemTemplate).join('')}
            </div>
        </div>
    `;
}

/**
 * Generate checkbox item HTML
 */
export function checkboxItemTemplate(id, value, label, title = '') {
    return `
        <div class="checkbox-item">
            <input type="checkbox" id="${id}" value="${value}">
            <label for="${id}" ${title ? `title="${escapeHtml(title)}"` : ''}>${escapeHtml(label)}</label>
        </div>
    `;
}

/**
 * Generate recommendation section HTML
 */
export function recommendationSectionTemplate(tactic) {
    return `
        <div class="recommendations-section">
            <h4>${escapeHtml(tactic.name)}</h4>
            <div class="form-group recommendation-input">
                <label for="rec-${tactic.id}">Recommendations (Optional)</label>
                <textarea id="rec-${tactic.id}" rows="3" placeholder="Enter recommendations for this tactic and describe the nature of the recommendation: made by an individual, voted on by the committee etc."></textarea>
            </div>
        </div>
    `;
}

/**
 * Generate dropdown option HTML
 */
export function dropdownOptionTemplate(value, text, title = '') {
    return `<option value="${value}" ${title ? `title="${escapeHtml(title)}"` : ''}>${escapeHtml(text)}</option>`;
}
