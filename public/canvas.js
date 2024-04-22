// constants lol
const canvas = document.getElementById("canvas");
const wrapper = document.getElementById("canvas-wrapper");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
var height = window.innerHeight * dpr;
var width = window.innerWidth * dpr;
var scale = 1;
const pxPerSec = 50;
const prePullSec = 4;

const zoomIn = () => {
  scale *= 2;
  draw();
};
const zoomOut = () => {
  scale /= 2;
  draw();
};

// constants
const colors = {
  bkg: "#f0f0f0",
  ruler: "#8d8d8d",
  ticks: "#242424",
  movebar: "#242424",
  cast: "#f2433a44",
  recast: "#3af2e944",
};

// database
const moveDb = {
  rpr_slice: {
    name: "Slice",
    icon: "icon/reaper/slice.png",
    level: 1,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_waxing_slice: {
    name: "Waxing Slice",
    icon: "icon/reaper/waxing_slice.png",
    level: 5,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_shadow_of_death: {
    name: "Shadow of Death",
    icon: "icon/reaper/shadow_of_death.png",
    level: 10,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_harpe: {
    name: "Harpe",
    icon: "icon/reaper/harpe.png",
    level: 15,
    type: "Spell",
    cast: 1.3,
    recast: 2.5,
  },
  rpr_hells_ingress: {
    name: "Hell's Ingress",
    icon: "icon/reaper/hells_ingress.png",
    level: 20,
    type: "Ability",
    cast: 0,
    recast: 20,
  },
  rpr_hells_egress: {
    name: "Hell's Egress",
    icon: "icon/reaper/hells_egress.png",
    level: 20,
    type: "Ability",
    cast: 0,
    recast: 20,
  },
  rpr_spinning_scythe: {
    name: "Spinning Scythe",
    icon: "icon/reaper/spinning_scythe.png",
    level: 25,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_infernal_slice: {
    name: "Infernal Slice",
    icon: "icon/reaper/infernal_slice.png",
    level: 30,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_whorl_of_death: {
    name: "Whorl of Death",
    icon: "icon/reaper/whorl_of_death.png",
    level: 35,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_arcane_crest: {
    name: "Arcane Crest",
    icon: "icon/reaper/arcane_crest.png",
    level: 40,
    type: "Ability",
    cast: 0,
    recast: 30,
  },
  rpr_nightmare_scythe: {
    name: "Nightmare Scythe",
    icon: "icon/reaper/nightmare_scythe.png",
    level: 45,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_blood_stalk: {
    name: "Blood Stalk",
    icon: "icon/reaper/blood_stalk.png",
    level: 50,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_grim_swathe: {
    name: "Grim Swathe",
    icon: "icon/reaper/grim_swathe.png",
    level: 55,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_soul_slice: {
    name: "Soul Slice",
    icon: "icon/reaper/soul_slice.png",
    level: 60,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_soul_scythe: {
    name: "Soul Scythe",
    icon: "icon/reaper/soul_scythe.png",
    level: 65,
    type: "Weaponskill",
    cast: 0,
    recast: 30,
  },
  rpr_gibbet: {
    name: "Gibbet",
    icon: "icon/reaper/gibbet.png",
    level: 70,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_gallows: {
    name: "Gallows",
    icon: "icon/reaper/gallows.png",
    level: 70,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_guillotine: {
    name: "Guillotine",
    icon: "icon/reaper/guillotine.png",
    level: 70,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_unveiled_gibbet: {
    name: "Unveiled Gibbet",
    icon: "icon/reaper/unveiled_gibbet.png",
    level: 70,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_unveiled_gallows: {
    name: "Unveiled Gallows",
    icon: "icon/reaper/unveiled_gallows.png",
    level: 70,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_arcane_circle: {
    name: "Arcane Circle",
    icon: "icon/reaper/arcane_circle.png",
    level: 72,
    type: "Ability",
    cast: 0,
    recast: 120,
  },
  rpr_regress: {
    name: "Regress",
    icon: "icon/reaper/regress.png",
    level: 74,
    type: "Ability",
    cast: 0,
    recast: 10,
  },
  rpr_gluttony: {
    name: "Gluttony",
    icon: "icon/reaper/gluttony.png",
    level: 76,
    type: "Ability",
    cast: 0,
    recast: 60,
  },
  rpr_enshroud: {
    name: "Enshroud",
    icon: "icon/reaper/enshroud.png",
    level: 80,
    type: "Ability",
    cast: 0,
    recast: 15,
  },
  rpr_void_reaping: {
    name: "Void Reaping",
    icon: "icon/reaper/void_reaping.png",
    level: 80,
    type: "Weaponskill",
    cast: 0,
    recast: 1.5,
  },
  rpr_cross_reaping: {
    name: "Cross Reaping",
    icon: "icon/reaper/cross_reaping.png",
    level: 80,
    type: "Weaponskill",
    cast: 0,
    recast: 1.5,
  },
  rpr_grim_reaping: {
    name: "Grim Reaping",
    icon: "icon/reaper/grim_reaping.png",
    level: 80,
    type: "Weaponskill",
    cast: 0,
    recast: 1.5,
  },
  rpr_soulsow: {
    name: "Soulsow",
    icon: "icon/reaper/soulsow.png",
    level: 82,
    type: "Spell",
    // cast: 5,
    // recast: 2.5,
    cast: 0,
    recast: 0,
  },
  rpr_harvest_moon: {
    name: "Harvest Moon",
    icon: "icon/reaper/harvest_moon.png",
    level: 82,
    type: "Spell",
    cast: 0,
    recast: 2.5,
  },
  rpr_lemures_slice: {
    name: "Lemure's Slice",
    icon: "icon/reaper/lemures_slice.png",
    level: 86,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_lemures_scythe: {
    name: "Lemure's Scythe",
    icon: "icon/reaper/lemures_scythe.png",
    level: 86,
    type: "Ability",
    cast: 0,
    recast: 1,
  },
  rpr_plentiful_harvest: {
    name: "Plentiful Harvest",
    icon: "icon/reaper/plentiful_harvest.png",
    level: 88,
    type: "Weaponskill",
    cast: 0,
    recast: 2.5,
  },
  rpr_communio: {
    name: "Communio",
    icon: "icon/reaper/communio.png",
    level: 90,
    type: "Spell",
    cast: 1.3,
    recast: 2.5,
  },
  rpr_second_wind: {
    name: "Second Wind",
    icon: "icon/reaper/second_wind.png",
    level: 8,
    type: "Ability",
    cast: 0,
    recast: 120,
  },
  rpr_leg_sweep: {
    name: "Leg Sweep",
    icon: "icon/reaper/leg_sweep.png",
    level: 10,
    type: "Ability",
    cast: 0,
    recast: 40,
  },
  rpr_bloodbath: {
    name: "Bloodbath",
    icon: "icon/reaper/bloodbath.png",
    level: 12,
    type: "Ability",
    cast: 0,
    recast: 90,
  },
  rpr_feint: {
    name: "Feint",
    icon: "icon/reaper/feint.png",
    level: 22,
    type: "Ability",
    cast: 0,
    recast: 90,
  },
  rpr_arms_length: {
    name: "Arm's Length",
    icon: "icon/reaper/arms_length.png",
    level: 32,
    type: "Ability",
    cast: 0,
    recast: 120,
  },
  rpr_true_north: {
    name: "True North",
    icon: "icon/reaper/true_north.png",
    level: 50,
    type: "Ability",
    cast: 0,
    recast: 45,
  },
};

// "private" state w/ getters/setters
// - emulating react's useState
var _mouseX = 0;
var _mouseY = 0;
var _mouseHovered = false;
var getMouseX = () => _mouseX;
var setMouseX = (value) => {
  _mouseX = value;
  draw();
};
var getMouseY = () => _mouseY;
var setMouseY = (value) => {
  _mouseY = value;
  draw();
};
var getMouseHovered = () => _mouseHovered;
var setMouseHovered = (value) => {
  _mouseHovered = value;
  draw();
};

// utilities
const secToAbsPx = (sec) => (sec + prePullSec) * pxPerSec * scale;
const secToRelPx = (sec) => sec * pxPerSec * scale;
const absPxToSec = (px) => px / pxPerSec / scale - prePullSec;
const relPxToSec = (px) => px / pxPerSec / scale;

// uh other shit
// example move {id: 1, start: 0, name: "tomahawk"}
var _entryCounter = 0;
class CanvTimeline {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.moves = [];
    this.cursor = 0;
  }

  seek(i = 1) {
    var max = absPxToSec(width);
    this.cursor += i;
    if (this.cursor > max) this.cursor = max;
    var autoscroll = secToAbsPx(this.cursor) - wrapper.offsetWidth / 2;
    if (autoscroll > 0) wrapper.scrollLeft = autoscroll;
    draw();
  }

  rewind(i = 1) {
    this.cursor -= i;
    if (this.cursor < -3) this.cursor = -prePullSec;
    var autoscroll = secToAbsPx(this.cursor) - wrapper.offsetWidth / 2;
    if (autoscroll < width) wrapper.scrollLeft = autoscroll;
    draw();
  }

  draw() {
    // draw icons
    for (var i = 0; i < this.moves.length; i++) {
      this.moves[i].draw();
    }

    // draw cursor
    this.ctx.strokeStyle = "#00000080";
    this.ctx.beginPath();
    this.ctx.moveTo(secToAbsPx(this.cursor), 30);
    this.ctx.lineTo(secToAbsPx(this.cursor), height);
    this.ctx.stroke();
  }

  append(move, start) {
    var entry = new TimelineEntry(this, move, start);
    this.moves.push(entry);

    // handle the undefined call
    if (start == undefined) {
      var last = this.moves.slice(-1)[0];
      start = last.start;
      if (last.type != "Ability") start += last.recast;
    }

    // grow the canvas if needed
    var lastMove = tlState.moves.slice(-1)[0];
    width = secToAbsPx(lastMove.start + 10);
    draw();
  }

  pop() {
    this.moves.pop();
    draw();
  }

  clear() {
    this.moves = [];
    draw();
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
class TimelineEntry {
  constructor(tl, move, start) {
    this.tl = tl;
    this.id = _entryCounter++;
    this.move = move;
    this.start = start;
    this.dbData = moveDb[move];
    this.img = null;
  }

  draw() {
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
      // draw icon
      var y_offset = this.tl.y + 5 + 50;
    } else if (this.dbData.type === "Ability") {
      var y_offset = this.tl.y + 5;
    }

    // draw icon
    var drawIcon = () => {
      this.tl.ctx.drawImage(
        this.img,
        secToAbsPx(this.start) - 20,
        y_offset,
        40,
        40
      );
    };
    if (this.img == null) {
      this.img = new Image();
      this.img.src = this.dbData.icon;
      this.img.onload = () => drawIcon();
    } else {
      drawIcon();
    }
  }
}

class CanvBkg {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    // simple fill
    ctx.fillStyle = colors["bkg"];
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // fill pre-pull
    ctx.fillStyle = "#00000020";
    ctx.fillRect(this.x, this.y, secToRelPx(prePullSec), this.h);
  }
}

class CanvRuler {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    // fill top
    this.ctx.fillStyle = colors["ruler"];
    this.ctx.fillRect(0, 0, width, 30);

    //add tick marks
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors["ticks"];
    this.ctx.font = "13px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = colors["ticks"];
    for (var sec = -prePullSec; sec < width / pxPerSec; sec += 1) {
      var x_p = secToAbsPx(sec);
      this.ctx.moveTo(x_p, 0);
      this.ctx.lineTo(x_p, 6);
      if (sec >= 0 && sec % 5 == 0) {
        ctx.fillText(sec, x_p, 23);
      }
    }
    this.ctx.stroke();
  }
}

// global state
var tlState = null;

// layer definitions
const draw = () => {
  // resize
  ctx.canvas.width = width;
  console.log(width);
  // draw main stuff
  ctx.scale(dpr, dpr);
  new CanvBkg(ctx, 0, 0, width, ctx.canvas.clientHeight).draw();
  new CanvRuler(ctx, 0, 0, width, ctx.canvas.clientHeight).draw();
  tlState.draw();
  ctx.scale(1 / dpr, 1 / dpr);
};

const init = () => {
  // canvas
  ctx.canvas.width = width;
  ctx.canvas.height = 250;
  tlState = new CanvTimeline(ctx, 0, 30, width, 30);

  // hardcoded for now
  tlState.append("rpr_soulsow", -2.2);
  tlState.append("rpr_harpe", -1.3);
  tlState.append("rpr_shadow_of_death", 1.2);
  tlState.append("rpr_arcane_circle", 1.7);
  tlState.append("rpr_soul_slice", 3.7);
  tlState.append("rpr_soul_slice", 6.2);
  tlState.append("rpr_plentiful_harvest", 8.7);
  tlState.append("rpr_enshroud", 9.3);
  tlState.append("rpr_void_reaping", 11.2);
  tlState.append("rpr_cross_reaping", 12.7);
  tlState.append("rpr_lemures_slice", 13.2);
  tlState.append("rpr_void_reaping", 14.2);
  tlState.append("rpr_cross_reaping", 15.7);
  tlState.append("rpr_lemures_slice", 16.2);
  tlState.append("rpr_communio", 17.2);
  tlState.append("rpr_gluttony", 18.5);
  tlState.append("rpr_gibbet", 19.7);
  tlState.append("rpr_gallows", 22.2);
  tlState.append("rpr_unveiled_gibbet", 22.7);
  tlState.append("rpr_gibbet", 24.7);

  // buttons
  const btn_div = document.getElementById("icon-buttons");
  moves = Object.entries(moveDb).filter(([k, _]) => k.startsWith("rpr_"));
  for (var [k, v] of moves) {
    icon = new Image();
    icon.src = v.icon;
    icon.id = k;
    icon.classList.add("button");
    icon.addEventListener("click", function () {
      console.log(this.id);
      tlState.append(this.id);
    });
    btn_div.appendChild(icon);
  }

  // change
  console.log("this is a change 2");

  // draw
  wrapper.scrollLeft = 0;
  draw();
};

init();
