/**
 * VellumCore AI - Enterprise Modal & Institutional Validation Controller
 * Handles SSO Login, API Waitlist, Security Whitepaper, and Toast notifications.
 */

export class ModalController {
  constructor() {
    this.toastContainer = null;
    if (typeof document !== "undefined") {
      this.initToastContainer();
      this.initModalTriggers();
    }
  }

  initToastContainer() {
    if (typeof document === "undefined") return;
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  initModalTriggers() {
    // Backdrop close handlers
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          const modal = backdrop.closest(".modal-wrapper");
          if (modal) modal.classList.add("hidden");
        }
      });
    });

    // Close button triggers
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("hidden");
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      // Focus primary input if available
      const firstInput = modal.querySelector("input:not([type='hidden'])");
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
  }

  /**
   * Enterprise & Academic Email Validator
   * Strictly supports:
   * 1. Academic institutions: .edu, .edu.tr, .ac.uk, .edu.au, .ac.jp, etc.
   * 2. Corporate domains: any non-consumer custom domain
   * Rejects: consumer free webmails (gmail, yahoo, hotmail, outlook, etc.)
   */
  static validateEmail(email) {
    if (!email || !email.includes("@")) {
      return {
        valid: false,
        message: "Please enter a valid email address."
      };
    }

    const trimmed = email.trim().toLowerCase();
    const parts = trimmed.split("@");
    if (parts.length !== 2) {
      return { valid: false, message: "Invalid email format." };
    }

    const domain = parts[1];

    // Block common free consumer webmails
    const consumerDomains = [
      "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
      "live.com", "icloud.com", "aol.com", "mail.com", "yandex.com"
    ];

    if (consumerDomains.includes(domain)) {
      return {
        valid: false,
        message: "Please use an institutional (.edu / .edu.tr) or corporate email address. Consumer webmails (Gmail/Yahoo) are not permitted for API provisioning."
      };
    }

    // Check academic domains
    const isAcademic = domain.endsWith(".edu.tr") || domain.endsWith(".edu") || domain.endsWith(".ac.uk") || domain.includes(".univ-") || domain.endsWith(".ac.jp");
    
    // Check general valid domain structure
    const domainPattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}$/;
    if (!domainPattern.test(domain)) {
      return { valid: false, message: "Please provide a valid top-level domain." };
    }

    return {
      valid: true,
      isAcademic,
      domain,
      message: isAcademic 
        ? "Academic research credentials verified (.edu / .edu.tr). Priority quota unlocked!"
        : "Enterprise domain verified. Proceeding with instant provision."
    };
  }

  /**
   * Save request to localStorage
   */
  static saveRequest(type, data) {
    try {
      const existing = JSON.parse(localStorage.getItem("vellumcore_access_requests") || "[]");
      existing.push({
        type,
        ...data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("vellumcore_access_requests", JSON.stringify(existing));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  showToast(message, type = "success") {
    if (!this.toastContainer) this.initToastContainer();

    const toast = document.createElement("div");
    toast.className = `toast border ${
      type === "success" 
        ? "bg-slate-900/95 border-emerald-500/50 text-emerald-300" 
        : type === "error"
        ? "bg-slate-900/95 border-rose-500/50 text-rose-300"
        : "bg-slate-900/95 border-indigo-500/50 text-indigo-300"
    }`;

    const iconSvg = type === "success"
      ? `<svg class="w-5 h-5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
      : type === "error"
      ? `<svg class="w-5 h-5 flex-shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
      : `<svg class="w-5 h-5 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 font-medium text-xs leading-normal text-slate-200">${message}</div>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-out");
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }
}

export const modalController = new ModalController();
