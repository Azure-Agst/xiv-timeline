import { pxPerSec, prePullSec } from "./consts.js";
import { scale, width, setWidth, height } from "./state.js";
import { wrapper, canvas } from "./dom.js";

export const secToAbsPx = (sec) => (sec + prePullSec) * pxPerSec * scale;
export const secToRelPx = (sec) => sec * pxPerSec * scale;
export const absPxToSec = (px) => px / pxPerSec / scale - prePullSec;
export const relPxToSec = (px) => px / pxPerSec / scale;

export const resizeCanvas = (tl) => {
  // height
  canvas.height = height;

  // width
  var w = Math.max(tl.maxWidth(), wrapper.clientWidth);
  canvas.width = w;
  setWidth(w);
};
