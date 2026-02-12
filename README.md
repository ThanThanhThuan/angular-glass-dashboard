## Angular Dashboard Interactive
View live at: https://thanthanhthuan.github.io/angular-glass-dashboard
Click Billing Admin to add/ edit/ delete billing records

See live Billing History at Settings -> Billing
<img width="1732" height="1053" alt="image" src="https://github.com/user-attachments/assets/23f4892d-4d4e-4f4e-b721-a00cacb3fd83" />
This project is a high-performance 3D Glassmorphism Admin Dashboard ported from a static HTML template into a modern, enterprise-ready Angular (v17/18+) application.
It utilizes the latest Angular features, including Standalone Components, Signals, and Functional Injection, to create a responsive and reactive management suite.

🚀 1. Technical Stack

Framework: Angular (latest version) utilizing a minimal "Standalone" architecture.
State Management: Angular Signals via UiService for ultra-fast, fine-grained reactivity (managing Theme and Sidebar states).
Backend Integration: HttpClient connecting to nocodebackend.com (RESTful CRUD operations).
UI/UX Logic:
Directives: Custom appTilt directive for mouse-tracked 3D card effects.
Pipes: SafeHtml pipe for dynamic, sanitized SVG rendering.
Logic: C# style date math for automated billing cycles.

📊 2. Key Features

Dynamic Dashboard: Real-time metrics grid, monthly revenue bar charts (CSS-driven), recent activity streams, and an automated month-accurate calendar.
Live Analytics: 30-day traffic visualization, device breakdown donut charts, and progress-bar based metrics for Browsers and Geographic data.
User Management: Interactive data table featuring dynamic status badges, initial-based avatars with unique gradients, and management actions.
Admin Billing (Full CRUD):
Unified Form: A single reactive form handling both "Create" and "Update" logic.
Live Table: Real-time synchronization with the database, filtering out design-time mock data for administrative clarity.
API Logic: Automated conversion between HTML datetime-local and SQL-compliant date strings.
Global Theme Engine: Persistent Dark/Light mode that updates background orbs, cards, and text using CSS variables and the data-theme attribute.

🏗️ 3. Architecture Highlights

UiService (State): Replaces Pinia (Vue) or AppState (Blazor). Uses effect() to synchronize the theme signal with localStorage and the DOM automatically.
DataService (Business Logic): Centralized data hub. Features an intelligent billingHistory signal that merges fixed design mocks with live database records, sorted by date (DESC).
Tilt Directive: Decouples complex mouse-tracking logic from the HTML, allowing any element to become an interactive 3D card with a single attribute.
Responsive Sidebar: Synchronized Signal and CSS logic that detects screen width to start hidden on mobile and auto-close upon navigation.

🛠️ 4. Data Flow & Deployment

Observable to Signal: Ingests HttpClient streams and converts them into Signals for simple, asynchronous template rendering without async pipes.
Safe HTML: Handles dynamic SVG icons by bypassing Angular's strict sanitization only for trusted internal data.
Secrets Management: Configuration via environment.ts with automated secret injection using GitHub Actions (sed string replacement) during the build process.
SPA Routing: Support for direct-link navigation on GitHub Pages via the 404.html redirect strategy.

🎨 5. Design & Aesthetic

Glassmorphism: Uses heavy backdrop filters, transparency, and high-contrast borders.
Animated UI: Floating background orbs and fadeInUp card animations for a premium software-as-a-service (SaaS) feel.
Clean Code: Leverages the new Angular control flow (@for, @if, @empty) for highly readable, performant templates.
Current Status: The project is a production-grade Angular application. It successfully demonstrates how to implement a sophisticated frontend design language while maintaining strict data integrity and efficient state management.
