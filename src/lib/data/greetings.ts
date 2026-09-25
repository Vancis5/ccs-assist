export interface Greeting {
	title: string;
	highlight: string;
	subtitle: string;
}

export const greetings: Greeting[] = [
	// Default (First visit)
	{
		title: 'How can I help you with',
		highlight: 'CCS today?',
		subtitle:
			'Ask anything regarding the College of Computer Studies — academic programs, retention rules, faculty directory, or lab guidelines.'
	},
	{
		title: 'Welcome to',
		highlight: 'CCS Assist.',
		subtitle:
			'Your verified guide for academic policies, curriculum pathways, and department services across Computer Studies.'
	},
	{
		title: 'Navigating your',
		highlight: 'tech journey?',
		subtitle:
			'Get instant guidance on BSCS, BSIT, and ACT degree requirements, lab regulations, and faculty consultation hours.'
	},
	{
		title: 'What would you like to explore in',
		highlight: 'CCS?',
		subtitle:
			'Inquire about degree specializations, capstone prerequisites, retention standards, and student life.'
	},
	{
		title: 'Ready to elevate your',
		highlight: 'computing career?',
		subtitle:
			'Discover internship requirements, industry tech tracks, certification pathways, and career opportunities.'
	},
	{
		title: 'Have questions about your',
		highlight: 'curriculum?',
		subtitle:
			'Check course prerequisites, subject evaluation rules, credit transfers, and semester roadmaps.'
	},
	{
		title: 'Planning your',
		highlight: 'academic term?',
		subtitle:
			'Find details on enrollment procedures, retention cut-offs, grading criteria, and graduation requirements.'
	},
	{
		title: 'Preparing for',
		highlight: 'capstone or OJT?',
		subtitle:
			'Review research proposal guidelines, defense requirements, and industry practicum hour breakdowns.'
	},
	{
		title: 'Looking for',
		highlight: 'faculty & offices?',
		subtitle:
			'Access consultation schedules, department offices, Dean\'s office hours, and faculty specializations.'
	},
	{
		title: 'Need assistance with',
		highlight: 'lab facilities?',
		subtitle:
			'Explore CISCO networking setup, workstation guidelines, lab policies, and equipment scheduling.'
	},
	{
		title: 'Shaping tomorrow with',
		highlight: 'innovation & code.',
		subtitle:
			'Get answers on BSCS algorithms, BSIT enterprise systems, and cutting-edge department initiatives.'
	},
	{
		title: 'Find your way through',
		highlight: 'CCS programs.',
		subtitle:
			'Ask about academic policies, collegiate organizations, coding competitions, and upcoming department events.'
	},
	{
		title: 'Where will your',
		highlight: 'skills take you?',
		subtitle:
			'Explore software engineering, data science, networking, cybersecurity, and systems administration pathways.'
	},
	{
		title: 'Need clarity on',
		highlight: 'retention policies?',
		subtitle:
			'Review grade retention requirements, probation standards, and academic status guidelines for CCS.'
	},
	{
		title: 'Accelerate your',
		highlight: 'learning path.',
		subtitle:
			'Inquire about software development environments, programming languages taught, and tech lab resources.'
	},
	{
		title: 'Connecting you with',
		highlight: 'CCS resources.',
		subtitle:
			'Your central portal for syllabus inquiries, Dean\'s list criteria, department calendar, and student orgs.'
	},
	{
		title: 'Let\'s discuss your',
		highlight: 'academic progress.',
		subtitle:
			'Consult on major subjects, elective offerings, course sequences, and academic standing regulations.'
	},
	{
		title: 'Build, innovate, and lead in',
		highlight: 'computing.',
		subtitle:
			'Discover how Saint Joseph College empowers future tech leaders through technical excellence and ethics.'
	},
	{
		title: 'Got an inquiry about',
		highlight: 'degree tracks?',
		subtitle:
			'Compare BSCS, BSIT, and ACT tracks to find the curriculum that matches your career aspirations.'
	},
	{
		title: 'Empowering your',
		highlight: 'tech ambition.',
		subtitle:
			'Access real-time answers regarding student handbooks, lab protocols, practicum placements, and coursework.'
	},
	{
		title: 'Stay ahead in your',
		highlight: 'studies.',
		subtitle:
			'Ask anything about CCS course structures, defense schedules, hardware labs, and faculty advisory.'
	}
];

export const defaultGreeting = greetings[0];

export function getRandomGreeting(excludeIndex = -1): { greeting: Greeting; index: number } {
	let index = Math.floor(Math.random() * greetings.length);
	if (greetings.length > 1 && index === excludeIndex) {
		index = (index + 1 + Math.floor(Math.random() * (greetings.length - 1))) % greetings.length;
	}
	return { greeting: greetings[index], index };
}
