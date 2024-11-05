"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _views = require("./views");
Object.keys(_views).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _views[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _views[key];
    }
  });
});
var _GodotProvider = require("./GodotProvider");
Object.keys(_GodotProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GodotProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GodotProvider[key];
    }
  });
});
//# sourceMappingURL=index.js.map