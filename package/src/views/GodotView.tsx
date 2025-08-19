import React from 'react';
import {Image, requireNativeComponent} from 'react-native';
import type {HostComponent, ImageSourcePropType} from 'react-native';

import type {GodotViewProps} from './types';
import {GodotViewNativeId} from './GodotViewNativeId';

const NativeGodotView: HostComponent<GodotViewProps> = requireNativeComponent('GodotView');

export class GodotView extends React.Component<GodotViewProps> {
  static GodotViewApi = global.GodotViewApi;
  private _nativeID: number;
  
  constructor(props: GodotViewProps) {
    super(props);
    this._nativeID = GodotViewNativeId.current++;
  }

  private resolveAssetSource(source: ImageSourcePropType | string | number | undefined): string | null {
    if (!source) return null;
    
    // Handle different source types
    if (typeof source === 'string') {
      // Direct URI string
      return source;
    } else if (typeof source === 'number') {
      // Expo/React Native require() returns a number for assets
      try {
        const resolvedSource = Image.resolveAssetSource(source);
        return resolvedSource?.uri || null;
      } catch (error) {
        console.error('[react-native-godot] Error resolving asset source:', error);
        return null;
      }
    } else if (source && typeof source === 'object' && 'uri' in source) {
      // Asset object with uri property
      return (source as any).uri;
    }
    
    console.error('[react-native-godot] Could not resolve asset source:', source, typeof source);
    return null;
  }

  public get nativeId() {
    return this._nativeID;
  }

  componentDidMount() {
    const {source, scene, onMessage} = this.props;

    if (source) {
      assertGodotViewApi();
      const sourceUri = this.resolveAssetSource(source);
      if (sourceUri) {
        console.log('[react-native-godot] Setting source URI:', sourceUri);
        GodotViewApi.setJsiProperty(this._nativeID, "source", sourceUri);
      }
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

  componentDidUpdate(prevProps: GodotViewProps) {
    const {source, scene, onMessage} = this.props;

    if (source !== prevProps.source) {
      assertGodotViewApi();
      const sourceUri = this.resolveAssetSource(source);
      if (sourceUri) {
        GodotViewApi.setJsiProperty(this._nativeID, "source", sourceUri);
      }
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
    global.GodotViewApi === undefined ||
    global.GodotViewApi === null ||
    global.GodotViewApi.setJsiProperty === null ||
    global.GodotViewApi.pause === null ||
    global.GodotViewApi.resume === null ||
    global.GodotViewApi.getRoot === null ||
    global.GodotViewApi.isReady === null
  ) {
    throw Error('Godot View API was not found.');
  }
};