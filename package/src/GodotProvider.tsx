// THIS FILE IS GENERATED. DO NOT EDIT.
import React, {createContext, useContext, useEffect, useState} from 'react';
import NativeGodotModule from './specs/NativeGodotModule';

interface GodotContextType {

  AABB: typeof global.AABB | null;
  Basis: typeof global.Basis | null;
  Color: typeof global.Color | null;
  Plane: typeof global.Plane | null;
  Projection: typeof global.Projection | null;
  Quaternion: typeof global.Quaternion | null;
  Rect2: typeof global.Rect2 | null;
  Rect2i: typeof global.Rect2i | null;
  Transform2D: typeof global.Transform2D | null;
  Transform3D: typeof global.Transform3D | null;
  Vector2: typeof global.Vector2 | null;
  Vector2i: typeof global.Vector2i | null;
  Vector3: typeof global.Vector3 | null;
  Vector3i: typeof global.Vector3i | null;
  Vector4: typeof global.Vector4 | null;
  Vector4i: typeof global.Vector4i | null;
  isInitialized: boolean;
}

export const GodotContext = createContext<GodotContextType | undefined>(undefined);

export const GodotProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [AABB, setAABB] = useState<GodotContextType['AABB']>(null);
  const [Basis, setBasis] = useState<GodotContextType['Basis']>(null);
  const [Color, setColor] = useState<GodotContextType['Color']>(null);
  const [Plane, setPlane] = useState<GodotContextType['Plane']>(null);
  const [Projection, setProjection] = useState<GodotContextType['Projection']>(null);
  const [Quaternion, setQuaternion] = useState<GodotContextType['Quaternion']>(null);
  const [Rect2, setRect2] = useState<GodotContextType['Rect2']>(null);
  const [Rect2i, setRect2i] = useState<GodotContextType['Rect2i']>(null);
  const [Transform2D, setTransform2D] = useState<GodotContextType['Transform2D']>(null);
  const [Transform3D, setTransform3D] = useState<GodotContextType['Transform3D']>(null);
  const [Vector2, setVector2] = useState<GodotContextType['Vector2']>(null);
  const [Vector2i, setVector2i] = useState<GodotContextType['Vector2i']>(null);
  const [Vector3, setVector3] = useState<GodotContextType['Vector3']>(null);
  const [Vector3i, setVector3i] = useState<GodotContextType['Vector3i']>(null);
  const [Vector4, setVector4] = useState<GodotContextType['Vector4']>(null);
  const [Vector4i, setVector4i] = useState<GodotContextType['Vector4i']>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = () => {
      if (!NativeGodotModule) {
        console.error('[react-native-godot] NativeGodotModule is not available');
        return;
      }

      // Install the native module
      NativeGodotModule.install();

      // Wait for all global objects to be available (including GodotViewApi)
      const checkInitialization = () => {
        const hasGodotViewApi = 'GodotViewApi' in global && global.GodotViewApi !== null;
        const hasAllTypes = typeof global.AABB === 'function' && typeof global.Basis === 'function' && typeof global.Color === 'function' && typeof global.Plane === 'function' && typeof global.Projection === 'function' && typeof global.Quaternion === 'function' && typeof global.Rect2 === 'function' && typeof global.Rect2i === 'function' && typeof global.Transform2D === 'function' && typeof global.Transform3D === 'function' && typeof global.Vector2 === 'function' && typeof global.Vector2i === 'function' && typeof global.Vector3 === 'function' && typeof global.Vector3i === 'function' && typeof global.Vector4 === 'function' && typeof global.Vector4i === 'function';

        if (hasGodotViewApi && hasAllTypes) {
          // Set all the state variables
          setAABB(() => global.AABB);
          setBasis(() => global.Basis);
          setColor(() => global.Color);
          setPlane(() => global.Plane);
          setProjection(() => global.Projection);
          setQuaternion(() => global.Quaternion);
          setRect2(() => global.Rect2);
          setRect2i(() => global.Rect2i);
          setTransform2D(() => global.Transform2D);
          setTransform3D(() => global.Transform3D);
          setVector2(() => global.Vector2);
          setVector2i(() => global.Vector2i);
          setVector3(() => global.Vector3);
          setVector3i(() => global.Vector3i);
          setVector4(() => global.Vector4);
          setVector4i(() => global.Vector4i);

          console.info('[react-native-godot] Godot initialized with GodotViewApi');
          setIsInitialized(true);

          return true;
        }

        return false;
      };

      // Check immediately
      if (checkInitialization()) {
        return;
      }

      // If not ready, poll until it is (with timeout)
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds

      const pollForInitialization = () => {
        if (checkInitialization()) {
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(pollForInitialization, 100);
        } else {
          console.error('[react-native-godot] Initialization timeout - GodotViewApi may not be available');
        }
      };

      setTimeout(pollForInitialization, 100);
    };

    initialize();
  }, []);

  return (
    <GodotContext.Provider value={ { AABB, Basis, Color, Plane, Projection, Quaternion, Rect2, Rect2i, Transform2D, Transform3D, Vector2, Vector2i, Vector3, Vector3i, Vector4, Vector4i,  isInitialized } }>
      {isInitialized ? children : null}
    </GodotContext.Provider>
  );
};

export const useGodot = () => {
  const context = useContext(GodotContext);
  if (context === undefined) {
    throw new Error('useGodot must be used within a GodotProvider');
  }
  return context;
};
