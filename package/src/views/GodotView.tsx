import React from 'react';
import {Image} from 'react-native';
import type {HostComponent} from 'react-native';

import GodotViewNativeComponent from '../specs/GodotViewNativeComponent';

import {GodotViewApi} from './api';
import type {GodotViewProps} from './types';
import {GodotViewNativeId} from './GodotViewNativeId';

const NativeGodotView: HostComponent<GodotViewProps> = GodotViewNativeComponent;

export class GodotView extends React.Component<GodotViewProps> {
  constructor(props: GodotViewProps) {
    super(props);
    this._nativeID = GodotViewNativeId.current++;
    const {source, scene, onMessage} = props;

    if (source) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source as any).uri);
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

  private _nativeID: number;

  public get nativeId() {
    return this._nativeID;
  }

  componentDidUpdate(prevProps: GodotViewProps) {
    const {source, scene, onMessage} = this.props;

    if (source !== prevProps.source) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "source", Image.resolveAssetSource(source as any).uri);
    }

    if (scene !== prevProps.scene) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "scene", scene);
    }

    if (prevProps.onMessage === undefined && onMessage !== undefined) {
      assertGodotViewApi();
      GodotViewApi.setJsiProperty(this._nativeID, "onMessage", onMessage);
    }
  }

  /**
   * Pause the Godot view.
   */
  public pause() {
    assertGodotViewApi();
    GodotViewApi.pause(this._nativeID);
  }

  /**
   * Resume the Godot view.
   */
  public resume() {
    assertGodotViewApi();
    GodotViewApi.resume(this._nativeID);
  }

  /**
   * Resume the Godot view.
   */
  public getRoot() {
    assertGodotViewApi();
    return GodotViewApi.getRoot(this._nativeID);
  }

  /**
   * Start drawing the Godot view.
   */
  public static startDrawing() {
    assertGodotViewApi();
    GodotViewApi.startDrawing();
  }

  /**
   * Stop drawing the Godot view
   */
  public static stopDrawing() {
    assertGodotViewApi();
    GodotViewApi.stopDrawing();
  }

  /**
   * Emit a message to the Godot view.
   */
  public emitMessage(message: any) {
    assertGodotViewApi();
    GodotViewApi.emitMessage(this._nativeID, message);
  }

  /**
   * Check if the Godot view is ready.
   */
  public get isReady(): boolean {
    assertGodotViewApi();
    return GodotViewApi.isReady(this._nativeID);
  }

  render() {
    const {debug = false, ...viewProps} = this.props;
    return (
      <NativeGodotView
        collapsable={false}
        nativeID={`${this._nativeID}`}
        {...viewProps}
      />
    );
  }
}

const assertGodotViewApi = () => {
  if (
    GodotViewApi === null ||
    GodotViewApi.setJsiProperty === null ||
    GodotViewApi.pause === null ||
    GodotViewApi.resume === null ||
    GodotViewApi.getRoot === null ||
    GodotViewApi.isReady === null
  ) {
    throw Error('Godot View API was not found.');
  }
};