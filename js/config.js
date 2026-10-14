/**
 * VellumCore AI - Enterprise Configuration & Architecture Constants
 * 100% Zero-Dependency ES6 Module
 */

export const APP_CONFIG = {
  name: "VellumCore AI",
  version: "v2.4 Enterprise",
  tagline: "Autonomous Document Intelligence & Structured Schema Extraction",
  incubatorNotice: "Born in University AI Research Labs • Backed by Academic Grants & Enterprise Partners",
  contacts: {
    research: "research@vellumcore.ai",
    security: "security@vellumcore.ai",
    sales: "enterprise@vellumcore.ai"
  },
  uptime: "99.98%",
  apiStatus: "Operational"
};

export const SUPPORTED_MODELS = {
  "claude-5-5-sonnet": {
    id: "claude-5-5-sonnet",
    name: "Claude 5.5 Sonnet",
    provider: "Anthropic",
    badge: "Default",
    baseLatencyMs: 412,
    costPer1kTokens: 0.003,
    contextWindow: "200,000 Tokens",
    description: "Optimal balance of deterministic reasoning, speed, and zero hallucination schema mapping."
  },
  "claude-5-5-haiku": {
    id: "claude-5-5-haiku",
    name: "Claude 5.5 Haiku",
    provider: "Anthropic",
    badge: "Ultra-Fast",
    baseLatencyMs: 185,
    costPer1kTokens: 0.0008,
    contextWindow: "200,000 Tokens",
    description: "Ultra-low latency extraction for high-throughput batch pipelines."
  },
  "claude-5-5-opus": {
    id: "claude-5-5-opus",
    name: "Claude 5.5 Opus",
    provider: "Anthropic",
    badge: "Deep Reasoning",
    baseLatencyMs: 740,
    costPer1kTokens: 0.015,
    contextWindow: "200,000 Tokens",
    description: "Maximum complexity synthesis for ambiguous multi-lingual legal discovery."
  }
};

export const EXTRACTION_MODES = [
  { id: "strict-json", label: "Strict JSON Schema", icon: "code" },
  { id: "markdown-summary", label: "Executive Summary", icon: "file-text" },
  { id: "entity-graph", label: "Entity Graph (RAG)", icon: "share-2" }
];

export const PIPELINE_STEPS = [
  { step: 1, label: "OCR & Spatial Layout Parsing", progress: 20, delayMs: 250 },
  { step: 2, label: "Semantic Chunking & 1536-dim Embedding", progress: 55, delayMs: 320 },
  { step: 3, label: "Claude Agent Schema Validation", progress: 85, delayMs: 380 },
  { step: 4, label: "Zero-Hallucination Citation Mapping", progress: 100, delayMs: 220 }
];

export const PRICING_PLANS = {
  monthly: [
    {
      id: "startup",
      name: "Developer / Startup",
      price: "$49",
      period: "/month",
      description: "For high-growth engineering teams validating document intelligence pipelines.",
      features: [
        "Up to 50,000 pages / month",
        "Claude 5.5 Sonnet & Haiku access",
        "Deterministic JSON schema enforcement",
        "Standard RAG vector indexing",
        "Community & Discord support",
        "99.9% Uptime SLA"
      ],
      popular: false,
      cta: "Start 14-Day Free Trial"
    },
    {
      id: "growth",
      name: "Growth Scale",
      price: "$249",
      period: "/month",
      description: "For enterprise apps requiring real-time citations and zero hallucination guarantees.",
      features: [
        "Up to 500,000 pages / month",
        "Full Claude 5.5 Sonnet & Opus suite",
        "Two-way line level citation binding",
        "Real-time webhook streaming & retries",
        "SOC2 Type II compliant VPC tunnel",
        "Dedicated Solutions Engineer & Slack channel",
        "99.98% Uptime SLA"
      ],
      popular: true,
      cta: "Deploy Growth Tier"
    },
    {
      id: "enterprise",
      name: "Enterprise Custom",
      price: "Custom",
      period: "per volume",
      description: "Tailored deployment on your AWS/GCP VPC with dedicated Anthropic enterprise throughput routing.",
      features: [
        "Unlimited custom pages / month",
        "Dedicated LLM throughput & priority rate limits",
        "Zero-data retention (HIPAA & BAA signed)",
        "Custom fine-tuned schema adapters",
        "24/7 Phone & PagerDuty Tier-1 support",
        "99.995% Financial-Grade SLA"
      ],
      popular: false,
      cta: "Contact Enterprise Sales"
    }
  ],
  annual: [
    {
      id: "startup",
      name: "Developer / Startup",
      price: "$39",
      period: "/month (billed annually)",
      description: "For high-growth engineering teams validating document intelligence pipelines.",
      features: [
        "Up to 50,000 pages / month",
        "Claude 5.5 Sonnet & Haiku access",
        "Deterministic JSON schema enforcement",
        "Standard RAG vector indexing",
        "Community & Discord support",
        "99.9% Uptime SLA"
      ],
      popular: false,
      cta: "Start 14-Day Free Trial"
    },
    {
      id: "growth",
      name: "Growth Scale",
      price: "$199",
      period: "/month (billed annually - Save 20%)",
      description: "For enterprise apps requiring real-time citations and zero hallucination guarantees.",
      features: [
        "Up to 500,000 pages / month",
        "Full Claude 5.5 Sonnet & Opus suite",
        "Two-way line level citation binding",
        "Real-time webhook streaming & retries",
        "SOC2 Type II compliant VPC tunnel",
        "Dedicated Solutions Engineer & Slack channel",
        "99.98% Uptime SLA"
      ],
      popular: true,
      cta: "Deploy Growth Tier"
    },
    {
      id: "enterprise",
      name: "Enterprise Custom",
      price: "Custom",
      period: "per volume (Annual Volume Tier)",
      description: "Tailored deployment on your AWS/GCP VPC with dedicated Anthropic enterprise throughput routing.",
      features: [
        "Unlimited custom pages / month",
        "Dedicated LLM throughput & priority rate limits",
        "Zero-data retention (HIPAA & BAA signed)",
        "Custom fine-tuned schema adapters",
        "24/7 Phone & PagerDuty Tier-1 support",
        "99.995% Financial-Grade SLA"
      ],
      popular: false,
      cta: "Contact Enterprise Sales"
    }
  ]
};
