# CCS AI Chatbot — Project Brief for Claude Code

## Context
This is for a web design competition (Team Debuggers vs. Team Programmers) at Saint Joseph College, Maasin, Southern Leyte. Deadline: 2 weeks. Build a functional, judged, live-demoed web chatbot.

## Official Competition Mechanics

**Objective:** Design and develop a functional web-based AI chatbot that provides useful information and assistance related to the College of Computer Studies (CCS).

**Team:** 4 students, one per year level.

**Development period:** 2 weeks.

### Project Requirements
- Web-based application, functional through a modern browser.
- Uses an AI model/API to generate chatbot responses.
- Functional chat interface for sending questions/messages.
- Provides information/assistance related ONLY to CCS of Saint Joseph College.
- Clear, organized UI.
- Responsive on: Android, iOS, tablets, desktop/laptop.
- Properly handles loading states, errors, and invalid/empty inputs.
- Clearly identifies the chatbot's purpose and intended users.
- Content must be relevant and appropriate to CCS.
- Must be functional during final demonstration.

### AI Requirements
- May use an existing AI model/API (no need to train your own).
- Must be configured with appropriate info to answer questions about its intended purpose.
- Must gracefully handle out-of-scope questions rather than giving misleading answers.
- Team must be able to explain the AI integration and basic data flow in the final presentation.

### Design
- Freedom on name, interface, layout, visual style, features.
- ORANGE as a prominent color is encouraged (CCS identity), other complementary colors allowed.
- Logos, icons, illustrations, animations welcome — must not be plagiarized.

### Allowed Tech
Open stack: HTML/CSS/JS, PHP, Python, Java, any web/CSS/JS framework, databases, AI APIs/SDKs. Our choice documented below.

### Judging Criteria
| Criteria | % |
|---|---|
| AI Functionality and Response Quality | 30% |
| UI/UX Design | 25% |
| Functionality and Features | 20% |
| Creativity and Innovation | 15% |
| Responsiveness and Technical Implementation | 10% |

Tiebreaker: AI Functionality & Response Quality score.

---

## Our Plan / Tech Stack Decisions

- **Frontend framework:** SvelteKit (chosen over React — faster to build in under a 2-week deadline, less boilerplate).
- **AI integration:** Vercel AI SDK (`ai` core package) + `@ai-sdk/svelte` for the chat hook/state management (message list, input, loading, error states).
- **AI provider:** Groq, via the `@ai-sdk/groq` provider package. Existing Groq API key already available.
- **Model:** `llama-3.3-70b-versatile` — chosen for strong reasoning on scoped Q&A and reliable adherence to "politely decline off-topic" behavior. Groq's inference speed keeps even the 70b feeling instant for live demo. (`llama-3.1-8b-instant` as a fallback only if latency/rate-limit issues come up — not expected to be needed.)
- **Explicitly decided against:** Pretext (chenglou's DOM-free text layout library) — great for virtualized lists/high-volume text logs, but unnecessary complexity for a normal-scale chat UI in this timeframe. Skipping it.

### Scope-guarding priority
Since AI Functionality & Response Quality is 30% of the grade (and the tiebreaker), the system prompt/knowledge base needs real attention — not a generic default. It should:
1. Answer only questions about CCS (programs, faculty, courses, requirements, facilities, etc. — actual content to be supplied by the team).
2. Decline out-of-scope questions politely and clearly, without hallucinating.
3. Clearly state its purpose/intended users somewhere in the UI or its intro message.

### Design notes
- Clean, organized chat UI — proper loading/error/empty-state handling per requirements.
- Must be tested responsive across phone/tablet/desktop before demo day.

#### Color palette (from CCS logo)
| Role | Hex | Notes |
|---|---|---|
| Orange | `#FA4615` | Logo source color — reserve for tiny accents only (badges, active-state dots, thin borders). Never use as a large filled surface. |
| Send button | `#C23811` | Darkened orange variant — recognizably on-brand but not retina-searing at full sat |
| Green | `#147A0D` | Sparse use |
| Yellow | `#E3CD2C` | Sparse use |
| Base/bg | TBD | Dark base considered (`#2A0909`) but flagged as too warm/too orange — leaning toward a neutral dark instead |

- Full-saturation `#FA4615` is a logo accent, not a UI color — keep it off large surfaces.
- Darkening (not desaturating) is the move for interactive elements.

#### Typography
- **Font:** Google Sans Flex
- Branching off from SJC's Century Gothic + Raleway — those are print/letterhead fonts, not built for dense chat UI text at small sizes. "We chose fonts optimized for chat UI legibility" is a defensible design call if asked.

#### Scope reminder
UI/UX is 25% of the grade vs AI quality at 30% (also the tiebreaker). Polish is a trap on a 2-week deadline — lock in base color, accent treatment, font, and consistent spacing/radius on chat bubbles. That's the 4 decisions that matter.

---

## What's still needed before/during build
- [ ] Actual CCS content (programs, faculty, courses, FAQs) to feed the system prompt/knowledge base
- [ ] Chatbot name + visual identity (logo, palette specifics beyond "orange")
- [ ] Team member task split (design/frontend/backend/AI integration/content/testing)
- [ ] Prep notes for explaining AI integration + data flow in final presentation
