// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector4i} from './Vector4i';

type Vector4Constructor = {
  (): Vector4;
  (from_: Vector4): Vector4;
  (from_: Vector4i): Vector4;
  (x_: number, y_: number, z_: number, w_: number): Vector4;

};

declare global {
  var Vector4: Vector4Constructor;
}

export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  minAxisIndex(): number;
  maxAxisIndex(): number;
  length(): number;
  lengthSquared(): number;
  abs(): Vector4;
  sign(): Vector4;
  floor(): Vector4;
  ceil(): Vector4;
  round(): Vector4;
  lerp(to_: Vector4, weight_: number): Vector4;
  cubicInterpolate(b_: Vector4, preA_: Vector4, postB_: Vector4, weight_: number): Vector4;
  cubicInterpolateInTime(b_: Vector4, preA_: Vector4, postB_: Vector4, weight_: number, bT_: number, preAT_: number, postBT_: number): Vector4;
  posmod(mod_: number): Vector4;
  posmodv(modv_: Vector4): Vector4;
  snapped(step_: Vector4): Vector4;
  snappedf(step_: number): Vector4;
  clamp(min_: Vector4, max_: Vector4): Vector4;
  clampf(min_: number, max_: number): Vector4;
  normalized(): Vector4;
  isNormalized(): boolean;
  directionTo(to_: Vector4): Vector4;
  distanceTo(to_: Vector4): number;
  distanceSquaredTo(to_: Vector4): number;
  dot(with_: Vector4): number;
  inverse(): Vector4;
  isEqualApprox(to_: Vector4): boolean;
  isZeroApprox(): boolean;
  isFinite(): boolean;
  min(with_: Vector4): Vector4;
  minf(with_: number): Vector4;
  max(with_: Vector4): Vector4;
  maxf(with_: number): Vector4;

}

export {};  // Ensure this file is treated as a module
