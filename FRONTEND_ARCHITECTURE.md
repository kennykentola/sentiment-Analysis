# Frontend Architecture & UX/UI Blueprint: Sentiment Analysis System

## 1. Product Vision
A state-of-the-art, AI-driven sentiment analysis platform providing real-time, actionable insights into public opinion regarding school fee hikes across Nigerian tertiary institutions. It bridges the gap between public discourse and institutional decision-making. The system functions as an enterprise-grade intelligence hub—fast, uncompromisingly data-dense, and visually authoritative. 

Confidence Level: **High**. This vision strips away superficial dashboard templates and focuses on a high-signal-to-noise ratio required by executive decision-makers.

## 2. User Personas
1.  **The Policy Maker (University Administrator / Government Official)**
    *   **Goal:** Grasp immediate fallout of fee adjustments and identify high-risk institutions/regions.
    *   **Needs:** Macro-level trends, risk alerts, clear executive summaries.
2.  **The Data Analyst (Researcher / Intelligence Officer)**
    *   **Goal:** Drill into raw sentiment data, isolate topic clusters, and validate AI models.
    *   **Needs:** Advanced filtering, query building, raw data access, cross-referencing capabilities.
3.  **The System Administrator**
    *   **Goal:** Ensure data ingestion pipeline health and manage platform access.
    *   **Needs:** Audit trails, RBAC configurations, API monitoring.

## 3. Information Architecture
The architecture follows a "Hub and Spoke" model built for deep data exploration.
*   **Public Layer:** Marketing Landing -> Auth Gateway.
*   **Core Hub:** Main Dashboard (Executive Summary).
*   **Analytical Spokes:** Sentiment Analysis, Regional Analysis, Topic Modelling, Universities Comparison.
*   **Operational Spokes:** Social Media Monitoring, Data Sources Management, Reports.
*   **Administrative Layer:** User/Role Management, Audit Logs, System Monitoring.

## 4. User Journey Maps
**Journey: Crisis Detection & Reporting**
1.  **Trigger:** Login. Lands on Main Dashboard.
2.  **Observation:** Global "Negative Sentiment" KPI turns red; Risk Alert widget flags "University of Lagos".
3.  **Exploration:** Clicks alert -> Navigates to *Universities Comparison*. Filters for UNILAG.
4.  **Deep Dive:** Clicks "View Raw Data" -> Navigates to *Social Media Monitoring* pre-filtered for UNILAG and "protest" keywords.
5.  **Action:** Selects key posts -> Clicks "Generate Brief" -> *Report Generator* creates a PDF.

## 5. Complete Sitemap
*   `/` (Landing Page)
*   `/auth`
    *   `/login`
    *   `/forgot-password`
    *   `/reset-password`
    *   `/verify-email`
    *   `/onboarding`
*   `/app` (Protected)
    *   `/dashboard` (Main Dashboard)
    *   `/analytics`
        *   `/sentiment`
        *   `/general`
        *   `/regional`
        *   `/topics`
        *   `/universities`
    *   `/monitoring`
        *   `/social-media`
        *   `/sources`
    *   `/reports`
    *   `/search`
*   `/settings`
    *   `/profile`
    *   `/preferences`
    *   `/notifications`
*   `/admin`
    *   `/overview`
    *   `/users`
    *   `/roles`
    *   `/audit-logs`
    *   `/system`
*   `/support`
    *   `/help`
    *   `/docs`

## 6. Design System
Built on Tailwind CSS and Shadcn/UI for maximum flexibility and accessibility.

*   **Colours:**
    *   *Primary:* Slate-900 (`#0F172A`) - Conveys authority.
    *   *Secondary:* Indigo-600 (`#4F46E5`) - For primary actions.
    *   *Accent:* Emerald-500 (`#10B981`) - For AI insights/positive indicators.
    *   *Sentiment Palette:* Positive (Teal-500), Neutral (Slate-400), Negative (Rose-600).
    *   *Background (Dark Mode):* `#09090B` (Zinc-950) with `#18181B` (Zinc-900) panels.
*   **Typography:**
    *   *Headings:* 'Inter', sans-serif (Tracking tight, Semibold to Bold).
    *   *Body/Data:* 'JetBrains Mono' for numbers/tables, 'Inter' for reading text.
