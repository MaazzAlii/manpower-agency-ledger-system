# 🏢 Manpower Agency Ledger & Profit System
### Client Requirements Gathering & Business Discovery System
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5 / Vanilla JS](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-orange.svg)](#technical-specifications)
[![Multi-Language](https://img.shields.io/badge/Languages-English%20%7C%20Urdu%20%7C%20Roman%20Urdu-success.svg)](#language-support)
[![Dark Mode Support](https://img.shields.io/badge/Themes-Light%20%26%20Dark%20Mode-blueviolet.svg)](#theme--accessibility)

> A production-grade, bilingual (**English**, **اردو**, and **Roman Urdu**) client discovery questionnaire and requirements discovery engine engineered for workforce supply, manpower outsourcing, and recruitment agencies operating in **Dubai, UAE** and globally.

---

## 🔍 Searchable Keywords (SEO & Discovery)
When companies, developers, or agencies search for this solution on **Google** and **GitHub**, they use:
- `manpower agency ledger`
- `workforce timesheet profit calculator`
- `manpower supply management system`
- `dubai manpower agency billing and payroll`
- `staffing agency middleman margin calculator`
- `client requirements gathering form`
- `workforce ledger system`

---

## 💼 The Business Model & Problem Solved

In workforce supply and manpower agencies (especially in hubs like Dubai / UAE), the agency acts as a value-adding middleman:

```
[ Client Company ]  ─── Pays Hourly Rate (e.g. 25 AED/hr) ───►  [ Manpower Agency ]
                                                                       │
                                                       Agency Profit Margin: 7 AED/hr
                                                                       │
[ Worker / Labor ]  ◄── Paid Hourly Wage (e.g. 18 AED/hr)  ────────────┘
```

### Challenges Faced by Agencies:
1. **Manual Spreadsheet Chaos**: Dispersed Excel sheets with complex, error-prone formulas.
2. **Delayed Invoicing**: High friction compiling monthly or fortnightly timesheets for multiple client sites.
3. **Hidden Margins**: Inability to see real-time net profit per worker and per client company after deductions (transport, visa, mess, penalties).
4. **Receivables & Payables Tracking**: Tracking unpaid client invoices against pending worker salary distributions.

---

## 📋 What This Requirements System Discovers

This interactive 11-step wizard gathers all operational, financial, and technical parameters from the client before quoting or building the system:

| Step | Discovery Section | Key Parameters Collected |
| :---: | :--- | :--- |
| **1** | **Welcome & Business Profile** | Agency name, contacts, operating region (Dubai/UAE/KSA), worker count, client count. |
| **2** | **Current Business Operations** | Current tools (Excel, Paper, WhatsApp), biggest bottlenecks, calculation frequency (Daily, Weekly, 10-Day, 15-Day, Monthly). |
| **3** | **Workers & Client Companies** | Worker profile fields (EMP codes, trades, rates, visa expiry), worker mobility between sites, client billing terms. |
| **4** | **Working Hours & Timesheets** | Manual daily entry vs bulk Excel upload, overtime multiplier rules (1.25x / 1.5x / weekend rates), change audit log. |
| **5** | **Payroll, Billing & Profit Calculations** | Worker payment model (hourly vs fixed), client billing rates, salary deductions (advance, mess, visa), net margin calculation. |
| **6** | **Reports, Documents & Existing Data** | Automated payroll summaries, client billing invoices, P&L dashboard with charts, PDF & Excel export formats, legacy data migration. |
| **7** | **Users, Permissions & Security** | Role-based access, hiding worker cost & profit margins from office staff, audit logs, automated cloud backups. |
| **8** | **Public Company Website** | Whether a public agency marketing website is needed, quote request forms, WhatsApp leads, worker job portal. |
| **9** | **Technical Preferences & Deployment** | Mobile & desktop responsiveness, primary currency (AED, PKR, USD), cloud managed hosting vs VPS server, automated reminders. |
| **10** | **Budget, Timeline & Priorities** | **Explicit budget range discovery (PKR / AED)**, hosting inclusion, phased MVP preference, top 3 launch priorities. |
| **11** | **Additional Details & Final Review** | UAE labour rules, review card summary with inline edit shortcuts, confirmation tick, submission & JSON download. |

---

## 💰 Budget & Investment Discovery (Included in Form)

The system **explicitly asks the client for their budget and timeline expectations** in Step 10:
- **Budget Ranges**:
  - `Under PKR 50,000`
  - `PKR 50,000 – 100,000`
  - `PKR 100,000 – 150,000 (~ 1,300 – 2,000 AED)` *(Ideal for Core Ledger MVP)*
  - `PKR 150,000 – 250,000 (~ 2,000 – 3,300 AED)` *(Full Ledger + Public Agency Website)*
  - `PKR 250,000 – 400,000 (~ 3,300 – 5,300 AED)` *(Enterprise multi-role system)*
  - `Custom Amount / AED Direct Entry`
  - `Prefer to discuss over call`
- **Scope Phasing**: Asks whether the client prefers an MVP first (core ledger in 2–3 weeks) or an all-in-one release.
- **Hosting Scope**: Clarifies whether the budget includes ongoing cloud hosting & support or development only.

---

## 🌐 Language Support
Users can seamlessly toggle between two focused language modes via the top header pill buttons:
1. **English (Default)**: Clean, modern business layout.
2. **Roman Urdu**: Latin alphabet Urdu for quick readability and familiar communication.

---

## 🛠️ Technical Specifications

- **Architecture**: Single, self-contained HTML5 file (`kamran_manpower_requirements.html`).
- **Dependencies**: Zero external JS libraries or heavy frameworks.
- **Styling**: Pure CSS3 with Custom Properties, Container Queries, and Dark Mode (`prefers-color-scheme: dark`).
- **State Management**:
  - Auto-saves user draft on every keystroke/selection to browser `localStorage`.
  - Survives page refreshes and browser restarts.
  - Safe reset confirmation dialog.
- **Accessibility**:
  - Semantic HTML (`fieldset`, `legend`, `input`, `select`).
  - Screen-reader friendly with high-contrast text ratios (WCAG AA).
  - Touch targets $\ge 44\text{px}$ for mobile usability.
- **Theme Support**:
  - Horizontal Icon Pills: `💻` (System), `☀️` (Light), `🌙` (Dark) — zero clutter, pure icons.
  - Automatic `prefers-color-scheme` synchronization and `localStorage` persistence.
- **Data Integrations & Webhook**:
  - **Live n8n Webhook**: Connected to `https://maaz.calara.agency/webhook/kamran-requirements`. Automatically triggers workflows to sync to Google Sheets, Telegram, or email.
  - **🎉 Success Modal Pop-up**: Automatically presents high-converting next steps after submission:
    - **🖨️ Print / Save PDF Proposal**: Instant print-to-PDF proposal formatting.
    - **📲 Share via WhatsApp**: One-click sharing with pre-formatted client summary.
    - **📊 Download Excel Response Template**: Direct link to [`Kamran Requirements Responses.xlsx`](Kamran%20Requirements%20Responses.xlsx).
  - **💬 Floating WhatsApp Widget**: Direct instant chat with developer Maaz Ali (`+92 337 7233444`).

---

## 🚀 How to Run & Deploy

### Run Locally:
Simply double-click `kamran_manpower_requirements.html` or open `index.html` in any web browser.

### Deploy to Vercel in 30 Seconds:
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **"Deploy"**.
4. The live site is served directly on your root domain (e.g. `https://manpower-agency-ledger-system.vercel.app/`).

---

## 👨‍💻 Author & Developer

**Maaz Ali** — *Full-Stack Engineer & Automation Specialist*  
- **WhatsApp**: [+92 337 7233444](https://wa.me/923377233444?text=Hi%20Maaz%20Ali,%20I%20am%20reviewing%20the%20Dubai%20Manpower%20Agency%20Ledger%20System.)  
- **LinkedIn**: [maazzalii](https://www.linkedin.com/in/maazzalii)  
- **GitHub**: [@MaazzAlii](https://github.com/maazzalii)  

*Crafted for real-world client discovery, high conversion, and seamless project scoping.*
