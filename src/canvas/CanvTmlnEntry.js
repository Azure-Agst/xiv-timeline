import { colors, prePullSec, pxPerSec } from "../consts.js";
import { secToAbsPx, secToRelPx } from "../utils.js";
import { setHoveredItem, mouseX, mouseY, width, tlCursor } from "../state.js";
import { moveDb } from "../xivdata/index.js";

var _entryCounter = 0;
export class CanvTmlnEntry {
  constructor(tl, move, start) {
    this.tl = tl;
    this.id = _entryCounter++;
    this.move = move;
    this.start = start;
    this.dbData = moveDb[move];
    this.img = null;
  }

  drawBars() {
    if (this.dbData.type === "Weaponskill" || this.dbData.type === "Spell") {
      // draw cast bar
      this.tl.ctx.fillStyle = colors.cast;
      this.tl.ctx.fillRect(
        secToAbsPx(this.start),
        this.tl.y + 8 + 50,
        secToRelPx(this.dbData.cast),
        18
      );
      // draw recast bar
      this.tl.ctx.fillStyle = colors.recast;
      this.tl.ctx.fillRect(
        secToAbsPx(this.start),
        this.tl.y + 26 + 50,
        secToRelPx(this.dbData.recast),
        18
      );
    }
  }

  drawIcon() {
    // determine x and y offsets
    var x_offset = secToAbsPx(this.start) - 20;
    if (this.dbData.type === "Weaponskill" || this.dbData.type === "Spell") {
      var y_offset = this.tl.y + 5 + 50;
    } else if (this.dbData.type === "Ability") {
      var y_offset = this.tl.y + 5;
    }

    // define draw function
    // done this way to handle img loading
    const iconSize = 40;
    var _drawIcon = () => {
      this.tl.ctx.drawImage(this.img, x_offset, y_offset, iconSize, iconSize);
    };

    // add image
    if (this.img == null) {
      this.img = new Image();
      this.img.src = this.dbData.icon;
      this.img.onload = () => _drawIcon();
    } else {
      _drawIcon();
    }

    // while we're here, check for hovered
    if (
      x_offset < mouseX &&
      mouseX < x_offset + iconSize &&
      y_offset < mouseY &&
      mouseY < y_offset + iconSize
    ) {
      setHoveredItem(this.move);
    }
  }
}
