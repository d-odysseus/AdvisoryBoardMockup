/**
 * Application Constants and Configuration
 */

export const MAX_PRIORITY_TACTICS = 5;
export const MAX_BOARD_MEMBERS = 20;
export const MAX_SPECIAL_SESSION_MEMBERS = 20;
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
    }
];
