import { dpr, prePullSec } from "./consts";
import { absPxToSec } from "./utils";

// window state
export var selectedClass = "none";
export const setSelectedClass = (v) => (selectedClass = v);
export var playerLevel = 90;
export const setPlayerLevel = (v) =>
  (playerLevel = Math.max(1, Math.min(v, 90)));

// canvas state
export var height = window.innerHeight * dpr;
export const setHeight = (v) => (height = v);
export var width = window.innerWidth * dpr;
export const setWidth = (v) => (width = v);

// timeline state
export var tlCursor = 0;
export const setTlCursor = (v) =>
  (tlCursor = Math.max(-prePullSec, Math.min(v, absPxToSec(width))));
export var scale = 1;
export const setScale = (v) => (scale = Math.max(0.25, Math.min(v, 4)));
export var hoveredItem = undefined;
export const setHoveredItem = (v) => (hoveredItem = v);

// hover state
export var mouseX = 0;
export const setMouseX = (v) => (mouseX = v);
export var mouseY = 0;
export const setMouseY = (v) => (mouseY = v);
