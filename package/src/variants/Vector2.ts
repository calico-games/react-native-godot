// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector2i} from './Vector2i';

type Vector2Constructor = {
  (): Vector2;
  (from_: Vector2): Vector2;
  (from_: Vector2i): Vector2;
  (x_: number, y_: number): Vector2;

};

declare global {
  var Vector2: Vector2Constructor;
}

export interface Vector2 {
  x: number;
  y: number;

  angle(): number;
  angleTo(to_: Vector2): number;
  angleToPoint(to_: Vector2): number;
  directionTo(to_: Vector2): Vector2;
  distanceTo(to_: Vector2): number;
  distanceSquaredTo(to_: Vector2): number;
  length(): number;
  lengthSquared(): number;
  limitLength(length_: number): Vector2;
  normalized(): Vector2;
  isNormalized(): boolean;
  isEqualApprox(to_: Vector2): boolean;
  isZeroApprox(): boolean;
  isFinite(): boolean;
  posmod(mod_: number): Vector2;
  posmodv(modv_: Vector2): Vector2;
  project(b_: Vector2): Vector2;
  lerp(to_: Vector2, weight_: number): Vector2;
  slerp(to_: Vector2, weight_: number): Vector2;
  cubicInterpolate(b_: Vector2, preA_: Vector2, postB_: Vector2, weight_: number): Vector2;
  cubicInterpolateInTime(b_: Vector2, preA_: Vector2, postB_: Vector2, weight_: number, bT_: number, preAT_: number, postBT_: number): Vector2;
  bezierInterpolate(control1_: Vector2, control2_: Vector2, end_: Vector2, t_: number): Vector2;
  maxAxisIndex(): number;
  minAxisIndex(): number;
  moveToward(to_: Vector2, delta_: number): Vector2;
  rotated(angle_: number): Vector2;
  orthogonal(): Vector2;
  floor(): Vector2;
  ceil(): Vector2;
  round(): Vector2;
  aspect(): number;
  dot(with_: Vector2): number;
  slide(n_: Vector2): Vector2;
  bounce(n_: Vector2): Vector2;
  reflect(line_: Vector2): Vector2;
  cross(with_: Vector2): number;
  abs(): Vector2;
  sign(): Vector2;
  clamp(min_: Vector2, max_: Vector2): Vector2;
  clampf(min_: number, max_: number): Vector2;
  snapped(step_: Vector2): Vector2;
  snappedf(step_: number): Vector2;
  min(with_: Vector2): Vector2;
  minf(with_: number): Vector2;
  max(with_: Vector2): Vector2;
  maxf(with_: number): Vector2;
  fromAngle(angle_: number): Vector2;

}

export {};  // Ensure this file is treated as a module
