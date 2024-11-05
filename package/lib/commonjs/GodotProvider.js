"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGodot = exports.GodotProvider = exports.GodotContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _NativeGodotModule = _interopRequireDefault(require("./specs/NativeGodotModule"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// THIS FILE IS GENERATED. DO NOT EDIT.

const GodotContext = exports.GodotContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const GodotProvider = ({
  children
}) => {
  const [AABB, setAABB] = (0, _react.useState)(null);
  const [Basis, setBasis] = (0, _react.useState)(null);
  const [Color, setColor] = (0, _react.useState)(null);
  const [Plane, setPlane] = (0, _react.useState)(null);
  const [Projection, setProjection] = (0, _react.useState)(null);
  const [Quaternion, setQuaternion] = (0, _react.useState)(null);
  const [Rect2, setRect2] = (0, _react.useState)(null);
  const [Rect2i, setRect2i] = (0, _react.useState)(null);
  const [Transform2D, setTransform2D] = (0, _react.useState)(null);
  const [Transform3D, setTransform3D] = (0, _react.useState)(null);
  const [Vector2, setVector2] = (0, _react.useState)(null);
  const [Vector2i, setVector2i] = (0, _react.useState)(null);
  const [Vector3, setVector3] = (0, _react.useState)(null);
  const [Vector3i, setVector3i] = (0, _react.useState)(null);
  const [Vector4, setVector4] = (0, _react.useState)(null);
  const [Vector4i, setVector4i] = (0, _react.useState)(null);
  const [isInitialized, setIsInitialized] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const initialize = () => {
      _NativeGodotModule.default.install();
      if (typeof global.AABB === 'function') {
        setAABB(() => global.AABB);
      }
      if (typeof global.Basis === 'function') {
        setBasis(() => global.Basis);
      }
      if (typeof global.Color === 'function') {
        setColor(() => global.Color);
      }
      if (typeof global.Plane === 'function') {
        setPlane(() => global.Plane);
      }
      if (typeof global.Projection === 'function') {
        setProjection(() => global.Projection);
      }
      if (typeof global.Quaternion === 'function') {
        setQuaternion(() => global.Quaternion);
      }
      if (typeof global.Rect2 === 'function') {
        setRect2(() => global.Rect2);
      }
      if (typeof global.Rect2i === 'function') {
        setRect2i(() => global.Rect2i);
      }
      if (typeof global.Transform2D === 'function') {
        setTransform2D(() => global.Transform2D);
      }
      if (typeof global.Transform3D === 'function') {
        setTransform3D(() => global.Transform3D);
      }
      if (typeof global.Vector2 === 'function') {
        setVector2(() => global.Vector2);
      }
      if (typeof global.Vector2i === 'function') {
        setVector2i(() => global.Vector2i);
      }
      if (typeof global.Vector3 === 'function') {
        setVector3(() => global.Vector3);
      }
      if (typeof global.Vector3i === 'function') {
        setVector3i(() => global.Vector3i);
      }
      if (typeof global.Vector4 === 'function') {
        setVector4(() => global.Vector4);
      }
      if (typeof global.Vector4i === 'function') {
        setVector4i(() => global.Vector4i);
      }
      if (typeof global.AABB === 'function' && typeof global.Basis === 'function' && typeof global.Color === 'function' && typeof global.Plane === 'function' && typeof global.Projection === 'function' && typeof global.Quaternion === 'function' && typeof global.Rect2 === 'function' && typeof global.Rect2i === 'function' && typeof global.Transform2D === 'function' && typeof global.Transform3D === 'function' && typeof global.Vector2 === 'function' && typeof global.Vector2i === 'function' && typeof global.Vector3 === 'function' && typeof global.Vector3i === 'function' && typeof global.Vector4 === 'function' && typeof global.Vector4i === 'function') {
        console.info('[react-native-godot] Godot initialized');
        setIsInitialized(true);
      }
    };
    initialize();
  }, []);
  return /*#__PURE__*/_react.default.createElement(GodotContext.Provider, {
    value: {
      AABB,
      Basis,
      Color,
      Plane,
      Projection,
      Quaternion,
      Rect2,
      Rect2i,
      Transform2D,
      Transform3D,
      Vector2,
      Vector2i,
      Vector3,
      Vector3i,
      Vector4,
      Vector4i,
      isInitialized
    }
  }, children);
};
exports.GodotProvider = GodotProvider;
const useGodot = () => {
  const context = (0, _react.useContext)(GodotContext);
  if (context === undefined) {
    throw new Error('useGodot must be used within a GodotProvider');
  }
  return context;
};
exports.useGodot = useGodot;
//# sourceMappingURL=GodotProvider.js.map