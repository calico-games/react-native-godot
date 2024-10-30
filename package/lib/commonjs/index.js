"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _NativeGodotModule = _interopRequireDefault(require("./specs/NativeGodotModule"));
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_NativeGodotModule.default.install();
//# sourceMappingURL=index.js.map