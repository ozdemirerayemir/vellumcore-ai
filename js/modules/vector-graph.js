/**
 * VellumCore AI - Interactive RAG Vector Space & Cosine Graph Visualizer
 * High-performance HTML5 Canvas renderer with floating nodes, pulse rings, and similarity edges.
 */

export class VectorGraphRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.nodes = [];
    this.hoveredNode = null;
    this.animationFrameId = null;
    this.time = 0;

    this.initEvents();
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width || 600;
    this.height = Math.max(340, rect.height || 360);

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  initEvents() {
    if (!this.canvas) return;

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      for (const node of this.nodes) {
        const dx = mouseX - node.currentX;
        const dy = mouseY - node.currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 28) {
          found = node;
          break;
        }
      }

      this.hoveredNode = found;
      this.canvas.style.cursor = found ? "pointer" : "default";
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.hoveredNode = null;
      this.canvas.style.cursor = "default";
    });
  }

  setNodes(nodeDataList) {
    this.handleResize();
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.nodes = nodeDataList.map((n, idx) => {
      // Scale coordinates relative to canvas dimensions
      let targetX = centerX;
      let targetY = centerY;

      if (n.type !== "query") {
        const angle = (idx / (nodeDataList.length - 1)) * Math.PI * 2 + 0.3;
        const radius = Math.min(centerX, centerY) * 0.65;
        targetX = centerX + Math.cos(angle) * radius;
        targetY = centerY + Math.sin(angle) * (radius * 0.75);
      }

      return {
        ...n,
        currentX: targetX,
        currentY: targetY,
        baseX: targetX,
        baseY: targetY,
        floatPhase: Math.random() * Math.PI * 2,
        radius: n.type === "query" ? 18 : 14
      };
    });

    this.startAnimation();
  }

  startAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const render = () => {
      this.time += 0.02;
      this.draw();
      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  }

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Subtle Background Radial Ring Grids
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.ctx.save();
    this.ctx.strokeStyle = "rgba(51, 65, 85, 0.25)";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 6]);

    for (let r = 70; r <= 220; r += 70) {
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // 2. Update floating physics
    for (const node of this.nodes) {
      if (node.type === "query") {
        node.currentX = node.baseX + Math.sin(this.time + node.floatPhase) * 3;
        node.currentY = node.baseY + Math.cos(this.time * 0.8 + node.floatPhase) * 3;
      } else {
        node.currentX = node.baseX + Math.cos(this.time + node.floatPhase) * 5;
        node.currentY = node.baseY + Math.sin(this.time * 0.9 + node.floatPhase) * 5;
      }
    }

    const queryNode = this.nodes.find(n => n.type === "query") || this.nodes[0];

    // 3. Draw Connecting Cosine Similarity Edges
    if (queryNode) {
      for (const node of this.nodes) {
        if (node === queryNode) continue;

        const isHighlighted = this.hoveredNode === node;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(queryNode.currentX, queryNode.currentY);
        this.ctx.lineTo(node.currentX, node.currentY);
        this.ctx.strokeStyle = isHighlighted ? "rgba(99, 102, 241, 0.9)" : "rgba(99, 102, 241, 0.25)";
        this.ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        this.ctx.stroke();

        // Animated Traveling Pulse along the line
        const edgeProgress = (this.time * 0.8 + (node.sim || 0.5) * 5) % 1;
        const pulseX = queryNode.currentX + (node.currentX - queryNode.currentX) * edgeProgress;
        const pulseY = queryNode.currentY + (node.currentY - queryNode.currentY) * edgeProgress;

        this.ctx.beginPath();
        this.ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = isHighlighted ? "#818cf8" : "rgba(99, 102, 241, 0.7)";
        this.ctx.fill();

        // Cosine similarity badge along midpoint
        const midX = (queryNode.currentX + node.currentX) / 2;
        const midY = (queryNode.currentY + node.currentY) / 2;

        this.ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        this.ctx.strokeStyle = "rgba(51, 65, 85, 0.6)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.roundRect(midX - 22, midY - 10, 44, 20, 4);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.font = "500 10px 'JetBrains Mono', monospace";
        this.ctx.fillStyle = isHighlighted ? "#a7f3d0" : "#94a3b8";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`${Math.round((node.sim || 0.95) * 100)}%`, midX, midY);

        this.ctx.restore();
      }
    }

    // 4. Draw Nodes
    for (const node of this.nodes) {
      const isHovered = this.hoveredNode === node;
      const isQuery = node.type === "query";

      this.ctx.save();

      // Outer glow pulse ring
      if (isQuery || isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(node.currentX, node.currentY, node.radius + (Math.sin(this.time * 3) + 1) * 3, 0, Math.PI * 2);
        this.ctx.strokeStyle = isQuery ? "rgba(99, 102, 241, 0.4)" : "rgba(16, 185, 129, 0.5)";
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      }

      // Core Node circle
      this.ctx.beginPath();
      this.ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color || (isQuery ? "#6366f1" : "#10b981");
      this.ctx.shadowColor = node.color || "#6366f1";
      this.ctx.shadowBlur = isHovered ? 16 : 8;
      this.ctx.fill();
      this.ctx.restore();

      // Node Label
      this.ctx.save();
      this.ctx.font = isQuery ? "600 11px 'Inter', sans-serif" : "500 10px 'Inter', sans-serif";
      this.ctx.fillStyle = isHovered ? "#ffffff" : "#cbd5e1";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(node.label.replace(/^Chunk #\d+:\s*/, ""), node.currentX, node.currentY + node.radius + 6);
      this.ctx.restore();
    }

    // 5. Draw Tooltip for Hovered Node
    if (this.hoveredNode) {
      this.drawTooltip(this.hoveredNode);
    }
  }

  drawTooltip(node) {
    const isQuery = node.type === "query";
    const title = isQuery ? "Semantic Anchor Vector" : `Retrieved Chunk (Top-K Node)`;
    const desc = node.label;
    const metric = isQuery ? "Dim: 1536 (Float32)" : `Cosine Similarity: ${((node.sim || 0.95) * 100).toFixed(1)}%`;

    const padding = 10;
    const boxWidth = 240;
    const boxHeight = 64;
    let tooltipX = node.currentX + 18;
    let tooltipY = node.currentY - boxHeight / 2;

    if (tooltipX + boxWidth > this.width) {
      tooltipX = node.currentX - boxWidth - 18;
    }

    this.ctx.save();
    this.ctx.fillStyle = "rgba(13, 17, 23, 0.95)";
    this.ctx.strokeStyle = "rgba(99, 102, 241, 0.6)";
    this.ctx.lineWidth = 1;
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    this.ctx.shadowBlur = 12;

    this.ctx.beginPath();
    this.ctx.roundRect(tooltipX, tooltipY, boxWidth, boxHeight, 6);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.shadowBlur = 0;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";

    this.ctx.font = "600 11px 'Inter', sans-serif";
    this.ctx.fillStyle = "#818cf8";
    this.ctx.fillText(title, tooltipX + padding, tooltipY + padding);

    this.ctx.font = "400 10px 'Inter', sans-serif";
    this.ctx.fillStyle = "#e2e8f0";
    this.ctx.fillText(desc.length > 34 ? desc.slice(0, 32) + "..." : desc, tooltipX + padding, tooltipY + padding + 16);

    this.ctx.font = "500 10px 'JetBrains Mono', monospace";
    this.ctx.fillStyle = "#34d399";
    this.ctx.fillText(metric, tooltipX + padding, tooltipY + padding + 32);

    this.ctx.restore();
  }
}
