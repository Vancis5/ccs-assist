// AUTO-GENERATED from knowledge/*.md - DO NOT EDIT DIRECTLY
// To update, edit files in knowledge/ and run: node scripts/ingest.mjs --sync-chunks

export interface KnowledgeChunk {
	id: string;
	category: 'academics' | 'policy' | 'directory' | 'campus';
	content: string;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
	{
		"id": "academics-programs-1",
		"category": "academics",
		"content": "# Academic Programs & Curriculum"
	},
	{
		"id": "academics-programs-2",
		"category": "academics",
		"content": "## College of Computer Studies Overview\n- **Dean**: Haidee Galdo (formerly Riza Siega)\n- **Location**: Main Campus, 1st Floor, right side near the entrance, beside the staircase.\n- **Accreditation & Affiliations**: PAASCU Accredited, CEAP Member, CHED Recognized.\n- **Official Links**: [CCS Department Website](https://www.sjc.edu.ph/academics/college-of-computer-studies) | [SJC Student Portal](https://online.sjc.edu.ph/enrollment/?content=enrollment) | [SJC Moodle LMS](https://lms.sjc.edu.ph/login/index.php) | [CCS Facebook Page](https://www.facebook.com/profile.php?id=100083430218425)\n- **Degrees Offered**:\n  - Bachelor of Science in Information Technology (BSIT) - 4 Years\n  - Bachelor of Science in Computer Science (BSCS) - 4 Years\n  - Associate in Computer Technology (ACT) - 2 Years (Ladderized into BSIT/BSCS)"
	},
	{
		"id": "academics-programs-3",
		"category": "academics",
		"content": "## Admission & Program Entry Requirements\n- **College Admission Test (CAT) Cut-Off**: Incoming first-year students must obtain a passing rate of at least 75% on the CAT for direct entry into BSIT or BSCS.\n- **Ladderized Pathway for ACT**: Applicants with CAT scores below 75% are enrolled in the 2-Year Associate in Computer Technology (ACT) program. They may shift to BSIT or BSCS after the first semester provided they achieve a Grade Point Average (GPA) of at least 2.25.\n- **Prerequisites for 4th Year Standing**: No student may enroll in the 4th year without completing and passing all Physical Education subjects (PATHFit 1 to 4) and NSTP (NSTP 11 and 12).\n- **Theology Requirement for Graduation**: Candidates for graduation from a 4-year degree must complete 24 units of Theology (8 sequential courses, 3 units each)."
	},
	{
		"id": "academics-programs-4",
		"category": "academics",
		"content": "## Bachelor of Science in Information Technology (BSIT)\n- **Duration**: 4 Years (8 Semesters + 1 Summer Term)\n- **Specialization / Focus**: Business Analytics & Data Analytics, Systems Integration, Web Systems (HTML, CSS, JavaScript, PHP with XAMPP, SQL, and Python/Django in 3rd Year), Networking & Communications, Cybersecurity, and Enterprise Data Management.\n- **Total Units**: ~167 Units\n- **Curriculum by Year & Semester**:\n  - **1st Year — 1st Semester (26 Units | 9 Subjects)**:\n    - IT 101: Introduction to Computing (3 units)\n    - IT 102: Computer Programming 1 (3 units)\n    - Math En: Math Enrichment (3 units)\n    - GE 1: Understanding the Self (3 units)\n    - GE 2: Readings in the Philippine History (3 units)\n    - GE EL 1: Living in the IT Era (3 units)\n    - Theo 1a: Old Testament (3 units)\n    - PATHFit 1: Movement Competency Training (2 units)\n    - NSTP 11: National Service Training Program 1 (3 units)\n  - **1st Year — 2nd Semester (29 Units | 10 Subjects)**:\n    - IT 111: Networks and Communications 1 (3 units)\n    - IT 112: Computer Programming 2 (3 units)\n    - IT 113: Discrete Structures (3 units)\n    - GE 3: Mathematics in the Modern World (3 units)\n    - GE 4: Purposive Communication (3 units)\n    - GE 5: Science, Technology, and Society (3 units)\n    - GE EL 2: Gender and Society (3 units)\n    - Theo 1b: New Testament (3 units)\n    - PathFit 2: Exercise-based Fitness Activities (2 units)\n    - NSTP 12: National Service Training Program 2 (3 units)\n  - **2nd Year — 1st Semester (26 Units | 9 Subjects)**:\n    - IT 201: Information Management (3 units)\n    - IT 202: Data Structures & Algorithms (3 units)\n    - IT 203: Web Systems and Technologies 1 (3 units)\n    - IT 204: Platform Technologies (3 units)\n    - GE 6: The Contemporary World (3 units)\n    - GE 7: Art Appreciation (3 units)\n    - GE EL 3: Great Books (3 units)\n    - Theo 2a: Christology (3 units)\n    - PathFit 3: Sports (2 units)\n  - **2nd Year — 2nd Semester (26 Units | 9 Subjects)**:\n    - IT 211: Object - Oriented Programming (3 units)\n    - IT 212: Human Computer Interaction (3 units)\n    - IT 213: Application Dev & Emerging Tech (3 units)\n    - IT 214: Information Management 2 (3 units)\n    - IT 215: Systems Analysis and Design (3 units)\n    - GE 8: Ethics (3 units)\n    - GE 9: Life and Works of Rizal (3 units)\n    - Theo 2b: Mariology (3 units)\n    - PathFit 4: Dance (2 units)\n  - **3rd Year — 1st Semester (24 Units | 8 Subjects)**:\n    - IT 301: Information Assurance and Security (3 units)\n    - IT 302: Systems Integration and Architecture 1 (3 units)\n    - IT 303: Networking 2 (3 units)\n    - IT 304: Quantitative Methods (3 units)\n    - IT 305: Web Systems and Technologies 2 (3 units)\n    - IT 306: Business Analytics (3 units)\n    - IT 307: Enterprise Data Management (3 units)\n    - Theo 3a: Christian Morality (3 units)\n  - **3rd Year — 2nd Semester (24 Units | 8 Subjects)**:\n    - IT 311: Analytic Tools and Techniques (3 units)\n    - IT 312: Analytics Modeling (3 units)\n    - IT 313: Social Issues and Professional Practice (3 units)\n    - IT 314: Systems Admin and Maintenance (3 units)\n    - IT 315: Integrative Programming and Tech 1 (3 units)\n    - IT EL 1: IT Elective 1 (3 units)\n    - IT EL 2: IT Elective 2 (3 units)\n    - Theo 3b: The Commandments (3 units)\n  - **Summer Term (Incoming 4th Year | 6 Units)**:\n    - Capstone 1: Capstone Project 1 (3 units)\n    - Theo 4a: Intro to Pastoral Life / BEC (3 units)\n  - **4th Year — 1st Semester (21 Units | 7 Subjects)**:\n    - Capstone 2: Capstones Project 2 (3 units)\n    - IT 401: Technopreneurship (3 units)\n    - IT 402: Analytics Application (3 units)\n    - Pro En: Professional Enhancement (3 units, held in Bonzel Hall)\n    - IT EL 3: IT Elective 3 (3 units)\n    - IT EL 4: IT Elective 4 (3 units)\n    - Theo 4b: Pastoral Exposure (3 units)\n  - **4th Year — 2nd Semester**:\n    - Practicum / Industry Internship (OJT)"
	},
	{
		"id": "academics-programs-5",
		"category": "academics",
		"content": "## Bachelor of Science in Computer Science (BSCS)\n- **Duration**: 4 Years\n- **Description**: Emphasizes algorithms, computational theory, artificial intelligence, software engineering, and mathematical structures.\n- **Entry & Retention**: Requires at least 75% on the CAT and maintenance of a 2.25 GWA in 1st and 2nd year professional computing subjects for admission to 3rd year.\n- **Degree Culmination**: Original CS Computing Research / Thesis Project."
	},
	{
		"id": "academics-programs-6",
		"category": "academics",
		"content": "## Associate in Computer Technology (ACT)\n- **Duration**: 2 Years (Ladderized)\n- **Description**: Equips students with foundational computing skills, hardware servicing, office productivity, and programming fundamentals.\n- **Ladderization**: Students completing the 2-year curriculum or reaching a 2.25 GPA after 1st sem can transition seamlessly into the 3rd year of BSIT or BSCS."
	},
	{
		"id": "policy-academic_policies-1",
		"category": "policy",
		"content": "# CCS & SJC Academic Policies, Grading, and Scholarships"
	},
	{
		"id": "policy-academic_policies-2",
		"category": "policy",
		"content": "## College of Computer Studies Retention & Academic Standing\n- **Admission to 3rd Year BSIT / BSCS**: Students must complete all prescribed 1st and 2nd year professional computing courses with an average rating of at least **2.25**. This 2.25 average rating must be maintained.\n- **Failing Limit & Shifting**: Any student who fails in more than three (3) subjects shall be advised to shift to another course.\n- **CAT Entrance Threshold**: Passing rate of 75% on College Admission Test (CAT) is required for BSIT/BSCS; below 75% enters 2-year ACT and can shift after 1st sem with a 2.25 GPA.\n- **Fourth Year Prerequisite Gate**: No student is allowed to enroll in the 4th year unless all Physical Education courses (PATHFit 1, 2, 3, 4) and NSTP (NSTP 11 and 12) have been successfully passed.\n- **Theology Requirement**: All candidates graduating from a 4-year program must complete 24 units of Theology (Theo 1a to Theo 4b)."
	},
	{
		"id": "policy-academic_policies-3",
		"category": "policy",
		"content": "## Official Grading Scale & Equivalents\n- **1.00** = 98% and above (Excellent - Summa Cum Laude interval)\n- **1.25** = 95% - 97% (Very Good)\n- **1.50** = 92% - 94% (Very Good - Magna Cum Laude interval)\n- **1.75** = 89% - 91% (Good - Cum Laude interval)\n- **2.00** = 86% - 88% (Good - Dean's Lister interval)\n- **2.25** = 83% - 85% (Good - CCS 3rd Year Retention Threshold)\n- **2.50** = 80% - 82% (Fair)\n- **2.75** = 77% - 79% (Fair)\n- **3.00** = 75% - 76% (Passed / Minimum Passing Grade)\n- **5.00** = Below 75% (Failed)\n- **NC** = No Credit (Given when final exam is missed and standing is unsatisfactory; compliance window within 2 weeks after rating sheet submission)\n- **W** = Officially Withdrawn (Complied with official withdrawal processing)\n- **FW** = Failure due to Unofficial Withdrawal (Stopped attending without official notice)\n- **FA** = Failure due to Excessive Absences (Exceeded maximum allowed class absences)"
	},
	{
		"id": "policy-academic_policies-4",
		"category": "policy",
		"content": "## Attendance, Absences, and Exam Rules\n- **Tardiness & Absences**: Arriving 15 minutes late, leaving 15 minutes early, or accumulating 3 consecutive tardiness marks counts as 1 absence.\n- **Maximum Absences (FA Drop)**: Incurring 10 absences in full in-person classes (or 5 absences in HyFlex/flexible modality) results in automatic drop with a permanent rating of \"FA\".\n- **Major Examinations**: Administered 4 times per semester: Pre-midterm, Midterm, Prefinal, and Final examinations. Students must present an official Examination Permit issued by the Bursar's / Cashier Office. Special exams must be filed with the Dean within 5 days with valid medical/justifiable proof."
	},
	{
		"id": "policy-academic_policies-5",
		"category": "policy",
		"content": "## Scholarships, Discounts, and Special Privileges\n- **Academic Scholarships (Semestral GWA)**:\n  - **Full Tuition (100%)**: GWA 1.00 – 1.20 (no grade below 1.25)\n  - **Three-Fourths Tuition (75%)**: GWA 1.21 – 1.40 (no grade below 1.50)\n  - **Half Tuition (50%)**: GWA 1.41 – 1.60 (no grade below 1.75)\n  - **Dean's Lister Honor Roll**: GWA 1.61 – 1.80 (no grade below 2.00, full load, no NC/FA/FW)\n- **Diocesan & Institutional Discounts**:\n  - Alumni of Diocesan Schools: **70% discount**\n  - Alumni of Private Schools in Diocese of Maasin (Josephinian Grant): **50% discount**\n  - Residents of Sogod, Baybay, and beyond: **40% discount**\n  - SJC Senior High School Alumni: **20% discount**\n  - Family Discount: 3 siblings = 5% each; 4 siblings = 7% each; 5+ siblings = 10% each on tuition\n  - Student Leaders: President of FCSO (100% full tuition); Editors of \"The Josephinian\" (Full or 50% discount)\n  - Government Subsidies: DOST-SEI, CHED Grants, UniFAST / Tertiary Education Subsidy (TES)"
	},
	{
		"id": "policy-academic_policies-6",
		"category": "policy",
		"content": "## Uniform, Attire & Dress Code Guidelines\n- **Regular Days (Mon, Tue, Thu, Fri)**: Prescribed customized SJC uniform. Males: SJC polo, pants, white undershirt, black leather shoes, clean haircut (no long/colored hair, no piercings/earrings). Females: SJC blouse, skirt at least 2 inches below the knee or straight-cut pants, closed black shoes.\n- **Wash Days (Wednesdays & Saturdays)**:\n  - **Wednesdays**: Old or New CCS Departmental Polo Shirt.\n  - **Saturdays**: Departmental or Recognized Organization Polo Shirt, or decent semi-formal/formal attire covering knees (Catholic school modesty guidelines).\n- **Internship / OJT**: Prescribed official Intern Uniform while on duty and within campus premises."
	},
	{
		"id": "directory-offices-1",
		"category": "directory",
		"content": "# CCS Directory, Administration & Key Offices"
	},
	{
		"id": "directory-offices-2",
		"category": "directory",
		"content": "## CCS Leadership & Dean's Office\n- **Dean**: Haidee Galdo (formerly Riza Siega)\n- **Location**: Main Campus, 1st Floor, right side near the entrance, beside the staircase.\n- **Office Hours**: Regular work hours (Monday to Friday, 8:00 AM - 5:00 PM; availability based on schedule).\n- **Student Consultations**: Open for consultation anytime or by appointment.\n- **Services**: Academic advising, subject crediting, curriculum evaluation, department endorsements, special exam approvals, and student guidance.\n- **CCS Department Website**: [CCS Webpage](https://www.sjc.edu.ph/academics/college-of-computer-studies)\n- **Official CCS Facebook Page**: [CCS Facebook Page](https://www.facebook.com/profile.php?id=100083430218425)"
	},
	{
		"id": "directory-offices-3",
		"category": "directory",
		"content": "## Institutional Administration & Official Links\n- **School President**: Rev. Msgr. Oscar A. Cadayona, PhD, SThL-MA\n- **Institution**: Saint Joseph College (SJC), Main Campus, Tunga-tunga, Maasin City, Southern Leyte, Philippines.\n- **Trunkline / Phone**: (053) 570 8448\n- **Official Institutional Email**: info@sjc.edu.ph\n- **Data Protection Officer**: dpo@sjc.edu.ph\n- **Official School Website**: [Saint Joseph College](https://www.sjc.edu.ph/)\n- **Official SJC Facebook Page**: [SJC Facebook](https://www.facebook.com/sjc2028)\n- **Student Portal (Enrollment & Grades)**: [SJC Student Portal](https://online.sjc.edu.ph/enrollment/?content=enrollment)\n- **SJC Moodle LMS (Online Learning Platform)**: [SJC Moodle LMS](https://lms.sjc.edu.ph/login/index.php)"
	},
	{
		"id": "directory-offices-4",
		"category": "directory",
		"content": "## Key Student Support & Administrative Offices\n- **Registrar & Admissions Office (Ground Floor, Admin Bldg)**:\n  - College Admission Test (CAT) processing, freshmen and transferee credential evaluation (Form 138/SF9, Good Moral, PSA Birth Certificate, TOR/Honorable Dismissal).\n  - Subject add/drop, official scholastic records, and stamped Certificate of Registration (COR).\n- **Finance & Bursar's Office (Ground Floor, Admin Bldg)**:\n  - Tuition assessment (₱524/unit or ~₱1,572 per 3-unit course), lab fee settlements (₱1,262 per lab), examination permits (Pre-mid, Midterm, Prefinal, Final), scholarship application credits (Diocesan 50%-70%, UniFAST/TES, CHED, DOST-SEI).\n- **Student Affairs and Services Office (SASO)**:\n  - Oversees student organizations (PSITS, FCSO), clearance for campus activities, student handbook compliance, and student welfare.\n- **Guidance & Placement Services**:\n  - Mandatory 1st year second-semester psychological evaluation, career placement, and personal counseling.\n- **Information & Orientation Services / SITO**:\n  - Campus network access, [SJC Student Portal](https://online.sjc.edu.ph/enrollment/?content=enrollment) access and troubleshooting, and computer lab room reservations."
	},
	{
		"id": "campus-facilities_and_life-1",
		"category": "campus",
		"content": "# Campus Facilities, Computer Laboratories & Student Life"
	},
	{
		"id": "campus-facilities_and_life-2",
		"category": "campus",
		"content": "## Computer Laboratories & Campus Facilities\n- **Laboratories (4th Floor, Rooms 407–409)**: Fully air-conditioned computer laboratories equipped for programming, networking, database management, and systems administration.\n- **ILLC Laboratory (Ground Floor)**: Integrated Learning and Laboratory Center utilized for web development, emerging technologies, and systems integration courses.\n- **Bonzel Hall**: Multi-purpose auditorium/hall utilized for Professional Enhancement courses, tech symposiums, department assemblies, and major institutional events.\n- **Laboratory Usage & Policies**:\n  - Open during designated laboratory schedules and class hours.\n  - Working students and laboratory coordinators supervise equipment and logbook sign-ins.\n  - Food, open drinks, and tampering with network or desktop configurations are strictly prohibited."
	},
	{
		"id": "campus-facilities_and_life-3",
		"category": "campus",
		"content": "## Software Environment & Coding Tools\n- **Introductory Programming (1st & 2nd Year)**: Java developed primarily with **TextPad 7** (for foundational syntax, OOP, and data structures).\n- **Web & Database Development (2nd & 3rd Year)**: HTML5, CSS3, JavaScript, PHP, and SQL using the **XAMPP stack** (Apache & MySQL).\n- **Backend & Emerging Tech (3rd Year)**: **Python** and **Django framework** for advanced web development and data analytics.\n- **General IDEs & Editors**: **VS Code**, **Notepad++**, and database management interfaces.\n- **Operating Systems**: Windows 10 transitioning into Windows 11 enterprise configurations."
	},
	{
		"id": "campus-facilities_and_life-4",
		"category": "campus",
		"content": "## Student Laptop & Hardware Recommendations\n- **Requirement Status**: Not strictly mandatory for freshmen, but strongly encouraged by 3rd and 4th year for Capstone Projects and advanced development.\n- **Recommended Hardware**: Budget-friendly or secondhand laptops (e.g., Lenovo ThinkPad, Dell Latitude in the ₱18,000 - ₱30,000 range) capable of smoothly executing VS Code, NodeJS, and local server environments."
	},
	{
		"id": "campus-facilities_and_life-5",
		"category": "campus",
		"content": "## Student Organizations & Campus Life\n- **Department & Co-Curricular Orgs**:\n  - **College of Computer Studies (CCS) Student Body**: Departmental curricular organization.\n  - **Philippine Society of Information Technology Students (PSITS)**: Official co-curricular student organization recognized under SASO for computing majors.\n  - **Federation of College Student Organizations (FCSO)**: Apex student governing coalition.\n  - **The Josephinian**: Official campus student publication.\n- **Department Traditions & Annual Events**:\n  - **CCS Departmental Days & Tech Events**: Coding competitions, seminars, project showcases.\n  - **Acquaintance Party & Socials**: Department social orientation and team-building.\n  - **Loyalty Day & Family Run**: SJC institutional community traditions.\n  - **PRISAA Meet**: Inter-school athletic and cultural competitions."
	}
];
