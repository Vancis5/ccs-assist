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
		summer?: string[];
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
		founded: 1928,
		president: "Rev. Msgr. Oscar A. Cadayona, PhD, SThL-MA",
		department: "College of Computer Studies (CCS)",
		dean: "Haidee Galdo (formerly Riza Siega)",
		deanOfficeLocation: "Main Campus, 1st Floor, right side near the entrance, beside the staircase",
		tagline: "Deus, Patria, Scientia (God, Country, Knowledge)",
		contact: {
			phone: "(053) 570 8448",
			email: "info@sjc.edu.ph",
			dpo: "dpo@sjc.edu.ph",
			sjcFacebook: "https://www.facebook.com/sjc2028",
			ccsFacebook: "https://www.facebook.com/profile.php?id=100083430218425",
			schoolWebsite: "https://www.sjc.edu.ph/",
			ccsWebsite: "https://www.sjc.edu.ph/academics/college-of-computer-studies",
			studentPortal: "https://online.sjc.edu.ph/enrollment/?content=enrollment",
			moodleLms: "https://lms.sjc.edu.ph/login/index.php"
		},
		brandColors: {
			primary: "#FA4615", // CCS Orange
			accentSend: "#C23811",
			green: "#147A0D",
			yellow: "#E3CD2C"
		},
		coreValues: [
			"God-Centeredness",
			"Excellence",
			"Integrity",
			"Stewardship",
			"Service"
		],
		accreditations: ["PAASCU Accredited", "CEAP Member", "CHED Recognized"]
	},
	leadership: {
		dean: "Haidee Galdo (formerly Riza Siega)",
		office: "Main Campus, 1st Floor, right side near the entrance, beside the staircase",
		hours: "Regular office hours (Monday - Friday, 8:00 AM - 5:00 PM)",
		consultation: "Available anytime during office hours or by appointment"
	},
	programs: [
		{
			name: "Bachelor of Science in Information Technology",
			code: "BSIT",
			duration: "4 Years (8 Semesters + 1 Summer Term)",
			totalUnits: "~167 Units",
			description: "Focuses on Business & Data Analytics, Systems Integration, Web Technologies (HTML/CSS/JS/PHP with XAMPP, SQL, and Python/Django in 3rd Year), Networking, Cybersecurity, and Enterprise Data Management.",
			careerOpportunities: [
				"Business & Data Analytics Specialist",
				"Full-Stack Web & Mobile Developer",
				"Network & Systems Administrator",
				"Database & Enterprise Data Administrator",
				"IT Project Manager & Systems Analyst"
			],
			curriculumHighlights: [
				"Business Analytics & Analytics Modeling",
				"Web Systems & Technologies (PHP/MySQL/XAMPP, Python/Django)",
				"Networks & Communications 1 & 2",
				"Systems Integration and Architecture",
				"Information Assurance and Security",
				"Capstone Project 1 (Summer) & Capstone Project 2 (4th Year 1st Sem)",
				"Practicum / OJT Industry Internship"
			],
			curriculumByYear: [
				{
					year: "1st Year",
					firstSemester: [
						"IT 101 - Introduction to Computing (3 units)",
						"IT 102 - Computer Programming 1 (3 units)",
						"Math En - Math Enrichment (3 units)",
						"GE 1 - Understanding the Self (3 units)",
						"GE 2 - Readings in the Philippine History (3 units)",
						"GE EL 1 - Living in the IT Era (3 units)",
						"Theo 1a - Old Testament (3 units)",
						"PATHFit 1 - Movement Competency Training (2 units)",
						"NSTP 11 - National Service Training Program 1 (3 units)"
					],
					secondSemester: [
						"IT 111 - Networks and Communications 1 (3 units)",
						"IT 112 - Computer Programming 2 (3 units)",
						"IT 113 - Discrete Structures (3 units)",
						"GE 3 - Mathematics in the Modern World (3 units)",
						"GE 4 - Purposive Communication (3 units)",
						"GE 5 - Science, Technology, and Society (3 units)",
						"GE EL 2 - Gender and Society (3 units)",
						"Theo 1b - New Testament (3 units)",
						"PathFit 2 - Exercise-based Fitness Activities (2 units)",
						"NSTP 12 - National Service Training Program 2 (3 units)"
					]
				},
				{
					year: "2nd Year",
					firstSemester: [
						"IT 201 - Information Management (3 units)",
						"IT 202 - Data Structures & Algorithms (3 units)",
						"IT 203 - Web Systems and Technologies 1 (3 units)",
						"IT 204 - Platform Technologies (3 units)",
						"GE 6 - The Contemporary World (3 units)",
						"GE 7 - Art Appreciation (3 units)",
						"GE EL 3 - Great Books (3 units)",
						"Theo 2a - Christology (3 units)",
						"PathFit 3 - Sports (2 units)"
					],
					secondSemester: [
						"IT 211 - Object - Oriented Programming (3 units)",
						"IT 212 - Human Computer Interaction (3 units)",
						"IT 213 - Application Dev & Emerging Tech (3 units)",
						"IT 214 - Information Management 2 (3 units)",
						"IT 215 - Systems Analysis and Design (3 units)",
						"GE 8 - Ethics (3 units)",
						"GE 9 - Life and Works of Rizal (3 units)",
						"Theo 2b - Mariology (3 units)",
						"PathFit 4 - Dance (2 units)"
					]
				},
				{
					year: "3rd Year",
					firstSemester: [
						"IT 301 - Information Assurance and Security (3 units)",
						"IT 302 - Systems Integration and Architecture 1 (3 units)",
						"IT 303 - Networking 2 (3 units)",
						"IT 304 - Quantitative Methods (3 units)",
						"IT 305 - Web Systems and Technologies 2 (3 units)",
						"IT 306 - Business Analytics (3 units)",
						"IT 307 - Enterprise Data Management (3 units)",
						"Theo 3a - Christian Morality (3 units)"
					],
					secondSemester: [
						"IT 311 - Analytic Tools and Techniques (3 units)",
						"IT 312 - Analytics Modeling (3 units)",
						"IT 313 - Social Issues and Professional Practice (3 units)",
						"IT 314 - Systems Admin and Maintenance (3 units)",
						"IT 315 - Integrative Programming and Tech 1 (3 units)",
						"IT EL 1 - IT Elective 1 (3 units)",
						"IT EL 2 - IT Elective 2 (3 units)",
						"Theo 3b - The Commandments (3 units)"
					],
					summer: [
						"Capstone 1 - Capstone Project 1 (3 units)",
						"Theo 4a - Intro to Pastoral Life / BEC (3 units)"
					]
				},
				{
					year: "4th Year",
					firstSemester: [
						"Capstone 2 - Capstones Project 2 (3 units)",
						"IT 401 - Technopreneurship (3 units)",
						"IT 402 - Analytics Application (3 units)",
						"Pro En - Professional Enhancement (3 units, Bonzel Hall)",
						"IT EL 3 - IT Elective 3 (3 units)",
						"IT EL 4 - IT Elective 4 (3 units)",
						"Theo 4b - Pastoral Exposure (3 units)"
					],
					secondSemester: [
						"Practicum / OJT Industry Internship (486-500 Hours)"
					]
				}
			]
		},
		{
			name: "Bachelor of Science in Computer Science",
			code: "BSCS",
			duration: "4 Years",
			description: "Focuses on theoretical foundations of computing, algorithm complexity, software engineering, intelligence systems, and computational theory culminating in a Thesis project.",
			careerOpportunities: [
				"Software Engineer & Systems Developer",
				"AI / Machine Learning Engineer",
				"Algorithms & Research Scientist",
				"Systems Analyst"
			],
			curriculumHighlights: [
				"Discrete Structures & Automata Theory",
				"Design and Analysis of Algorithms",
				"Artificial Intelligence & Machine Learning",
				"Compiler Design & Operating Systems",
				"CS Thesis Research 1 & 2"
			]
		},
		{
			name: "Associate in Computer Technology",
			code: "ACT",
			duration: "2 Years (Ladderized)",
			description: "A 2-year program providing foundational computing skills, hardware servicing, office productivity, and programming fundamentals. Ladderizes into BSIT/BSCS with a 2.25 GPA requirement.",
			careerOpportunities: [
				"Computer Technician / Hardware Support",
				"Junior Web Developer",
				"IT Support Staff",
				"Data Encoder"
			],
			curriculumHighlights: [
				"Computer Hardware Servicing",
				"Foundations of Programming",
				"Productivity Tools & Office Automation",
				"Basic Networking & Cable Crimping"
			]
		}
	],
	facilities: [
		{
			name: "Computer Laboratories (Rooms 407, 408, 409)",
			location: "SJC Main Campus, 4th Floor",
			description: "Air-conditioned labs for coding, networking, analytics, and software development.",
			guidelines: [
				"Open during designated class hours and lab schedules.",
				"Supervised by assigned student assistants and lab in-charge.",
				"No food or open drink containers allowed inside.",
				"No unauthorized altering of desktop or network settings."
			]
		},
		{
			name: "Integrated Learning & Laboratory Center (ILLC)",
			location: "SJC Main Campus, Ground Floor",
			description: "Specialized lab for web systems, emerging technologies, and systems integration courses.",
			guidelines: [
				"Sign the logbook upon entry and exit.",
				"Maintain neatness of workstations and report any hardware issues immediately."
			]
		},
		{
			name: "Bonzel Hall",
			location: "SJC Main Campus",
			description: "Auditorium venue used for Professional Enhancement lectures, tech seminars, symposiums, and major department assemblies.",
			guidelines: [
				"Follow proper auditorium etiquette and prescribed dress code."
			]
		}
	],
	academicPolicies: {
		retentionPolicy: "To qualify for admission to the 3rd year in BSIT and BSCS, students must complete all 1st and 2nd year professional courses with an average rating of at least 2.25. This 2.25 average rating must be maintained. A student who fails in more than three (3) subjects is advised to shift to another program.",
		catRequirement: "Incoming freshmen must obtain a passing rate of at least 75% on the College Admission Test (CAT) for direct entry into BSIT/BSCS. Applicants with CAT scores below 75% enroll in the 2-Year ACT program and can shift to BSIT/BSCS after 1st sem with a 2.25 GPA.",
		theologyRequirement: "All 4-year degree candidates must complete 24 units of Theology (Theo 1a to Theo 4b). 2-year ACT candidates complete 12 units.",
		peAndNstpGate: "No student is allowed to enroll in the 4th year unless all Physical Education courses (PATHFit 1-4) and NSTP (11-12) are fully completed and passed.",
		attendancePolicy: "Reporting 15 minutes late, leaving 15 minutes early, or incurring 3 consecutive tardy marks equals 1 absence. Incurring 10 absences in full in-person classes (or 5 absences in HyFlex) results in an automatic drop with a permanent rating of FA (Failure due to excessive absences).",
		examPolicy: "Four major examinations per semester: Pre-mid, Midterm, Prefinal, and Final. Official Exam Permit from the Bursar's Office is required.",
		dressCode: "Customized official SJC uniform on Mon/Tue/Thu/Fri. Wednesdays are wash days (CCS Departmental Polo Shirt). Saturdays require Department/Org polo shirt or modest semi-formal/formal attire covering the knees. Official Intern Uniform is required during OJT.",
		gradingScale: [
			{ grade: "1.00", percentage: "98% - 100%", description: "Excellent (Summa Cum Laude interval)" },
			{ grade: "1.25", percentage: "95% - 97%", description: "Very Good" },
			{ grade: "1.50", percentage: "92% - 94%", description: "Very Good (Magna Cum Laude interval)" },
			{ grade: "1.75", percentage: "89% - 91%", description: "Good (Cum Laude interval)" },
			{ grade: "2.00", percentage: "86% - 88%", description: "Good (Dean's Lister interval)" },
			{ grade: "2.25", percentage: "83% - 85%", description: "Good (CCS 3rd Year Retention Threshold)" },
			{ grade: "2.50", percentage: "80% - 82%", description: "Fair" },
			{ grade: "2.75", percentage: "77% - 79%", description: "Fair" },
			{ grade: "3.00", percentage: "75% - 76%", description: "Passed (Minimum Passing Grade)" },
			{ grade: "5.00", percentage: "Below 75%", description: "Failed" },
			{ grade: "NC", percentage: "N/A", description: "No Credit (Final exam missed; 2-week compliance window)" },
			{ grade: "W", percentage: "N/A", description: "Officially Withdrawn" },
			{ grade: "FW", percentage: "N/A", description: "Failure due to unofficial withdrawal" },
			{ grade: "FA", percentage: "N/A", description: "Failure due to excessive absences (10+ absences)" }
		]
	},
	feeStructure: {
		tuitionPerUnit: "₱524.00 (₱1,572.00 per 3-unit subject)",
		semestralTuition: "₱11,000 - ₱14,300 (depending on unit load: 21-29 units)",
		labFeePerCourse: "₱1,262.00 per laboratory course (e.g., IT 401, IT 402, Capstone 2, IT Electives)",
		miscFees: {
			lms: "₱750.00",
			registration: "₱660.00",
			library: "₱299.00",
			energy: "₱250.00",
			prisaa: "₱200.00",
			medicalDental: "₱188.00",
			researchExtension: "₱150.00",
			printings: "₱150.00",
			spiritualServices: "₱1,425.00",
			loyaltyDay: "₱450.00",
			paascuCeap: "₱75.00",
			studentOrg: "₱56.00",
			acquaintanceParty: "₱40.00"
		},
		scholarships: [
			"Academic Scholarship: Full (1.00-1.20), 3/4 (1.21-1.40), 1/2 (1.41-1.60)",
			"Diocesan Grant (Josephinian 50% discount for private diocesan school alumni)",
			"Diocesan School Alumni (70% discount)",
			"Sogod / Baybay / Out-of-town Residents (40% discount)",
			"SJC Senior High School Alumni (20% discount)",
			"FCSO President (100% full tuition discount)",
			"Government Subsidies: UniFAST / TES, CHED Grants, DOST-SEI"
		]
	},
	enrollmentProcess: [
		{
			step: 1,
			title: "Admissions & CAT Screening",
			office: "Registrar & Admissions Office (Ground Floor, Admin Bldg)",
			details: "Submit Form 138/SF9, Good Moral Certificate, and PSA Birth Certificate (or TOR & Honorable Dismissal for transferees) and complete the College Admission Test (CAT)."
		},
		{
			step: 2,
			title: "CCS Academic Evaluation & Advising",
			office: "CCS Dean's Office (1st Floor, Main Campus)",
			details: "Meet with Dean Haidee Galdo or program chairs for evaluation of CAT scores (75% threshold) and curriculum advising."
		},
		{
			step: 3,
			title: "Subject Advising & Portal Encoding",
			office: "CCS Department / Student Portal",
			details: "Select and encode prescribed semester subjects on the [SJC Student Portal](https://online.sjc.edu.ph/enrollment/?content=enrollment) following prerequisites in the curriculum."
		},
		{
			step: 4,
			title: "Fee Assessment & Settlement",
			office: "Finance & Bursar's Office (Ground Floor, Admin Bldg)",
			details: "Receive tuition and lab fee assessment slip. Settle required fees or apply verified scholarships (Josephinian 50%, UniFAST/TES, CHED)."
		},
		{
			step: 5,
			title: "Official Registration & Examination Permit",
			office: "Registrar's Office & Cashier",
			details: "Claim stamped official Certificate of Registration (COR) and student ID validation."
		}
	] as EnrollmentStep[],
	studentLife: {
		organizations: [
			"College of Computer Studies (CCS) Student Body - Departmental Curricular Organization",
			"Philippine Society of Information Technology Students (PSITS) - Official Co-Curricular Student Org recognized under SASO",
			"Federation of College Student Organizations (FCSO) - Apex Student Governing Body",
			"The Josephinian (JMAG) - Official School Publication"
		],
		annualEvents: [
			"CCS Departmental Days & Tech Summit",
			"Acquaintance Party & Social Orientation",
			"Loyalty Day & Family Run",
			"PRISAA Athletic & Cultural Competitions",
			"SJC Hackathons & Project Pitching Exhibitions"
		]
	},
	starterPrompts: [
		{
			tag: 'Academics',
			title: 'BSIT Curriculum & Analytics',
			desc: 'Full subjects per year, summer capstone, and data analytics track',
			query: 'What subjects are taken in 1st to 4th year in BSIT?'
		},
		{
			tag: 'Directory',
			title: 'CCS Dean & Location',
			desc: "Dean Haidee Galdo, 1st floor office near entrance, and office hours",
			query: "Who is the Dean of CCS and where is the Dean's Office located?"
		},
		{
			tag: 'Policy',
			title: 'Retention & 2.25 GWA',
			desc: 'CAT 75% cutoff, 2.25 GWA for 3rd year, and >3 failures shifting rule',
			query: 'What are the retention policies and CAT admission requirements for CCS?'
		},
		{
			tag: 'Tuition',
			title: 'Tuition & Lab Fees',
			desc: '₱524/unit, ₱1,262 per lab, and Josephinian 50% discount',
			query: 'How much is the tuition and laboratory fees per semester in CCS?'
		},
		{
			tag: 'Campus',
			title: 'Labs & Software Tools',
			desc: '4th floor rooms 407-409, ILLC, TextPad 7, VS Code, and XAMPP',
			query: 'What computer laboratories and software tools are used in CCS?'
		},
		{
			tag: 'Uniform',
			title: 'Dress Code & Wash Days',
			desc: 'Mon/Tue/Thu/Fri uniform, Wed & Sat departmental polo wash days',
			query: 'What are the uniform and dress code rules for CCS students?'
		},
		{
			tag: 'Capstone',
			title: 'Capstone 1 & 2 Timeline',
			desc: 'Summer Capstone 1 to 4th Year 1st Sem Capstone 2 sequence',
			query: 'When do BSIT students start Capstone 1 and Capstone 2?'
		},
		{
			tag: 'Theology',
			title: 'Theology 24-Unit Track',
			desc: '8-course requirement from Theo 1a (Old Testament) to Theo 4b',
			query: 'What Theology subjects are required to graduate from SJC CCS?'
		},
		{
			tag: 'Student Life',
			title: 'PSITS & Campus Events',
			desc: 'PSITS organization, CCS Days, Acquaintance Party, and Loyalty Day',
			query: 'What student organizations and annual events exist in CCS?'
		},
		{
			tag: 'Ladderized',
			title: 'ACT 2-Year to BSIT',
			desc: 'How Associate in Computer Technology ladderizes into BSIT/BSCS',
			query: 'How does the 2-year ACT program ladderize into BSIT or BSCS?'
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
