/**
 * VellumCore AI - Production Document Presets & Mock Data Store
 * Complete, Unabbreviated Benchmark Presets with Line-Level Citations
 */

export const DOCUMENT_PRESETS = {
  "sec_10k": {
    id: "sec_10k",
    filename: "SEC_10K_Financial_Report.pdf",
    category: "Financial Audit & SEC Filings",
    filesize: "2.4 MB",
    pages: 184,
    defaultTokens: 1842,
    defaultConfidence: 99.6,
    defaultLatency: 412,
    rawText: `UNITED STATES SECURITIES AND EXCHANGE COMMISSION
WASHINGTON, D.C. 20549
FORM 10-K: ANNUAL REPORT PURSUANT TO SECTION 13 OR 15(d)

PART II. ITEM 7. MANAGEMENT'S DISCUSSION AND ANALYSIS OF FINANCIAL CONDITION

CONSOLIDATED STATEMENT OF OPERATIONS & SEGMENT BREAKDOWN (FY2025/2026):
Total Consolidated Net Revenue for the twelve-month period reached $89,460,000,000 USD, representing an annualized growth of 14.2% compared to $78,336,000,000 USD in the preceding fiscal cycle. Growth was primarily accelerated by enterprise adoption of autonomous cloud infrastructure and real-time inference workloads.

CLOUD INFRASTRUCTURE MARGINS:
The Enterprise Cloud segment generated $41,200,000,000 USD in net bookings, achieving a GAAP gross margin of 72.8%, compared to 68.4% in the prior year. This expansion was facilitated by algorithmic optimization of GPU compute clusters and power distribution efficiencies across North American data centers.

CAPITAL EXPENDITURES & HARDWARE COMMITMENTS:
Capital expenditures totaled $14,210,000,000 USD, including dedicated hardware purchase commitments of $8,600,000,000 USD for next-generation custom silicon accelerators and liquid-cooling thermal dissipation units deployed across Ashburn and Frankfurt availability zones.

CONTINGENT LIABILITIES & LEGAL INDEMNIFICATION:
As of December 31, 2025, the company maintains an indemnification escrow reserve of $450,000,000 USD related to ongoing patent cross-licensing discussions. Management and legal counsel assess that the ultimate resolution will not materially exceed the provisioned escrow amount.`,
    
    formattedHtml: `
      <div class="space-y-4 font-mono text-xs leading-relaxed text-slate-300">
        <div class="border-b border-slate-800 pb-2 text-slate-500 font-semibold tracking-wider uppercase">
          UNITED STATES SECURITIES AND EXCHANGE COMMISSION — FORM 10-K
        </div>
        <p>
          <strong class="text-slate-200">ITEM 7. CONSOLIDATED REVENUE ANALYSIS:</strong><br>
          Total Consolidated Net Revenue for the fiscal cycle reached 
          <span class="cite-highlight cite-highlight-1" data-cite="cite_rev">
            $89,460,000,000 USD (14.2% YoY Growth)
            <span class="cite-badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">[Cite #1]</span>
          </span>, 
          driven by enterprise adoption of autonomous inference pipelines across global tier-1 partners.
        </p>
        <p>
          <strong class="text-slate-200">SEGMENT PERFORMANCE & GAAP MARGINS:</strong><br>
          The Cloud Infrastructure division closed at $41,200,000,000 USD in revenue with a 
          <span class="cite-highlight cite-highlight-2" data-cite="cite_margin">
            GAAP Gross Margin of 72.8%
            <span class="cite-badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">[Cite #2]</span>
          </span>, 
          benefiting from automated GPU load-balancing and direct liquid cooling across Ashburn and Frankfurt facilities.
        </p>
        <p>
          <strong class="text-slate-200">CAPEX ALLOCATION & INFRASTRUCTURE EXPANSION:</strong><br>
          Total capital investments equaled 
          <span class="cite-highlight cite-highlight-3" data-cite="cite_capex">
            $14,210,000,000 USD with $8.6B dedicated to AI clusters
            <span class="cite-badge bg-amber-500/20 text-amber-300 border border-amber-500/40">[Cite #3]</span>
          </span>. 
          Hardware delivery milestones were completed on schedule under long-term wafer procurement agreements.
        </p>
        <p>
          <strong class="text-slate-200">RISK DISCLOSURE & ESCROW PROVISIONS:</strong><br>
          The company allocated an 
          <span class="cite-highlight cite-highlight-4" data-cite="cite_escrow">
            indemnification escrow reserve of $450,000,000 USD
            <span class="cite-badge bg-purple-500/20 text-purple-300 border border-purple-500/40">[Cite #4]</span>
          </span> 
          to govern ongoing IP licensing covenants, deemed fully solvent by audit committees.
        </p>
      </div>
    `,

    structuredJson: {
      filing_type: "SEC Form 10-K",
      reporting_entity: "Vellum Enterprise Infrastructure Corp.",
      fiscal_period: "FY2025/2026",
      currency: "USD",
      confidence_score: 0.996,
      citation_verified: true,
      metrics: {
        total_consolidated_revenue: {
          value: 89460000000,
          formatted: "$89.46B",
          yoy_growth_percentage: 14.2,
          citation_id: "cite_rev",
          line_reference: "Paragraph 2, Line 1"
        },
        cloud_segment: {
          revenue: 41200000000,
          gaap_gross_margin_pct: 72.8,
          citation_id: "cite_margin",
          line_reference: "Paragraph 3, Line 2"
        },
        capital_expenditures: {
          total_capex: 14210000000,
          hardware_accelerator_commitment: 8600000000,
          citation_id: "cite_capex",
          line_reference: "Paragraph 4, Line 1"
        },
        risk_management: {
          escrow_reserve_usd: 450000000,
          liability_status: "Provisioned & Fully Funded",
          citation_id: "cite_escrow",
          line_reference: "Paragraph 5, Line 1"
        }
      },
      audit_trail: {
        schema_version: "2.4.0",
        validator_model: "claude-5-5-sonnet",
        zero_hallucination_guarantee: true,
        extracted_timestamp: "2026-10-14T10:14:22.842Z"
      }
    },

    reasoningLogs: [
      "[00:00.042] [OCR_ENGINE] Ingesting PDF layout vectors. Detected 4 financial balance blocks.",
      "[00:00.120] [SEMANTIC_ROUTER] Identified standard SEC Form 10-K Item 7 disclosures.",
      "[00:00.185] [VECTOR_STORE] Ingesting 1536-dim embeddings. Top-K similarity matched 'Consolidated Revenues'.",
      "[00:00.260] [CLAUDE_5_5_SONNET] Synthesizing strict JSON schema against 'SEC_Financial_Audit_v2.json'.",
      "[00:00.315] [SCHEMA_GUARD] Validating integer bounding on total_consolidated_revenue: 89,460,000,000 USD (PASS).",
      "[00:00.370] [CITATION_ENGINE] Binding citation tags: [cite_rev, cite_margin, cite_capex, cite_escrow] directly to raw character indices.",
      "[00:00.412] [SUCCESS] 0 schema violations detected. Emitting deterministic webhook payload."
    ],

    vectorNodes: [
      { id: "query", label: "Query: Financial & Margins", x: 260, y: 150, type: "query", color: "#6366f1" },
      { id: "chunk_1", label: "Chunk #1: Net Revenue $89.46B", x: 120, y: 70, type: "chunk", sim: 0.984, color: "#10b981" },
      { id: "chunk_2", label: "Chunk #2: Cloud GAAP Margin 72.8%", x: 400, y: 80, type: "chunk", sim: 0.962, color: "#10b981" },
      { id: "chunk_3", label: "Chunk #3: AI CapEx & Hardware $14.2B", x: 130, y: 230, type: "chunk", sim: 0.941, color: "#f59e0b" },
      { id: "chunk_4", label: "Chunk #4: Escrow Reserve $450M", x: 390, y: 220, type: "chunk", sim: 0.898, color: "#a855f7" }
    ]
  },

  "msa_contract": {
    id: "msa_contract",
    filename: "Master_Service_Agreement_v4.docx",
    category: "Legal & Enterprise Risk",
    filesize: "1.1 MB",
    pages: 42,
    defaultTokens: 1490,
    defaultConfidence: 99.4,
    defaultLatency: 388,
    rawText: `MASTER SERVICES AGREEMENT (MSA) - VERSION 4.2
THIS ENTERPRISE SERVICES AGREEMENT governs the commercial procurement of automated AI orchestration APIs.

SECTION 4: SERVICE LEVEL AGREEMENT (SLA) & UPTIME COMMITMENT
Provider covenants that the Hosted Production Services shall maintain an aggregate Monthly Uptime Percentage of not less than 99.95% during each billing calendar month, excluding scheduled maintenance windows notified 7 business days in advance. In the event Provider fails to meet said threshold, Customer shall be entitled to a 15% billing credit applied against subsequent quarterly invoices.

SECTION 9: LIMITATION OF LIABILITY & INDEMNIFICATION CAP
Except for gross negligence, willful misconduct, or breaches of Confidentiality pursuant to Section 11, the total aggregate liability of either party arising out of or related to this Agreement shall be strictly capped at the lesser of $5,000,000 USD or the total fees paid by Customer in the preceding twelve (12) months.

SECTION 12: DATA SOVEREIGNTY & RESIDENCY MANDATES
All Customer Data, embeddings, vector indices, and extracted schema payloads belonging to European Economic Area (EEA) entities shall reside exclusively within dedicated AWS or Google Cloud availability zones located in Frankfurt, Germany and Dublin, Ireland, in full alignment with GDPR Article 28 data processing covenants.

SECTION 16: TERMINATION FOR CONVENIENCE
Either party may terminate this Agreement without cause upon sixty (60) days prior written notice. Upon termination, Provider shall promptly issue a prorated refund of any unearned prepaid subscription fees.`,
    
    formattedHtml: `
      <div class="space-y-4 font-mono text-xs leading-relaxed text-slate-300">
        <div class="border-b border-slate-800 pb-2 text-slate-500 font-semibold tracking-wider uppercase">
          COMMERCIAL CONTRACTS — MASTER SERVICES AGREEMENT V4.2
        </div>
        <p>
          <strong class="text-slate-200">SECTION 4. UPTIME & SERVICE AVAILABILITY:</strong><br>
          Provider warrants a monthly uptime availability standard of 
          <span class="cite-highlight cite-highlight-1" data-cite="cite_sla">
            not less than 99.95% with 15% SLA service credits
            <span class="cite-badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">[Cite #1]</span>
          </span> 
          applicable to enterprise production tenants upon breach.
        </p>
        <p>
          <strong class="text-slate-200">SECTION 9. AGGREGATE LIABILITY CEILING:</strong><br>
          Liability arising under this contract is mutually constrained to 
          <span class="cite-highlight cite-highlight-2" data-cite="cite_liability">
            the lesser of $5,000,000 USD or 12-month trailing fees
            <span class="cite-badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">[Cite #2]</span>
          </span>, 
          safeguarding both enterprise contracting entities from uncapped exposure.
        </p>
        <p>
          <strong class="text-slate-200">SECTION 12. DATA SOVEREIGNTY & GEOGRAPHY:</strong><br>
          All vector representations and extracted corpora are bound to 
          <span class="cite-highlight cite-highlight-3" data-cite="cite_sovereignty">
            Frankfurt & Dublin EU VPC Zones (GDPR Art. 28)
            <span class="cite-badge bg-amber-500/20 text-amber-300 border border-amber-500/40">[Cite #3]</span>
          </span>. 
          Zero cross-border transfer occurs without explicit mutual consent.
        </p>
        <p>
          <strong class="text-slate-200">SECTION 16. TERMINATION PROTOCOL:</strong><br>
          Convenience termination covenants stipulate 
          <span class="cite-highlight cite-highlight-4" data-cite="cite_term">
            60 days prior written notice with prorated unearned refund
            <span class="cite-badge bg-purple-500/20 text-purple-300 border border-purple-500/40">[Cite #4]</span>
          </span> 
          returned within thirty calendar days of dissolution.
        </p>
      </div>
    `,

    structuredJson: {
      contract_classification: "B2B Master Services Agreement",
      governing_version: "4.2",
      jurisdiction: "Delaware / GDPR Harmonized",
      confidence_score: 0.994,
      citation_verified: true,
      sla_provisions: {
        guaranteed_uptime_pct: 99.95,
        default_penalty_credit_pct: 15,
        citation_id: "cite_sla",
        line_reference: "Section 4, Line 3"
      },
      liability_covenants: {
        aggregate_cap_usd: 5000000,
        trailing_period_months: 12,
        carveouts: ["Gross Negligence", "Willful Misconduct", "Confidentiality Breach"],
        citation_id: "cite_liability",
        line_reference: "Section 9, Line 4"
      },
      data_governance: {
        eea_residency_required: true,
        authorized_regions: ["Frankfurt (eu-central-1)", "Dublin (eu-west-1)"],
        regulatory_framework: "GDPR Article 28",
        citation_id: "cite_sovereignty",
        line_reference: "Section 12, Line 2"
      },
      lifecycle: {
        termination_notice_days: 60,
        prorated_refund_mandate: true,
        citation_id: "cite_term",
        line_reference: "Section 16, Line 1"
      }
    },

    reasoningLogs: [
      "[00:00.038] [DOCX_PARSER] Extracting structured AST from Master Services Agreement.",
      "[00:00.098] [LEGAL_NER] Tagging contractual entities: SLA, Liability Cap, GDPR, Termination.",
      "[00:00.170] [VECTOR_SIMILARITY] Matched semantic clause 'Limitation of Liability' (Cosine: 0.978).",
      "[00:00.245] [CLAUDE_5_5_SONNET] Extracting numerical constraints into deterministic B2B legal contract schema.",
      "[00:00.320] [VERIFIER] Verifying liability exceptions: Gross negligence and confidentiality confirmed carved out.",
      "[00:00.388] [SUCCESS] All 4 contractual clauses cited with zero ambiguity."
    ],

    vectorNodes: [
      { id: "query", label: "Query: Legal SLA & Liability", x: 260, y: 150, type: "query", color: "#6366f1" },
      { id: "chunk_1", label: "Chunk #1: 99.95% SLA Uptime", x: 130, y: 75, type: "chunk", sim: 0.978, color: "#10b981" },
      { id: "chunk_2", label: "Chunk #2: $5M Liability Ceiling", x: 390, y: 85, type: "chunk", sim: 0.965, color: "#10b981" },
      { id: "chunk_3", label: "Chunk #3: Frankfurt & Dublin EU VPC", x: 120, y: 225, type: "chunk", sim: 0.932, color: "#f59e0b" },
      { id: "chunk_4", label: "Chunk #4: 60-Day Termination Notice", x: 400, y: 215, type: "chunk", sim: 0.914, color: "#a855f7" }
    ]
  },

  "clinical_trial": {
    id: "clinical_trial",
    filename: "Clinical_Trial_Dataset_2026.pdf",
    category: "Healthcare & Life Sciences",
    filesize: "4.8 MB",
    pages: 210,
    defaultTokens: 2120,
    defaultConfidence: 99.8,
    defaultLatency: 452,
    rawText: `CLINICAL PROTOCOL VC-9082: PHASE III MULTI-CENTER RANDOMIZED CONTROLLED TRIAL
SPONSOR: BIOPHARMA THERAPEUTICS CORP & ACADEMIC COLLABORATIVE NETWORK

STUDY POPULATION & RANDOMIZATION RATIO:
The trial enrolled a total of 1,420 randomized participants (mean age 58.4 ± 8.2 years; 52.4% female) across 42 accredited clinical hospital networks across North America and Europe. Subjects were randomized in a strict 1:1 ratio to receive either the active biological conjugate or matched synthetic placebo.

PRIMARY EFFICACY OUTCOME:
At the 24-week interim checkpoint, the primary biomarker efficacy endpoint demonstrated a statistically significant 68.4% reduction in target pathology progression in the intervention arm compared to standard of care (Hazard Ratio: 0.316; 95% Confidence Interval: 0.245–0.408; p < 0.001).

ADVERSE EVENT MONITORING & SAFETY PROFILE:
Grade 3/4 severe adverse events were observed at an incidence of 2.1% in the active treatment group (n=15) versus 1.9% in the placebo cohort (n=13), demonstrating no statistically significant deviation in treatment-emergent toxicity (p = 0.74).

REGULATORY PROTOCOL COMPLIANCE:
This investigation was conducted in strict accordance with FDA 21 CFR Part 312 guidelines, Declaration of Helsinki ethical tenets, and GCP-ICH E6 (R2) governance standards under Institutional Review Board Protocol IRB-2025-8842.`,
    
    formattedHtml: `
      <div class="space-y-4 font-mono text-xs leading-relaxed text-slate-300">
        <div class="border-b border-slate-800 pb-2 text-slate-500 font-semibold tracking-wider uppercase">
          BIOMEDICAL RESEARCH — CLINICAL PROTOCOL VC-9082 PHASE III
        </div>
        <p>
          <strong class="text-slate-200">COHORT ENROLLMENT & SAMPLE POWER:</strong><br>
          The multi-center study achieved a verified enrollment of 
          <span class="cite-highlight cite-highlight-1" data-cite="cite_cohort">
            1,420 randomized subjects across 42 medical sites (1:1 allocation)
            <span class="cite-badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">[Cite #1]</span>
          </span> 
          with zero deviation from primary stratification quotas.
        </p>
        <p>
          <strong class="text-slate-200">PRIMARY ENDPOINT BIOMARKER EFFICACY:</strong><br>
          Evaluation at Week 24 confirmed a 
          <span class="cite-highlight cite-highlight-2" data-cite="cite_efficacy">
            68.4% biomarker progression reduction (HR: 0.316, p < 0.001)
            <span class="cite-badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">[Cite #2]</span>
          </span>, 
          exceeding pre-specified superiority boundaries.
        </p>
        <p>
          <strong class="text-slate-200">TOXICITY & TOLERABILITY SAFETY PROFILE:</strong><br>
          Severe Grade 3/4 adverse incidents were constrained to 
          <span class="cite-highlight cite-highlight-3" data-cite="cite_adverse">
            2.1% in active arm vs 1.9% in placebo (p = 0.74, not significant)
            <span class="cite-badge bg-amber-500/20 text-amber-300 border border-amber-500/40">[Cite #3]</span>
          </span>. 
          No early trial suspension criteria were triggered.
        </p>
        <p>
          <strong class="text-slate-200">REGULATORY STANDARDS & IRB GOVERNANCE:</strong><br>
          Compliance verified against 
          <span class="cite-highlight cite-highlight-4" data-cite="cite_fda">
            FDA 21 CFR Part 312 & GCP-ICH E6 R2 protocols
            <span class="cite-badge bg-purple-500/20 text-purple-300 border border-purple-500/40">[Cite #4]</span>
          </span> 
          under Institutional Review Board registry IRB-2025-8842.
        </p>
      </div>
    `,

    structuredJson: {
      trial_identifier: "VC-9082",
      phase: "Phase III Randomized Controlled Trial",
      regulatory_tier: "FDA 21 CFR Part 312 & GCP-ICH E6 (R2)",
      confidence_score: 0.998,
      citation_verified: true,
      cohort_demographics: {
        total_enrolled: 1420,
        clinical_sites_count: 42,
        mean_age_years: 58.4,
        female_percentage: 52.4,
        randomization_ratio: "1:1",
        citation_id: "cite_cohort",
        line_reference: "Section 1, Line 2"
      },
      efficacy_endpoints: {
        biomarker_reduction_pct: 68.4,
        hazard_ratio: 0.316,
        confidence_interval_95: [0.245, 0.408],
        statistical_significance_p_value: "< 0.001",
        evaluation_checkpoint_weeks: 24,
        citation_id: "cite_efficacy",
        line_reference: "Section 2, Line 2"
      },
      safety_and_tolerability: {
        grade_3_4_active_pct: 2.1,
        grade_3_4_placebo_pct: 1.9,
        toxicity_difference_p_value: 0.74,
        safety_status: "Non-Toxic / Well-Tolerated",
        citation_id: "cite_adverse",
        line_reference: "Section 3, Line 1"
      },
      governance: {
        irb_protocol_id: "IRB-2025-8842",
        helsinki_ethical_adherence: true,
        citation_id: "cite_fda",
        line_reference: "Section 4, Line 3"
      }
    },

    reasoningLogs: [
      "[00:00.045] [BIOMEDICAL_EXTRACTOR] Ingesting clinical trial PDF tables and Kaplan-Meier statistics.",
      "[00:00.112] [BIO_NER] Parsing statistical markers: Hazard Ratio, p-value, sample N, adverse cohorts.",
      "[00:00.198] [EMBEDDING_ALIGNMENT] Reconciling confidence intervals against FDA CDISC standards.",
      "[00:00.275] [CLAUDE_5_5_SONNET] Validating statistical constraints: p < 0.001 confirmed statistically robust.",
      "[00:00.360] [CITATION_ENGINE] Locking data spans to trial tables and IRB governance declarations.",
      "[00:00.452] [SUCCESS] Biomedical schema verified with 99.8% extraction fidelity."
    ],

    vectorNodes: [
      { id: "query", label: "Query: Clinical Efficacy & Safety", x: 260, y: 150, type: "query", color: "#6366f1" },
      { id: "chunk_1", label: "Chunk #1: N=1,420 Cohort Size", x: 125, y: 70, type: "chunk", sim: 0.989, color: "#10b981" },
      { id: "chunk_2", label: "Chunk #2: 68.4% Efficacy (p<0.001)", x: 395, y: 80, type: "chunk", sim: 0.991, color: "#10b981" },
      { id: "chunk_3", label: "Chunk #3: 2.1% Grade 3/4 Adverse", x: 135, y: 230, type: "chunk", sim: 0.948, color: "#f59e0b" },
      { id: "chunk_4", label: "Chunk #4: FDA 21 CFR Protocol", x: 385, y: 220, type: "chunk", sim: 0.925, color: "#a855f7" }
    ]
  },

  "supply_chain": {
    id: "supply_chain",
    filename: "Global_Supply_Chain_Invoices.json",
    category: "Logistics & Cross-Border Trade",
    filesize: "840 KB",
    pages: 18,
    defaultTokens: 1180,
    defaultConfidence: 99.7,
    defaultLatency: 345,
    rawText: `INTERNATIONAL COMMERCIAL INVOICE & CUSTOMS MANIFEST
DOCUMENT ID: INV-EU-2026-9921
ISSUING ENTITY: SILICON SEMICONDUCTOR ALLIANCE B.V. (EINDHOVEN, NETHERLANDS)

TOTAL MONETARY VALUE & CURRENCY EXCHANGE:
The aggregate commercial shipment value equals €1,248,600.00 EUR (converted at European Central Bank reference rate 1.0900 = $1,360,974.00 USD). All banking fees and cross-border currency conversion charges are borne by Buyer.

CUSTOMS CLASSIFICATION & HARMONIZED TARIFF SYSTEM:
Item description corresponds to Microelectronic Monolithic Integrated Circuit Processors under Harmonized System Code HS 8542.31.0000. Preferential European Union export duties are rated at 0.0% under EUR1 trade treaty credentials.

INTERNATIONAL COMMERCIAL TERMS (INCOTERMS 2020):
Delivery basis is DAP (Delivered at Place) - Gateway Cargo Terminal 4, Rotterdam International Port. Seller retains risk until maritime vessel discharge and container positioning on terminal ramp.

PAYMENT SCHEDULE & SETTLEMENT PROTOCOL:
Terms of payment: Net 45 calendar days from certified bill of lading issuance date. Settlement via SWIFT MT103 wire transfer to escrow account NL91ABNA0412882190.`,
    
    formattedHtml: `
      <div class="space-y-4 font-mono text-xs leading-relaxed text-slate-300">
        <div class="border-b border-slate-800 pb-2 text-slate-500 font-semibold tracking-wider uppercase">
          CUSTOMS MANIFEST — INTERNATIONAL COMMERCIAL INVOICE INV-EU-2026-9921
        </div>
        <p>
          <strong class="text-slate-200">TOTAL MONETARY VALUE & FOREX:</strong><br>
          Commercial shipment value certified at 
          <span class="cite-highlight cite-highlight-1" data-cite="cite_inv_val">
            €1,248,600.00 EUR ($1,360,974.00 USD equivalent at 1.09 ECB rate)
            <span class="cite-badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">[Cite #1]</span>
          </span> 
          with full banking indemnity.
        </p>
        <p>
          <strong class="text-slate-200">HARMONIZED TARIFF CLASSIFICATION:</strong><br>
          Silicon microprocessors logged under 
          <span class="cite-highlight cite-highlight-2" data-cite="cite_hs">
            HS Code 8542.31.0000 (0.0% Preferential Duty)
            <span class="cite-badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">[Cite #2]</span>
          </span>, 
          fully cleared under EUR1 customs certificate.
        </p>
        <p>
          <strong class="text-slate-200">INCOTERMS 2020 LOGISTICS DESIGNATION:</strong><br>
          Freight terms designated strictly as 
          <span class="cite-highlight cite-highlight-3" data-cite="cite_incoterm">
            DAP (Delivered at Place) - Rotterdam Cargo Terminal 4
            <span class="cite-badge bg-amber-500/20 text-amber-300 border border-amber-500/40">[Cite #3]</span>
          </span>. 
          Marine discharge liability transferred upon dockside placement.
        </p>
        <p>
          <strong class="text-slate-200">SETTLEMENT & SWIFT WIRE PROTOCOL:</strong><br>
          Accounts payable settlement covenants require 
          <span class="cite-highlight cite-highlight-4" data-cite="cite_payment">
            Net 45 settlement via SWIFT MT103 wire transfer
            <span class="cite-badge bg-purple-500/20 text-purple-300 border border-purple-500/40">[Cite #4]</span>
          </span> 
          to audited escrow coordinates.
        </p>
      </div>
    `,

    structuredJson: {
      invoice_number: "INV-EU-2026-9921",
      exporter: "Silicon Semiconductor Alliance B.V.",
      destination_port: "Rotterdam, Netherlands",
      confidence_score: 0.997,
      citation_verified: true,
      financials: {
        gross_eur: 1248600.00,
        exchange_rate_eur_usd: 1.09,
        equivalent_usd: 1360974.00,
        citation_id: "cite_inv_val",
        line_reference: "Manifest Header, Row 4"
      },
      customs_declaration: {
        hs_code: "8542.31.0000",
        commodity_description: "Monolithic Integrated Circuit Processors",
        tariff_duty_pct: 0.0,
        citation_id: "cite_hs",
        line_reference: "Declaration Section, Line 2"
      },
      logistics: {
        incoterms: "DAP (Delivered at Place)",
        discharge_location: "Rotterdam International Port Terminal 4",
        citation_id: "cite_incoterm",
        line_reference: "Logistics Block, Line 1"
      },
      treasury: {
        payment_terms: "Net 45 Calendar Days",
        wire_standard: "SWIFT MT103",
        citation_id: "cite_payment",
        line_reference: "Settlement Block, Line 2"
      }
    },

    reasoningLogs: [
      "[00:00.032] [INVOICE_OCR] Parsing multi-currency logistics ledger and EUR1 treaty codes.",
      "[00:00.089] [HS_CLASSIFIER] Validating 10-digit Harmonized System tariff: 8542.31.0000 (Semiconductors).",
      "[00:00.160] [CURRENCY_ORCHESTRATOR] Verified European Central Bank reference peg: 1 EUR = 1.09 USD.",
      "[00:00.230] [CLAUDE_5_5_SONNET] Constructing cross-border customs schema with Incoterms 2020 validation.",
      "[00:00.295] [AUDIT_PASS] DAP maritime risk handoff confirmed compliant with ICC guidelines.",
      "[00:00.345] [SUCCESS] Structured manifest compiled with zero discrepancies."
    ],

    vectorNodes: [
      { id: "query", label: "Query: Supply Chain & Customs", x: 260, y: 150, type: "query", color: "#6366f1" },
      { id: "chunk_1", label: "Chunk #1: €1.248M Invoice Total", x: 120, y: 75, type: "chunk", sim: 0.985, color: "#10b981" },
      { id: "chunk_2", label: "Chunk #2: HS Code 8542.31.0000", x: 395, y: 80, type: "chunk", sim: 0.979, color: "#10b981" },
      { id: "chunk_3", label: "Chunk #3: DAP Incoterm 2020", x: 130, y: 225, type: "chunk", sim: 0.952, color: "#f59e0b" },
      { id: "chunk_4", label: "Chunk #4: Net 45 SWIFT MT103", x: 390, y: 220, type: "chunk", sim: 0.938, color: "#a855f7" }
    ]
  }
};
