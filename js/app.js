/**
 * VellumCore AI - Master Application Controller
 * Orchestrates Workspace State, Citations, Streaming Simulation, and Interactive DOM
 */

import { APP_CONFIG, SUPPORTED_MODELS, PRICING_PLANS } from "./config.js";
import { DOCUMENT_PRESETS } from "./data/presets.js";
import { store, STATES } from "./modules/state.js";
import { pipelineStreamer } from "./modules/stream.js";
import { VectorGraphRenderer } from "./modules/vector-graph.js";
import { CitationBinder } from "./modules/citation-binder.js";
import { DynamicEntityParser } from "./modules/parser.js";
import { modalController, ModalController } from "./modules/modal-controller.js";

class VellumCoreApp {
  constructor() {
    this.vectorGraph = null;
    this.currentOutputJson = null;
    this.pricingBillingCycle = "annual"; // default to annual with 20% discount
  }

  init() {
    // 1. Initialize DOM References
    this.cacheDom();

    // 2. Initialize Vector Graph Visualizer
    if (this.dom.vectorCanvas) {
      this.vectorGraph = new VectorGraphRenderer(this.dom.vectorCanvas);
    }

    // 3. Bind UI Event Listeners
    this.bindEvents();

    // 4. Subscribe to Reactive Store
    this.subscribeStore();

    // 5. Initial Render: Load Default Preset (SEC 10-K)
    this.loadPreset("sec_10k", false);

    // 6. Initialize Marketing Layer (Pricing & SDK)
    this.renderPricingTable("annual");
    this.initFaqAccordion();
    this.initSdkTabs();

    // 7. Render Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log("🚀 VellumCore AI enterprise platform initialized.");
  }

  cacheDom() {
    this.dom = {
      // Sidebar elements
      sidebar: document.getElementById("app-sidebar"),
      sidebarToggleBtn: document.getElementById("btn-toggle-sidebar"),
      presetButtons: document.querySelectorAll("[data-preset-id]"),
      modelSelect: document.getElementById("select-model"),
      extractionModeSelect: document.getElementById("select-mode"),
      confidenceSlider: document.getElementById("slider-confidence"),
      confidenceValDisplay: document.getElementById("display-confidence-val"),
      tokenMeterFill: document.getElementById("token-meter-fill"),

      // Sub-header telemetries
      activeDocName: document.getElementById("active-doc-name"),
      activeDocBadge: document.getElementById("active-doc-badge"),
      activeModelBadge: document.getElementById("active-model-badge"),
      metricLatency: document.getElementById("metric-latency"),
      metricTokens: document.getElementById("metric-tokens"),
      metricCost: document.getElementById("metric-cost"),
      runPipelineBtn: document.getElementById("btn-run-pipeline"),
      copyJsonBtn: document.getElementById("btn-copy-json"),
      webhookBtn: document.getElementById("btn-export-webhook"),

      // Stepper & Progress
      pipelineStepperBar: document.getElementById("pipeline-stepper-bar"),
      pipelineStatusLabel: document.getElementById("pipeline-status-label"),
      pipelineProgressBar: document.getElementById("pipeline-progress-fill"),

      // Canvas / Source Containers
      docViewer: document.getElementById("document-viewer"),
      customInputArea: document.getElementById("custom-input-area"),
      sourceDocTabBtn: document.getElementById("btn-tab-source-doc"),
      customInputTabBtn: document.getElementById("btn-tab-custom-input"),

      // Output Tabs & Terminals
      tabBtnJson: document.getElementById("btn-tab-json"),
      tabBtnLogs: document.getElementById("btn-tab-logs"),
      tabBtnGraph: document.getElementById("btn-tab-graph"),
      panelJson: document.getElementById("output-panel-json"),
      panelLogs: document.getElementById("output-panel-logs"),
      panelGraph: document.getElementById("output-panel-graph"),
      jsonContainer: document.getElementById("json-output-container"),
      logsContainer: document.getElementById("logs-output-container"),
      vectorCanvas: document.getElementById("vector-graph-canvas"),

      // Modals and Forms
      ssoForm: document.getElementById("form-sso-login"),
      waitlistForm: document.getElementById("form-early-access"),
      pricingToggleMonthly: document.getElementById("btn-pricing-monthly"),
      pricingToggleAnnual: document.getElementById("btn-pricing-annual"),
      pricingGrid: document.getElementById("pricing-cards-grid")
    };
  }

