/**
 * Mock Data for Application Initialization
 */

export const MOCK_MEMBERS = [
    {
        id: '1',
        name: 'Sarah Johnson',
        organization: 'Premier Auto Group',
        title: 'Service Director',
        email: 'sjohnson@premierauto.com',
        phone: '(555) 123-4567',
        category: 'employer',
        status: 'core',
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
        status: 'core',
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
        status: 'non-core',
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
        status: 'non-core',
        expertise: 'EV charging infrastructure, state regulations, fleet electrification'
    }
];

export const MOCK_GOALS = [
    'ev-certificate-2025',
    'adas-curriculum-2025',
    'ev-infrastructure-2026',
    'traditional-diagnostics-2024'
];

export const MOCK_MEETINGS = [
    {
        id: '1',
        date: '2025-09-15',
        attendeeIds: ['1', '2', '3'],
        tacticsDiscussed: [
            {
                id: 'ev-certificate-2025',
                name: 'Develop General Automotive Certificate that includes EV curriculum',
                recommendations: 'Include hands-on training with both hybrid and fully electric vehicles. Ensure curriculum covers safety protocols for high-voltage systems. Partner with local dealerships for equipment donations.'
            },
            {
                id: 'ev-infrastructure-2026',
                name: 'Identify core infrastructure for EV-centered educational facility',
                recommendations: 'Prioritize Level 2 charging stations with multiple connectors. Need at least 3 vehicle lifts rated for EVs. Budget for diagnostic equipment from multiple manufacturers.'
            }
        ]
    }
];
