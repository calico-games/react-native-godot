function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
      onMessage
    } = props;
    if (source) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source).uri);
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
      onMessage
    } = this.props;
    if (source !== prevProps.source) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source).uri);
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
      nativeID: `${this._nativeID}`,
      debug: debug
    }, viewProps));
  }
}
const assertGodotViewApi = () => {
  if (GodotViewApi === null || GodotViewApi.setJsiProperty === null || GodotViewApi.pause === null || GodotViewApi.resume === null) {
    throw Error('Godot View Api was not found.');
  }
};
//# sourceMappingURL=GodotView.js.map