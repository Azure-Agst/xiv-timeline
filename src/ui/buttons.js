export function initButtons(tl) {
  // This is just gonna be a long-ass functional bit, sorry

  var container = document.getElementById("ctrl-buttons");
  if (!container) {
    console.warn("No button control div found!");
    return;
  }

  // Zoom out
  let zoomOutBtn = document.createElement("button");
  container.appendChild(zoomOutBtn);
  zoomOutBtn.textContent = "0.5x";
  zoomOutBtn.addEventListener("click", () => tl.zoomOut());

  // Zoom in
  let zoomInBtn = document.createElement("button");
  zoomInBtn.textContent = "2x";
  zoomInBtn.addEventListener("click", () => tl.zoomIn());
  container.appendChild(zoomInBtn);

  // Spacer
  container.insertAdjacentHTML("beforeend", " | ");

  // Back
  let bigBackBtn = document.createElement("button");
  bigBackBtn.textContent = "-2.5s";
  bigBackBtn.addEventListener("click", () => tl.rewind(2.5));
  container.appendChild(bigBackBtn);
  let midBackBtn = document.createElement("button");
  midBackBtn.textContent = "-1s";
  midBackBtn.addEventListener("click", () => tl.rewind(1));
  container.appendChild(midBackBtn);
  let smBackBtn = document.createElement("button");
  smBackBtn.textContent = "-0.1s";
  smBackBtn.addEventListener("click", () => tl.rewind(0.1));
  container.appendChild(smBackBtn);

  // Spacer
  container.insertAdjacentHTML("beforeend", " ");

  // Forward
  let smFwdBtn = document.createElement("button");
  smFwdBtn.textContent = "+0.1s";
  smFwdBtn.addEventListener("click", () => tl.seek(0.1));
  container.appendChild(smFwdBtn);
  let midFwdBtn = document.createElement("button");
  midFwdBtn.textContent = "+1s";
  midFwdBtn.addEventListener("click", () => tl.seek(1));
  container.appendChild(midFwdBtn);
  let bigFwdBtn = document.createElement("button");
  bigFwdBtn.textContent = "+2.5s";
  bigFwdBtn.addEventListener("click", () => tl.seek(2.5));
  container.appendChild(bigFwdBtn);

  // Spacer
  container.insertAdjacentHTML("beforeend", " | ");

  // Reset
  let resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => tl.clear());
  container.appendChild(resetBtn);

  // Pop
  let popBtn = document.createElement("button");
  popBtn.textContent = "Pop";
  popBtn.addEventListener("click", () => tl.pop());
  container.appendChild(popBtn);

  // Pop
  let eBtn = document.createElement("button");
  eBtn.textContent = "Export";
  eBtn.addEventListener("click", () => tl.export());
  container.appendChild(eBtn);
}
