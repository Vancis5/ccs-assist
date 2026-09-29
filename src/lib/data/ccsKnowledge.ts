export interface CCSProgram {
	name: string;
	code: string;
	description: string;
	duration: string;
	careerOpportunities: string[];
	curriculumHighlights: string[];
	curriculumByYear?: {
		year: string;
		firstSemester: string[];
		secondSemester: string[];
	}[];
}

export interface FacultyMember {
	name: string;
	title: string;
	specialization: string;
	office: string;
	consultation: string;
}

export interface CCSFacility {
	name: string;
	location: string;
	description: string;
	guidelines: string[];
}

export interface EnrollmentStep {
	step: number;
	title: string;
	office: string;
	details: string;
}

export const ccsKnowledge = {
	institution: {
		name: "Saint Joseph College",
		acronym: "SJC",
		location: "Tunga-tunga, Maasin City, Southern Leyte, Philippines",
		department: "College of Computer Studies (CCS)",
		tagline: "Empowering Future Tech Innovators with Christian Values and Technical Excellence",
		brandColors: {
			primary: "#FA4615", // CCS Orange
			accentSend: "#C23811",
			green: "#147A0D",
			yellow: "#E3CD2C"
		}
	},
	faculty: [
		{
			name: "Dr. Raymund P. Libarnes, DIT",
			title: "Dean, College of Computer Studies",
			specialization: "Enterprise Systems Architecture, Database Management Systems, Software Engineering",
			office: "CCS Dean's Office, 2nd Floor, CCS Building",
			consultation: "Monday - Friday, 1:00 PM - 4:00 PM"
		},
		{
			name: "Engr. Mark Anthony E. Cadayong, MIT",
			title: "Program Chair, Bachelor of Science in Information Technology (BSIT)",
			specialization: "Network Administration, CISCO Technologies, Information Assurance & Cybersecurity",
			office: "Faculty Office 201, 2nd Floor, CCS Building",
			consultation: "Monday / Wednesday / Friday, 9:00 AM - 11:30 AM"
		},
		{
			name: "Prof. Jonathan M. Perez, MSCS",
			title: "Program Chair, Bachelor of Science in Computer Science (BSCS)",
			specialization: "Algorithms & Complexity, Machine Learning, Artificial Intelligence, Python/C++ Programming",
			office: "Faculty Office 202, 2nd Floor, CCS Building",
			consultation: "Tuesday / Thursday, 10:00 AM - 12:00 PM"
		},
		{
			name: "Inst. Mary Grace T. Alinsub, MIT",
			title: "Instructor & Computer Laboratory Coordinator",
			specialization: "Web Systems & Technologies, Full-Stack Web Development, UI/UX Design, Human-Computer Interaction",
			office: "Faculty Office 203, 2nd Floor, CCS Building",
			consultation: "Monday / Wednesday / Friday, 1:30 PM - 3:30 PM"
		},
		{
			name: "Inst. Paul Christian D. Tan",
			title: "Instructor",
			specialization: "Mobile Application Development (Android/Flutter), Object-Oriented Programming (Java), Data Structures",
			office: "Faculty Office 203, 2nd Floor, CCS Building",
			consultation: "Tuesday / Thursday, 1:00 PM - 3:00 PM"
		}
	] as FacultyMember[],
	programs: [
		{
			name: "Bachelor of Science in Computer Science",
			code: "BSCS",
			duration: "4 Years",
			description: "Focuses on the theoretical foundations of computing, algorithm design, software engineering, intelligence systems, and data structures.",
			careerOpportunities: [
				"Software Engineer / Systems Developer",
				"Data Scientist / AI Specialist",
				"Algorithm Engineer",
				"Systems Analyst",
				"Research & Development Scientist"
			],
			curriculumHighlights: [
				"Data Structures & Algorithms",
				"Object-Oriented Programming (Java / Python / C++)",
				"Artificial Intelligence & Machine Learning",
				"Software Engineering & Architecture",
				"Operating Systems & Compiler Design"
			],
			curriculumByYear: [
				{
					year: "1st Year",
					firstSemester: ["CS 111 - Introduction to Computing", "CS 112 - Fundamentals of Programming", "CS 113 - Discrete Structures 1", "GE 1 - Purposive Communication", "GE 2 - Understanding the Self", "PE 1 - Physical Activities", "NSTP 1"],
					secondSemester: ["CS 121 - Intermediate Computer Programming", "CS 122 - Discrete Structures 2", "GE 3 - Readings in Philippine History", "GE 4 - Ethics", "PE 2 - Rhythmic Activities", "NSTP 2"]
				},
				{
					year: "2nd Year",
					firstSemester: ["CS 211 - Data Structures and Algorithms", "CS 212 - Object-Oriented Programming", "CS 213 - Computer Organization and Architecture", "GE 5 - Art Appreciation", "GE 6 - Science, Technology, and Society", "PE 3 - Individual/Dual Sports"],
					secondSemester: ["CS 221 - Design and Analysis of Algorithms", "CS 222 - Operating Systems", "CS 223 - Information Management (Database Systems)", "CS 224 - Web Development", "PE 4 - Team Sports"]
				},
				{
					year: "3rd Year",
					firstSemester: ["CS 311 - Automata Theory and Formal Languages", "CS 312 - Software Engineering 1", "CS 313 - Artificial Intelligence", "CS ELEC 1 - Machine Learning & Neural Networks", "GE 7 - Technopreneurship"],
					secondSemester: ["CS 321 - Software Engineering 2", "CS 322 - Compiler Design", "CS 323 - Methods of Research in Computing", "CS ELEC 2 - Natural Language Processing", "GE 8 - The Contemporary World"]
				},
				{
					year: "4th Year",
					firstSemester: ["CS 411 - CS Thesis 1", "CS 412 - Information Assurance and Security", "CS ELEC 3 - Cloud Computing & Distributed Systems", "GE 9 - Social and Professional Issues in Computing"],
					secondSemester: ["CS 421 - CS Thesis 2", "CS 422 - Practicum / Industry Internship (486-500 Hours)"]
				}
			]
		},
		{
			name: "Bachelor of Science in Information Technology",
			code: "BSIT",
			duration: "4 Years",
			description: "Focuses on practical implementation, deployment, management, and security of computer systems, networks, web, and enterprise technologies.",
			careerOpportunities: [
				"Full-Stack Web / Mobile App Developer",
				"Network & Systems Administrator",
				"Database Administrator (DBA)",
				"Cybersecurity Analyst",
				"IT Project Manager & Support Lead"
			],
			curriculumHighlights: [
				"Web Systems and Technologies",
				"Mobile Application Development",
				"Database Management Systems & SQL",
				"Network Administration & CISCO Technologies",
				"Information Assurance & Security"
			],
			curriculumByYear: [
				{
					year: "1st Year",
					firstSemester: ["IT 111 - Introduction to Computing", "IT 112 - Computer Programming 1", "GE 1 - Purposive Communication", "GE 2 - Mathematics in the Modern World", "GE 3 - Understanding the Self", "PE 1 - Physical Activities", "NSTP 1"],
					secondSemester: ["IT 121 - Computer Programming 2", "IT 122 - Discrete Mathematics for IT", "GE 4 - Living in the IT Era", "GE 5 - Readings in Philippine History", "PE 2 - Rhythmic Activities", "NSTP 2"]
				},
				{
					year: "2nd Year",
					firstSemester: ["IT 211 - Data Structures and Algorithms", "IT 212 - Object-Oriented Programming", "IT 213 - Networking 1 (CISCO Fundamentals)", "IT 214 - Platform Technologies", "PE 3 - Individual/Dual Sports"],
					secondSemester: ["IT 221 - Database Management Systems", "IT 222 - Networking 2 (Routing and Switching)", "IT 223 - Web Systems and Technologies 1", "IT 224 - Systems Analysis and Design", "PE 4 - Team Sports"]
				},
				{
					year: "3rd Year",
					firstSemester: ["IT 311 - Web Systems and Technologies 2", "IT 312 - Mobile Applications Development", "IT 313 - Information Assurance and Security 1", "IT 314 - Systems Integration and Architecture", "IT 315 - Integrative Programming & Technologies"],
					secondSemester: ["IT 321 - Information Assurance and Security 2", "IT 322 - Advanced Database Systems", "IT 323 - Capstone Project and Research 1", "IT ELEC 1 - Enterprise Cloud & DevOps", "GE 7 - Technopreneurship"]
				},
				{
					year: "4th Year",
					firstSemester: ["IT 411 - Capstone Project and Research 2 (Implementation & Defense)", "IT 412 - Systems Administration and Maintenance", "IT ELEC 2 - Cybersecurity Incident Response", "GE 9 - Social and Professional Issues in IT"],
					secondSemester: ["IT 421 - Practicum / Industry Internship (486-500 Hours)"]
				}
			]
		},
		{
			name: "Associate in Computer Technology",
			code: "ACT",
			duration: "2 Years (Ladderized)",
			description: "A ladderized 2-year program equipping students with foundational computing skills, hardware servicing, office productivity, and basic coding. Can ladderize into BSIT or BSCS.",
			careerOpportunities: [
				"Computer Technician / Hardware Support",
				"Junior Web Developer",
				"IT Support Staff",
				"Data Encoder / Technical Assistant"
			],
			curriculumHighlights: [
				"Computer Hardware Servicing",
				"Foundations of Programming",
				"Productivity Tools and Office Automation",
				"Basic Networking & Cable Crimping"
			]
		}
	],
	facilities: [
		{
			name: "Programming & Software Engineering Lab",
			location: "CCS Building, 2nd Floor",
			description: "Equipped with high-performance desktop rigs, dual monitors for coding, modern IDEs, and local server environments.",
			guidelines: [
				"No food or open drink containers allowed inside.",
				"Always log in and log out on the laboratory log sheet.",
				"Save projects to personal cloud / git repository; local storage is wiped regularly."
			]
		},
		{
			name: "CISCO & Networking Laboratory",
			location: "CCS Building, 2nd Floor",
			description: "Specialized lab equipped with CISCO routers, switches, patch panels, crimping stations, and server racks for hands-on network topologies.",
			guidelines: [
				"Wear ESD safety gear when handling internal components.",
				"Return all patch cables, crimpers, and testers to equipment cabinets after use.",
				"Do not modify live campus networking configurations."
			]
		},
		{
			name: "Multimedia & Design Studio",
			location: "CCS Building, 3rd Floor",
			description: "Dedicated to UI/UX design, game development, rendering, graphic design, and audio-visual production.",
			guidelines: [
				"Handle graphics tablets and studio peripherals with utmost care.",
				"Book studio time through the lab custodian 24 hours in advance."
			]
		}
	],
	academicPolicies: {
		gradingScale: [
			{ grade: "1.00", percentage: "97 - 100%", description: "Excellent" },
			{ grade: "1.25", percentage: "94 - 96%", description: "Superior" },
			{ grade: "1.50", percentage: "91 - 93%", description: "Very Good" },
			{ grade: "1.75", percentage: "88 - 90%", description: "Good" },
			{ grade: "2.00", percentage: "85 - 87%", description: "Satisfactory (Retention threshold for major subjects)" },
			{ grade: "2.25", percentage: "82 - 84%", description: "Fair" },
			{ grade: "2.50", percentage: "80 - 81%", description: "Passed" },
			{ grade: "2.75", percentage: "76 - 79%", description: "Passed" },
			{ grade: "3.00", percentage: "75%", description: "Passing Grade" },
			{ grade: "5.00", percentage: "Below 75%", description: "Failed" },
			{ grade: "INC", percentage: "N/A", description: "Incomplete (1 year compliance window)" },
			{ grade: "DRP", percentage: "N/A", description: "Officially Dropped" }
		],
		retentionPolicy: "To maintain good standing in BSCS and BSIT, students must achieve a minimum grade of 2.0 (85%) in all prerequisite programming and major subjects. Students falling below 2.0 are placed under department academic probation or advised into remedial coursework.",
		practicumHours: "BSIT and BSCS students complete a minimum of 486 to 500 hours of on-the-job training (OJT) / internship in accredited tech firms, government agencies, or local enterprises during their final semester.",
		capstoneThesis: "BSCS candidates complete an original Thesis project addressing an algorithmic or computing challenge. BSIT candidates develop an enterprise-ready Capstone project with client deployment."
	},
	enrollmentProcess: [
		{
			step: 1,
			title: "Admissions & Credential Verification",
			office: "SJC Registrar & Admissions (Ground Floor, Admin Bldg)",
			details: "Submit Form 138/SF9, Certificate of Good Moral Character, PSA Birth Certificate (or Transcript of Records & Honorable Dismissal for transferees) for credential check and student number assignment."
		},
		{
			step: 2,
			title: "CCS Department Academic Evaluation",
			office: "CCS Dean's Office (2nd Floor, CCS Bldg)",
			details: "Present your evaluation slip to Dean Dr. Raymund P. Libarnes or the respective Program Chair (Engr. Cadayong for BSIT, Prof. Perez for BSCS) for prerequisite verification and curriculum evaluation."
		},
		{
			step: 3,
			title: "Subject Advising & Encoding",
			office: "CCS Faculty Office (2nd Floor, CCS Bldg)",
			details: "Assigned program adviser verifies your curriculum checklist and encodes the semester subjects/schedule into the campus enrollment system."
		},
		{
			step: 4,
			title: "Assessment & Fee Settlement",
			office: "SJC Finance / Cashier Office (Ground Floor, Admin Bldg)",
			details: "Receive tuition and laboratory fee assessment. Validate CHED/UniFAST scholarship status or pay the required down payment."
		},
		{
			step: 5,
			title: "Registration Confirmation & Student ID",
			office: "Registrar's Office & Student Affairs Services (SAS)",
			details: "Obtain official stamped Certificate of Registration (COR). Validate student ID for library and computer laboratory access."
		}
	] as EnrollmentStep[],
	studentLife: {
		organizations: [
			"CCS Student Council (CCSSC) - The apex governing body representing all computing students at SJC",
			"Society of Information Technology Enthusiasts (SITE) - Official department organization for BSIT majors",
			"Association of Computer Science Innovators (ACSI) - Official department organization for BSCS majors"
		],
		annualEvents: [
			"CCS Week / Tech Summit (annual seminars, workshops, and exhibitions)",
			"SJC Hackathon & Programming Competition",
			"IT Olympics & E-Sports Tournament",
			"Project Pitching & Capstone Expo"
		]
	},
	faqs: [
		{
			question: "Where is the CCS Dean's Office located?",
			answer: "The CCS Dean's Office is located on the 2nd Floor of the CCS Building at Saint Joseph College main campus in Tunga-tunga, Maasin City. Office hours are Monday through Friday, 8:00 AM to 5:00 PM."
		},
		{
			question: "Who is the Dean of the College of Computer Studies?",
			answer: "Dr. Raymund P. Libarnes, DIT is the Dean of the College of Computer Studies. His office is located on the 2nd Floor of the CCS Building, with consultation hours Monday through Friday from 1:00 PM to 4:00 PM."
		},
		{
			question: "How do I enroll in BSCS or BSIT?",
			answer: "Enrollment follows 5 steps: 1) Submit credentials to the Registrar, 2) Get curriculum evaluation at the CCS Dean's Office (2nd Floor), 3) Program Chair advises and encodes subjects, 4) Settle assessment at Finance/Cashier, and 5) Claim stamped COR from Registrar."
		},
		{
			question: "What are the laptop / PC requirements for CCS students?",
			answer: "While campus computer laboratories are fully accessible during class hours and open lab sessions, students are recommended to have a laptop with at least an Intel Core i5 / AMD Ryzen 5 processor, 16GB RAM, and 512GB SSD for development and virtual machines."
		},
		{
			question: "What is the retention grade requirement for CCS majors?",
			answer: "Students in BSCS and BSIT must maintain a grade of at least 2.0 (85%) in all prerequisite programming and major subjects to remain in good standing."
		}
	],
	starterPrompts: [
		{
			tag: 'Academics',
			title: 'Academic Programs & Degrees',
			desc: 'BSCS, BSIT, and ACT specializations & careers',
			query: 'What programs are offered by the College of Computer Studies?'
		},
		{
			tag: 'Directory',
			title: 'CCS Faculty & Dean',
			desc: "Dean Dr. Libarnes, Program Chairs, and consultation hours",
			query: "Who is the Dean and who are the faculty members in CCS?"
		},
		{
			tag: 'Policy',
			title: 'Retention & Grading Standards',
			desc: '2.0 (85%) retention threshold and PH grading scale',
			query: 'What are the retention policies and grading scale for CCS students?'
		},
		{
			tag: 'Admissions',
			title: 'Enrollment Step-by-Step',
			desc: '5-step process from admissions to COR validation',
			query: 'What are the exact steps to enroll in BSCS or BSIT at CCS?'
		},
		{
			tag: 'Curriculum',
			title: 'BSCS & BSIT Subjects',
			desc: 'Year-by-year and semester subjects list',
			query: 'What subjects are taken in 1st and 2nd year for BSIT and BSCS?'
		},
		{
			tag: 'Campus',
			title: 'Computer Lab Guidelines',
			desc: 'CISCO network, software labs, and studio rules',
			query: 'What facilities and computer laboratories are available in CCS?'
		},
		{
			tag: 'Internship',
			title: 'OJT & Practicum Hours',
			desc: '486 to 500 hours industry internship requirements',
			query: 'What are the OJT and internship requirements for BSIT and BSCS students?'
		},
		{
			tag: 'Research',
			title: 'Capstone & Thesis Projects',
			desc: 'BSCS thesis & BSIT enterprise capstone guidelines',
			query: 'What is the difference between BSCS thesis and BSIT capstone projects?'
		},
		{
			tag: 'Hardware',
			title: 'Recommended Laptop Specs',
			desc: 'CPU, RAM, and SSD recommendations for coding',
			query: 'What laptop specifications are recommended for CCS students?'
		},
		{
			tag: 'Student Life',
			title: 'CCS Student Organizations',
			desc: 'SITE, ACSI, and CCS Student Council',
			query: 'What student organizations and clubs can CCS students join?'
		},
		{
			tag: 'Events',
			title: 'Hackathons & Tech Summit',
			desc: 'Annual CCS Week, coding contests, and esports',
			query: 'What annual events, hackathons, and competitions happen in CCS?'
		},
		{
			tag: 'Networking',
			title: 'CISCO & Networking Lab',
			desc: 'Hardware routers, switches, and patch panels',
			query: 'What equipment and tools are available in the CISCO networking lab?'
		}
	]
};

export type StarterPrompt = (typeof ccsKnowledge.starterPrompts)[number];

let cachedPromptContext: string | null = null;

export function getKnowledgePromptContext(): string {
	if (!cachedPromptContext) {
		const { starterPrompts, ...knowledgeForModel } = ccsKnowledge;
		cachedPromptContext = JSON.stringify(knowledgeForModel, null, 2);
	}
	return cachedPromptContext;
}

export function getStarterSuggestions(): StarterPrompt[] {
	return ccsKnowledge.starterPrompts;
}

export function getRandomStarterSuggestions(count = 4): StarterPrompt[] {
	const pool = [...ccsKnowledge.starterPrompts];
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, count);
}
