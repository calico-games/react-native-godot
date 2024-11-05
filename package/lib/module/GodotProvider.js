// THIS FILE IS GENERATED. DO NOT EDIT.
import React, { createContext, useContext, useEffect, useState } from 'react';
import NativeGodotModule from './specs/NativeGodotModule';
export const GodotContext = /*#__PURE__*/createContext(undefined);
export const GodotProvider = ({
  children
}) => {
  const [AABB, setAABB] = useState(null);
  const [Basis, setBasis] = useState(null);
  const [Color, setColor] = useState(null);
  const [Plane, setPlane] = useState(null);
  const [Projection, setProjection] = useState(null);
  const [Quaternion, setQuaternion] = useState(null);
  const [Rect2, setRect2] = useState(null);
  const [Rect2i, setRect2i] = useState(null);
  const [Transform2D, setTransform2D] = useState(null);
  const [Transform3D, setTransform3D] = useState(null);
  const [Vector2, setVector2] = useState(null);
  const [Vector2i, setVector2i] = useState(null);
  const [Vector3, setVector3] = useState(null);
  const [Vector3i, setVector3i] = useState(null);
  const [Vector4, setVector4] = useState(null);
  const [Vector4i, setVector4i] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const initialize = () => {
      NativeGodotModule.install();
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
  return /*#__PURE__*/React.createElement(GodotContext.Provider, {
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
export const useGodot = () => {
  const context = useContext(GodotContext);
  if (context === undefined) {
    throw new Error('useGodot must be used within a GodotProvider');
  }
  return context;
};
//# sourceMappingURL=GodotProvider.js.map