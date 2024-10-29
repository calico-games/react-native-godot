"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Godot = require("./Godot");
Object.keys(_Godot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Godot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Godot[key];
    }
  });
});
var _GodotView = require("./GodotView");
Object.keys(_GodotView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GodotView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GodotView[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
//# sourceMappingURL=index.js.map