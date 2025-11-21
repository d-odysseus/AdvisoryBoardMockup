/**
 * Application Constants and Configuration
 */

export const MAX_PRIORITY_TACTICS = 5;
export const MAX_BOARD_MEMBERS = 20;
export const MAX_SPECIAL_SESSION_MEMBERS = 20;
export const MAX_HIGH_SCHOOL_PARTNERS = 30;
export const MAX_HIGH_SCHOOL_INTERACTIONS = 100;
export const MAX_INTERACTION_ARTIFACTS = 3;
export const DEFAULT_TACTIC_YEAR = 2025;
export const TACTIC_TRUNCATE_WORDS = 15;

// Priority Tactics (Goals) organized by year
export const AVAILABLE_TACTICS = [
    // Current Year (2025)
    {
        id: 'ev-certificate-2025',
        name: 'Develop comprehensive General Automotive Certificate program that includes extensive Electric Vehicle curriculum with hands-on training and industry partnerships',
        year: 2025
    },
    {
        id: 'ev-training-2025',
        name: 'Develop standalone EV training for incumbent workers',
        year: 2025
    },
    {
        id: 'adas-curriculum-2025',
        name: 'Create Advanced Driver Assistance Systems (ADAS) training program with sensor calibration, camera alignment, and radar testing components for modern vehicles',
        year: 2025
    },
    {
        id: 'industry-partnerships-2025',
        name: 'Develop strategic partnerships with automotive manufacturers and dealerships for equipment donations, facility access, training materials, and internship placement opportunities',
        year: 2025
    },

    // Next Year (2026)
    {
        id: 'ev-infrastructure-2026',
        name: 'Identify and plan core infrastructure requirements for EV-centered educational facility including charging stations, high-voltage safety equipment, and specialized diagnostic tools',
        year: 2026
    },
    {
        id: 'hybrid-diagnostics-2026',
        name: 'Establish hybrid vehicle diagnostics and repair certification',
        year: 2026
    },
    {
        id: 'autonomous-curriculum-2026',
        name: 'Develop autonomous vehicle systems curriculum and training modules',
        year: 2026
    },
    {
        id: 'battery-tech-2026',
        name: 'Establish comprehensive battery technology and management certification program covering lithium-ion systems, thermal management, safety protocols, and recycling procedures for electric vehicles',
        year: 2026
    },

    // Prior Year (2024) - Outdated
    {
        id: 'traditional-diagnostics-2024',
        name: 'Expand traditional Internal Combustion Engine diagnostics and repair training programs to include advanced fuel injection systems and emissions control technologies',
        year: 2024,
        outdated: true
    },

    // Dental Hygiene Tactics
    {
        id: 'pediatric-certification-2025',
        name: 'Develop specialized pediatric dental hygiene certification program',
        year: 2025
    },
    {
        id: 'digital-radiography-2025',
        name: 'Implement digital radiography and imaging technology training',
        year: 2025
    },
    {
        id: 'periodontal-therapy-2026',
        name: 'Establish advanced periodontal therapy and disease management curriculum',
        year: 2026
    },
    {
        id: 'community-outreach-2025',
        name: 'Create community dental health outreach and education program partnership',
        year: 2025
    },

    // Integrated Media Tactics
    {
        id: 'podcast-production-2025',
        name: 'Develop professional podcast production and audio storytelling curriculum',
        year: 2025
    },
    {
        id: 'social-media-strategy-2025',
        name: 'Create social media content creation and digital marketing strategy program',
        year: 2025
    },
    {
        id: 'video-streaming-2026',
        name: 'Establish live streaming and multi-camera video production certification',
        year: 2026
    },
    {
        id: 'documentary-filmmaking-2026',
        name: 'Build documentary filmmaking and investigative journalism track',
        year: 2026
    },

    // Fisheries Tactics
    {
        id: 'habitat-restoration-2025',
        name: 'Develop hands-on habitat restoration and watershed assessment training program',
        year: 2025
    },
    {
        id: 'aquaculture-systems-2025',
        name: 'Establish sustainable aquaculture and hatchery management curriculum',
        year: 2025
    },
    {
        id: 'fish-health-2026',
        name: 'Create fish health monitoring and disease prevention certification',
        year: 2026
    },
    {
        id: 'tribal-partnerships-2026',
        name: 'Build tribal co-management and indigenous knowledge integration program',
        year: 2026
    }
];

// High School Interaction Types
export const INTERACTION_TYPES = [
    'Career Day at MHCC',
    'Program Orientation at MHCC',
    'Program Orientation at High School',
    'Hands-on Day at MHCC',
    'Outreach Effort at High School',
    'Meeting with High School Partners',
    'College Faculty Guest Lectures at High Schools',
    'Industry Panel Events',
    'MHCC Open House',
    'Project-Based Collaborations Between MHCC and High Schools',
    'Dual Credit Teacher Training',
    'Dual Credit Evaluation Meetings',
    'Curriculum Alignment Meetings',
    'Student Placement Testing Sessions',
    'Application Workshops at High Schools',
    'Parent/Guardian Information Nights',
    'Student Ambassador Visits to High Schools',
    'CTE/SkillsUSA Competitions or Events Hosted at MHCC',
    'MHCC Student Capstone Showcases',
    'High School Teacher Professional Development',
    'High School Teacher Participation in Advisory Committees',
    'Joint Grant Planning Meetings',
    'Community CTE Fairs Hosted at MHCC',
    'Employer-Supported Presentations to High Schools',
    'Industry Tours for High School Students'
];

// Accepted file types for interaction artifacts
export const ACCEPTED_ARTIFACT_TYPES = '.pdf,.doc,.docx,.ppt,.pptx';

// Department/Program Configuration
export const DEPARTMENTS = [
    {
        id: 'automotive',
        name: 'Automotive Technologies',
        perkinsEligibleSchools: [
            'Centennial (CLC & Virtual Academy)',
            'Corbett',
            'Sandy',
            'Parkrose',
            'Reynolds',
            'Riverdale',
            'Metro East Web Academy (MEWA)',
            'Center for Advanced Learning (CAL)'
        ]
    },
    {
        id: 'dental',
        name: 'Dental Hygiene',
        perkinsEligibleSchools: [
            'Centennial (CLC & Virtual Academy)',
            'Reynolds',
            'Parkrose',
            'Metro East Web Academy (MEWA)',
            'Center for Advanced Learning (CAL)'
        ]
    },
    {
        id: 'media',
        name: 'Integrated Media',
        perkinsEligibleSchools: [
            'Centennial (CLC & Virtual Academy)',
            'Sandy',
            'Parkrose',
            'Reynolds',
            'Metro East Web Academy (MEWA)',
            'Center for Advanced Learning (CAL)'
        ]
    },
    {
        id: 'fisheries',
        name: 'Fisheries',
        perkinsEligibleSchools: [
            'Corbett',
            'Sandy',
            'Reynolds',
            'Riverdale',
            'Center for Advanced Learning (CAL)'
        ]
    }
];

export const DEFAULT_DEPARTMENT = 'automotive';
