import { pxPerSec } from "../consts";
import { hoveredItem, mouseX, mouseY } from "../state";
import { moveDb } from "../xivdata";

export class CanvTooltip {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw() {
    // Don't draw if not hovered
    if (!hoveredItem) return;

    // Get move data
    var move = moveDb[hoveredItem];

    // Format text strings
    var lines = [move.name, "Recast: " + move.recast + "s"];
    var mLineWidth = -1;
    var mLineHeight = 12 * lines.length;
    lines.forEach((l) => {
      mLineWidth = Math.max(mLineWidth, this.ctx.measureText(l).width);
    });

    // Calculate formatting
    const vSpacing = 4;
    const hPadding = 8;
    const vPadding = 4;
    const hTotal = mLineWidth + hPadding * 2;
    const vTotal = mLineHeight + vPadding * 2;

    // Draw a box
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    this.ctx.fillRect(
      mouseX - hTotal / 2,
      mouseY - vTotal - vSpacing,
      mLineWidth + hPadding * 2,
      mLineHeight + vPadding * 2
    );
    this.ctx.strokeRect(
      mouseX - hTotal / 2,
      mouseY - vTotal - vSpacing,
      mLineWidth + hPadding * 2,
      mLineHeight + vPadding * 2
    );

    // Add text
    this.ctx.font = "12px monospace";
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000000";
    for (var i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], mouseX, mouseY - vTotal + i * 12);
    }
  }
}
