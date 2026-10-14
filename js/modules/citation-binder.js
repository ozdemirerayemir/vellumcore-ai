/**
 * VellumCore AI - Two-Way Citation & Document Synchronization Engine
 * Bridges document highlighted text spans with structured JSON output lines.
 */

export class CitationBinder {
  /**
   * Initializes two-way hover and click listeners between document citations and JSON terminal
   * @param {HTMLElement} docContainer - Container holding source document HTML
   * @param {HTMLElement} jsonContainer - Container holding formatted JSON output
   */
  static bind(docContainer, jsonContainer) {
    if (!docContainer || !jsonContainer) return;

    // 1. Hover/Click on Document Citation -> Highlight JSON row
    docContainer.querySelectorAll(".cite-highlight").forEach((citeEl) => {
      const citeId = citeEl.getAttribute("data-cite");

      citeEl.addEventListener("mouseenter", () => {
        this.highlightJsonLine(jsonContainer, citeId, true);
        citeEl.classList.add("active");
      });

      citeEl.addEventListener("mouseleave", () => {
        this.highlightJsonLine(jsonContainer, citeId, false);
        citeEl.classList.remove("active");
      });

      citeEl.addEventListener("click", () => {
        this.scrollToJsonLine(jsonContainer, citeId);
      });
    });

    // 2. Hover/Click on JSON Citation Line -> Highlight Document Span
    jsonContainer.querySelectorAll("[data-cite-target]").forEach((jsonEl) => {
      const targetCiteId = jsonEl.getAttribute("data-cite-target");

      jsonEl.addEventListener("mouseenter", () => {
        this.highlightDocSpan(docContainer, targetCiteId, true);
        jsonEl.classList.add("highlighted");
      });

      jsonEl.addEventListener("mouseleave", () => {
        this.highlightDocSpan(docContainer, targetCiteId, false);
        jsonEl.classList.remove("highlighted");
      });

      jsonEl.addEventListener("click", () => {
        this.scrollToDocSpan(docContainer, targetCiteId);
      });
    });
  }

  static highlightJsonLine(jsonContainer, citeId, shouldHighlight) {
    if (!citeId) return;
    const target = jsonContainer.querySelector(`[data-cite-target="${citeId}"]`);
    if (target) {
      if (shouldHighlight) {
        target.classList.add("highlighted");
      } else {
        target.classList.remove("highlighted");
      }
    }
  }

  static highlightDocSpan(docContainer, citeId, shouldHighlight) {
    if (!citeId) return;
    const target = docContainer.querySelector(`[data-cite="${citeId}"]`);
    if (target) {
      if (shouldHighlight) {
        target.classList.add("active");
      } else {
        target.classList.remove("active");
      }
    }
  }

  static scrollToJsonLine(jsonContainer, citeId) {
    const target = jsonContainer.querySelector(`[data-cite-target="${citeId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      target.classList.add("highlighted");
      setTimeout(() => target.classList.remove("highlighted"), 2000);
    }
  }

  static scrollToDocSpan(docContainer, citeId) {
    const target = docContainer.querySelector(`[data-cite="${citeId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("active");
      setTimeout(() => target.classList.remove("active"), 2000);
    }
  }

  /**
   * Converts JSON object to syntax-highlighted HTML with embedded data-cite-target markers
   * @param {Object} json - The object to format
   * @returns {string} HTML string with syntax highlighting & citation binders
   */
  static formatJsonWithCitations(json) {
    const jsonStr = typeof json === "string" ? json : JSON.stringify(json, null, 2);
    const lines = jsonStr.split("\n");

    let currentCiteContext = null;

    const formattedLines = lines.map((line, index) => {
      const lineNum = index + 1;
      
      // Check if this line defines a citation_id
      const citeMatch = line.match(/"citation_id":\s*"([^"]+)"/);
      if (citeMatch) {
        currentCiteContext = citeMatch[1];
      }

      // Check if line contains citation attribute
      const isCitationLine = Boolean(citeMatch);
      const targetAttr = isCitationLine ? `data-cite-target="${citeMatch[1]}"` : "";

      // Syntax highlight the line
      const highlightedContent = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          let cls = "token-number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "token-key";
            } else {
              cls = "token-string";
            }
          } else if (/true|false/.test(match)) {
            cls = "token-boolean";
          } else if (/null/.test(match)) {
            cls = "token-null";
          }
          return `<span class="${cls}">${match}</span>`;
        });

      const lineClass = isCitationLine ? "json-line cursor-pointer hover:bg-slate-800/60" : "json-line";

      return `<div class="${lineClass}" ${targetAttr}><span class="select-none text-slate-600 w-8 inline-block text-right pr-3 font-mono text-[11px]">${lineNum}</span>${highlightedContent}</div>`;
    });

    return formattedLines.join("");
  }
}
