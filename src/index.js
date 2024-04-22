import { register_mouse_events } from "./ui/mouse.js";
import { height, setHeight, setHoveredItem } from "./state.js";
import { importTimeline } from "./saving.js";
import { initButtons } from "./ui/buttons.js";
import { moveDb } from "./xivdata/index.js";
import { resizeCanvas } from "./utils.js";
import { ctx, wrapper } from "./dom.js";
import { dpr } from "./consts.js";
import { init_header } from "./ui/header.js";
import { classList, btn_div } from "./dom.js";
import {
  CanvBkg,
  CanvRuler,
  CanvTimeline,
  CanvTooltip,
} from "./canvas/index.js";

// TODO: make this dynamic?
setHeight(160);
console.log(moveDb);

// init layers
var l_bkg = new CanvBkg(ctx, 0, 0, height);
var l_ruler = new CanvRuler(ctx, 0, 0, 30);
var l_timeline = new CanvTimeline(ctx, 0, 30, 30);
var l_tip = new CanvTooltip(ctx);

// check if we have tl query arg
const urlParams = new URLSearchParams(window.location.search);
const importData = urlParams.get("tl");
if (importData) {
  importTimeline(l_timeline, importData);
}

// init interativity events
if (classList) init_header(l_timeline);
if (btn_div) initButtons(l_timeline);
register_mouse_events(ctx.canvas);

// main draw function
export const draw = () => {
  // resize canvas and width
  resizeCanvas(l_timeline);

  // reset hovered item
  setHoveredItem(undefined);

  // ensure scaling
  ctx.scale(dpr, dpr);

  // draw main stuff
  l_bkg.draw();
  l_ruler.draw();
  l_timeline.draw();
  l_tip.draw();

  // rescale
  ctx.scale(1 / dpr, 1 / dpr);

  // register draw as repaint function
  window.requestAnimationFrame(draw);
};

// reset position and first draw
wrapper.scrollLeft = 0;
window.requestAnimationFrame(draw);
