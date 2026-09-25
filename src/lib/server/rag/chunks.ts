export interface KnowledgeChunk {
	id: string;
	category: 'academics' | 'policy' | 'directory' | 'campus';
	content: string;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
	{
		id: 'academics-bscs',
		category: 'academics',
		content: `## Bachelor of Science in Computer Science (BSCS)
Duration: 4 Years
Description: Focuses on the theoretical foundations of computing, algorithm design, software engineering, intelligence systems, and data structures.
Career Opportunities: Software Engineer, Systems Developer, Data Scientist, AI Specialist, Algorithm Engineer, Systems Analyst, Research & Development Scientist.
Curriculum Highlights: Data Structures & Algorithms, Object-Oriented Programming (Java / Python / C++), Artificial Intelligence & Machine Learning, Software Engineering & Architecture, Operating Systems & Compiler Design.
Capstone/Thesis: BSCS candidates complete an original Thesis project addressing an algorithmic or computing challenge.`
	},
	{
		id: 'academics-bsit',
		category: 'academics',
		content: `## Bachelor of Science in Information Technology (BSIT)
Duration: 4 Years
Description: Focuses on practical implementation, deployment, management, and security of computer systems, networks, web, and enterprise technologies.
Career Opportunities: Full-Stack Web / Mobile App Developer, Network & Systems Administrator, Database Administrator (DBA), Cybersecurity Analyst, IT Project Manager & Support Lead.
Curriculum Highlights: Web Systems and Technologies, Mobile Application Development, Database Management Systems & SQL, Network Administration & CISCO Technologies, Information Assurance & Security.
Capstone/Thesis: BSIT candidates develop an enterprise-ready Capstone project with client deployment.`
	},
	{
		id: 'academics-act',
		category: 'academics',
		content: `## Associate in Computer Technology (ACT)
Duration: 2 Years (Ladderized)
Description: A ladderized 2-year program equipping students with foundational computing skills, hardware servicing, office productivity, and basic coding. Can ladderize into BSIT or BSCS.
Career Opportunities: Computer Technician, Hardware Support, Junior Web Developer, IT Support Staff, Data Encoder, Technical Assistant.
Curriculum Highlights: Computer Hardware Servicing, Foundations of Programming, Productivity Tools and Office Automation, Basic Networking & Cable Crimping.`
	},
	{
		id: 'policy-retention',
		category: 'policy',
		content: `## Retention Policy & Grading Standards
To maintain good standing in BSCS and BSIT, students must achieve a grade of at least 2.0 (80%) in all prerequisite programming and major subjects. Remedial pathways or advising sessions are available for students needing academic support or subject reconsideration.`
	},
	{
		id: 'policy-ojt',
		category: 'policy',
		content: `## Practicum / On-the-Job Training (OJT) Hours
BSIT and BSCS students complete a minimum of 486 to 500 hours of on-the-job training (OJT) / internship in accredited tech firms, government agencies, IT departments, or local enterprises during their senior year.`
	},
	{
		id: 'policy-capstone-thesis',
		category: 'policy',
		content: `## Capstone Project and Thesis Differences
BSCS candidates complete an original Thesis project addressing an algorithmic or computing challenge. BSIT candidates develop an enterprise-ready Capstone project with client deployment and practical utility.`
	},
	{
		id: 'directory-deans-office',
		category: 'directory',
		content: `## CCS Dean's Office Location & Hours
Location: 2nd Floor of the CCS Building at Saint Joseph College main campus (Tunga-tunga, Maasin City, Southern Leyte).
Office Hours: Monday through Friday, 8:00 AM to 5:00 PM.
Services: Department evaluations, curriculum advisory, subject crediting for transferees, faculty consultations, and department endorsements.`
	},
	{
		id: 'directory-registrar-finance',
		category: 'directory',
		content: `## Registrar, Admissions, and Finance Offices
Enrollment is processed through the SJC Registrar's Office on the Ground Floor of the Administration Building.
Tuition assessments and scholarship grants (CHED, UniFAST, Institutional Scholarships) are administered by the SJC Finance Office and Student Affairs Services (SAS) Office.`
	},
	{
		id: 'campus-labs',
		category: 'campus',
		content: `## CCS Computer Laboratories and Guidelines
1. Programming & Software Engineering Lab (2nd Floor, CCS Building): High-performance desktop rigs, dual monitors, modern IDEs, local server environments. Rules: No food or open drink containers allowed; always sign the lab logbook; save projects to personal cloud or git repository as local disk storage is wiped regularly.
2. CISCO & Networking Laboratory (2nd Floor, CCS Building): Specialized lab with CISCO routers, switches, patch panels, crimping stations, and server racks for hands-on topologies. Rules: Wear ESD safety gear when handling internal components; return patch cables, crimpers, and testers to equipment cabinets; do not modify live campus networking configurations.
3. Multimedia & Design Studio (3rd Floor, CCS Building): Dedicated to UI/UX design, game development, rendering, graphic design, and audio-visual production. Book studio time through the lab custodian 24 hours in advance.`
	},
	{
		id: 'campus-laptop-specs',
		category: 'campus',
		content: `## Recommended Laptop / PC Requirements for CCS Students
While campus computer laboratories are fully accessible during class hours and open lab sessions, students are recommended to have a laptop with at least an Intel Core i5 or AMD Ryzen 5 processor, 16GB RAM, and 512GB SSD for development, virtual machines, and IDEs.`
	},
	{
		id: 'campus-student-life',
		category: 'campus',
		content: `## CCS Student Organizations & Annual Events
Organizations:
- CCS Student Council: The governing body for all computing students at SJC.
- Society of Information Technology Enthusiasts (SITE).
- Association of Computer Science Innovators (ACSI).
Annual Events:
- CCS Week / Tech Summit: Annual seminars, workshops, and exhibitions.
- SJC Hackathon & Programming Competition.
- IT Olympics & E-Sports Tournament.
- Project Pitching & Capstone Expo.`
	}
];
