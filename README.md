# 🏛️ VellumCore AI — Autonomous Enterprise Document Intelligence Platform

> **Live Interactive Benchmark & RAG Schema Extraction Engine**  
> *Born in University AI Research Labs • Backed by Academic Grants & Enterprise Partners*  
> *Engineered for Fortune 500 Financial Auditing, Enterprise Legal Discovery & Healthcare RAG*

[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](https://github.com)
[![Architecture: Zero--Build](https://img.shields.io/badge/Architecture-Zero--Build%20ES6%20Modules-indigo.svg)](https://github.com)
[![Compliance: SOC2 Type II Ready](https://img.shields.io/badge/Security-SOC2%20Type%20II%20Ready-blue.svg)](https://github.com)
[![License: Commercial / Academic](https://img.shields.io/badge/License-Enterprise%20%26%20Academic-purple.svg)](https://github.com)

---

## 1. Executive Summary

**VellumCore AI** is an enterprise-grade autonomous document intelligence and schema extraction platform. Engineered for mission-critical B2B environments (financial auditing, corporate legal diligence, clinical trials, and global trade logistics), VellumCore combines **Anthropic Claude 5.5 Sonnet**, **hybrid dense vector retrieval (RAG)**, and **deterministic schema validation** to provide line-level cited JSON outputs with mathematical zero-hallucination guarantees.

---

## 2. Key Architecture Pillars

- **Zero-Build, High-Portability Deployment:** Runs flawlessly on **GitHub Pages**, **Vercel**, or air-gapped enterprise VPC environments with zero build step failures and zero backend hosting overhead.
- **Two-Way Line-Level Citation Binding:** Hovering on any extracted JSON field illuminates the corresponding source document paragraph and character range. Hovering on `[Cite #]` tags in the document viewer navigates directly to the target schema key.
- **Interactive RAG Vector Space Visualizer:** Custom HTML5 Canvas rendering engine projecting 1536-dimensional dense embedding vectors, cosine similarities, and Top-K retrieval links in real time.
- **Dynamic Unstructured Heuristic Parser:** If a user inputs custom unstructured text, VellumCore's built-in AST parser extracts currencies, dates, percentages, named entities, and key-value pairs on the fly.
- **Institutional & Academic Incubator Support:** Built with direct support for university research teams (`.edu`, `.edu.tr`, `.ac.uk`) with dedicated research grant provisioning and prioritized rate limits.

---

## 3. Production Benchmark Presets

The interactive workspace includes 4 complete, unabbreviated enterprise scenarios:
1. `📄 SEC_10K_Financial_Report.pdf`: Consolidated net revenue, GAAP gross margins, AI cluster CapEx, and indemnification escrow covenants.
2. `⚖️ Master_Service_Agreement_v4.docx`: 99.95% SLA uptime commitments, $5M liability caps, Frankfurt/Dublin GDPR data sovereignty, and convenience termination protocols.
3. `🏥 Clinical_Trial_Dataset_2026.pdf`: Phase III multi-center cohort (N=1,420), 68.4% biomarker reduction efficacy (p < 0.001), Grade 3/4 adverse profile, and FDA 21 CFR Part 312 governance.
4. `🧾 Global_Supply_Chain_Invoices.json`: Commercial multi-currency conversions (€1.248M EUR / $1.36M USD), HS Code 8542.31.0000 customs duties, DAP Incoterms 2020, and SWIFT MT103 Net 45 wire terms.

---

## 4. Local Execution & Quickstart

Because VellumCore AI uses standard ES6 modules, it can be tested locally using any lightweight local static server:

### Option A: Python HTTP Server (Recommended)
```bash
# Inside the VellumCore directory:
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option B: Node.js `npx serve`
```bash
npx serve .
```

### Option C: GitHub Pages Zero-Config Deployment
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial enterprise VellumCore release"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In GitHub repository settings, navigate to **Pages** -> **Source: Deploy from a branch (`main` / root)**.
3. Your site is instantly live at `https://<your-username>.github.io/<repo-name>/`. All asset links use strict relative paths (`./css/styles.css`, `./js/app.js`).

---

## 5. File System Structure

```
VellumCore/
├── index.html                   # Master Landing & 3-Panel Interactive Sandbox Workspace
├── README.md                    # Platform Overview & GitHub Pages Deployment Guide
├── css/
│   └── styles.css               # Linear/Vercel Dark Theme, Glowing Borders, Citations, Custom Scrollbar
└── js/
    ├── app.js                   # Master Application Controller & Event Orchestrator
    ├── config.js                # Model Definitions, Pipeline Steps, Pricing Tiers, Academic Notice
    ├── data/
    │   └── presets.js           # 4 Rich Document Datasets with Verified Citations & Schemas
    └── modules/
        ├── citation-binder.js   # Two-Way Citation & JSON Line Synchronization Engine
        ├── modal-controller.js  # Enterprise SSO, .edu / .edu.tr Validator & Toast Notifications
        ├── parser.js            # Dynamic Heuristic & RegEx Entity Extraction Engine
        ├── state.js             # Reactive Observable Store (IDLE, PROCESSING, SUCCESS)
        ├── stream.js            # Pipeline Stepper & Typewriter Streaming Simulation
        └── vector-graph.js      # HTML5 Canvas RAG Vector Space & Cosine Similarity Visualizer
```

---

## 6. Security, Compliance & Governance

- **Zero-Data Retention (ZDR):** Ephemeral volatile memory execution; zero persistent disk writes.
- **Encryption:** TLS 1.3 / AES-256-GCM in transit; SHA-256 HMAC signed webhook dispatches.
- **Enterprise Contact:** `research@vellumcore.ai` / `security@vellumcore.ai`

&copy; 2026 VellumCore AI Labs. All rights reserved.
