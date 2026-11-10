VOICECAMPUS MULTI-PAGE FRONTEND PROJECT

A student feedback and suggestion platform prototype built with HTML, CSS and vanilla JavaScript. It contains five pages that share one design system and one script.

PAGES
index.html      Public landing page.
dashboard.html  Overview: statistics, recent feedback and category summary.
feedback.html   Feedback inbox with search, category/status filters and status updates.
submit.html     Form for submitting anonymous or named feedback.
insights.html   Category bars and a status donut chart.

HOW TO RUN
Open index.html in a modern browser, or open the folder in Visual Studio Code and use the Live Server extension. Use the sidebar to move between the app pages.

FEATURES
- Modern design system built on CSS custom properties (tokens).
- Light and dark themes (follows the system setting until toggled; the choice is remembered).
- Responsive layout with an off-canvas mobile navigation.
- Sidebar and top bar are rendered once from js/script.js, so navigation changes in one place.
- Inline SVG icon set, no external icon dependencies.
- Anonymous or named submissions, six categories, search and filters.
- Accessible forms and controls: labels, focus rings, aria-live toasts, reduced-motion support.
- Data saved in the browser using LocalStorage.

IMPORTANT LIMITATIONS
This is a frontend-only academic prototype. It has no backend, server, central database, real authentication or institutional administrator access. Feedback is stored only in the browser and device where it is submitted and is not shared with other users or devices. Clearing browser storage may remove the saved records. Sample records are included for demonstration. Status changes demonstrate interface behaviour and are not a real institutional review process.

TECHNOLOGIES
HTML5, CSS3, vanilla JavaScript, browser LocalStorage. Fonts (Inter, Manrope) load from Google Fonts and fall back to system fonts offline.

PROJECT STRUCTURE
VoiceCampus/
  index.html
  dashboard.html
  feedback.html
  submit.html
  insights.html
  css/style.css
  js/script.js
  README.txt
