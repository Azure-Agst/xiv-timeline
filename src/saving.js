import { setSelectedClass } from "./state.js";
import { moveDb } from "./xivdata/index.js";
import { classList } from "./dom.js";
import { prePullSec } from "./consts.js";

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

export function toByteArray(str) {
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

export function exportTimeline(tl) {
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

export function importTimeline(tl, encoded) {
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
