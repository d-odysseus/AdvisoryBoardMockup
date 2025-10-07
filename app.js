// Data Storage
let boardMembers = [];
let priorityGoals = [];
let meetings = [];

// Priority Tactics (Goals)
const availableTactics = [
    {
        id: 'ev-certificate',
        name: 'Develop General Automotive Certificate that includes EV curriculum'
    },
    {
        id: 'ev-training',
        name: 'Develop standalone EV training for incumbent workers'
    },
    {
        id: 'ev-infrastructure',
        name: 'Identify core infrastructure for EV-centered educational facility'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadMockData();
});

function initializeApp() {
    updateSummaryCards();
    renderPriorityGoals();
    renderMembers();
    renderMeetings();
    populateGoalDropdown();
}

function setupEventListeners() {
    // Add Member Modal
    document.getElementById('add-member-btn').addEventListener('click', openMemberModal);
    document.getElementById('close-member-modal').addEventListener('click', closeMemberModal);
    document.getElementById('cancel-member-btn').addEventListener('click', closeMemberModal);
    document.getElementById('member-form').addEventListener('submit', handleAddMember);

    // Add Goal Modal
    document.getElementById('add-goal-btn').addEventListener('click', openGoalModal);
    document.getElementById('close-goal-modal').addEventListener('click', closeGoalModal);
    document.getElementById('cancel-goal-btn').addEventListener('click', closeGoalModal);
    document.getElementById('goal-form').addEventListener('submit', handleAddGoal);

    // Add Meeting Modal
    document.getElementById('add-meeting-btn').addEventListener('click', openMeetingModal);
    document.getElementById('close-meeting-modal').addEventListener('click', closeMeetingModal);
    document.getElementById('cancel-meeting-btn').addEventListener('click', closeMeetingModal);
    document.getElementById('meeting-form').addEventListener('submit', handleAddMeeting);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Tactics checkboxes change event
    document.getElementById('tactics-checkboxes').addEventListener('change', handleTacticsChange);
}

// Summary Cards
function updateSummaryCards() {
    document.getElementById('member-count').textContent = boardMembers.length;
    document.getElementById('goal-count').textContent = priorityGoals.length;
    document.getElementById('meeting-count').textContent = meetings.length;
}

// Priority Goals Functions
function populateGoalDropdown() {
    const select = document.getElementById('goal-select');
    select.innerHTML = '<option value="">Select a tactic</option>';

    availableTactics.forEach(tactic => {
        if (!priorityGoals.find(g => g.id === tactic.id)) {
            const option = document.createElement('option');
            option.value = tactic.id;
            option.textContent = tactic.name;
            select.appendChild(option);
        }
    });
}

function openGoalModal() {
    populateGoalDropdown();
    document.getElementById('goal-modal').classList.add('active');
}

function closeGoalModal() {
    document.getElementById('goal-modal').classList.remove('active');
    document.getElementById('goal-form').reset();
}

function handleAddGoal(e) {
    e.preventDefault();

    const tacticId = document.getElementById('goal-select').value;
    const tactic = availableTactics.find(t => t.id === tacticId);

    if (tactic && !priorityGoals.find(g => g.id === tactic.id)) {
        priorityGoals.push(tactic);
        renderPriorityGoals();
        updateSummaryCards();
        closeGoalModal();
    }
}

function removeGoal(tacticId) {
    priorityGoals = priorityGoals.filter(g => g.id !== tacticId);
    renderPriorityGoals();
    updateSummaryCards();
}

function renderPriorityGoals() {
    const container = document.getElementById('priority-goals-container');

    if (priorityGoals.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No priority goals selected. Click "Add Goal" to get started.</p></div>';
        return;
    }

    container.innerHTML = priorityGoals.map(goal => `
        <div class="goal-badge">
            <span>${goal.name}</span>
            <span class="material-icons" onclick="removeGoal('${goal.id}')">close</span>
        </div>
    `).join('');
}

// Board Members Functions
function openMemberModal() {
    document.getElementById('member-modal').classList.add('active');
    // Smooth scroll to top of form
    setTimeout(() => {
        document.getElementById('member-name').focus();
    }, 100);
}

function closeMemberModal() {
    document.getElementById('member-modal').classList.remove('active');
    document.getElementById('member-form').reset();
}

