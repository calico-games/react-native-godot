import React, {useMemo, useRef, useEffect, useImperativeHandle} from 'react';
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
  isReady(): boolean;
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
    
    // Component methods using useImperativeHandle
    useImperativeHandle(
      ref,
      () => ({
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
        isReady: (): boolean => {
          assertGodotViewApi();
          return GodotViewApi.isReady(nativeId);
        },
        emitMessage: (message: any) => {
          assertGodotViewApi();
          GodotViewApi.emitMessage(nativeId, message);
        },
      } as GodotViewRef),
      [nativeId]
    );

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

    // Store latest callback refs
    const onMessageRef = useRef(props.onMessage);
    const onReadyRef = useRef(props.onReady);
    
    // Update refs when callbacks change
    useEffect(() => {
      onMessageRef.current = props.onMessage;
      onReadyRef.current = props.onReady;
    });

    // Handle initialization after mount - only run once
    useEffect(() => {
      const {source, scene} = props;
      
      assertGodotViewApi();

      if (source) {
        const sourceUri = resolveAssetSource(source);
        if (sourceUri) {
          GodotViewApi.setJsiProperty(nativeId, "source", sourceUri);
        }
      }

      if (scene) {
        GodotViewApi.setJsiProperty(nativeId, "scene", scene);
      }
      
      // Set up callbacks once - they use refs so they always call the latest version
      GodotViewApi.setJsiProperty(nativeId, "onMessage", (message: any) => {
        if (onMessageRef.current) {
          // Get the current ref object from useImperativeHandle
          const currentRef = ref && typeof ref !== 'function' ? ref.current : null;
          onMessageRef.current(currentRef, message);
        }
      });

      GodotViewApi.setJsiProperty(nativeId, "onReady", () => {
        if (onReadyRef.current) {
          // Get the current ref object from useImperativeHandle
          const currentRef = ref && typeof ref !== 'function' ? ref.current : null;
          onReadyRef.current(currentRef);
        }
      });
    }, [nativeId]); // Only run once on mount

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