  bindEvents() {
    // 1. Sidebar Toggle
    if (this.dom.sidebarToggleBtn) {
      this.dom.sidebarToggleBtn.addEventListener("click", () => {
        store.toggleSidebar();
      });
    }

    // 2. Preset Switching
    if (this.dom.presetButtons) {
      this.dom.presetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const presetId = btn.getAttribute("data-preset-id");
          this.loadPreset(presetId, true);
        });
      });
    }

    // 3. Model Selection
    if (this.dom.modelSelect) {
      this.dom.modelSelect.addEventListener("change", (e) => {
        store.setModel(e.target.value);
        const model = SUPPORTED_MODELS[e.target.value];
        if (model && this.dom.activeModelBadge) {
          this.dom.activeModelBadge.textContent = model.name;
        }
      });
    }

    // 4. Extraction Mode
    if (this.dom.extractionModeSelect) {
      this.dom.extractionModeSelect.addEventListener("change", (e) => {
        store.setExtractionMode(e.target.value);
      });
    }

    // 5. Confidence Slider
    if (this.dom.confidenceSlider) {
      this.dom.confidenceSlider.addEventListener("input", (e) => {
        const val = e.target.value;
        store.setConfidenceThreshold(val);
        if (this.dom.confidenceValDisplay) {
          this.dom.confidenceValDisplay.textContent = `${val}%`;
        }
      });
    }

    // 6. Source Tabs (Document vs Custom Raw Input)
    if (this.dom.sourceDocTabBtn && this.dom.customInputTabBtn) {
      this.dom.sourceDocTabBtn.addEventListener("click", () => {
        this.switchSourceTab("document");
      });
      this.dom.customInputTabBtn.addEventListener("click", () => {
        this.switchSourceTab("custom");
      });
    }

    // 7. Output Tabs (JSON / Logs / Vector Graph)
    if (this.dom.tabBtnJson) {
      this.dom.tabBtnJson.addEventListener("click", () => this.switchOutputTab("json"));
    }
    if (this.dom.tabBtnLogs) {
      this.dom.tabBtnLogs.addEventListener("click", () => this.switchOutputTab("logs"));
    }
    if (this.dom.tabBtnGraph) {
      this.dom.tabBtnGraph.addEventListener("click", () => this.switchOutputTab("graph"));
    }

    // 8. Run Extraction Pipeline
    if (this.dom.runPipelineBtn) {
      this.dom.runPipelineBtn.addEventListener("click", () => {
        this.runExtractionPipeline();
      });
    }

    // 9. Copy JSON
    if (this.dom.copyJsonBtn) {
      this.dom.copyJsonBtn.addEventListener("click", () => {
        this.copyJsonToClipboard();
      });
    }

    // 10. Webhook Simulator Button
    if (this.dom.webhookBtn) {
      this.dom.webhookBtn.addEventListener("click", () => {
        this.openWebhookSimulator();
      });
    }

    // 11. Modal Triggers
    document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute("data-open-modal");
        modalController.openModal(modalId);
      });
    });

    // 12. Institutional SSO Form Submission
    if (this.dom.ssoForm) {
      this.dom.ssoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSsoSubmit();
      });
    }

    // 13. Institutional Waitlist Form Submission
    if (this.dom.waitlistForm) {
      this.dom.waitlistForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleWaitlistSubmit();
      });
    }

    // 14. Pricing Toggle (Monthly vs Annual)
    if (this.dom.pricingToggleMonthly && this.dom.pricingToggleAnnual) {
      this.dom.pricingToggleMonthly.addEventListener("click", () => {
        this.setPricingBillingCycle("monthly");
      });
      this.dom.pricingToggleAnnual.addEventListener("click", () => {
        this.setPricingBillingCycle("annual");
      });
    }
  }

  subscribeStore() {
    store.subscribe((state, prevState) => {
      // Sidebar collapsed toggle
      if (state.sidebarCollapsed !== prevState.sidebarCollapsed) {
        if (state.sidebarCollapsed) {
          this.dom.sidebar.classList.add("w-16");
          this.dom.sidebar.classList.remove("w-64");
          document.querySelectorAll(".sidebar-label").forEach(el => el.classList.add("hidden"));
        } else {
          this.dom.sidebar.classList.remove("w-16");
          this.dom.sidebar.classList.add("w-64");
          document.querySelectorAll(".sidebar-label").forEach(el => el.classList.remove("hidden"));
        }
        if (this.vectorGraph) this.vectorGraph.handleResize();
      }
    });
  }

  loadPreset(presetId, animate = true) {
    const preset = DOCUMENT_PRESETS[presetId];
    if (!preset) return;

    store.setPreset(presetId);

    // Update preset active styles in sidebar
    if (this.dom.presetButtons) {
      this.dom.presetButtons.forEach((btn) => {
        const id = btn.getAttribute("data-preset-id");
        if (id === presetId) {
          btn.classList.add("bg-indigo-500/15", "border-indigo-500/50", "text-indigo-300");
          btn.classList.remove("border-transparent", "text-slate-400");
        } else {
          btn.classList.remove("bg-indigo-500/15", "border-indigo-500/50", "text-indigo-300");
          btn.classList.add("border-transparent", "text-slate-400");
        }
      });
    }

    // Update Workspace sub-header
    if (this.dom.activeDocName) this.dom.activeDocName.textContent = preset.filename;
    if (this.dom.activeDocBadge) this.dom.activeDocBadge.textContent = preset.filesize;
    if (this.dom.metricLatency) this.dom.metricLatency.textContent = `${preset.defaultLatency}ms`;
    if (this.dom.metricTokens) this.dom.metricTokens.textContent = preset.defaultTokens.toLocaleString();
    if (this.dom.metricCost) this.dom.metricCost.textContent = `$${((preset.defaultTokens / 1000) * 0.003).toFixed(4)}`;

    // Optional brief shimmer during document change
    if (animate && this.dom.docViewer && this.dom.jsonContainer) {
      this.dom.docViewer.innerHTML = `
        <div class="p-6 space-y-4">
          <div class="h-4 w-3/4 skeleton-shimmer rounded"></div>
          <div class="h-4 w-1/2 skeleton-shimmer rounded"></div>
          <div class="h-24 w-full skeleton-shimmer rounded"></div>
          <div class="h-4 w-2/3 skeleton-shimmer rounded"></div>
        </div>
      `;
      this.dom.jsonContainer.innerHTML = `
        <div class="p-6 space-y-3">
          <div class="h-4 w-1/3 skeleton-shimmer rounded"></div>
          <div class="h-4 w-2/3 skeleton-shimmer rounded"></div>
          <div class="h-4 w-1/2 skeleton-shimmer rounded"></div>
        </div>
      `;

      setTimeout(() => {
        this.renderPresetContent(preset);
      }, 160);
    } else {
      this.renderPresetContent(preset);
    }
  }

  renderPresetContent(preset) {
    this.currentOutputJson = preset.structuredJson;

    // 1. Render Source Document with Citation Highlights
    if (this.dom.docViewer) {
      this.dom.docViewer.innerHTML = preset.formattedHtml;
    }

    // 2. Render Structured JSON with Citation Target Bindings
    if (this.dom.jsonContainer) {
      const formattedHtml = CitationBinder.formatJsonWithCitations(preset.structuredJson);
      this.dom.jsonContainer.innerHTML = formattedHtml;
    }

    // 3. Render Agent Reasoning Logs
    if (this.dom.logsContainer) {
      this.dom.logsContainer.innerHTML = preset.reasoningLogs.map((log) => {
        const isSuccess = log.includes("[SUCCESS]");
        const isWarn = log.includes("[WARN]");
        const colorClass = isSuccess ? "text-emerald-400 font-semibold" : isWarn ? "text-amber-400" : "text-slate-300";
        return `<div class="py-1 px-2 border-b border-slate-800/40 hover:bg-slate-800/30 font-mono text-[11px] ${colorClass}">${log}</div>`;
      }).join("");
    }

    // 4. Update Vector Graph Nodes
    if (this.vectorGraph && preset.vectorNodes) {
      this.vectorGraph.setNodes(preset.vectorNodes);
    }

    // 5. Initialize Two-Way Citation Highlighting
    if (this.dom.docViewer && this.dom.jsonContainer) {
      CitationBinder.bind(this.dom.docViewer, this.dom.jsonContainer);
    }

    store.setState({ status: STATES.IDLE });
  }

  switchSourceTab(tab) {
    store.setSourceTab(tab);
    if (tab === "document") {
      this.dom.sourceDocTabBtn.classList.add("bg-slate-800", "text-white");
      this.dom.sourceDocTabBtn.classList.remove("text-slate-400");
      this.dom.customInputTabBtn.classList.remove("bg-slate-800", "text-white");
      this.dom.customInputTabBtn.classList.add("text-slate-400");

      this.dom.docViewer.classList.remove("hidden");
      this.dom.customInputArea.classList.add("hidden");
    } else {
      this.dom.customInputTabBtn.classList.add("bg-slate-800", "text-white");
      this.dom.customInputTabBtn.classList.remove("text-slate-400");
      this.dom.sourceDocTabBtn.classList.remove("bg-slate-800", "text-white");
      this.dom.sourceDocTabBtn.classList.add("text-slate-400");

      this.dom.docViewer.classList.add("hidden");
      this.dom.customInputArea.classList.remove("hidden");
      this.dom.customInputArea.focus();
    }
  }

  switchOutputTab(tab) {
    store.setOutputTab(tab);

    const tabs = [
      { id: "json", btn: this.dom.tabBtnJson, panel: this.dom.panelJson },
      { id: "logs", btn: this.dom.tabBtnLogs, panel: this.dom.panelLogs },
      { id: "graph", btn: this.dom.tabBtnGraph, panel: this.dom.panelGraph }
    ];

    tabs.forEach((t) => {
      if (t.id === tab) {
        t.btn.classList.add("text-indigo-400", "border-indigo-500", "bg-indigo-500/10");
        t.btn.classList.remove("text-slate-400", "border-transparent");
        t.panel.classList.remove("hidden");
      } else {
        t.btn.classList.remove("text-indigo-400", "border-indigo-500", "bg-indigo-500/10");
        t.btn.classList.add("text-slate-400", "border-transparent");
        t.panel.classList.add("hidden");
      }
    });

    if (tab === "graph" && this.vectorGraph) {
      setTimeout(() => this.vectorGraph.handleResize(), 50);
    }
  }

  async runExtractionPipeline() {
    const currentState = store.getState();
    const activeModel = SUPPORTED_MODELS[currentState.currentModelId] || SUPPORTED_MODELS["claude-5-5-sonnet"];

    // Disable run button & show spinner
    this.dom.runPipelineBtn.disabled = true;
    this.dom.runPipelineBtn.classList.add("opacity-80", "cursor-not-allowed");
    this.dom.runPipelineBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Inferring via ${activeModel.name}...
    `;

    // Reset Stepper & Output Terminal
    if (this.dom.pipelineStepperBar) this.dom.pipelineStepperBar.classList.remove("hidden");
    if (this.dom.jsonContainer) this.dom.jsonContainer.innerHTML = "";
    if (this.dom.logsContainer) this.dom.logsContainer.innerHTML = "";

    store.startProcessing();

    // Determine payload to process
    let targetPayload;
    let targetLogs;

    if (currentState.activeSourceTab === "custom") {
      const customRaw = this.dom.customInputArea.value;
      targetPayload = DynamicEntityParser.parse(customRaw, activeModel.name, currentState.confidenceThreshold);
      targetLogs = [
        `[00:00.035] [RAW_AST_PARSER] Ingesting custom unstructured input (${customRaw.length} chars).`,
        `[00:00.110] [DYNAMIC_NER] Running RegEx & heuristics: monetary, temporal, entities.`,
        `[00:00.220] [SCHEMA_SYNTHESIS] Emitting dynamic typed JSON with confidence ${targetPayload.confidence_percentage}.`,
        `[00:00.310] [SUCCESS] Dynamic schema verified. 0 syntax anomalies.`
      ];

      // Update vector nodes dynamically
      if (this.vectorGraph) {
        this.vectorGraph.setNodes([
          { id: "query", label: "Custom Document Context", x: 260, y: 150, type: "query", color: "#6366f1" },
          { id: "chunk_1", label: `Entities (${targetPayload.extracted_entities.identified_named_entities.length})`, x: 130, y: 80, type: "chunk", sim: 0.965, color: "#10b981" },
          { id: "chunk_2", label: `Monetary (${targetPayload.extracted_entities.financial_monetary_metrics.length})`, x: 390, y: 85, type: "chunk", sim: 0.948, color: "#10b981" },
          { id: "chunk_3", label: `Dates (${targetPayload.extracted_entities.temporal_anchors_and_dates.length})`, x: 260, y: 240, type: "chunk", sim: 0.922, color: "#f59e0b" }
        ]);
      }
    } else {
      const preset = DOCUMENT_PRESETS[currentState.currentPresetId];
      targetPayload = preset.structuredJson;
      targetLogs = preset.reasoningLogs;
    }

    this.currentOutputJson = targetPayload;

    // Run Streaming Pipeline
    const modelMultiplier = activeModel.id === "claude-5-5-haiku" ? 0.6 : activeModel.id === "claude-5-5-opus" ? 1.7 : 1.0;

    await pipelineStreamer.executePipeline({
      data: targetPayload,
      logs: targetLogs,
      modelMultiplier,
      onStepChange: (step, progress, label) => {
        if (this.dom.pipelineStatusLabel) this.dom.pipelineStatusLabel.textContent = `Step ${step}/4: ${label}`;
        if (this.dom.pipelineProgressBar) this.dom.pipelineProgressBar.style.width = `${progress}%`;
      },
      onStreamChunk: (accumulatedText) => {
        if (this.dom.jsonContainer) {
          try {
            const partialObj = JSON.parse(accumulatedText);
            this.dom.jsonContainer.innerHTML = CitationBinder.formatJsonWithCitations(partialObj);
          } catch {
            // During mid-line stream, render clean raw lines
            this.dom.jsonContainer.textContent = accumulatedText;
          }
        }
      },
      onLogEntry: (logLine) => {
        if (this.dom.logsContainer) {
          const logDiv = document.createElement("div");
          logDiv.className = `py-1 px-2 border-b border-slate-800/40 font-mono text-[11px] ${
            logLine.includes("[SUCCESS]") ? "text-emerald-400 font-semibold" : "text-slate-300"
          }`;
          logDiv.textContent = logLine;
          this.dom.logsContainer.appendChild(logDiv);
          this.dom.logsContainer.scrollTop = this.dom.logsContainer.scrollHeight;
        }
      },
      onComplete: (metrics) => {
        // Restore run button
        this.dom.runPipelineBtn.disabled = false;
        this.dom.runPipelineBtn.classList.remove("opacity-80", "cursor-not-allowed");
        this.dom.runPipelineBtn.innerHTML = `
          <svg class="w-4 h-4 mr-1.5 inline-block text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
          Run Extraction Pipeline
        `;

        // Update telemetry metrics in Sub-Header
        if (this.dom.metricLatency) this.dom.metricLatency.textContent = `${metrics.latency}ms`;
        if (this.dom.metricTokens) this.dom.metricTokens.textContent = metrics.tokens.toLocaleString();
        if (this.dom.metricCost) this.dom.metricCost.textContent = `$${metrics.cost}`;

        // Rebind two-way citations
        if (this.dom.docViewer && this.dom.jsonContainer) {
          CitationBinder.bind(this.dom.docViewer, this.dom.jsonContainer);
        }

        store.completeProcessing(metrics);

        // Show Toast Notification
        modalController.showToast(
          `Pipeline extraction completed in ${metrics.latency}ms with 0 schema violations.`,
          "success"
        );
      }
    });
  }

  copyJsonToClipboard() {
    if (!this.currentOutputJson) return;
    const text = JSON.stringify(this.currentOutputJson, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      modalController.showToast("Structured JSON schema copied to clipboard!", "info");
    }).catch(() => {
      modalController.showToast("Failed to copy to clipboard.", "error");
    });
  }

  openWebhookSimulator() {
    const modal = document.getElementById("modal-webhook");
    const curlSnippet = document.getElementById("webhook-curl-snippet");
    if (curlSnippet && this.currentOutputJson) {
      curlSnippet.textContent = `curl -X POST https://api.vellumcore.ai/v2/extract \\
  -H "Authorization: Bearer vc_live_994827104928" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(this.currentOutputJson).slice(0, 140)}...'`;
    }
    modalController.openModal("modal-webhook");
  }

  handleSsoSubmit() {
    const emailInput = document.getElementById("sso-email");
    const errorMsg = document.getElementById("sso-error-msg");
    const email = emailInput ? emailInput.value : "";

    const validation = ModalController.validateEmail(email);
    if (!validation.valid) {
      if (errorMsg) {
        errorMsg.textContent = validation.message;
        errorMsg.classList.remove("hidden");
      }
      return;
    }

    if (errorMsg) errorMsg.classList.add("hidden");

    ModalController.saveRequest("sso_login", { email, isAcademic: validation.isAcademic });
    modalController.closeModal("modal-sso");
    modalController.showToast(`SSO authentication successful for ${validation.domain}! ${validation.message}`, "success");
    if (emailInput) emailInput.value = "";
  }

  handleWaitlistSubmit() {
    const emailInput = document.getElementById("waitlist-email");
    const nameInput = document.getElementById("waitlist-name");
    const errorMsg = document.getElementById("waitlist-error-msg");

    const email = emailInput ? emailInput.value : "";
    const name = nameInput ? nameInput.value : "Partner";

    const validation = ModalController.validateEmail(email);
    if (!validation.valid) {
      if (errorMsg) {
        errorMsg.textContent = validation.message;
        errorMsg.classList.remove("hidden");
      }
      return;
    }

    if (errorMsg) errorMsg.classList.add("hidden");

    ModalController.saveRequest("early_access", {
      name,
      email,
      isAcademic: validation.isAcademic,
      domain: validation.domain
    });

    modalController.closeModal("modal-waitlist");
    modalController.showToast(
      `Welcome ${name}! ${validation.isAcademic ? "Academic grant & sandbox credentials generated." : "Enterprise API key queued for instant activation."}`,
      "success"
    );

    if (emailInput) emailInput.value = "";
    if (nameInput) nameInput.value = "";
  }

  setPricingBillingCycle(cycle) {
    this.pricingBillingCycle = cycle;
    if (cycle === "annual") {
      this.dom.pricingToggleAnnual.classList.add("bg-indigo-600", "text-white");
      this.dom.pricingToggleAnnual.classList.remove("text-slate-400");
      this.dom.pricingToggleMonthly.classList.remove("bg-indigo-600", "text-white");
      this.dom.pricingToggleMonthly.classList.add("text-slate-400");
    } else {
      this.dom.pricingToggleMonthly.classList.add("bg-indigo-600", "text-white");
      this.dom.pricingToggleMonthly.classList.remove("text-slate-400");
      this.dom.pricingToggleAnnual.classList.remove("bg-indigo-600", "text-white");
      this.dom.pricingToggleAnnual.classList.add("text-slate-400");
    }
    this.renderPricingTable(cycle);
  }

  renderPricingTable(cycle) {
    if (!this.dom.pricingGrid) return;
    const plans = PRICING_PLANS[cycle] || PRICING_PLANS.annual;

    this.dom.pricingGrid.innerHTML = plans.map((plan) => {
      const isPopular = plan.popular;
      return `
        <div class="relative rounded-2xl border ${
          isPopular 
            ? "border-indigo-500/80 bg-slate-900/90 shadow-2xl shadow-indigo-500/10" 
            : "border-slate-800 bg-slate-900/40"
        } p-8 flex flex-col justify-between transition-all hover:border-slate-700">
          ${isPopular ? `
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-950 shadow">
              Most Popular
            </div>
          ` : ""}
          <div>
            <h3 class="text-lg font-semibold text-white">${plan.name}</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">${plan.description}</p>
            <div class="mt-6 flex items-baseline gap-1">
              <span class="text-4xl font-extrabold tracking-tight text-white">${plan.price}</span>
              <span class="text-xs text-slate-400">${plan.period}</span>
            </div>
            <ul class="mt-8 space-y-3 text-xs text-slate-300">
              ${plan.features.map(f => `
                <li class="flex items-center gap-2.5">
                  <svg class="h-4 w-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${f}</span>
                </li>
              `).join("")}
            </ul>
          </div>
          <button 
            data-open-modal="modal-waitlist" 
            class="mt-8 w-full rounded-lg py-2.5 px-4 text-xs font-semibold transition-all ${
              isPopular 
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30" 
                : "bg-slate-800 hover:bg-slate-700 text-slate-200"
            }">
            ${plan.cta}
          </button>
        </div>
      `;
    }).join("");

    // Re-bind modal triggers on newly rendered buttons
    this.dom.pricingGrid.querySelectorAll("[data-open-modal]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute("data-open-modal");
        modalController.openModal(modalId);
      });
    });
  }

  initFaqAccordion() {
    document.querySelectorAll(".faq-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const content = item.querySelector(".accordion-content");
        const icon = btn.querySelector(".faq-icon");

        const isOpen = content.classList.contains("expanded");
        // Close all
        document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("expanded"));
        document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

        if (!isOpen) {
          content.classList.add("expanded");
          if (icon) icon.classList.add("rotate-180");
        }
      });
    });
  }

  initSdkTabs() {
    const tabs = document.querySelectorAll("[data-sdk-tab]");
    const codeBlocks = {
      python: `import vellumcore

client = vellumcore.Client(api_key="vc_live_production_key")

# Run autonomous extraction pipeline with strict schema enforcement
result = client.documents.extract(
    file_path="./SEC_10K_Financial_Report.pdf",
    model="claude-5-5-sonnet",
    extraction_mode="strict_json",
    confidence_threshold=0.95,
    enable_line_citations=True
)

print(f"Total Revenue: {result.metrics.total_consolidated_revenue.formatted}")
print(f"Verified Citation: {result.metrics.total_consolidated_revenue.citation_id}")`,

      typescript: `import { VellumCoreClient } from "@vellumcore/sdk";

const client = new VellumCoreClient({
  apiKey: process.env.VELLUMCORE_API_KEY!
});

// Stream extraction response with typed event handlers
const extractionStream = await client.documents.extractStream({
  fileUrl: "https://storage.vellumcore.ai/SEC_10K_Report.pdf",
  model: "claude-5-5-sonnet",
  onStepProgress: (step, pct) => console.log(\`Step \${step}: \${pct}%\`),
  onCitationBinding: (citation) => console.log("Bound citation:", citation.id)
});

for await (const chunk of extractionStream) {
  process.stdout.write(chunk.delta);
}`,

      curl: `curl -X POST https://api.vellumcore.ai/v2/documents/extract \\
  -H "Authorization: Bearer vc_live_production_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_url": "https://storage.vellumcore.ai/SEC_10K_Report.pdf",
    "model": "claude-5-5-sonnet",
    "extraction_mode": "strict_json",
    "confidence_threshold": 0.95,
    "line_level_citations": true
  }'`
    };

    const codeContainer = document.getElementById("sdk-code-display");
    const copyBtn = document.getElementById("btn-copy-sdk");

    const updateSnippet = (lang) => {
      if (codeContainer) {
        codeContainer.textContent = codeBlocks[lang] || codeBlocks.python;
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const lang = tab.getAttribute("data-sdk-tab");
        tabs.forEach(t => {
          t.classList.remove("text-indigo-400", "border-indigo-500", "bg-indigo-500/10");
          t.classList.add("text-slate-400", "border-transparent");
        });
        tab.classList.add("text-indigo-400", "border-indigo-500", "bg-indigo-500/10");
        tab.classList.remove("text-slate-400", "border-transparent");
        updateSnippet(lang);
      });
    });

    if (copyBtn && codeContainer) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeContainer.textContent).then(() => {
          modalController.showToast("SDK code sample copied to clipboard!", "info");
        });
      });
    }

    // Default to python
    updateSnippet("python");
  }
}

// Instantiate on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new VellumCoreApp();
  app.init();
});
