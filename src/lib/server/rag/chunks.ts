export interface KnowledgeChunk {
	id: string;
	category: 'academics' | 'policy' | 'directory' | 'campus';
	content: string;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
	{
		id: 'academics-programs-1',
		category: 'academics',
		content: `# Academic Programs & Curriculum
Saint Joseph College - College of Computer Studies offers CHED-recognized undergraduate programs: BSCS (Computer Science), BSIT (Information Technology), and ACT (Associate in Computer Technology).`
	},
	{
		id: 'academics-programs-2',
		category: 'academics',
		content: `## Bachelor of Science in Computer Science (BSCS)
- Duration: 4 Years
- Program Chair: Prof. Jonathan M. Perez, MSCS
- Description: Focuses on theoretical foundations of computing, algorithm design, software engineering, intelligence systems, and data structures.
- Career Pathways: Software Engineer, Systems Developer, Data Scientist, AI Specialist, Algorithm Engineer, Systems Analyst, Research & Development Scientist.
- Curriculum by Year:
  - Year 1: Intro to Computing (CS 111), Fundamentals of Programming (CS 112), Discrete Structures 1 & 2 (CS 113/122), Intermediate Programming (CS 121).
  - Year 2: Data Structures & Algorithms (CS 211), OOP (CS 212), Computer Org & Architecture (CS 213), Algorithms Analysis (CS 221), Operating Systems (CS 222), DBMS (CS 223), Web Dev (CS 224).
  - Year 3: Automata Theory (CS 311), Software Engineering 1 & 2 (CS 312/321), Artificial Intelligence (CS 313), Compiler Design (CS 322), Machine Learning, Research Methods (CS 323).
  - Year 4: CS Thesis 1 & 2 (CS 411/421), Information Assurance & Security (CS 412), Cloud Computing, Industry Practicum / OJT (486-500 Hours).
- Capstone/Thesis: Original Thesis project addressing an algorithmic or computing theoretical challenge.`
	},
	{
		id: 'academics-programs-3',
		category: 'academics',
		content: `## Bachelor of Science in Information Technology (BSIT)
- Duration: 4 Years
- Program Chair: Engr. Mark Anthony E. Cadayong, MIT
- Description: Focuses on practical implementation, deployment, management, and security of computer systems, networks, web, and enterprise technologies.
- Career Pathways: Full-Stack Web / Mobile App Developer, Network & Systems Administrator, Database Administrator (DBA), Cybersecurity Analyst, IT Project Manager & Support Lead.
- Curriculum by Year:
  - Year 1: Intro to Computing (IT 111), Computer Programming 1 & 2 (IT 112/121), Discrete Math for IT (IT 122), Living in the IT Era.
  - Year 2: Data Structures & Algorithms (IT 211), OOP (IT 212), Networking 1 & 2 (CISCO Fundamentals/Routing - IT 213/222), Platform Tech (IT 214), DBMS (IT 221), Web Systems 1 (IT 223), Systems Analysis & Design (IT 224).
  - Year 3: Web Systems 2 (IT 311), Mobile App Dev (IT 312), Info Assurance & Security 1 & 2 (IT 313/321), Systems Integration (IT 314), Capstone Project 1 (IT 323), Cloud & DevOps.
  - Year 4: Capstone Project 2 (IT 411 - Implementation & Defense), Systems Administration (IT 412), Cybersecurity Incident Response, Industry Practicum / OJT (486-500 Hours).
- Capstone/Thesis: Enterprise-ready Capstone project with client deployment and practical utility.`
	},
	{
		id: 'academics-programs-4',
		category: 'academics',
		content: `## Associate in Computer Technology (ACT)
- Duration: 2 Years (Ladderized into BSIT or BSCS)
- Description: Equips students with foundational computing skills, hardware servicing, office productivity, and basic coding.
- Career Pathways: Computer Technician, Hardware Support, Junior Web Developer, IT Support Staff, Data Encoder.
- Curriculum Highlights: Computer Hardware Servicing, Foundations of Programming, Productivity Tools and Office Automation, Basic Networking & Cable Crimping.`
	},
	{
		id: 'academics-programs-5',
		category: 'academics',
		content: `## Enrollment Steps for CCS Students
1. Admissions & Credential Verification: Submit Form 138/SF9, Good Moral, PSA Birth Certificate (or TOR for transferees) at Registrar & Admissions (Ground Floor, Admin Bldg).
2. CCS Department Academic Evaluation: Present credentials to Dean Dr. Raymund P. Libarnes or Program Chairs (2nd Floor, CCS Bldg) for curriculum and prerequisite evaluation.
3. Subject Advising & Encoding: Assigned faculty adviser evaluates curriculum checklist and encodes semester subjects.
4. Assessment & Fee Settlement: Proceed to Finance/Cashier Office for tuition assessment and scholarship (CHED/UniFAST) verification or down payment.
5. Registration Confirmation & ID: Return to Registrar for official stamped Certificate of Registration (COR) and student ID activation.`
	},
	{
		id: 'policy-academic_policies-1',
		category: 'policy',
		content: `# CCS Academic & Internship Policies
Saint Joseph College College of Computer Studies academic guidelines, retention policies, grading standards, OJT requirements, and capstone regulations.`
	},
	{
		id: 'policy-academic_policies-2',
		category: 'policy',
		content: `## Retention Policy & Grading Standards
- To maintain good standing in BSCS and BSIT, students must achieve a minimum grade of 2.0 (85%) in all prerequisite programming and major subjects.
- Remedial pathways or advising sessions are available for students needing academic support or subject reconsideration.
- Official Philippine Grading Scale:
  - 1.00 = 97 - 100% (Excellent)
  - 1.25 = 94 - 96% (Superior)
  - 1.50 = 91 - 93% (Very Good)
  - 1.75 = 88 - 90% (Good)
  - 2.00 = 85 - 87% (Satisfactory, Retention threshold for majors)
  - 2.25 = 82 - 84% (Fair)
  - 2.50 = 80 - 81% (Passed)
  - 2.75 = 76 - 79% (Passed)
  - 3.00 = 75% (Passing Grade)
  - 5.00 = Below 75% (Failed)
  - INC = Incomplete (1 school year compliance period)`
	},
	{
		id: 'policy-academic_policies-3',
		category: 'policy',
		content: `## Practicum / On-the-Job Training (OJT) Hours
- BSIT and BSCS students must complete a minimum of 486 to 500 hours of on-the-job training (OJT) / internship.
- Placements are in accredited tech firms, government agencies, IT departments, or local enterprises during their senior year second semester.`
	},
	{
		id: 'policy-academic_policies-4',
		category: 'policy',
		content: `## Capstone Project & Thesis Guidelines
- BSCS candidates complete an original Thesis project addressing an algorithmic or computing challenge.
- BSIT candidates develop an enterprise-ready Capstone project with client deployment and practical utility.`
	},
	{
		id: 'directory-offices-1',
		category: 'directory',
		content: `# CCS Directory & Offices
Directory of academic leaders, faculty roster, and administrative offices for Saint Joseph College CCS.`
	},
	{
		id: 'directory-offices-2',
		category: 'directory',
		content: `## CCS Dean's Office & Leadership
- Dean: Dr. Raymund P. Libarnes, DIT
- Location: 2nd Floor, CCS Building, Saint Joseph College Main Campus, Tunga-tunga, Maasin City, Southern Leyte.
- Office Hours: Monday through Friday, 8:00 AM to 5:00 PM.
- Dean Consultation Hours: Monday through Friday, 1:00 PM to 4:00 PM.
- Services: Curriculum evaluations, subject crediting for transferees, academic advising, instructor consultations, and department endorsements.`
	},
	{
		id: 'directory-offices-3',
		category: 'directory',
		content: `## Faculty Roster & Consultation Schedules
- Engr. Mark Anthony E. Cadayong, MIT (Program Chair, BSIT)
  - Specialization: Network Administration, CISCO Technologies, Information Assurance & Cybersecurity
  - Office: Faculty Office 201, 2nd Floor, CCS Building
  - Consultation: Monday / Wednesday / Friday, 9:00 AM - 11:30 AM
- Prof. Jonathan M. Perez, MSCS (Program Chair, BSCS)
  - Specialization: Algorithms & Complexity, Machine Learning, Artificial Intelligence, Python/C++ Programming
  - Office: Faculty Office 202, 2nd Floor, CCS Building
  - Consultation: Tuesday / Thursday, 10:00 AM - 12:00 PM
- Inst. Mary Grace T. Alinsub, MIT (Instructor & Lab Coordinator)
  - Specialization: Web Systems & Technologies, Full-Stack Web Development, UI/UX Design
  - Office: Faculty Office 203, 2nd Floor, CCS Building
  - Consultation: Monday / Wednesday / Friday, 1:30 PM - 3:30 PM
- Inst. Paul Christian D. Tan (Instructor)
  - Specialization: Mobile Application Development (Android/Flutter), OOP Java, Data Structures
  - Office: Faculty Office 203, 2nd Floor, CCS Building
  - Consultation: Tuesday / Thursday, 1:00 PM - 3:00 PM`
	},
	{
		id: 'directory-offices-4',
		category: 'directory',
		content: `## SJC Registrar & Admissions
- Location: Ground Floor, Administration Building.
- Services: Formal university admissions, enrollment clearance, transcript requests, and official subject evaluations.`
	},
	{
		id: 'directory-offices-5',
		category: 'directory',
		content: `## Finance Office & Student Affairs Services (SAS)
- Services: Tuition assessments, payment plans, scholarships, CHED/UniFAST grants, and student welfare inquiries.`
	},
	{
		id: 'campus-facilities_and_life-1',
		category: 'campus',
		content: `# CCS Campus Facilities & Student Life
Overview of computer laboratories, student organizations, hardware recommendations, and annual events.`
	},
	{
		id: 'campus-facilities_and_life-2',
		category: 'campus',
		content: `## Computer Laboratories & Guidelines
1. Programming & Software Engineering Lab (2nd Floor, CCS Building): High-performance desktop rigs, dual monitors, modern IDEs, local server environments. Rules: No food or open drink containers allowed; always sign the lab logbook; save projects to personal cloud or git repository as local disk storage is wiped regularly.
2. CISCO & Networking Laboratory (2nd Floor, CCS Building): Specialized lab with CISCO routers, switches, patch panels, crimping stations, and server racks for hands-on topologies. Rules: Wear ESD safety gear when handling internal components; return patch cables, crimpers, and testers to equipment cabinets; do not modify live campus networking configurations.
3. Multimedia & Design Studio (3rd Floor, CCS Building): Dedicated to UI/UX design, game development, rendering, graphic design, and audio-visual production. Book studio time through the lab custodian 24 hours in advance.`
	},
	{
		id: 'campus-facilities_and_life-3',
		category: 'campus',
		content: `## Hardware & Laptop Recommendations
While campus computer laboratories are fully accessible during class hours and open lab sessions, students are recommended to have a laptop with at least an Intel Core i5 or AMD Ryzen 5 processor, 16GB RAM, and 512GB SSD for development, virtual machines, and IDEs.`
	},
	{
		id: 'campus-facilities_and_life-4',
		category: 'campus',
		content: `## Student Organizations & Events
Organizations:
- CCS Student Council (CCSSC): The apex governing body representing all computing students at SJC.
- Society of Information Technology Enthusiasts (SITE): Official department organization for BSIT majors.
- Association of Computer Science Innovators (ACSI): Official department organization for BSCS majors.
Annual Events:
- CCS Week / Tech Summit: Annual seminars, workshops, and exhibitions.
- SJC Hackathon & Programming Competition.
- IT Olympics & E-Sports Tournament.
- Project Pitching & Capstone Expo.`
	}
];
