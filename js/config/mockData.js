/**
 * Mock Data for Application Initialization
 * Organized by department
 */

// Automotive Technologies Mock Data
const AUTOMOTIVE_MEMBERS = [
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

export const MOCK_SPECIAL_SESSION_MEMBERS = [
    {
        id: 'ss-1',
        name: 'Dr. Patricia Martinez',
        organization: 'National Battery Research Institute',
        title: 'Senior Research Scientist',
        email: 'pmartinez@nbri.org',
        phone: '(555) 789-0123',
        category: 'other',
        status: 'special-session',
        expertise: 'Advanced battery chemistry, lithium-ion technology, thermal management systems'
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
        duration: 2.5,
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

const AUTOMOTIVE_HIGH_SCHOOL_PARTNERS = [
    {
        id: 'hs1',
        name: 'Jennifer Martinez',
        school: 'Lincoln High School',
        title: 'CTE Director',
        email: 'jmartinez@lincolnhs.edu',
        phone: '(555) 111-2222',
        role: 'Coordinates dual credit programs and career pathways for automotive technology students'
    },
    {
        id: 'hs2',
        name: 'Robert Kim',
        school: 'Jefferson Technical High School',
        title: 'Automotive Instructor',
        email: 'rkim@jeffersontech.edu',
        phone: '(555) 222-3333',
        role: 'Teaches automotive fundamentals and manages student internship placements'
    },
    {
        id: 'hs3',
        name: 'Amanda Foster',
        school: 'Washington High School',
        title: 'Counselor',
        email: 'afoster@washingtonhs.edu',
        phone: '(555) 333-4444',
        role: 'Guides students in career planning and college applications for technical programs'
    }
];

const AUTOMOTIVE_HIGH_SCHOOL_INTERACTIONS = [
    {
        id: 'hsi1',
        date: '2025-03-15',
        partners: ['Jennifer Martinez', 'Robert Kim'],
        otherParticipants: 'Dr. Patricia Lee (MHCC Dean), Mark Stevens (Industry Partner)',
        types: ['Career Day at MHCC', 'Hands-on Day at MHCC'],
        description: 'Hosted 45 high school students for a career exploration day featuring hands-on EV maintenance demonstrations, facility tours, and presentations from current MHCC students and industry professionals. Students rotated through stations covering battery systems, diagnostic tools, and charging infrastructure.',
        artifacts: ['Career_Day_Agenda_2025.pdf', 'Student_Feedback_Survey.pdf', 'Event_Photos.pptx']
    },
    {
        id: 'hsi2',
        date: '2025-02-20',
        partners: ['Jennifer Martinez', 'Amanda Foster'],
        otherParticipants: 'School counselors from 5 partner high schools',
        types: ['Program Orientation at MHCC', 'Application Workshops at High Schools'],
        description: 'Conducted program orientation for high school counselors covering admission requirements, curriculum overview, financial aid options, and career outcomes. Provided counselors with application workshop materials to support students in their schools.',
        artifacts: ['Counselor_Orientation_Slides.pptx', 'Application_Guide.pdf']
    },
    {
        id: 'hsi3',
        date: '2025-01-10',
        partners: ['Robert Kim'],
        otherParticipants: '',
        types: ['Dual Credit Teacher Training', 'Curriculum Alignment Meetings'],
        description: 'Professional development session for high school automotive instructors focusing on new EV curriculum standards, dual credit course alignment, and safety protocols for high-voltage systems. Reviewed equipment needs and shared teaching resources.',
        artifacts: ['PD_Materials.pdf']
    }
];

// Department-Specific Mock Data
export const DEPARTMENT_DATA = {
    automotive: {
        members: AUTOMOTIVE_MEMBERS,
        specialSessionMembers: MOCK_SPECIAL_SESSION_MEMBERS,
        goals: MOCK_GOALS,
        meetings: MOCK_MEETINGS,
        highSchoolPartners: AUTOMOTIVE_HIGH_SCHOOL_PARTNERS,
        highSchoolInteractions: AUTOMOTIVE_HIGH_SCHOOL_INTERACTIONS
    },
    dental: {
        members: [
            { id: 'd1', name: 'Dr. Lisa Chen', organization: 'Smile Dental Clinic', title: 'Practice Owner', email: 'lchen@smiledental.com', phone: '(555) 111-1111', category: 'employer', status: 'core', expertise: 'Preventive care, patient education, clinic operations' },
            { id: 'd2', name: 'Mark Rodriguez', organization: 'Oregon Dental Association', title: 'Education Director', email: 'mrodriguez@oda.org', phone: '(555) 222-2222', category: 'non-profit', status: 'core', expertise: 'Continuing education, licensure requirements, industry standards' },
            { id: 'd3', name: 'Jennifer Park', organization: 'Children\'s Dental Health Center', title: 'Pediatric Dentist', email: 'jpark@childrensdental.org', phone: '(555) 333-3333', category: 'employer', status: 'core', expertise: 'Pediatric dentistry, behavior management, preventive care for children' }
        ],
        specialSessionMembers: [],
        goals: ['pediatric-certification-2025', 'digital-radiography-2025', 'periodontal-therapy-2026', 'community-outreach-2025'],
        meetings: [
            {
                id: 'dm1',
                date: '2025-08-20',
                duration: 2.0,
                attendeeIds: ['d1', 'd2', 'd3'],
                tacticsDiscussed: [
                    {
                        id: 'pediatric-certification-2025',
                        name: 'Develop specialized pediatric dental hygiene certification program',
                        recommendations: 'Include coursework on child development and behavior management. Partner with local pediatric dental practices for clinical rotations. Ensure curriculum meets state certification requirements for pediatric specialization.'
                    },
                    {
                        id: 'digital-radiography-2025',
                        name: 'Implement digital radiography and imaging technology training',
                        recommendations: 'Invest in current digital X-ray systems. Include training on radiation safety and ALARA principles. Partner with imaging equipment manufacturers for guest lectures and equipment donations.'
                    }
                ]
            },
            {
                id: 'dm2',
                date: '2025-06-15',
                duration: 1.5,
                attendeeIds: ['d2', 'd3'],
                tacticsDiscussed: [
                    {
                        id: 'community-outreach-2025',
                        name: 'Create community dental health outreach and education program partnership',
                        recommendations: 'Develop partnerships with local schools and community centers. Create student-led oral health education programs. Establish community clinic rotation opportunities for hands-on experience.'
                    }
                ]
            }
        ],
        highSchoolPartners: [
            { id: 'dhsp1', name: 'Susan Miller', school: 'Health Sciences Academy', title: 'Health Sciences Coordinator', email: 'smiller@hsa.edu', phone: '(555) 444-4444', role: 'Oversees health career pathways and coordinates with healthcare programs' }
        ],
        highSchoolInteractions: [
            { id: 'dhsi1', date: '2025-02-10', partners: ['Susan Miller'], otherParticipants: '', types: ['Career Day at MHCC', 'Program Orientation at MHCC'], description: 'Introduction to dental hygiene careers for health sciences students, including hands-on demonstrations of dental tools and procedures.', artifacts: [] }
        ]
    },
    media: {
        members: [
            { id: 'm1', name: 'Alex Thompson', organization: 'Creative Studios PDX', title: 'Creative Director', email: 'athompson@creativestudios.com', phone: '(555) 333-3333', category: 'employer', status: 'core', expertise: 'Video production, motion graphics, digital storytelling' },
            { id: 'm2', name: 'Jordan Lee', organization: 'Media Arts Collective', title: 'Program Manager', email: 'jlee@mediacollective.org', phone: '(555) 444-4444', category: 'non-profit', status: 'core', expertise: 'Community media, documentary production, youth programs' },
            { id: 'm3', name: 'Sarah Kim', organization: 'Portland Podcast Network', title: 'Executive Producer', email: 'skim@pdxpodcast.com', phone: '(555) 666-6666', category: 'employer', status: 'core', expertise: 'Podcast production, audio engineering, content strategy' },
            { id: 'm4', name: 'Marcus Williams', organization: 'Social Media Agency PDX', title: 'Digital Strategy Director', email: 'mwilliams@smpdx.com', phone: '(555) 777-7777', category: 'employer', status: 'non-core', expertise: 'Social media marketing, influencer campaigns, analytics' }
        ],
        specialSessionMembers: [],
        goals: ['podcast-production-2025', 'social-media-strategy-2025', 'video-streaming-2026', 'documentary-filmmaking-2026'],
        meetings: [
            {
                id: 'mm1',
                date: '2025-07-10',
                duration: 2.5,
                attendeeIds: ['m1', 'm2', 'm3'],
                tacticsDiscussed: [
                    {
                        id: 'podcast-production-2025',
                        name: 'Develop professional podcast production and audio storytelling curriculum',
                        recommendations: 'Build professional podcast studio with soundproofing and recording equipment. Include modules on audio editing software (Adobe Audition, Logic Pro). Partner with local podcast networks for guest speakers and internship opportunities. Teach RSS feed management and distribution platforms.'
                    },
                    {
                        id: 'documentary-filmmaking-2026',
                        name: 'Build documentary filmmaking and investigative journalism track',
                        recommendations: 'Collaborate with local news outlets and documentary filmmakers. Include ethics training and investigative research methods. Provide access to professional cinema cameras and editing suites. Create partnerships for documentary screening events.'
                    }
                ]
            },
            {
                id: 'mm2',
                date: '2025-05-22',
                duration: 1.5,
                attendeeIds: ['m3', 'm4'],
                tacticsDiscussed: [
                    {
                        id: 'social-media-strategy-2025',
                        name: 'Create social media content creation and digital marketing strategy program',
                        recommendations: 'Cover platform-specific content strategies (TikTok, Instagram, YouTube). Include analytics and performance measurement. Teach content calendar development and brand voice consistency. Partner with local businesses for real-world campaign projects.'
                    }
                ]
            }
        ],
        highSchoolPartners: [
            { id: 'mhsp1', name: 'Taylor Martinez', school: 'Arts & Communications High School', title: 'Media Arts Teacher', email: 'tmartinez@achs.edu', phone: '(555) 555-5555', role: 'Teaches video production and coordinates student media projects' }
        ],
        highSchoolInteractions: [
            { id: 'mhsi1', date: '2025-01-20', partners: ['Taylor Martinez'], otherParticipants: '', types: ['Industry Panel Events', 'Student Ambassador Visits to High Schools'], description: 'Media industry panel and portfolio review session with high school students interested in video production and digital media careers.', artifacts: [] }
        ]
    },
    fisheries: {
        members: [
            { id: 'f1', name: 'Dr. Robert Anderson', organization: 'Oregon Department of Fish and Wildlife', title: 'Fisheries Biologist', email: 'randerson@odfw.oregon.gov', phone: '(555) 666-6666', category: 'public-agency', status: 'core', expertise: 'Salmon recovery, habitat restoration, population monitoring' },
            { id: 'f2', name: 'Maria Santos', organization: 'Columbia River Inter-Tribal Fish Commission', title: 'Habitat Program Manager', email: 'msantos@critfc.org', phone: '(555) 777-7777', category: 'non-profit', status: 'core', expertise: 'Tribal fisheries management, watershed health, cultural resources' },
            { id: 'f3', name: 'Tom Nakamura', organization: 'Pacific Aquaculture Association', title: 'Hatchery Operations Manager', email: 'tnakamura@pacaqua.org', phone: '(555) 888-8888', category: 'employer', status: 'core', expertise: 'Hatchery management, fish rearing, water quality systems' },
            { id: 'f4', name: 'Dr. Elena Martinez', organization: 'Northwest Fish Health Laboratory', title: 'Fish Pathologist', email: 'emartinez@nwfhl.org', phone: '(555) 999-9999', category: 'public-agency', status: 'non-core', expertise: 'Fish disease diagnosis, health monitoring, biosecurity protocols' }
        ],
        specialSessionMembers: [],
        goals: ['habitat-restoration-2025', 'aquaculture-systems-2025', 'fish-health-2026', 'tribal-partnerships-2026'],
        meetings: [
            {
                id: 'fm1',
                date: '2025-09-05',
                duration: 3.0,
                attendeeIds: ['f1', 'f2', 'f3'],
                tacticsDiscussed: [
                    {
                        id: 'habitat-restoration-2025',
                        name: 'Develop hands-on habitat restoration and watershed assessment training program',
                        recommendations: 'Create partnerships with watershed councils for field study sites. Include water quality monitoring, stream surveying, and riparian restoration techniques. Provide hands-on training in electrofishing and population assessment methods. Partner with ODFW for equipment access and training.'
                    },
                    {
                        id: 'tribal-partnerships-2026',
                        name: 'Build tribal co-management and indigenous knowledge integration program',
                        recommendations: 'Develop curriculum in partnership with tribal fisheries managers. Include traditional ecological knowledge and cultural resource protection. Create guest lecture series with tribal elders and scientists. Ensure respectful integration of indigenous perspectives throughout program.'
                    }
                ]
            },
            {
                id: 'fm2',
                date: '2025-04-18',
                duration: 2.0,
                attendeeIds: ['f3', 'f4'],
                tacticsDiscussed: [
                    {
                        id: 'aquaculture-systems-2025',
                        name: 'Establish sustainable aquaculture and hatchery management curriculum',
                        recommendations: 'Build working hatchery facility on campus for hands-on training. Cover recirculating aquaculture systems (RAS), fish nutrition, and breeding programs. Include modules on sustainable practices and environmental impact. Partner with local hatcheries for internship placements.'
                    },
                    {
                        id: 'fish-health-2026',
                        name: 'Create fish health monitoring and disease prevention certification',
                        recommendations: 'Cover major fish pathogens, diagnostic techniques, and biosecurity protocols. Include lab work with microscopy and sample collection. Partner with fish health laboratories for advanced training. Ensure curriculum aligns with industry certification standards.'
                    }
                ]
            }
        ],
        highSchoolPartners: [
            { id: 'fhsp1', name: 'James Wilson', school: 'Environmental Sciences Academy', title: 'Science Teacher', email: 'jwilson@esa.edu', phone: '(555) 888-8888', role: 'Teaches environmental science and coordinates field studies and conservation projects' }
        ],
        highSchoolInteractions: [
            { id: 'fhsi1', date: '2025-03-01', partners: ['James Wilson'], otherParticipants: '', types: ['Industry Tours for High School Students', 'Hands-on Day at MHCC'], description: 'Field trip to fish hatchery and hands-on learning about fisheries science, including water quality testing and fish identification.', artifacts: [] }
        ]
    }
};

// Backwards compatibility exports
export const MOCK_MEMBERS = AUTOMOTIVE_MEMBERS;
export const MOCK_HIGH_SCHOOL_PARTNERS = AUTOMOTIVE_HIGH_SCHOOL_PARTNERS;
export const MOCK_HIGH_SCHOOL_INTERACTIONS = AUTOMOTIVE_HIGH_SCHOOL_INTERACTIONS;
