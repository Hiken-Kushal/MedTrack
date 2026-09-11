# Remix of MedTrack Dashboard

# MedTrack — Patient Frontend UI Generation

I am building **MedTrack**, a Smart India Hackathon 2026 HealthTech project.

I have attached a file named:

**MedTrack Patient Frontend Design Brief.md**

Treat that file as the **primary source of truth for the patient-side frontend requirements**.

Read the entire file before generating the UI.

## YOUR ROLE

Act as a senior UI/UX designer and frontend engineer specializing in modern healthcare products.

Your job in this generation is to create the **foundation of the MedTrack patient application**, with a strong emphasis on:

* Excellent UX
* Clear information hierarchy
* Professional healthcare aesthetics
* Accessibility
* Responsive design
* Reusable UI components
* A polished SIH-demo-quality interface

This is a **frontend-only prototype**.

---

# IMPORTANT — SCOPE OF THIS GENERATION

For this first generation, build ONLY:

1. The MedTrack patient application design system
2. The patient application shell
3. Responsive navigation
4. The Patient Dashboard
5. Initial reusable components needed by the dashboard

Do NOT generate all remaining application screens yet.

We will build the remaining screens in later iterations.

---

# PRODUCT

MedTrack helps patients:

* Manage prescribed medicines
* View active medications
* Track medication schedules
* Receive in-app dose reminders
* Log medication adherence
* View potential drug-drug interaction warnings
* Review medication history

MedTrack is an information organization and safety-support system.

It must NOT be presented as a system that:

* Diagnoses medical conditions
* Prescribes medication
* Changes medication
* Replaces a healthcare professional

---

# DESIGN GOAL

Create a modern health-tech product that feels:

**Trustworthy + Calm + Clean + Professional + Human + Modern**

The interface should feel like a polished real-world healthcare SaaS product rather than a generic student project.

Avoid:

* Excessive gradients
* Neon colors
* Excessive glassmorphism
* Huge decorative illustrations
* Overly futuristic UI
* Excessive animations
* Cluttered dashboards
* Random decorative cards
* Excessive shadows
* Inconsistent card styles

Prioritize usability and information hierarchy.

---

# VISUAL DESIGN SYSTEM

Before building the dashboard, establish a coherent visual language.

Define:

### Typography

Use a modern, highly readable sans-serif typeface.

Create a clear hierarchy for:

* Page titles
* Section headings
* Card titles
* Body text
* Secondary text
* Labels
* Numbers
* Status text

### Colors

Use a restrained healthcare-oriented palette.

The primary color should communicate trust and health without looking like a hospital emergency interface.

Use semantic colors for:

* Success
* Warning
* Error
* Informational states

Do not rely on color alone to communicate meaning.

### Components

Create a consistent design language for:

* Buttons
* Cards
* Badges
* Alerts
* Medication rows
* Status indicators
* Progress indicators
* Inputs
* Navigation items
* Avatars
* Dropdowns
* Modals
* Timeline items

All components should feel like part of one design system.

---

# PATIENT APPLICATION SHELL

Create a responsive application layout.

## Desktop

Use:

* Left sidebar navigation
* MedTrack logo/wordmark
* Navigation items
* Active navigation state
* User profile section
* Notification button
* Main content area
* Consistent page width
* Comfortable spacing

Navigation items:

* Dashboard
* My Medications
* Schedule
* Adherence
* Interactions
* Medication History
* Profile / Settings

Use appropriate icons.

The active page should be visually obvious.

Do not make the sidebar unnecessarily large.

---

# MOBILE NAVIGATION

The application must be genuinely mobile-friendly.

Do not simply shrink the desktop sidebar.

On mobile:

* Use an appropriate mobile navigation pattern
* Keep important actions accessible
* Maintain comfortable touch targets
* Prevent horizontal scrolling
* Stack dashboard sections appropriately
* Preserve clear information hierarchy

Design for real patient usage on a phone.

---

# PATIENT DASHBOARD

The dashboard is the most important screen.

Its primary purpose is to answer:

> **"What do I need to know or do about my medications today?"**

The user should understand their medication situation within a few seconds.

Prioritize:

1. Next medication action
2. Today's schedule
3. Adherence
4. Safety/interaction warnings
5. Recent medication activity

Do NOT give every dashboard section equal visual importance.

---

# DASHBOARD STRUCTURE

Create the following sections.

## 1. Header / Greeting

Example:

"Good morning, Alex"

Supporting text can communicate the current date or a simple daily context.

Keep this friendly and professional.

Do not make the greeting excessively large.

Include notification access and the patient's profile/avatar in the application shell rather than cluttering the page header.

---

## 2. Medication Overview

Create a compact summary of the patient's medication status.

Use realistic fictional demo data.

Show information such as:

* Active medications
* Doses scheduled today
* Doses completed
* Adherence percentage

Make this visually easy to scan.

Do not turn these into oversized dashboard tiles.

---

# 3. NEXT DOSE — PRIMARY ACTION

This should be one of the most prominent sections.