*   **Spacing & Grid:** 4pt grid system (0.25rem base). 12-column fluid grid for desktop, 4-column for mobile.
*   **Components:** Glassmorphism strictly avoided. Use solid, bordered panels (`border-zinc-800` in dark mode) for high-contrast data separation.
*   **Dark Mode:** Default. Light mode supported but secondary. Analytics platforms are used for hours; dark mode reduces eye strain.

## 7. Wireframes For Every Page

### 1. Landing Page
*   **Purpose:** Introduce the platform to stakeholders.
*   **User Goals:** Understand capabilities, request access/login.
*   **Layout Structure:** Hero Section (with live abstract 3D sentiment visualization) -> Value Props -> Feature Grid -> CTA.
*   **Component Breakdown:** `Navbar`, `HeroGlobe`, `FeatureCard`, `Footer`.
*   **Responsive:** Stacked on mobile. 2-column features on tablet. 3-column on desktop.
*   **States:** Minimal loading.
*   **Animations:** Framer Motion staggered fade-ins for feature cards.

### 2. Authentication Pages (Login)
*   **Purpose:** Secure entry point.
*   **Layout Structure:** Split screen (Desktop): Left side branding/abstract data viz, Right side auth form. Centered card on mobile.
*   **Component Breakdown:** `AuthLayout`, `LoginForm`, `OAuthButtons`.
*   **UX Flow:** Enter credentials -> Validation -> Appwrite Session creation -> Redirect to `/app/dashboard`.
*   **States:** Skeleton loader for OAuth buttons. Loading spinner inside submit button. Inline error states (Zod).

### 3. Forgot Password / 4. Reset Password / 5. Verify Email
*   **Purpose:** Account recovery and verification.
*   **Layout Structure:** Centered minimal card.
*   **Component Breakdown:** `AuthCard`, `EmailInputForm`, `PasswordResetForm`, `VerificationStatusIndicator`.
*   **States:** Success state replaces form with a checkmark animation and redirect countdown.

### 6. User Onboarding
*   **Purpose:** Configure user workspace preferences.
*   **User Goals:** Set default university, preferred sentiment thresholds, and role context.
*   **Layout Structure:** Multi-step wizard.
*   **Component Breakdown:** `Stepper`, `UniversitySelect`, `PreferenceToggles`.
*   **UX Flow:** Step 1 (Role info) -> Step 2 (Entity Tracking) -> Step 3 (Notification setup).

### 7. Main Dashboard (Executive Hub)
*   **Purpose:** High-level system overview.
*   **Layout Structure:** 
    *   Top: KPI Ribbon (4-6 micro-cards).
    *   Middle: Main Sentiment Trend Chart (spanning 2/3 width) + Live Alert Feed (1/3 width).
    *   Bottom: Top 5 Universities Comparison + Topic Cloud.
*   **Component Breakdown:** `KPICard` (with trend indicators), `SentimentAreaChart`, `AlertList`, `BarChartHorizontal`, `KeywordCloud`.
*   **Data Model Visualisation:** Aggregated `Sentiments` over time, grouped by `Universities`.
*   **Actions:** Click KPI to filter dashboard. Time-range selector (24h, 7d, 30d).

### 8. Sentiment Analysis Dashboard
*   **Purpose:** Deep dive into sentiment metrics.
*   **Layout Structure:** Filters Sidebar (Left) + Grid of detailed charts (Right).
*   **Component Breakdown:** `FilterPanel`, `SentimentDistributionPie`, `EmotionRadarChart`, `SentimentBySourceChart`.
*   **UX Flow:** User tweaks filters (Date, Source) -> All charts immediately re-fetch/animate to new state using React Query.

### 9. Analytics Dashboard
*   **Purpose:** General statistical overview beyond just sentiment (volume, reach, engagement).
*   **Layout Structure:** Masonry grid of analytical widgets.
*   **Component Breakdown:** `VolumeLineChart`, `EngagementScatterPlot`, `PredictiveTrendWidget`.

