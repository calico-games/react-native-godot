"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGodotRef = exports.Godot = void 0;
var _react = _interopRequireWildcard(require("react"));
var _GodotView = require("./GodotView");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const useGodotRef = () => (0, _react.useRef)(null);
exports.useGodotRef = useGodotRef;
const Godot = exports.Godot = /*#__PURE__*/(0, _react.forwardRef)(({
  style,
  onLayout: _onLayout,
  source,
  debug,
  onMessage,
  ...props
}, forwardedRef) => {
  const innerRef = useGodotRef();
  const ref = useCombinedRefs(forwardedRef, innerRef);
  return /*#__PURE__*/_react.default.createElement(_GodotView.GodotView, _extends({
    ref: ref,
    style: style,
    onLayout: _onLayout,
    source: source,
    debug: debug,
    onMessage: onMessage
  }, props));
});

/**
 * Combines a list of refs into a single ref. This can be used to provide
 * both a forwarded ref and an internal ref keeping the same functionality
 * on both of the refs.
 * @param refs Array of refs to combine
 * @returns A single ref that can be used in a ref prop.
 */
const useCombinedRefs = (...refs) => {
  const targetRef = _react.default.useRef(null);
  (0, _react.useEffect)(() => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }
    });
  }, [refs]);
  return targetRef;
};
//# sourceMappingURL=Godot.js.map