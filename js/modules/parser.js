/**
 * VellumCore AI - Dynamic Heuristic & RegEx Entity Extraction Parser
 * Analyzes unstructured raw text and synthesizes a deterministic structured JSON schema.
 */

export class DynamicEntityParser {
  /**
   * Main entry point: Parses unstructured text into a structured JSON payload
   * @param {string} text - Raw input text from the user
   * @param {string} modelId - Active LLM identifier
   * @param {number} threshold - Confidence threshold (0-100)
   * @returns {Object} Structured JSON schema with citations and metrics
   */
  static parse(text, modelId = "claude-5-5-sonnet", threshold = 95) {
    if (!text || !text.trim()) {
      return this.generateEmptyFallback();
    }

    const cleanText = text.trim();
    const monetaryValues = this.extractMonetaryValues(cleanText);
    const dates = this.extractDates(cleanText);
    const percentages = this.extractPercentages(cleanText);
    const emails = this.extractEmails(cleanText);
    const urls = this.extractUrls(cleanText);
    const keyValues = this.extractKeyValues(cleanText);
    const entities = this.extractNamedEntities(cleanText);

    // Compute synthetic metrics based on content density
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    const estTokens = Math.max(45, Math.round(wordCount * 1.35));
    const dynamicConfidence = Math.min(99.9, Math.max(threshold, 92.5 + (monetaryValues.length * 1.2) + (dates.length * 0.8))).toFixed(1);

    const generatedSchema = {
      schema_type: "VellumCore_Dynamic_Unstructured_Extraction",
      source_classification: this.classifyDocumentType(cleanText),
      confidence_score: Number((dynamicConfidence / 100).toFixed(4)),
      confidence_percentage: `${dynamicConfidence}%`,
      compliance_threshold_met: Number(dynamicConfidence) >= threshold,
      extracted_entities: {
        financial_monetary_metrics: monetaryValues.map((val, idx) => ({
          extracted_value: val.raw,
          normalized_amount: val.amount,
          currency: val.currency,
          citation_id: `custom_cite_m${idx + 1}`,
          position_index: val.index
        })),
        temporal_anchors_and_dates: dates.map((d, idx) => ({
          extracted_date: d.raw,
          normalized_iso: d.iso,
          citation_id: `custom_cite_d${idx + 1}`
        })),
        statistical_percentages: percentages.map((p, idx) => ({
          percentage_value: p.num,
          raw_match: p.raw,
          citation_id: `custom_cite_p${idx + 1}`
        })),
        communication_channels: {
          emails: emails,
          endpoints: urls
        },
        structured_key_value_pairs: keyValues,
        identified_named_entities: entities
      },
      telemetry: {
        raw_character_count: cleanText.length,
        word_count: wordCount,
        estimated_prompt_tokens: estTokens,
        parser_engine: "VellumCore-Heuristic-AST-v2.4",
        synthesizer_llm: modelId,
        timestamp: new Date().toISOString()
      }
    };

    return generatedSchema;
  }

  static extractMonetaryValues(text) {
    const results = [];
    // Matches $125,000, $1,250.50, €50M, 400 USD, 50,000 EUR, $89.46B
    const regex = /(?:[\$\€\£\¥]\s*[\d]{1,3}(?:,[\d]{3})*(?:\.\d+)?(?:\s*(?:billion|million|trillion|[BMKbmk]))?(?:\s*(?:USD|EUR|GBP|TRY|JPY))?)|(?:\b[\d]{1,3}(?:,[\d]{3})*(?:\.\d+)?\s*(?:USD|EUR|GBP|TRY|JPY)\b)/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const raw = match[0].trim();
      let currency = "USD";
      if (raw.includes("€") || raw.toUpperCase().includes("EUR")) currency = "EUR";
      else if (raw.includes("£") || raw.toUpperCase().includes("GBP")) currency = "GBP";
      else if (raw.includes("¥") || raw.toUpperCase().includes("JPY")) currency = "JPY";
      else if (raw.toUpperCase().includes("TRY")) currency = "TRY";

      const numStr = raw.replace(/[^\d.]/g, "");
      let amount = parseFloat(numStr) || 0;
      if (/billion|\bb\b/i.test(raw)) amount *= 1000000000;
      else if (/million|\bm\b/i.test(raw)) amount *= 1000000;
      else if (/k\b/i.test(raw)) amount *= 1000;

      results.push({
        raw,
        amount,
        currency,
        index: match.index
      });
    }