function handleAddMember(e) {
    e.preventDefault();

    const member = {
        id: Date.now().toString(),
        name: document.getElementById('member-name').value,
        organization: document.getElementById('member-organization').value,
        title: document.getElementById('member-title').value,
        email: document.getElementById('member-email').value,
        phone: document.getElementById('member-phone').value,
        category: document.getElementById('member-category').value,
        expertise: document.getElementById('member-expertise').value
    };

    boardMembers.push(member);
    renderMembers();
    updateSummaryCards();
    closeMemberModal();
}

function renderMembers() {
    const container = document.getElementById('members-list');

    if (boardMembers.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="material-icons">people_outline</span><p>No board members added yet. Click "Add Member" to get started.</p></div>';
        return;
    }

    container.innerHTML = boardMembers.map(member => `
        <div class="member-card">
            <h3>${member.name}</h3>
            <div class="member-title">${member.title}</div>
            <div class="member-org">${member.organization}</div>
            <div class="member-contact">
                <span class="material-icons">email</span>
                ${member.email}
            </div>
            <div class="member-contact">
                <span class="material-icons">phone</span>
                ${member.phone}
            </div>
            <span class="member-category">${formatCategory(member.category)}</span>
            ${member.expertise ? `<div class="member-expertise"><strong>Expertise:</strong> ${member.expertise}</div>` : ''}
        </div>
    `).join('');
}

function formatCategory(category) {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Meetings Functions
function openMeetingModal() {
    if (boardMembers.length === 0) {
        alert('Please add board members before creating a meeting.');
        return;
    }

    if (priorityGoals.length === 0) {
        alert('Please add priority goals before creating a meeting.');
        return;
    }

    populateAttendees();
    populateTactics();
    document.getElementById('meeting-modal').classList.add('active');

    // Smooth scroll to top of form
    setTimeout(() => {
        document.getElementById('meeting-date').focus();
    }, 100);
}

function closeMeetingModal() {
    document.getElementById('meeting-modal').classList.remove('active');
    document.getElementById('meeting-form').reset();
    document.getElementById('recommendations-container').innerHTML = '';
}

function populateAttendees() {
    const container = document.getElementById('attendees-checkboxes');
    container.innerHTML = boardMembers.map(member => `
        <div class="checkbox-item">
            <input type="checkbox" id="attendee-${member.id}" value="${member.id}">
            <label for="attendee-${member.id}">${member.name} - ${member.organization}</label>
        </div>
    `).join('');
}

function populateTactics() {
    const container = document.getElementById('tactics-checkboxes');
    container.innerHTML = priorityGoals.map(goal => `
        <div class="checkbox-item">
            <input type="checkbox" id="tactic-${goal.id}" value="${goal.id}">
            <label for="tactic-${goal.id}">${goal.name}</label>
        </div>
    `).join('');
}

function handleTacticsChange(e) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = '';

    const checkedTactics = Array.from(document.querySelectorAll('#tactics-checkboxes input:checked'));

    checkedTactics.forEach(checkbox => {
        const tacticId = checkbox.value;
        const tactic = priorityGoals.find(g => g.id === tacticId);

        if (tactic) {
            const section = document.createElement('div');
            section.className = 'recommendations-section';
            section.innerHTML = `
                <h4>${tactic.name}</h4>
                <div class="form-group recommendation-input">
                    <label for="rec-${tacticId}">Recommendations (Optional)</label>
                    <textarea id="rec-${tacticId}" rows="3" placeholder="Enter recommendations for this tactic..."></textarea>
                </div>
            `;
            recommendationsContainer.appendChild(section);
        }
    });
}

