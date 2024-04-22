import { colors, prePullSec, pxPerSec } from "../consts.js";
import { secToAbsPx } from "../utils.js";
import { width, scale } from "../state.js";

export class CanvRuler {
  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
  }

  draw() {
    // fill top
    this.ctx.fillStyle = colors["ruler"];
    this.ctx.fillRect(0, 0, width, this.h);

    //add tick marks
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors["ticks"];
    this.ctx.font = "13px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = colors["ticks"];
    for (var sec = -prePullSec; sec < width / pxPerSec / scale; sec += 1) {
      var x_p = secToAbsPx(sec);
      this.ctx.moveTo(x_p, 0);
      this.ctx.lineTo(x_p, 6);
      if (sec >= 0 && sec % 5 == 0) {
        this.ctx.fillText(sec, x_p, 23);
      }
    }
    this.ctx.stroke();
  }
}