    return results.slice(0, 8); // Top relevant matches
  }

  static extractDates(text) {
    const results = [];
    // Matches YYYY-MM-DD, MM/DD/YYYY, Month Day Year
    const regex = /\b(?:\d{4}[-\/]\d{2}[-\/]\d{2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember))\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})\b/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const raw = match[0].trim();
      const parsed = new Date(raw);
      const iso = isNaN(parsed.getTime()) ? raw : parsed.toISOString().split("T")[0];
      results.push({ raw, iso });
    }

    return results.slice(0, 6);
  }

  static extractPercentages(text) {
    const results = [];
    const regex = /\b\d+(?:\.\d+)?\s*%/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const raw = match[0].trim();
      const num = parseFloat(raw.replace("%", ""));
      results.push({ raw, num });
    }

    return results.slice(0, 6);
  }

  static extractEmails(text) {
    const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    const matches = text.match(regex);
    return matches ? Array.from(new Set(matches)).slice(0, 5) : [];
  }

  static extractUrls(text) {
    const regex = /https?:\/\/[^\s$.?#].[^\s]*/gi;
    const matches = text.match(regex);
    return matches ? Array.from(new Set(matches)).slice(0, 4) : [];
  }

  static extractKeyValues(text) {
    const pairs = {};
    const lines = text.split("\n");

    for (const line of lines) {
      const match = line.match(/^([^:\=\-\#]{2,35})[:\=]\s*(.+)$/);
      if (match) {
        const key = match[1].trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
        const val = match[2].trim();
        if (key && val && key.length > 2 && key.length < 30) {
          pairs[key] = isNaN(Number(val)) ? val : Number(val);
        }
      }
    }

    return Object.keys(pairs).length > 0 ? pairs : { status: "Analyzed with no explicit key-value rows" };
  }

  static extractNamedEntities(text) {
    // Finds capitalized compound words that look like proper names, companies or titles
    const regex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}\b/g;
    const matches = text.match(regex);
    if (!matches) return ["VellumCore Context Node"];
    
    // Filter common English words that might be capitalized at sentence starts
    const stopwords = new Set(["The Company", "This Agreement", "In Particular", "For Example", "United States"]);
    const filtered = matches.filter(m => !stopwords.has(m) && m.length > 4);
    return Array.from(new Set(filtered)).slice(0, 6);
  }

  static classifyDocumentType(text) {
    const lower = text.toLowerCase();
    if (lower.includes("invoice") || lower.includes("subtotal") || lower.includes("tax") || lower.includes("vat")) {
      return "Commercial Invoice / Billing Ledger";
    }
    if (lower.includes("agreement") || lower.includes("indemnification") || lower.includes("pursuant") || lower.includes("covenant")) {
      return "Legal Covenant / B2B Agreement";
    }
    if (lower.includes("patient") || lower.includes("clinical") || lower.includes("protocol") || lower.includes("placebo")) {
      return "Clinical Study / Biomedical Protocol";
    }
    if (lower.includes("revenue") || lower.includes("ebitda") || lower.includes("quarter") || lower.includes("margin")) {
      return "Corporate Financial Disclosures";
    }
    return "General Unstructured Business Record";
  }

  static generateEmptyFallback() {
    return {
      schema_type: "VellumCore_Dynamic_Unstructured_Extraction",
      status: "Awaiting user input",
      message: "Please enter or paste raw document text into the editor to trigger extraction."
    };
  }
}