Clearly show:

* Medicine name
* Dosage
* Scheduled time
* Current status
* Time remaining or appropriate schedule context
* Primary action for logging the dose

Example fictional data:

Medicine:
"Metformin"

Dosage:
"500 mg"

Time:
"8:00 PM"

Status:
"Upcoming"

Provide a clear action such as:

"Log dose"

The interface should make the patient's next medication action obvious.

---

# 4. TODAY'S MEDICATION SCHEDULE

Create a chronological medication schedule.

Each item should show:

* Medicine
* Dosage
* Scheduled time
* Status

Supported statuses:

* Taken
* Missed
* Delayed
* Upcoming

Use subtle visual differences between these states.

The schedule should be easy to scan vertically.

---

# 5. ADHERENCE SUMMARY

Create a simple, understandable adherence summary.

For example:

"Today's adherence"

with a percentage and simple visual progress indicator.

Avoid complicated medical analytics.

The patient should understand the information immediately.

Include a clear path to the full Adherence section.

---

# 6. INTERACTION WARNING

Create a safety-focused interaction warning component.

Use fictional demo data.

Example heading:

"Potential interaction identified"

The visual treatment should clearly distinguish this from normal informational content without making the interface unnecessarily alarming.

Include responsible supporting text such as:

"Review this warning and consult a qualified healthcare professional before making changes to your medication."

IMPORTANT:

The UI must NOT say:

"AI determined these medicines are dangerous."

Do NOT imply that an LLM independently determines medication safety.

The actual interaction decision will eventually come from the backend's deterministic interaction checker.

The frontend only displays the returned warning.

---

# 7. RECENT MEDICATION ACTIVITY

Create a compact recent activity section.

Possible fictional entries:

* Metformin — Dose taken
* Medicine X — Dose missed
* Medicine Y — Medication added
* Medication schedule updated

Use a clean list or timeline pattern.

Do not make this section visually dominant.

---

# DEMO DATA

Use realistic but completely fictional demonstration data.

Do NOT use real patient information.

Do NOT connect to a real database.

Do NOT use external APIs.

Do NOT make medical recommendations.

The prototype should behave using mock data only.

---

# INTERACTION STATES

Where appropriate, create UI states for:

* Normal
* Loading
* Empty
* Error
* Success

For example:

If there are no interaction warnings:

"You're all clear"

or another calm, non-diagnostic empty state.

Do not imply that absence of a warning guarantees medication safety.

---

# ACCESSIBILITY

Design for accessibility from the beginning.

Ensure:

* Strong text contrast
* Clear focus states
* Adequate touch targets
* Readable typography
* Meaningful labels
* Icons are not the only way to communicate meaning
* Status is not communicated by color alone

---

# RESPONSIVENESS

The dashboard must work beautifully on:

* Desktop
* Tablet
* Mobile

On mobile, prioritize:

1. Next dose
2. Today's schedule
3. Adherence
4. Interaction warning
5. Recent activity

Use appropriate responsive layouts rather than simply shrinking desktop components.

---

# FRONTEND ARCHITECTURE

The eventual production frontend will use:

**React + Vite**

with:

* React Router
* Reusable components
* API/service layer
* Client-side state

The final frontend will communicate with the backend through REST/JSON APIs.

For this Lovable prototype, do NOT implement the backend.

---

# DO NOT IMPLEMENT

Do NOT create:

* Express backend
* Prisma
* SQLite
* Database schemas
* Real authentication
* Groq integration
* OpenFDA integration
* Real API calls
* Production medication interaction logic
* Backend business logic

Use mock data and frontend interactions only.

---

# CODE ORGANIZATION

Generate the frontend in a clean, component-oriented way.

Prefer reusable components such as:

* AppShell
* Sidebar
* MobileNavigation
* TopBar
* MedicationCard
* NextDoseCard
* MedicationSchedule
* AdherenceSummary
* InteractionAlert
* ActivityTimeline
* StatusBadge
* Button
* Card

The exact component structure can be improved later during the Antigravity implementation phase.

Do not over-engineer.

---

# UX PRINCIPLE

Every part of the interface should answer:

> "Does this help the patient understand or manage their medication?"

If an element does not serve that purpose, do not add it merely for visual decoration.

---

# VERY IMPORTANT — ITERATIVE DESIGN

Do NOT build the remaining screens yet.

For this generation, concentrate on making:

**the design system + application shell + dashboard**

excellent.

Do not automatically generate:

* Add Medication page
* Medication details page
* Adherence page
* Interaction page
* History page
* Settings page

Those will be generated separately after the dashboard design is approved.

---

# FINAL REQUIREMENT

Before generating the UI, read and follow the attached:

**MedTrack Patient Frontend Design Brief.md**

Use that file as the source of truth for the functional requirements.

Where this prompt describes visual design and UX direction, follow this prompt.

Where the prompt does not specify a functional requirement, do not invent product functionality.

Generate a polished, responsive **MedTrack Patient Dashboard and application shell** now.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