function handleAddMeeting(e) {
    e.preventDefault();

    // Get selected attendees
    const attendeeCheckboxes = document.querySelectorAll('#attendees-checkboxes input:checked');
    if (attendeeCheckboxes.length === 0) {
        alert('Please select at least one attendee.');
        return;
    }

    const attendeeIds = Array.from(attendeeCheckboxes).map(cb => cb.value);
    const attendees = boardMembers.filter(m => attendeeIds.includes(m.id));

    // Get selected tactics with recommendations
    const tacticCheckboxes = document.querySelectorAll('#tactics-checkboxes input:checked');
    if (tacticCheckboxes.length === 0) {
        alert('Please select at least one priority tactic.');
        return;
    }

    const tacticsDiscussed = Array.from(tacticCheckboxes).map(cb => {
        const tacticId = cb.value;
        const tactic = priorityGoals.find(g => g.id === tacticId);
        const recommendations = document.getElementById(`rec-${tacticId}`)?.value || '';

        return {
            id: tacticId,
            name: tactic.name,
            recommendations: recommendations
        };
    });

    const meeting = {
        id: Date.now().toString(),
        date: document.getElementById('meeting-date').value,
        attendees: attendees,
        tacticsDiscussed: tacticsDiscussed
    };

    meetings.push(meeting);
    meetings.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
    renderMeetings();
    updateSummaryCards();
    closeMeetingModal();
}

function renderMeetings() {
    const container = document.getElementById('meetings-list');

    if (meetings.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="material-icons">event_note</span><p>No meetings recorded yet. Click "Add Meeting" to get started.</p></div>';
        return;
    }

    container.innerHTML = meetings.map(meeting => `
        <div class="meeting-card">
            <div class="meeting-header">
                <div class="meeting-date">
                    <span class="material-icons">event</span>
                    <span>${formatDate(meeting.date)}</span>
                </div>
            </div>

            <div class="meeting-attendees">
                <h4>Attendees (${meeting.attendees.length})</h4>
                <div class="attendee-list">
                    ${meeting.attendees.map(a => `<span class="attendee-chip">${a.name}</span>`).join('')}
                </div>
            </div>

            <div class="meeting-tactics">
                <h4>Priority Tactics Discussed</h4>
                ${meeting.tacticsDiscussed.map(tactic => `
                    <div class="tactic-item">
                        <h5>${tactic.name}</h5>
                        ${tactic.recommendations ? `
                            <div class="tactic-recommendations">
                                <strong>Recommendations:</strong> ${tactic.recommendations}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Load Mock Data
function loadMockData() {
    // Add some mock board members
    boardMembers = [
        {
            id: '1',
            name: 'Sarah Johnson',
            organization: 'Premier Auto Group',
            title: 'Service Director',
            email: 'sjohnson@premierauto.com',
            phone: '(555) 123-4567',
            category: 'employer',
            expertise: 'EV maintenance and repair, dealership operations, technician training'
        },
        {
            id: '2',
            name: 'Michael Chen',
            organization: 'Tesla Service Center',
            title: 'Lead EV Technician',
            email: 'mchen@tesla.com',
            phone: '(555) 234-5678',
            category: 'employer',
            expertise: 'Electric vehicle systems, battery technology, diagnostic tools'
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            organization: 'Green Transportation Alliance',
            title: 'Executive Director',
            email: 'erodriguez@greentrans.org',
            phone: '(555) 345-6789',
            category: 'non-profit',
            expertise: 'EV adoption strategies, sustainable transportation, workforce development'
        },
        {
            id: '4',
            name: 'David Thompson',
            organization: 'State Department of Transportation',
            title: 'EV Infrastructure Manager',
            email: 'dthompson@state.gov',
            phone: '(555) 456-7890',
            category: 'public-agency',
            expertise: 'EV charging infrastructure, state regulations, fleet electrification'
        }
    ];

    // Add all priority goals
    priorityGoals = [...availableTactics];

    // Add a sample meeting
    meetings = [
        {
            id: '1',
            date: '2025-09-15',
            attendees: [boardMembers[0], boardMembers[1], boardMembers[2]],
            tacticsDiscussed: [
                {
                    id: 'ev-certificate',
                    name: 'Develop General Automotive Certificate that includes EV curriculum',
                    recommendations: 'Include hands-on training with both hybrid and fully electric vehicles. Ensure curriculum covers safety protocols for high-voltage systems. Partner with local dealerships for equipment donations.'
                },
                {
                    id: 'ev-infrastructure',
                    name: 'Identify core infrastructure for EV-centered educational facility',
                    recommendations: 'Prioritize Level 2 charging stations with multiple connectors. Need at least 3 vehicle lifts rated for EVs. Budget for diagnostic equipment from multiple manufacturers.'
                }
            ]
        }
    ];

    // Render everything
    renderMembers();
    renderPriorityGoals();
    renderMeetings();
    updateSummaryCards();
}
