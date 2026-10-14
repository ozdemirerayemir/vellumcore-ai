/**
 * VellumCore AI - Pipeline Execution & Typewriter Streaming Engine
 * Simulates real-time multi-agent LLM inference and progressive step execution.
 */

import { PIPELINE_STEPS } from "../config.js";

export class PipelineStreamer {
  constructor() {
    this.isStreaming = false;
    this.abortController = null;
  }

  /**
   * Runs the full 4-step pipeline and streams the resulting JSON output
   * @param {Object} options
   * @param {Object} options.data - The final JSON data to stream
   * @param {Array} options.logs - The reasoning logs
   * @param {Function} options.onStepChange - Callback (step, progressPercent, label)
   * @param {Function} options.onStreamChunk - Callback (accumulatedText, isDone)
   * @param {Function} options.onLogEntry - Callback (logLine)
   * @param {Function} options.onComplete - Callback (metrics)
   */
  async executePipeline({
    data,
    logs = [],
    modelMultiplier = 1.0,
    onStepChange = () => {},
    onStreamChunk = () => {},
    onLogEntry = () => {},
    onComplete = () => {}
  }) {
    this.isStreaming = true;
    const startTime = performance.now();

    try {
      // 1. Run Stepper Progress Sequence
      for (const stepInfo of PIPELINE_STEPS) {
        if (!this.isStreaming) break;

        onStepChange(stepInfo.step, stepInfo.progress, stepInfo.label);

        // Emit associated log entry if available
        if (logs[stepInfo.step - 1]) {
          onLogEntry(logs[stepInfo.step - 1]);
        }

        const stepDelay = Math.max(120, Math.round(stepInfo.delayMs * modelMultiplier));
        await this.delay(stepDelay);
      }

      // Emit remaining logs
      for (let i = PIPELINE_STEPS.length; i < logs.length; i++) {
        if (!this.isStreaming) break;
        onLogEntry(logs[i]);
        await this.delay(60);
      }

      // 2. Stream JSON Output with Smooth Typewriter Effect
      const formattedJson = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      const lines = formattedJson.split("\n");
      let currentBuffer = "";

      for (let i = 0; i < lines.length; i++) {
        if (!this.isStreaming) break;

        currentBuffer += (i > 0 ? "\n" : "") + lines[i];
        onStreamChunk(currentBuffer, i === lines.length - 1);

        // Micro-delay between lines for realistic high-speed token streaming
        await this.delay(Math.max(8, 22 - Math.min(18, lines.length / 5)));
      }

      const totalLatency = Math.round(performance.now() - startTime);

      onComplete({
        latency: totalLatency,
        tokens: Math.round(formattedJson.length / 3.8),
        cost: Number(((formattedJson.length / 3800) * 0.003 * modelMultiplier).toFixed(4)),
        confidence: 99.6
      });

    } catch (err) {
      console.error("Pipeline streaming error:", err);
    } finally {
      this.isStreaming = false;
    }
  }

  abort() {
    this.isStreaming = false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const pipelineStreamer = new PipelineStreamer();
