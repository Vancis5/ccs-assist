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
	role: string;
	undergraduate?: string;
	postGraduate?: string;
	subjectsHandled?: string[];
	certifications?: string[];
	experience?: string;
	office?: string;
	consultation?: string;
	achievements?: string[];
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
		ccsFounded: 1994,
		president: "Rev. Msgr. Oscar A. Cadayona, PhD, SThL-MA",
		department: "College of Computer Studies (CCS)",
		dean: "Haidee Galdo (formerly Riza Siega)",
		deanOfficeLocation: "Main Campus, 1st Floor, right side near the entrance, beside the staircase",
		departmentSecretary: "Mrs. Wilna Mae Quilla-Oberez, MBA",
		tagline: "Deus, Patria, Scientia (God, Country, Knowledge)",
		departmentMotto: "An open door to the limitless horizon",
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
		dean: "Mrs. Haidee T. Galdo, MIT (formerly Riza Siega)",
		office: "Main Campus, 1st Floor, right side near the entrance, beside the staircase",
		hours: "Regular office hours (Monday - Friday, 8:00 AM - 5:00 PM)",
		consultation: "Available anytime during office hours or by appointment"
	},
	facultyAndStaff: [
		{
			name: "Mrs. Haidee T. Galdo, MIT",
			title: "Dean, College of Computer Studies & BSIT Program Head",
			role: "Dean / Program Head / College Faculty",
			undergraduate: "BS Computer Science - Southwestern University, Cebu City",
			postGraduate: "Master in Information Technology (MIT) - Asian College Foundation / Asian Development Foundation College",
			subjectsHandled: [
				"Data Structures and Algorithms",
				"Computer Programming (Java)",
				"Algorithm and Complexity",
				"Science, Technology, and Society (STS)",
				"Capstone 2"
			],
			certifications: ["PhilNITS IT Passport Exam Certified"],
			office: "Main Campus, 1st Floor, right side near the entrance, beside the staircase",
			consultation: "Regular office hours (Monday - Friday, 8:00 AM - 5:00 PM) or by appointment"
		},
		{
			name: "Mrs. Evangeline E. Javier, MIT",
			title: "Senior College Faculty & Religious Org Adviser",
			role: "College Faculty",
			undergraduate: "BS Computer Science - Saint Joseph College",
			postGraduate: "Master in Information Technology (MIT) - Asian Development Foundation College",
			experience: "More than 20 years college faculty at SJC",
			subjectsHandled: [
				"Business Analytics",
				"Enterprise Data Management",
				"System Integration and Architecture 1",
				"Introduction to Computing",
				"Science, Technology, and Society (STS)",
				"Analytics Application",
				"Information Management"
			],
			certifications: ["MikroTik Network Certificate (Networking)", "PhilNITS IT Passport Exam Certified"]
		},
		{
			name: "Mrs. Yvonne Tenio, MIT",
			title: "College Faculty",
			role: "College Faculty",
			undergraduate: "BS Computer Science - University of San Jose - Recoletos (USJ-R), Cebu City",
			postGraduate: "Master in Information Technology (MIT) - Asian Development Foundation College",
			subjectsHandled: [
				"IT 204 - Platform Technologies",
				"IT 304 - Quantitative Methods",
				"IT EL 3 - IT Elective 3",
				"IT 301 - Information Assurance and Security",
				"GE 5 - Science, Technology, and Society (STS)",
				"GE EL 1 - Living in the IT Era"
			],
			certifications: [
				"CSC Certificate of Eligibility - Career Service Professional and Career Service Sub-Professional",
				"Quipper Faculty Training Certified",
				"PhilNITS IT Passport Exam Certified"
			]
		},
		{
			name: "Mrs. Wilna Mae Quilla-Oberez, MBA",
			title: "Department Secretary",
			role: "CCS Department Secretary (2013 - present)",
			undergraduate: "BS in Business Administration major in Financial Management",
			postGraduate: "Master in Business Administration (MBA)"
		},
		{
			name: "Mr. Marnuld F. Climaco, MST-CS",
			title: "Senior Computer Instructor",
			role: "Computer Instructor (1998 - present)",
			undergraduate: "BS Computer Science - University of San Jose - Recoletos (USJ-R)",
			postGraduate: "Master of Science in Teaching - Major in Computer Science (MST-CS) / MIT",
			experience: "Computer Operator (1994-95, Philphos Isabel, Leyte); Computer Instructor (1996-97, College of Maasin); Computer Instructor (1997-98, Southern Leyte Computer Institute); Instructor (1998-present, SJC)",
			subjectsHandled: [
				"Computer Computing / Introduction to Computing",
				"Networking",
				"Human Computer Interaction (HCI)",
				"Systems Administration and Maintenance"
			],
			certifications: ["MikroTik Network Certificate (Networking)", "PhilNITS IT Passport Exam Certified"]
		},
		{
			name: "Mr. Leonardo E. Hoyla",
			title: "Computer Instructor, System Software Developer & EDP Head",
			role: "Instructor / EDP Head / Developer",
			undergraduate: "BS Computer Science - Southwestern University; Nautical - Philippine Merchant Marine School (PMMS)",
			experience: "System Software Developer (University of Cebu); MIS (Prince Warehouse Clubs); Data Controller (Data Solutions Inc.); EDP Head & Developer (SJC)",
			achievements: ["Core developer of the official Saint Joseph College Portal"],
			subjectsHandled: [
				"Computer Programming (Java, PHP, Visual Basic)",
				"Web Systems and Technologies"
			],
			certifications: [
				"Visual Basic - Southwestern University",
				"SOLAS (Safety of Life at Sea) - PMMS"
			]
		},
		{
			name: "Mr. Jonathan F. Tse, MBA",
			title: "College Faculty & IT Certification Reviewer",
			role: "Faculty / IT Certification Reviewer / Businessman",
			undergraduate: "BS Computer Engineering - University of San Carlos (Magna Cum Laude)",
			postGraduate: "Master of Business Administration (MBA) - Ateneo Graduate School of Business",
			experience: "Almost 20 years in software development at a Japanese company (Vice President for Cebu Operations)",
			achievements: [
				"President SJC Alumni Foundation (3 years)",
				"Chief of Staff of Rotary International District 3860",
				"PhilNITS IT Passport Exam: Highest score among 1,612 examinees across all 6 IT PEC countries"
			],
			subjectsHandled: ["IT Certification Exam Review"]
		},
		{
			name: "Mr. Nelson Garde",
			title: "Head Technician / Solar Manager",
			role: "Technical Operations & Campus Solar Manager"
		},
		{
			name: "Mr. Noel Buenasaga",
			title: "Assistant IT Technical Staff & Instructor",
			role: "Technical Staff / Instructor",
			undergraduate: "BS Computer Science - Saint Joseph College",
			subjectsHandled: ["CS Elective", "System Fundamentals", "Network Management"]
		},
		{
			name: "Mr. Angelo Cortel",
			title: "Part-time Teacher",
			role: "Part-time Faculty",
			undergraduate: "BS Information Technology - Saint Joseph College",
			subjectsHandled: ["Web Systems and Technologies 2"]
		},
		{
			name: "Mr. Anthony Ejercito",
			title: "Head IT Technical Staff",
			role: "Head IT Technical Staff",
			undergraduate: "BS Computer Science"
		},
		{
			name: "Ms. Dandielle Fate Monter",
			title: "Computer Instructor",
			role: "Faculty / Instructor"
		},
		{
			name: "Mr. Joseph Demiao",
			title: "School Information Technology Officer (SITO)",
			role: "School IT Officer (SITO)"
		}
	],
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
						"IT 403 - IT Internship / On-the-Job Training (486 hrs) (6 units)"
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
				"CS Thesis Research 1 & 2",
				"CS 403 - Practicum / Industry Internship (500 hrs) (6 units)"
			],
			curriculumByYear: [
				{
					year: "4th Year",
					firstSemester: [
						"CS 401 - CS Capstone Project 2 (3 units)",
						"CS 402 - Social Issues and Professional Practice (3 units)",
						"CS Elective 2 - CS Track Elective 2 (3 units)"
					],
					secondSemester: [
						"CS 403 - Practicum / Industry Internship (500 hrs) (6 units)"
					]
				}
			]
		},
		{
			name: "Associate in Computer Technology",
			code: "ACT",
			duration: "2 Years (4 Semesters, Ladderized)",
			totalUnits: "53 Units",
			description: "A 2-year practical technical program providing foundational computing skills, hardware servicing, office productivity, programming, and technical internship. Ladderizes into BSIT/BSCS with a 2.25 GPA requirement.",
			careerOpportunities: [
				"Computer Technician / Hardware Support",
				"Junior Web Developer",
				"IT Support Staff",
				"Database & Network Support Assistant",
				"Data Encoder"
			],
			curriculumHighlights: [
				"Introduction to Computing & Hardware (ACT 101)",
				"PC Maintenance & Troubleshooting (ACT 104)",
				"Web Development Essentials & Database Systems (ACT 201, ACT 203)",
				"Systems Integration Project (ACT 204)",
				"Technical Internship (300 Hours, ACT 205)"
			],
			curriculumByYear: [
				{
					year: "1st Year",
					firstSemester: [
						"ACT 101 - Introduction to Computing & Hardware (3 units)",
						"ACT 102 - Computer Logic & Programming 1 (3 units)",
						"GE 1 - Understanding the Self (3 units)",
						"GE 3 - Mathematics in the Modern World (3 units)",
						"PATHFIT 1 - Movement Competency Training (2 units)",
						"NSTP 11 - National Service Training Program 1 (3 units)"
					],
					secondSemester: [
						"ACT 103 - Computer Programming 2 (3 units)",
						"ACT 104 - PC Maintenance & Troubleshooting (3 units)",
						"GE 4 - Purposive Communication (3 units)",
						"PATHFIT 2 - Fitness Activities (2 units)",
						"NSTP 12 - National Service Training Program 2 (3 units)"
					]
				},
				{
					year: "2nd Year",
					firstSemester: [
						"ACT 201 - Web Development Essentials (3 units)",
						"ACT 202 - Networking Fundamentals (3 units)",
						"ACT 203 - Database Management Systems (3 units)",
						"PATHFIT 3 - Sports Competency (2 units)"
					],
					secondSemester: [
						"ACT 204 - Systems Integration Project (3 units)",
						"ACT 205 - Technical Internship (300 Hours) (6 units)",
						"PATHFIT 4 - Outdoor Fitness (2 units)"
					]
				}
			]
		}
	],
	facilities: [
		{
			name: "Computer Laboratories (Rooms 407, 408, 409)",
			location: "SJC Main Campus, 4th Floor",
			description: "Fully air-conditioned computer laboratories for programming, networking, databases, and systems administration.",
			guidelines: [
				"Logbook sign-in is NOT required for Rooms 407-409.",
				"No food or open drink containers allowed inside.",
				"No unauthorized altering of desktop or network settings."
			]
		},
		{
			name: "Integrated Learning & Laboratory Center (ILLC)",
			location: "SJC Main Campus, Ground Floor",
			description: "Fully air-conditioned specialized lab for web systems, emerging technologies, and systems integration courses.",
			guidelines: [
				"Maintain neatness of workstations and report any hardware issues immediately."
			]
		},
		{
			name: "Lecture Classrooms (Rooms 421 & 422)",
			location: "SJC Main Campus, 4th Floor",
			description: "Regular classrooms utilized for CCS classes and lectures that do not require computer workstations.",
			guidelines: [
				"Keep classrooms clean and orderly after lectures."
			]
		},
		{
			name: "Cantabo Canticum Novum Mini Theater (CCN-MT) & School Chapel",
			location: "SJC Main Campus, Ground Level",
			description: "Newly constructed modern venue blessed by Maasin Bishop Precioso Cantillas (Chairman, Board of Trustees) for learning, artistic expression, dialogue, and cultural formation. Replaces the outdated Bonzel Hall for large events.",
			guidelines: [
				"Follow proper etiquette and respect the solemnity of the adjacent School Chapel."
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
			office: "Shared Deans' Office (1st Floor, Main Campus)",
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
			title: 'The 4-Year BSIT Roadmap',
			desc: 'From 1st year fundamentals all the way to analytics modeling',
			query: 'What subjects are taken from 1st to 4th year in BSIT?'
		},
		{
			tag: 'Curriculum',
			title: 'Theoretical Foundations',
			desc: 'Automata, algorithms, and how CS differs from IT',
			query: 'What subjects and specializations are covered in the BSCS curriculum?'
		},
		{
			tag: 'Policy',
			title: 'The 3rd Year Retention Gate',
			desc: 'The exact GWA required to stay in the program without shifting',
			query: 'What are the retention policies and minimum GPA to reach 3rd year in CCS?'
		},
		{
			tag: 'Tuition',
			title: 'Semester Tuition & Lab Costs',
			desc: 'Per-unit tuition rates, lab fees, and total semestral estimates',
			query: 'How much is the tuition and laboratory fee breakdown per semester in CCS?'
		},
		{
			tag: 'Discounts',
			title: 'Slashing Your Tuition',
			desc: 'Diocesan alumni grants, location discounts, and honor tiers',
			query: 'What scholarships, diocesan discounts, and tuition subsidies are available for CCS students?'
		},
		{
			tag: 'Directory',
			title: "Finding the Dean's Desk",
			desc: 'Who leads the department and where to consult on campus',
			query: "Who is the Dean of CCS and where is the Dean's Office located?"
		},
		{
			tag: 'Faculty',
			title: 'The Faces Behind Your Classes',
			desc: 'Instructors handling programming, networking, and analytics',
			query: 'Who are the CCS faculty members and what subjects do they teach?'
		},
		{
			tag: 'Directory',
			title: 'Department Secretary & Staff',
			desc: 'Who assists with enrollments, department paperwork, and lab tech',
			query: 'Who is the CCS department secretary and who handles IT technical support?'
		},
		{
			tag: 'Uniform',
			title: 'Dress Code & Wash Days',
			desc: 'Which days require uniforms and what’s allowed on wash days',
			query: 'What are the uniform guidelines, wash days, and dress code rules for CCS students?'
		},
		{
			tag: 'Policy',
			title: 'The 10-Absence Drop Rule',
			desc: 'How tardiness stacks up and the cutoff that leads to an FA mark',
			query: 'What is the attendance policy and how many absences lead to an FA grade in CCS?'
		},
		{
			tag: 'Academics',
			title: 'Latin Honors & Grading Cutoffs',
			desc: 'Exact percentage ranges from 1.00 down to the passing line',
			query: 'What is the official grading scale and percentage breakdown in Saint Joseph College?'
		},
		{
			tag: 'Capstone',
			title: 'The Capstone Gauntlet',
			desc: 'When project defense begins and why summer term is crucial',
			query: 'When do students start Capstone 1 and Capstone 2, and what are the prerequisites?'
		},
		{
			tag: 'Internship',
			title: 'The Practicum Requirement',
			desc: 'Required industry hours, internship uniforms, and deployment rules',
			query: 'How many hours are required for the CCS practicum or OJT internship?'
		},
		{
			tag: 'Policy',
			title: 'The 4th Year Gatekeeper',
			desc: 'Non-major subjects that will block your graduation if neglected',
			query: 'What requirements and subjects block students from enrolling in 4th year CCS?'
		},
		{
			tag: 'Theology',
			title: 'The 24-Unit Theo Sequence',
			desc: 'Why every 4-year candidate takes 8 religious formation courses',
			query: 'What Theology subjects are required to graduate from CCS at SJC?'
		},
		{
			tag: 'Ladderized',
			title: 'The 2-Year Backdoor',
			desc: 'Starting in ACT and bridging straight into a 4-year BSIT degree',
			query: 'How does the 2-year Associate in Computer Technology program ladderize into BSIT?'
		},
		{
			tag: 'Admissions',
			title: 'The CAT Entrance Score',
			desc: 'The passing percentage needed for direct entry into BSIT or BSCS',
			query: 'What score is required on the College Admission Test (CAT) to enter CCS directly?'
		},
		{
			tag: 'Admissions',
			title: 'The 5-Step Enrollment Run',
			desc: 'Navigating from admission screening to getting your stamped COR',
			query: 'What are the steps to enroll in CCS from evaluation to final registration?'
		},
		{
			tag: 'Campus',
			title: '4th Floor Lab Guidelines',
			desc: 'Workstation rules, environment setup, and logbook expectations',
			query: 'What are the computer laboratories on the 4th floor and what rules must students follow?'
		},
		{
			tag: 'Campus',
			title: 'Ground Floor Tech Lab',
			desc: 'The specialized space used for emerging technologies and web development',
			query: 'What is the ILLC laboratory and what classes are conducted there?'
		},
		{
			tag: 'Campus',
			title: 'The Modern Event Hall',
			desc: 'The campus venue that replaced Bonzel Hall for major gatherings',
			query: 'Where is the Cantabo Canticum Novum Mini Theater and what is it used for?'
		},
		{
			tag: 'Tech Stack',
			title: 'Software & Dev Tools Used',
			desc: 'The editors, web stacks, and database engines used in class',
			query: 'What programming languages, software, and development tools are used in CCS classes?'
		},
		{
			tag: 'Certifications',
			title: 'International IT Certification',
			desc: 'The Japanese-standard IT Passport exam review handled by faculty',
			query: 'What is the PhilNITS IT Passport certification and does CCS offer review for it?'
		},
		{
			tag: 'History',
			title: 'Who Coded the SJC Portal?',
			desc: 'The faculty member and developer behind the official campus system',
			query: 'Who developed the Saint Joseph College online portal and what is their role in CCS?'
		},
		{
			tag: 'Student Life',
			title: 'Student Orgs & Leadership',
			desc: 'Co-curricular bodies representing IT students across the college',
			query: 'What student organizations are active in the College of Computer Studies?'
		},
		{
			tag: 'Student Life',
			title: 'Department Days & Hackathons',
			desc: 'Tech summits, project exhibitions, and departmental competitions',
			query: 'What annual events and tech competitions happen in CCS throughout the school year?'
		},
		{
			tag: 'Academics',
			title: 'The 4-Exam Gauntlet',
			desc: 'The major examination periods each semester and required permits',
			query: 'What are the four major examinations each semester and what permit is required?'
		},
		{
			tag: 'Policy',
			title: 'Handling NC & Missed Finals',
			desc: 'The strict compliance window before an incomplete mark hardens',
			query: 'What does an NC grade mean and how much time do students have to complete it?'
		},
		{
			tag: 'Heritage',
			title: 'The CCS Origin Story',
			desc: 'When the department was founded and the core values that guide it',
			query: 'When was the CCS department founded and what is its official motto and history?'
		},
		{
			tag: 'Discounts',
			title: 'Regional Student Grants',
			desc: 'Special tuition deductions for students traveling from neighboring towns',
			query: 'Are there tuition discounts for students from Sogod, Baybay, or other areas outside Maasin?'
		},
		{
			tag: 'Careers',
			title: 'IT Specialist vs Developer',
			desc: 'Comparing the career trajectories between the two computing degrees',
			query: 'What is the difference in career opportunities between BSIT and BSCS?'
		},
		{
			tag: 'Academics',
			title: 'From HTML to Full-Stack',
			desc: 'How web technologies evolve from basic scripting to Python and Django',
			query: 'What web development technologies and frameworks are taught across the years in BSIT?'
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

export function getRandomStarterSuggestions(count = 4, excludeQueries: string[] = []): StarterPrompt[] {
	const excludeSet = new Set(excludeQueries);
	let pool = ccsKnowledge.starterPrompts.filter((p) => !excludeSet.has(p.query));
	if (pool.length < count) {
		pool = [...ccsKnowledge.starterPrompts];
	}
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, count);
}
