/**
 * VellumCore AI - Reactive State Management Store
 * Zero-dependency observable store for application & workspace state
 */

export const STATES = {
  IDLE: "IDLE",
  DOCUMENT_SWITCHING: "DOCUMENT_SWITCHING",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

class AppStore {
  constructor() {
    this.state = {
      status: STATES.IDLE,
      currentPresetId: "sec_10k",
      currentModelId: "claude-5-5-sonnet",
      extractionMode: "strict-json",
      confidenceThreshold: 95,
      activeOutputTab: "json", // "json" | "logs" | "graph"
      activeSourceTab: "document", // "document" | "custom"
      customText: "",
      sidebarCollapsed: false,
      currentStep: 0,
      stepProgress: 0,
      metrics: {
        latency: 412,
        tokens: 1842,
        confidence: 99.6,
        cost: 0.0055
      },
      citationActiveId: null
    };

    this.listeners = new Set();
  }

  getState() {
    return { ...this.state };
  }

  setState(partialState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...partialState };
    this.notify(prevState);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(prevState) {
    for (const listener of this.listeners) {
      try {
        listener(this.state, prevState);
      } catch (err) {
        console.error("State listener error:", err);
      }
    }
  }

  // Convenience helper actions
  setPreset(presetId) {
    this.setState({
      currentPresetId: presetId,
      status: STATES.DOCUMENT_SWITCHING
    });
  }

  setModel(modelId) {
    this.setState({ currentModelId: modelId });
  }

  setExtractionMode(modeId) {
    this.setState({ extractionMode: modeId });
  }

  setConfidenceThreshold(val) {
    this.setState({ confidenceThreshold: Number(val) });
  }

  setOutputTab(tab) {
    this.setState({ activeOutputTab: tab });
  }

  setSourceTab(tab) {
    this.setState({ activeSourceTab: tab });
  }

  setCustomText(text) {
    this.setState({ customText: text });
  }

  toggleSidebar() {
    this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  }

  setActiveCitation(citationId) {
    this.setState({ citationActiveId: citationId });
  }

  startProcessing() {
    this.setState({
      status: STATES.PROCESSING,
      currentStep: 1,
      stepProgress: 10
    });
  }

  completeProcessing(metrics) {
    this.setState({
      status: STATES.SUCCESS,
      currentStep: 4,
      stepProgress: 100,
      metrics: { ...this.state.metrics, ...metrics }
    });
  }
}

export const store = new AppStore();
