// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector4} from './Vector4';

type Vector4iConstructor = {
  (): Vector4i;
  (from_: Vector4i): Vector4i;
  (from_: Vector4): Vector4i;
  (x_: number, y_: number, z_: number, w_: number): Vector4i;

};

declare global {
  var Vector4i: Vector4iConstructor;
}

export interface Vector4i {
  x: number;
  y: number;
  z: number;
  w: number;

  minAxisIndex(): number;
  maxAxisIndex(): number;
  length(): number;
  lengthSquared(): number;
  sign(): Vector4i;
  abs(): Vector4i;
  clamp(min_: Vector4i, max_: Vector4i): Vector4i;
  clampi(min_: number, max_: number): Vector4i;
  snapped(step_: Vector4i): Vector4i;
  snappedi(step_: number): Vector4i;
  min(with_: Vector4i): Vector4i;
  mini(with_: number): Vector4i;
  max(with_: Vector4i): Vector4i;
  maxi(with_: number): Vector4i;
  distanceTo(to_: Vector4i): number;
  distanceSquaredTo(to_: Vector4i): number;

}

export {};  // Ensure this file is treated as a module
