"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GodotView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _GodotViewNativeComponent = _interopRequireDefault(require("../specs/GodotViewNativeComponent"));
var _api = require("./api");
var _GodotViewNativeId = require("./GodotViewNativeId");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NativeGodotView = _GodotViewNativeComponent.default;
class GodotView extends _react.default.Component {
  constructor(props) {
    super(props);
    this._nativeID = _GodotViewNativeId.GodotViewNativeId.current++;
    const {
      source,
      scene,
      onMessage
    } = props;
    if (source) {
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "source", _reactNative.Image.resolveAssetSource(source).uri);
    }
    if (scene) {
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "scene", scene);
    }
    if (onMessage) {
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "onMessage", onMessage);
    }
  }
  get nativeId() {
    return this._nativeID;
  }
  componentDidUpdate(prevProps) {
    const {
      source,
      scene,
      onMessage
    } = this.props;
    if (source !== prevProps.source) {
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "source", _reactNative.Image.resolveAssetSource(source).uri);
    }
    if (scene !== prevProps.scene) {
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "scene", scene);
    }
    if (prevProps.onMessage === undefined && onMessage !== undefined) {
      console.log('Setting onMessage');
      assertGodotViewApi();
      _api.GodotViewApi.setJsiProperty(this._nativeID, "onMessage", onMessage);
    }
  }

  /**
   * Pause the Godot view.
   */
  pause() {
    assertGodotViewApi();
    _api.GodotViewApi.pause(this._nativeID);
  }

  /**
   * Resume the Godot view.
   */
  resume() {
    assertGodotViewApi();
    _api.GodotViewApi.resume(this._nativeID);
  }

  /**
   * Start drawing the Godot view.
   */
  static startDrawing() {
    assertGodotViewApi();
    _api.GodotViewApi.startDrawing();
  }

  /**
   * Stop drawing the Godot view
   */
  static stopDrawing() {
    assertGodotViewApi();
    _api.GodotViewApi.stopDrawing();
  }

  /**
   * Emit a message to the Godot view.
   */
  emitMessage(message) {
    assertGodotViewApi();
    _api.GodotViewApi.emitMessage(this._nativeID, message);
  }
  render() {
    const {
      debug = false,
      ...viewProps
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(NativeGodotView, _extends({
      collapsable: false,
      nativeID: `${this._nativeID}`
    }, viewProps));
  }
}
exports.GodotView = GodotView;
const assertGodotViewApi = () => {
  if (_api.GodotViewApi === null || _api.GodotViewApi.setJsiProperty === null || _api.GodotViewApi.pause === null || _api.GodotViewApi.resume === null) {
    throw Error('Godot View Api was not found.');
  }
};
//# sourceMappingURL=GodotView.js.map