### 10. Data Sources Management
*   **Purpose:** Manage API connections (Twitter/X, Facebook, News Scrapers).
*   **Layout Structure:** List/Grid view of integrations.
*   **Component Breakdown:** `IntegrationCard`, `StatusBadge`, `SyncButton`, `ModalSettings`.
*   **States:** Disconnected, Syncing (spinning icon), Active, Error.

### 11. Social Media Monitoring Page
*   **Purpose:** View raw ingested posts and their assigned AI classifications.
*   **Layout Structure:** Advanced Data Table with resizable columns and expanding rows.
*   **Component Breakdown:** `DataTable` (TanStack Table), `SentimentBadge`, `SourceIcon`, `PostDetailSlideOver`.
*   **Data Model:** Iterating over `Posts` and joined `Comments`.

### 12. Universities Comparison Page
*   **Purpose:** Benchmarking institutions against each other.
*   **Layout Structure:** Split view: Radar chart on top, comparative data table below.
*   **Component Breakdown:** `RadarChart`, `ComparisonTable` (Sortable by Fee Hike Mention Volume, Negative Sentiment %).

### 13. Regional Analysis Page
*   **Purpose:** Geographic mapping of sentiment.
*   **Layout Structure:** Large interactive map (D3/Leaflet) with sidebar for region statistics.
*   **Component Breakdown:** `ChoroplethMap`, `RegionDetailCard`.

### 14. Topic Modelling Page
*   **Purpose:** Discover what sub-topics are driving the sentiment (e.g., "Hostel fees", "Acceptance fees").
*   **Layout Structure:** Bubble chart/Force-directed graph.
*   **Component Breakdown:** `ForceGraph`, `TopicDetailPanel`.

### 15. Report Generator Page
*   **Purpose:** Export insights.
*   **Layout Structure:** Drag-and-drop canvas or form-based builder.
*   **Component Breakdown:** `ReportBuilderForm`, `WidgetSelector`, `PDFPreview`.

### 16. Search & Query Page
*   **Purpose:** Global search across all indexed posts and reports.
*   **Layout Structure:** Large search bar leading to faceted search results.
*   **Component Breakdown:** `SearchBar`, `FacetSidebar`, `SearchResultItem`.

### 17. User Profile / 18. User Settings
*   **Purpose:** Account management.
*   **Layout Structure:** Left nav tabs, right content area.
*   **Component Breakdown:** `ProfileForm`, `AvatarUpload`, `SecuritySettings`.

### 19. Notification Centre
*   **Purpose:** Historical log of system alerts.
*   **Layout Structure:** Chronological feed.
*   **Component Breakdown:** `NotificationItem`, `MarkAllReadButton`.

### 20. Admin Dashboard
*   **Purpose:** System health and global usage.
*   **Layout Structure:** System metrics (CPU, DB load) and Active User counts.

### 21. User Management / 22. Role Management
*   **Purpose:** RBAC administration.
*   **Layout Structure:** Data table with inline editing or modal forms.
*   **Component Breakdown:** `UserTable`, `RoleBadge`, `InviteUserModal`.

### 23. Audit Logs / 24. System Monitoring
*   **Purpose:** Security and debugging.
*   **Layout Structure:** High-density, terminal-like log viewer.
*   **Component Breakdown:** `LogViewer` (virtualized list).

### 25. Error Pages (404/500)
*   **Purpose:** Graceful failure.
*   **Layout Structure:** Centered illustration, clear error message, "Return Home" CTA.

### 26. Help Centre / 27. Documentation Centre
*   **Purpose:** User support.
*   **Layout Structure:** Search-centric knowledge base layout. Sidebar navigation.

## 8. Component Architecture (Atomic Design)
*   **Atoms:** `Button`, `Input`, `Label`, `Badge`, `Spinner`, `Icon`.
*   **Molecules:** `SearchInput` (Input + Icon), `FormField` (Label + Input + ErrorText), `StatCard` (Title + Value + Trend).
*   **Organisms:** `Navbar`, `Sidebar`, `DataTable`, `LineChartWidget`, `SentimentFilterBar`.
*   **Templates:** `DashboardLayout` (Sidebar + Topbar + Content Area), `AuthLayout`.
*   **Pages:** `MainDashboard`, `UserManagement`, etc.

