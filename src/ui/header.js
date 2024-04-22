import { classList, level } from "../dom";
import { classMap } from "../xivdata";
import { btn_div } from "../dom";
import { moveDb } from "../xivdata";
import {
  selectedClass,
  setSelectedClass,
  playerLevel,
  setPlayerLevel,
} from "../state";

export function init_header(tl) {
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
