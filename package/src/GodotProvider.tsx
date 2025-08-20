// THIS FILE IS GENERATED. DO NOT EDIT.
import React, {createContext, useContext, useEffect, useState} from 'react';

interface GodotContextType {
  AABB: typeof global.Godot.AABB;
  Basis: typeof global.Godot.Basis;
  Color: typeof global.Godot.Color;
  Plane: typeof global.Godot.Plane;
  Projection: typeof global.Godot.Projection;
  Quaternion: typeof global.Godot.Quaternion;
  Rect2: typeof global.Godot.Rect2;
  Rect2i: typeof global.Godot.Rect2i;
  Transform2D: typeof global.Godot.Transform2D;
  Transform3D: typeof global.Godot.Transform3D;
  Vector2: typeof global.Godot.Vector2;
  Vector2i: typeof global.Godot.Vector2i;
  Vector3: typeof global.Godot.Vector3;
  Vector3i: typeof global.Godot.Vector3i;
  Vector4: typeof global.Godot.Vector4;
  Vector4i: typeof global.Godot.Vector4i;
  Script: typeof global.Godot.Script;
  Node: typeof global.Godot.Node;
}

export const GodotContext = createContext<GodotContextType | null>(null);

export const GodotProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [godotContext, setGodotContext] = useState<GodotContextType | null>(null);

  useEffect(() => {
    const initialize = () => {
        const hasGodotViewApi = 'GodotViewApi' in global && global.GodotViewApi !== null;
        const hasVariants = typeof global.Godot.AABB === 'function' && typeof global.Godot.Basis === 'function' && typeof global.Godot.Color === 'function' && typeof global.Godot.Plane === 'function' && typeof global.Godot.Projection === 'function' && typeof global.Godot.Quaternion === 'function' && typeof global.Godot.Rect2 === 'function' && typeof global.Godot.Rect2i === 'function' && typeof global.Godot.Transform2D === 'function' && typeof global.Godot.Transform3D === 'function' && typeof global.Godot.Vector2 === 'function' && typeof global.Godot.Vector2i === 'function' && typeof global.Godot.Vector3 === 'function' && typeof global.Godot.Vector3i === 'function' && typeof global.Godot.Vector4 === 'function' && typeof global.Godot.Vector4i === 'function';
        const hasOther = typeof global.Godot.Script === 'function' && typeof global.Godot.Node === 'function';

        if (hasGodotViewApi && hasVariants && hasOther) {
          setGodotContext({
            AABB: global.Godot.AABB,
            Basis: global.Godot.Basis,
            Color: global.Godot.Color,
            Plane: global.Godot.Plane,
            Projection: global.Godot.Projection,
            Quaternion: global.Godot.Quaternion,
            Rect2: global.Godot.Rect2,
            Rect2i: global.Godot.Rect2i,
            Transform2D: global.Godot.Transform2D,
            Transform3D: global.Godot.Transform3D,
            Vector2: global.Godot.Vector2,
            Vector2i: global.Godot.Vector2i,
            Vector3: global.Godot.Vector3,
            Vector3i: global.Godot.Vector3i,
            Vector4: global.Godot.Vector4,
            Vector4i: global.Godot.Vector4i,
            Script: global.Godot.Script,
            Node: global.Godot.Node
          });
        } else {
          console.error('[react-native-godot] Godot initialization failed!');

          if (!hasGodotViewApi) {
            console.error('[react-native-godot] GodotViewApi is not available');
          }

          if (!hasVariants) {
            console.error('[react-native-godot] Not all required variants are available');
          }

          if (!hasOther) {
            console.error('[react-native-godot] Not all required other types are available');
          }
        }
    };

    initialize();
  }, []);

  return (
    <GodotContext.Provider value={godotContext}>
      {godotContext ? children : null}
    </GodotContext.Provider>
  );
};

export const useGodot = () => {
  const context = useContext(GodotContext);
  if (context === null) {
    throw new Error('useGodot must be used within a GodotProvider and Godot must be initialized');
  }
  return context;
};
