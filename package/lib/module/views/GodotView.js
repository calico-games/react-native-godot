function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Image } from 'react-native';
import GodotViewNativeComponent from '../specs/GodotViewNativeComponent';
import { GodotViewApi } from './api';
import { GodotViewNativeId } from './GodotViewNativeId';
const NativeGodotView = GodotViewNativeComponent;
export class GodotView extends React.Component {
  constructor(props) {
    super(props);
    this._nativeID = GodotViewNativeId.current++;
    const {
      source,
      scene,
      onMessage
    } = props;
    if (source) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source).uri);
    }
    if (scene) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "scene", scene);
    }
    if (onMessage) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "onMessage", onMessage);
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
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source).uri);
    }
    if (scene !== prevProps.scene) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "scene", scene);
    }
    if (prevProps.onMessage === undefined && onMessage !== undefined) {
      console.log('Setting onMessage');
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "onMessage", onMessage);
    }
  }

  /**
   * Pause the Godot view.
   */
  pause() {
    assertGodotViewApi();
    GodotViewApi.pause(this._nativeID);
  }

  /**
   * Resume the Godot view.
   */
  resume() {
    assertGodotViewApi();
    GodotViewApi.resume(this._nativeID);
  }

  /**
   * Start drawing the Godot view.
   */
  static startDrawing() {
    assertGodotViewApi();
    GodotViewApi.startDrawing();
  }

  /**
   * Stop drawing the Godot view
   */
  static stopDrawing() {
    assertGodotViewApi();
    GodotViewApi.stopDrawing();
  }

  /**
   * Emit a message to the Godot view.
   */
  emitMessage(message) {
    assertGodotViewApi();
    GodotViewApi.emitMessage(this._nativeID, message);
  }
  render() {
    const {
      debug = false,
      ...viewProps
    } = this.props;
    return /*#__PURE__*/React.createElement(NativeGodotView, _extends({
      collapsable: false,
      nativeID: `${this._nativeID}`
    }, viewProps));
  }
}
const assertGodotViewApi = () => {
  if (GodotViewApi === null || GodotViewApi.setJsiProperty === null || GodotViewApi.pause === null || GodotViewApi.resume === null) {
    throw Error('Godot View Api was not found.');
  }
};
//# sourceMappingURL=GodotView.js.map