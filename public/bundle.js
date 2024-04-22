
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var xivtimeline = (function (exports) {
  'use strict';

  const colors = {
    bkg: "#f0f0f0",
    ppBkg: "#00000010",
    ruler: "#8d8d8d",
    ticks: "#242424",
    movebar: "#242424",
    cast: "#f2433a44",
    recast: "#3af2e944",
  };

  const pxPerSec = 50;
  const prePullSec = 4;
  const dpr = window.devicePixelRatio;

  const canvas = document.getElementById("canvas");
  const wrapper$1 = document.getElementById("wrapper");
  const classList = document.getElementById("classList");
  const btn_div = document.getElementById("icon-buttons");
  const level = document.getElementById("level");
  const ctx = canvas.getContext("2d");

  const secToAbsPx = (sec) => (sec + prePullSec) * pxPerSec * scale;
  const secToRelPx = (sec) => sec * pxPerSec * scale;
  const absPxToSec = (px) => px / pxPerSec / scale - prePullSec;

  const resizeCanvas = (tl) => {
    // height
    canvas.height = height;

    // width
    var w = Math.max(tl.maxWidth(), wrapper$1.clientWidth);
    canvas.width = w;
    setWidth(w);
  };

  // window state
  var selectedClass = "none";
  const setSelectedClass = (v) => (selectedClass = v);
  var playerLevel = 90;
  const setPlayerLevel = (v) =>
    (playerLevel = Math.max(1, Math.min(v, 90)));

  // canvas state
  var height = window.innerHeight * dpr;
  const setHeight = (v) => (height = v);
  var width = window.innerWidth * dpr;
  const setWidth = (v) => (width = v);

  // timeline state
  var tlCursor = 0;
  const setTlCursor = (v) =>
    (tlCursor = Math.max(-prePullSec, Math.min(v, absPxToSec(width))));
  var scale = 1;
  const setScale = (v) => (scale = Math.max(0.25, Math.min(v, 4)));
  var hoveredItem = undefined;
  const setHoveredItem = (v) => (hoveredItem = v);

  // hover state
  var mouseX = 0;
  const setMouseX = (v) => (mouseX = v);
  var mouseY = 0;
  const setMouseY = (v) => (mouseY = v);

  function mouse_callback(e) {
    setMouseX(e.offsetX);
    setMouseY(e.offsetY);
    //console.log(mouseX, mouseY);
  }

  function register_mouse_events(canvas) {
    canvas.addEventListener("mousemove", mouse_callback);
  }

  var rpr_m = {
  	"7546": {
  	name: "True North",
  	icon: "icon/reaper/true_north.png",
  	"class": "rpr",
  	level: 50,
  	type: "Ability",
  	cast: 0,
  	recast: 45
  },
  	"7863": {
  	name: "Leg Sweep",
  	icon: "icon/reaper/leg_sweep.png",
  	"class": "rpr",
  	level: 10,
  	type: "Ability",
  	cast: 0,
  	recast: 40
  },
  	"21306": {
  	name: "Second Wind",
  	icon: "icon/reaper/second_wind.png",
  	"class": "rpr",
  	level: 8,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"24378": {
  	name: "Shadow of Death",
  	icon: "icon/reaper/shadow_of_death.png",
  	"class": "rpr",
  	level: 10,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"24379": {
  	name: "Whorl of Death",
  	icon: "icon/reaper/whorl_of_death.png",
  	"class": "rpr",
  	level: 35,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"24387": {
  	name: "Soulsow",
  	icon: "icon/reaper/soulsow.png",
  	"class": "rpr",
  	level: 82,
  	type: "Spell",
  	cast: 0,
  	recast: 0
  },
  	"24405": {
  	name: "Arcane Circle",
  	icon: "icon/reaper/arcane_circle.png",
  	"class": "rpr",
  	level: 72,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"27810": {
  	name: "Blood Stalk",
  	icon: "icon/reaper/blood_stalk.png",
  	"class": "rpr",
  	level: 50,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"27811": {
  	name: "Unveiled Gibbet",
  	icon: "icon/reaper/unveiled_gibbet.png",
  	"class": "rpr",
  	level: 70,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"27812": {
  	name: "Unveiled Gallows",
  	icon: "icon/reaper/unveiled_gallows.png",
  	"class": "rpr",
  	level: 70,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"27814": {
  	name: "Gluttony",
  	icon: "icon/reaper/gluttony.png",
  	"class": "rpr",
  	level: 76,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  },
  	"27816": {
  	name: "Lemure's Scythe",
  	icon: "icon/reaper/lemures_scythe.png",
  	"class": "rpr",
  	level: 86,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"27818": {
  	name: "Hell's Egress",
  	icon: "icon/reaper/hells_egress.png",
  	"class": "rpr",
  	level: 20,
  	type: "Ability",
  	cast: 0,
  	recast: 20
  },
  	"27821": {
  	name: "Enshroud",
  	icon: "icon/reaper/enshroud.png",
  	"class": "rpr",
  	level: 80,
  	type: "Ability",
  	cast: 0,
  	recast: 15
  },
  	"28322": {
  	name: "Arm's Length",
  	icon: "icon/reaper/arms_length.png",
  	"class": "rpr",
  	level: 32,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"28324": {
  	name: "Feint",
  	icon: "icon/reaper/feint.png",
  	"class": "rpr",
  	level: 22,
  	type: "Ability",
  	cast: 0,
  	recast: 90
  },
  	"29546": {
  	name: "Plentiful Harvest",
  	icon: "icon/reaper/plentiful_harvest.png",
  	"class": "rpr",
  	level: 88,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"29547": {
  	name: "Grim Swathe",
  	icon: "icon/reaper/grim_swathe.png",
  	"class": "rpr",
  	level: 55,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"29548": {
  	name: "Lemure's Slice",
  	icon: "icon/reaper/lemures_slice.png",
  	"class": "rpr",
  	level: 86,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"29550": {
  	name: "Hell's Ingress",
  	icon: "icon/reaper/hells_ingress.png",
  	"class": "rpr",
  	level: 20,
  	type: "Ability",
  	cast: 0,
  	recast: 20
  },
  	"29551": {
  	name: "Regress",
  	icon: "icon/reaper/regress.png",
  	"class": "rpr",
  	level: 74,
  	type: "Ability",
  	cast: 0,
  	recast: 10
  },
  	"31145": {
  	name: "Soul Slice",
  	icon: "icon/reaper/soul_slice.png",
  	"class": "rpr",
  	level: 60,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"31381": {
  	name: "Harvest Moon",
  	icon: "icon/reaper/harvest_moon.png",
  	"class": "rpr",
  	level: 82,
  	type: "Spell",
  	cast: 0,
  	recast: 2.5
  },
  	"31386": {
  	name: "Soul Scythe",
  	icon: "icon/reaper/soul_scythe.png",
  	"class": "rpr",
  	level: 65,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"31789": {
  	name: "Spinning Scythe",
  	icon: "icon/reaper/spinning_scythe.png",
  	"class": "rpr",
  	level: 25,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"31790": {
  	name: "Nightmare Scythe",
  	icon: "icon/reaper/nightmare_scythe.png",
  	"class": "rpr",
  	level: 45,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"31793": {
  	name: "Arcane Crest",
  	icon: "icon/reaper/arcane_crest.png",
  	"class": "rpr",
  	level: 40,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"32561": {
  	name: "Slice",
  	icon: "icon/reaper/slice.png",
  	"class": "rpr",
  	level: 1,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32562": {
  	name: "Waxing Slice",
  	icon: "icon/reaper/waxing_slice.png",
  	"class": "rpr",
  	level: 5,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32563": {
  	name: "Infernal Slice",
  	icon: "icon/reaper/infernal_slice.png",
  	"class": "rpr",
  	level: 30,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32564": {
  	name: "Gibbet",
  	icon: "icon/reaper/gibbet.png",
  	"class": "rpr",
  	level: 70,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32565": {
  	name: "Gallows",
  	icon: "icon/reaper/gallows.png",
  	"class": "rpr",
  	level: 70,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32567": {
  	name: "Void Reaping",
  	icon: "icon/reaper/void_reaping.png",
  	"class": "rpr",
  	level: 80,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 1.5
  },
  	"32568": {
  	name: "Cross Reaping",
  	icon: "icon/reaper/cross_reaping.png",
  	"class": "rpr",
  	level: 80,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 1.5
  },
  	"32569": {
  	name: "Grim Reaping",
  	icon: "icon/reaper/grim_reaping.png",
  	"class": "rpr",
  	level: 80,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 1.5
  },
  	"32570": {
  	name: "Communio",
  	icon: "icon/reaper/communio.png",
  	"class": "rpr",
  	level: 90,
  	type: "Spell",
  	cast: 1.3,
  	recast: 2.5
  },
  	"32940": {
  	name: "Harpe",
  	icon: "icon/reaper/harpe.png",
  	"class": "rpr",
  	level: 15,
  	type: "Spell",
  	cast: 1.3,
  	recast: 2.5
  },
  	"33013": {
  	name: "Bloodbath",
  	icon: "icon/reaper/bloodbath.png",
  	"class": "rpr",
  	level: 12,
  	type: "Ability",
  	cast: 0,
  	recast: 90
  },
  	"34786": {
  	name: "Guillotine",
  	icon: "icon/reaper/guillotine.png",
  	"class": "rpr",
  	level: 70,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  }
  };

  var war_m = {
  	"3551": {
  	name: "Raw Intuition",
  	icon: "icon/warrior/raw_intuition.png",
  	"class": "war",
  	level: 56,
  	type: "Ability",
  	cast: 0,
  	recast: 25
  },
  	"3552": {
  	name: "Equilibrium",
  	icon: "icon/warrior/equilibrium.png",
  	"class": "war",
  	level: 58,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  },
  	"8768": {
  	name: "Inner Release",
  	icon: "icon/warrior/inner_release.png",
  	"class": "war",
  	level: 70,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  },
  	"9460": {
  	name: "Inner Beast",
  	icon: "icon/warrior/inner_beast.png",
  	"class": "war",
  	level: 35,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"17426": {
  	name: "Shirk",
  	icon: "icon/warrior/shirk.png",
  	"class": "war",
  	level: 48,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"17669": {
  	name: "Low Blow",
  	icon: "icon/warrior/low_blow.png",
  	"class": "war",
  	level: 12,
  	type: "Ability",
  	cast: 0,
  	recast: 25
  },
  	"17695": {
  	name: "Decimate",
  	icon: "icon/warrior/decimate.png",
  	"class": "war",
  	level: 60,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"17696": {
  	name: "Inner Chaos",
  	icon: "icon/warrior/inner_chaos.png",
  	"class": "war",
  	level: 80,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"17698": {
  	name: "Infuriate",
  	icon: "icon/warrior/infuriate.png",
  	"class": "war",
  	level: 50,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  },
  	"17699": {
  	name: "Shake It Off",
  	icon: "icon/warrior/shake_it_off.png",
  	"class": "war",
  	level: 68,
  	type: "Ability",
  	cast: 0,
  	recast: 90
  },
  	"17889": {
  	name: "Nascent Flash",
  	icon: "icon/warrior/nascent_flash.png",
  	"class": "war",
  	level: 76,
  	type: "Ability",
  	cast: 0,
  	recast: 25
  },
  	"18904": {
  	name: "Mythril Tempest",
  	icon: "icon/warrior/mythril_tempest.png",
  	"class": "war",
  	level: 40,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"18905": {
  	name: "Steel Cyclone",
  	icon: "icon/warrior/steel_cyclone.png",
  	"class": "war",
  	level: 45,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"22785": {
  	name: "Upheaval",
  	icon: "icon/warrior/upheaval.png",
  	"class": "war",
  	level: 64,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"25084": {
  	name: "Interject",
  	icon: "icon/warrior/interject.png",
  	"class": "war",
  	level: 18,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"26829": {
  	name: "Provoke",
  	icon: "icon/warrior/provoke.png",
  	"class": "war",
  	level: 15,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"28322": {
  	name: "Arm's Length",
  	icon: "icon/warrior/arms_length.png",
  	"class": "war",
  	level: 32,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"28323": {
  	name: "Reprisal",
  	icon: "icon/warrior/reprisal.png",
  	"class": "war",
  	level: 22,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  },
  	"29078": {
  	name: "Fell Cleave",
  	icon: "icon/warrior/fell_cleave.png",
  	"class": "war",
  	level: 54,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"29079": {
  	name: "Onslaught",
  	icon: "icon/warrior/onslaught.png",
  	"class": "war",
  	level: 62,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"29080": {
  	name: "Orogeny",
  	icon: "icon/warrior/orogeny.png",
  	"class": "war",
  	level: 86,
  	type: "Ability",
  	cast: 0,
  	recast: 30
  },
  	"29082": {
  	name: "Bloodwhetting",
  	icon: "icon/warrior/bloodwhetting.png",
  	"class": "war",
  	level: 82,
  	type: "Ability",
  	cast: 0,
  	recast: 25
  },
  	"29084": {
  	name: "Primal Rend",
  	icon: "icon/warrior/primal_rend.png",
  	"class": "war",
  	level: 90,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"29173": {
  	name: "Overpower",
  	icon: "icon/warrior/overpower.png",
  	"class": "war",
  	level: 10,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"29293": {
  	name: "Defiance",
  	icon: "icon/warrior/defiance.png",
  	"class": "war",
  	level: 10,
  	type: "Ability",
  	cast: 0,
  	recast: 2
  },
  	"29296": {
  	name: "Vengeance",
  	icon: "icon/warrior/vengeance.png",
  	"class": "war",
  	level: 38,
  	type: "Ability",
  	cast: 0,
  	recast: 120
  },
  	"29297": {
  	name: "Thrill of Battle",
  	icon: "icon/warrior/thrill_of_battle.png",
  	"class": "war",
  	level: 30,
  	type: "Ability",
  	cast: 0,
  	recast: 90
  },
  	"29298": {
  	name: "Holmgang",
  	icon: "icon/warrior/holmgang.png",
  	"class": "war",
  	level: 42,
  	type: "Ability",
  	cast: 0,
  	recast: 240
  },
  	"29736": {
  	name: "Chaotic Cyclone",
  	icon: "icon/warrior/chaotic_cyclone.png",
  	"class": "war",
  	level: 72,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"29768": {
  	name: "Storm's Path",
  	icon: "icon/warrior/storms_path.png",
  	"class": "war",
  	level: 26,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"30895": {
  	name: "Tomahawk",
  	icon: "icon/warrior/tomahawk.png",
  	"class": "war",
  	level: 15,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"30911": {
  	name: "Rampart",
  	icon: "icon/warrior/rampart.png",
  	"class": "war",
  	level: 8,
  	type: "Ability",
  	cast: 0,
  	recast: 90
  },
  	"30916": {
  	name: "Heavy Swing",
  	icon: "icon/warrior/heavy_swing.png",
  	"class": "war",
  	level: 1,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"30917": {
  	name: "Maim",
  	icon: "icon/warrior/maim.png",
  	"class": "war",
  	level: 4,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"30918": {
  	name: "Storm's Eye",
  	icon: "icon/warrior/storms_eye.png",
  	"class": "war",
  	level: 50,
  	type: "Weaponskill",
  	cast: 0,
  	recast: 2.5
  },
  	"32066": {
  	name: "Release Defiance",
  	icon: "icon/warrior/release_defiance.png",
  	"class": "war",
  	level: 10,
  	type: "Ability",
  	cast: 0,
  	recast: 1
  },
  	"34155": {
  	name: "Berserk",
  	icon: "icon/warrior/berserk.png",
  	"class": "war",
  	level: 6,
  	type: "Ability",
  	cast: 0,
  	recast: 60
  }
  };

  const classMap = {
    rpr: {
      name: "Reaper",
      actions: [
        32561, 32562, 24378, 32940, 29550, 27818, 31789, 32563, 24379, 31793,
        31790, 27810, 29547, 31145, 31386, 32564, 32565, 34786, 27811, 27812,
        24405, 29551, 27814, 27821, 32567, 32568, 32569, 24387, 31381, 29548,
        27816, 29546, 32570, 21306, 7863, 33013, 28324, 28322, 7546,
      ],
    },
    war: {
      name: "Warrior",
      actions: [
        30916, 30917, 34155, 29173, 29293, 32066, 30895, 29768, 29297, 9460,
        29296, 18904, 29298, 18905, 30918, 17698, 29078, 3551, 3552, 17695, 29079,
        22785, 17699, 8768, 29736, 17889, 17696, 29082, 29080, 29084, 30911,
        17669, 26829, 25084, 28323, 28322, 17426,
      ],
    },
  };

  const moveDb = {
    ...rpr_m,
    ...war_m,
  };

  // Originally I was encoding JSON directly, but the URL params ballooned in
  // size so I instead spent however many hours designing an over-enginneered
  // solution using Uint16Array and a custom Base64 impl. Much smaller now! :)

  // Based off of https://github.com/beatgammit/base64-js/blob/master/index.js

  // Support decoding URL-safe base64 strings, as Node.js does.
  // See: https://en.wikipedia.org/wiki/Base64#URL_applications
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  function fromByteArray(u8arr) {
    var lookup = [];
    var len = u8arr.length;
    var extraBytes = len % 3;
    var parts = [];

    // prep lookup
    for (var i = 0, l = code.length; i < l; ++i) {
      lookup[i] = code[i];
    }

    // iterate over most of chunks
    console.log("m:", len - extraBytes);
    for (var i = 0; i < len - extraBytes; i += 3) {
      var tri =
        ((u8arr[i] << 16) & 0xff0000) +
        ((u8arr[i + 1] << 8) & 0xff00) +
        (u8arr[i + 2] & 0xff);
      parts.push(
        lookup[(tri >> 18) & 0x3f] +
          lookup[(tri >> 12) & 0x3f] +
          lookup[(tri >> 6) & 0x3f] +
          lookup[tri & 0x3f]
      );
    }

    // handle remainder
    var tmp;
    if (extraBytes === 1) {
      tmp = u8arr[len - 1];
      parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + "==");
    } else if (extraBytes === 2) {
      tmp = (u8arr[len - 2] << 8) + u8arr[len - 1];
      parts.push(
        lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 0x3f] +
          lookup[(tmp << 2) & 0x3f] +
          "="
      );
    }

    return parts.join("");
  }

  function toByteArray(str) {
    var revLookup = {};
    var tmp;

    // Prep reverse lookup
    for (var i = 0, l = code.length; i < l; ++i) {
      revLookup[code.charCodeAt(i)] = i;
    }

    // Calculate lengths
    var validLen = str.indexOf("=");
    if (validLen === -1) validLen = str.length;
    var plLen = validLen === str.length ? 0 : 4 - (validLen % 4);

    // Allocate array
    var dataLen = ((validLen + plLen) * 3) / 4 - plLen;
    var dataArr = new Uint8Array(dataLen);

    // Process data in groups of 4 chars
    var tmp;
    var curByte = 0;
    var tlen = plLen > 0 ? validLen - 4 : validLen;
    for (var i = 0; i < tlen; i += 4) {
      tmp =
        (revLookup[str.charCodeAt(i)] << 18) |
        (revLookup[str.charCodeAt(i + 1)] << 12) |
        (revLookup[str.charCodeAt(i + 2)] << 6) |
        revLookup[str.charCodeAt(i + 3)];
      dataArr[curByte++] = (tmp >> 16) & 0xff;
      dataArr[curByte++] = (tmp >> 8) & 0xff;
      dataArr[curByte++] = tmp & 0xff;
    }

    // handle remainder
    if (plLen === 2) {
      tmp =
        (revLookup[str.charCodeAt(i)] << 2) |
        (revLookup[str.charCodeAt(i + 1)] >> 4);
      dataArr[curByte++] = tmp & 0xff;
    } else if (plLen === 1) {
      tmp =
        (revLookup[str.charCodeAt(i)] << 10) |
        (revLookup[str.charCodeAt(i + 1)] << 4) |
        (revLookup[str.charCodeAt(i + 2)] >> 2);
      dataArr[curByte++] = (tmp >> 8) & 0xff;
      dataArr[curByte++] = tmp & 0xff;
    }

    return dataArr;
  }

  function exportTimeline(tl) {
    console.warn("weeeee");

    // reserve our int array
    // two uint16's needed per item; one for ID, one for start time
    var arrLen = tl.moves.length * 2;
    var i16arr = new Uint16Array(arrLen);

    // iterate over moves and add them to array
    for (var i = 0; i < tl.moves.length; i++) {
      var item = tl.moves[i];
      console.log(item);
      i16arr[i * 2] = parseInt(item.move);
      i16arr[i * 2 + 1] = Math.round((item.start + prePullSec) * 10); // in 100ms increments
    }
    console.log(i16arr);

    // resize to u8 for encoding
    var u8arr = new Uint8Array(i16arr.buffer);
    var encoded = fromByteArray(u8arr);

    // let user know
    alert(window.location.origin + "/?tl=" + encoded);
  }

  function importTimeline(tl, encoded) {
    if (encoded.length == 0) return;

    try {
      // decode from base64
      var u8arr = toByteArray(encoded);

      // size up to i16 array
      var i16arr = new Uint16Array(u8arr.buffer);
      console.log(i16arr);
    } catch (e) {
      alert("Failed to decode data!");
      throw e;
    }

    // get class from first item and set
    var firstId = i16arr[0];
    var firstMove = moveDb[firstId];
    if (classList) {
      classList.value = firstMove.class;
      setSelectedClass(firstMove.class);
    }

    // import items
    for (var i = 0; i < i16arr.length; i += 2) {
      var uIntId = i16arr[i];
      var uIntStart = i16arr[i + 1] / 10; // from ms to sec
      uIntStart -= prePullSec; // subtract prepull sec
      tl.append(uIntId, uIntStart);
    }
  }

  function initButtons(tl) {
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

  function init_header(tl) {
    // add children
    for (var [k, v] of Object.entries(classMap)) {
      var opt = document.createElement("option");
      opt.value = k;
      opt.innerHTML = v["name"];
      classList.appendChild(opt);
    }

    // todo change this:
    classList.value = selectedClass;
    level.value = playerLevel;
    init_icon_buttons(tl);

    // remember this
    var oldClass = classList.value;

    // register event listeners
    classList.addEventListener("change", (e) => {
      var res = confirm(
        "WARNING!\nChanging your class will reset the timeline! Is this ok?"
      );
      if (!res) {
        classList.value = oldClass;
        return;
      } else {
        tl.clear();
        oldClass = classList.value;
        setSelectedClass(classList.value);
        init_icon_buttons(tl);
      }
    });
    level.addEventListener("change", (e) => {
      setPlayerLevel(level.value);
      init_icon_buttons(tl);
    });
  }

  function init_icon_buttons(tl) {
    // reset div
    btn_div.innerHTML = "";

    // Only do it when class is selected
    if (selectedClass == "none") return;
    console.log(selectedClass);

    // iterate over classlist move ids
    var classData = classMap[selectedClass];
    for (var actionId of classData.actions) {
      // lookup data
      var action = moveDb[actionId];

      // only if high enough level...
      if (action.level > playerLevel) continue;

      // make image
      var icon = new Image();
      icon.src = action.icon;
      icon.id = actionId;
      icon.classList.add("button");

      // define listener
      icon.addEventListener("click", function () {
        tl.append(this.id);
      });

      // append
      btn_div.appendChild(icon);
    }
  }

  class CanvBkg {
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

  class CanvRuler {
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

  var _entryCounter = 0;
  class CanvTmlnEntry {
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

  class CanvTimeline {
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

  class CanvTooltip {
    constructor(ctx) {
      this.ctx = ctx;
    }

    draw() {
      // Don't draw if not hovered
      if (!hoveredItem) return;

      // Get move data
      var move = moveDb[hoveredItem];

      // Format text strings
      var lines = [move.name, "Recast: " + move.recast + "s"];
      var mLineWidth = -1;
      var mLineHeight = 12 * lines.length;
      lines.forEach((l) => {
        mLineWidth = Math.max(mLineWidth, this.ctx.measureText(l).width);
      });

      // Calculate formatting
      const vSpacing = 4;
      const hPadding = 8;
      const vPadding = 4;
      const hTotal = mLineWidth + hPadding * 2;
      const vTotal = mLineHeight + vPadding * 2;

      // Draw a box
      this.ctx.fillStyle = "#ffffff";
      this.ctx.strokeStyle = "#000000";
      this.ctx.lineWidth = 1;
      this.ctx.fillRect(
        mouseX - hTotal / 2,
        mouseY - vTotal - vSpacing,
        mLineWidth + hPadding * 2,
        mLineHeight + vPadding * 2
      );
      this.ctx.strokeRect(
        mouseX - hTotal / 2,
        mouseY - vTotal - vSpacing,
        mLineWidth + hPadding * 2,
        mLineHeight + vPadding * 2
      );

      // Add text
      this.ctx.font = "12px monospace";
      this.ctx.textBaseline = "top";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#000000";
      for (var i = 0; i < lines.length; i++) {
        this.ctx.fillText(lines[i], mouseX, mouseY - vTotal + i * 12);
      }
    }
  }

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
  const draw = () => {
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
  wrapper$1.scrollLeft = 0;
  window.requestAnimationFrame(draw);

  exports.draw = draw;

  return exports;

})({});
//# sourceMappingURL=bundle.js.map