## 9. Responsive Design Strategy
*   **Mobile (< 768px):** Sidebars become bottom navigation or hamburger menus. Charts collapse to single columns. Data tables switch to card-based lists to prevent horizontal scrolling issues.
*   **Tablet (768px - 1024px):** 2-column grids for widgets.
*   **Desktop (> 1024px):** Full utilization of horizontal space. Multi-column complex layouts.
*   **Strategy:** CSS Grid with `minmax(0, 1fr)` for fluid resizing. 

## 10. React Folder Structure

```text
src/
├── assets/          # Static files (images, SVGs)
├── components/      # Shared UI components (Atomic structure)
│   ├── ui/          # Shadcn primitives (Button, Input, Dialog)
│   ├── layout/      # Sidebar, Navbar, PageWrappers
│   └── shared/      # KPICards, ErrorBoundaries
├── constants/       # Enums, fixed configuration, route paths
├── contexts/        # React Context (ThemeContext, AuthContext)
├── features/        # Domain-driven feature modules (The core)
│   ├── auth/        # Auth components, hooks, schemas
│   ├── dashboard/   # Dashboard specific widgets
│   ├── sentiment/   # Sentiment analysis logic and charts
│   └── users/       # User management feature
├── hooks/           # Custom React hooks (useMediaQuery, useDebounce)
├── layouts/         # Layout components wrapping React Router outlets
├── pages/           # Route-level components bridging features
├── routes/          # React Router definition (createBrowserRouter)
├── services/        # API calls, Appwrite config, FastAPI clients
└── utils/           # Helper functions (date formatting, class merging - cn)
```
*Rationale:* Feature-sliced design prevents the `components/` folder from becoming a dumping ground. Logic is co-located with the UI that uses it.

## 11. UI/UX Best Practices
*   **Data Density:** Enterprise apps need high data density. Avoid excessive whitespace between table rows. Use small, legible fonts (`0.875rem` for tables).
*   **Optimistic UI:** When updating a user's role, update the UI instantly before the backend confirms, reverting on error.
*   **Skeleton Loaders:** Never use layout-shifting spinners for data fetching. Use skeletons that match the exact dimension of the incoming chart/table.
*   **Feedback Loops:** Every action (save, delete, export) must trigger a Toast notification.

## 12. Accessibility Standards
*   **WCAG 2.1 AA:** Strict adherence.
*   **Color Contrast:** All text on backgrounds must meet 4.5:1 contrast ratios. Crucial for sentiment colors (red/green) which must be distinguishable by colorblind users (use patterns or varying luminance, not just hue).
*   **Keyboard Navigation:** Fully navigable via `Tab`. Modals must trap focus.
*   **ARIA:** Dynamic chart updates must announce to screen readers using `aria-live="polite"`.

## 13. Performance Optimisation Recommendations
*   **Virtualization:** The `Social Media Monitoring` page will handle thousands of rows. Use `@tanstack/react-virtual` to render only visible DOM nodes.
*   **Code Splitting:** Route-based chunking. The `Admin` module should not be loaded by non-admin users.
*   **State Management:** Avoid putting rapidly changing data (like real-time websocket feeds) into React Context. Use Zustand or localized state to prevent full-tree re-renders. Use React Query for caching API responses.

## 14. Future FastAPI Integration Considerations
*   **API Client:** Use `openapi-typescript-codegen` to automatically generate TypeScript types and Axios clients from FastAPI's `openapi.json`. This guarantees type safety from Python down to React.
*   **WebSockets:** For real-time sentiment alerts, establish a WebSocket connection via FastAPI. Handle reconnect logic gracefully in a custom hook (`useWebSocket`).

## 15. Future Appwrite Integration Considerations
*   **Auth State:** Appwrite's session relies on cookies/local storage. Abstract the Appwrite SDK behind a custom `useAuth` hook powered by React Query (`useQuery` for fetching session, `useMutation` for login/logout).
*   **RBAC:** Utilize Appwrite Teams for roles. The frontend should read the user's team memberships to dynamically render or hide UI elements (e.g., `if (user.teams.includes('admin')) render AdminSidebar`).
*   **Realtime:** Appwrite supports real-time subscriptions for database collections. Use this to update the UI instantly when new posts are ingested into the database without needing the FastAPI websocket for standard CRUD operations.
