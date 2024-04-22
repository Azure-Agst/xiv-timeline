import { colors, prePullSec } from "../consts.js";
import { secToRelPx } from "../utils.js";
import { width } from "../state.js";

export class CanvBkg {
  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
  }

  draw() {
    // simple fill
    this.ctx.fillStyle = colors["bkg"];
    this.ctx.fillRect(this.x, this.y, width, this.h);

    // fill pre-pull
    this.ctx.fillStyle = colors["ppBkg"];
    this.ctx.fillRect(this.x, this.y, secToRelPx(prePullSec), this.h);
  }
}
