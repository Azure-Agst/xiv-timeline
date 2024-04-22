import { mouseX, setMouseX, mouseY, setMouseY } from "../state";

function mouse_callback(e) {
  setMouseX(e.offsetX);
  setMouseY(e.offsetY);
  //console.log(mouseX, mouseY);
}

export function register_mouse_events(canvas) {
  canvas.addEventListener("mousemove", mouse_callback);
}
