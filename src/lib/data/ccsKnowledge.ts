export interface CCSProgram {
	name: string;
	code: string;
	description: string;
	duration: string;
	careerOpportunities: string[];
	curriculumHighlights: string[];
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
			]
		},
		{
			name: "Associate in Computer Technology",
			code: "ACT",
			duration: "2 Years",
			description: "A ladderized 2-year program equipping students with foundational computing skills, hardware servicing, office productivity, and basic coding.",
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
		retentionPolicy: "To maintain good standing in BSCS and BSIT, students must achieve a grade of at least 2.0 (80%) in all prerequisite programming and major subjects. Remedial pathways or advising sessions are available for students needing academic support.",
		practicumHours: "BSIT and BSCS students complete a minimum of 486 to 500 hours of on-the-job training (OJT) / internship in accredited tech firms, government agencies, or local enterprises during their senior year.",
		capstoneThesis: "BSCS candidates complete an original Thesis project addressing an algorithmic or computing challenge. BSIT candidates develop an enterprise-ready Capstone project with client deployment."
	},
	studentLife: {
		organizations: [
			"CCS Student Council - The governing body for all computing students at SJC",
			"Society of Information Technology Enthusiasts (SITE)",
			"Association of Computer Science Innovators (ACSI)"
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
			answer: "The CCS Dean's Office is located on the 2nd Floor of the CCS Building at Saint Joseph College main campus. Office hours are Monday through Friday, 8:00 AM to 5:00 PM."
		},
		{
			question: "How do I enroll in BSCS or BSIT?",
			answer: "Enrollment is processed through the SJC Registrar's Office. For department-specific evaluations and subject crediting (especially for transferees), please visit the CCS Dean's Office for curriculum evaluation."
		},
		{
			question: "What are the laptop / PC requirements for CCS students?",
			answer: "While campus computer laboratories are fully accessible during class hours and open lab sessions, students are recommended to have a laptop with at least an Intel Core i5 / AMD Ryzen 5 processor, 16GB RAM, and 512GB SSD for development and virtual machines."
		},
		{
			question: "Who can I contact for tuition and scholarship questions?",
			answer: "Tuition assessments and scholarship grants (CHED, UniFAST, Institutional Scholarships) are administered by the SJC Finance Office and Student Affairs Services (SAS) Office."
		}
	]
};
