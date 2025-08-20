import React, {useMemo, useRef, useEffect} from 'react';
import {Image, requireNativeComponent} from 'react-native';
import type {HostComponent, ImageSourcePropType} from 'react-native';

import type {GodotViewProps} from './types';
import {GodotViewNativeId} from './GodotViewNativeId';
import {Node} from '../types';

const NativeGodotView: HostComponent<GodotViewProps> = requireNativeComponent('GodotView');

export interface GodotViewRef {
  pause(): void;
  resume(): void;
  getRoot(): Node;
  isReady: boolean;
  emitMessage(message: any): void;
}

export const useGodotRef = () => useRef<GodotViewRef>(null);

export interface GodotViewComponentProps extends GodotViewProps {
  ref?: React.Ref<GodotViewRef>;
}

const GodotViewComponent = React.forwardRef<GodotViewRef, GodotViewProps>(
  (props, ref) => {
    const nativeId = useMemo(() => {
      return GodotViewNativeId.current++;
    }, []);
    
    // Create the API object that will be exposed through the ref
    const apiObject = {
      pause: () => {
        assertGodotViewApi();
        GodotViewApi.pause(nativeId);
      },
      resume: () => {
        assertGodotViewApi();
        GodotViewApi.resume(nativeId);
      },
      getRoot: (): Node => {
        assertGodotViewApi();
        const root = GodotViewApi.getRoot(nativeId);
        if (!root) {
          throw new Error("Root node is not available");
        }
        return root;
      },
      get isReady(): boolean {
        assertGodotViewApi();
        return GodotViewApi.isReady(nativeId);
      },
      emitMessage: (message: any) => {
        assertGodotViewApi();
        GodotViewApi.emitMessage(nativeId, message);
      },
    };

    // Set the ref immediately
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(apiObject);
        } else {
          ref.current = apiObject;
        }
      }
    }, [ref]);

    const resolveAssetSource = (source: ImageSourcePropType | string | number | undefined): string | null => {
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
    };

    // Handle initialization after mount
    useEffect(() => {
      const {source, scene, onMessage, onReady} = props;

      if (source) {
        assertGodotViewApi();
        const sourceUri = resolveAssetSource(source);
        if (sourceUri) {
          GodotViewApi.setJsiProperty(nativeId, "source", sourceUri);
        }
      }

      if (scene) {
        assertGodotViewApi();
        GodotViewApi.setJsiProperty(nativeId, "scene", scene);
      }

      if (onMessage) {
        assertGodotViewApi();
        // Wrap onMessage to pass instance as first parameter
        const wrappedOnMessage = (message: any) => {
          onMessage(apiObject, message);
        };
        GodotViewApi.setJsiProperty(nativeId, "onMessage", wrappedOnMessage);
      }

      // Check if Godot is actually ready before calling onReady
      if (onReady) {
        const checkReady = () => {
          if (GodotViewApi.isReady(nativeId)) {
            // Double-check by also ensuring getRoot works
            try {
              const root = GodotViewApi.getRoot(nativeId);
              if (root) {
                // Use the same apiObject that's set on the ref
                onReady(apiObject);
                return;
              }
            } catch (e) {
              // getRoot failed, not ready yet
            }
          }
          // Poll until ready
          requestAnimationFrame(checkReady);
        };
        checkReady();
      }
    }, [nativeId, props]);


    return (
      <NativeGodotView
        collapsable={false}
        nativeID={`${nativeId}`}
        {...props}
      />
    );
  }
);

// Create the final component with static methods
export const GodotView = Object.assign(GodotViewComponent, {
  startDrawing: () => {
    assertGodotViewApi();
    GodotViewApi.startDrawing();
  },
  stopDrawing: () => {
    assertGodotViewApi();
    GodotViewApi.stopDrawing();
  },
});

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