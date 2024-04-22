import { secToAbsPx } from "../utils.js";
import { CanvTmlnEntry } from "./CanvTmlnEntry.js";
import { exportTimeline } from "../saving.js";
import {
  width,
  setWidth,
  height,
  scale,
  setScale,
  tlCursor,
  setTlCursor,
} from "../state.js";

export class CanvTimeline {
  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.ctx = ctx;
    this.moves = [];
  }

  zoomIn() {
    setScale(scale * 2);
  }

  zoomOut() {
    setScale(scale / 2);
  }

  seek(i = 1) {
    setTlCursor(tlCursor + i);
    var autoscroll = secToAbsPx(tlCursor) - wrapper.offsetWidth / 2;
    if (autoscroll > 0) wrapper.scrollLeft = autoscroll;
  }

  rewind(i = 1) {
    setTlCursor(tlCursor - i);
    var autoscroll = secToAbsPx(tlCursor) - wrapper.offsetWidth / 2;
    if (autoscroll < width) wrapper.scrollLeft = autoscroll;
  }

  draw() {
    // first pass, draw bars
    for (var i = 0; i < this.moves.length; i++) {
      this.moves[i].drawBars();
    }

    // second pass, draw icons
    for (var i = 0; i < this.moves.length; i++) {
      this.moves[i].drawIcon();
    }

    // draw cursor
    this.ctx.strokeStyle = "#00000080";
    this.ctx.beginPath();
    this.ctx.moveTo(secToAbsPx(tlCursor), 30);
    this.ctx.lineTo(secToAbsPx(tlCursor), height);
    this.ctx.stroke();
  }

  append(move, start) {
    // handle undef start
    if (!start) start = tlCursor;

    // make entry
    var entry = new CanvTmlnEntry(this, move, start);
    this.moves.push(entry);

    // handle the undefined call
    if (start == undefined) {
      var last = this.moves.slice(-1)[0];
      start = last.start;
      if (last.type != "Ability") start += last.recast;
    }
  }

  maxWidth() {
    var lastMove = this.moves[this.moves.length - 1];
    if (!lastMove) return 0;
    if (lastMove.dbData.type == "Ability") {
      lastMove = this.moves[this.moves.length - 2];
      if (!lastMove) return 0;
    }
    //console.log(lastMove);
    return secToAbsPx(
      lastMove.start +
        Math.max(lastMove.dbData.cast, lastMove.dbData.recast) +
        3
    );
  }

  pop() {
    this.moves.pop();
  }

  clear() {
    while (this.moves.length != 0) {
      this.pop();
    }
  }

  export() {
    exportTimeline(this);
  }

  remove(entry) {
    for (var i = 0; i < this.moves.length; i++) {
      if (this.moves[i].id == entry.id) {
        this.moves.splice(i, 1);
        return;
      }
    }
    console.error("Not found!", entry);
  }
}
