// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector3} from './Vector3';

type Vector3iConstructor = {
  (): Vector3i;
  (from_: Vector3i): Vector3i;
  (from_: Vector3): Vector3i;
  (x_: number, y_: number, z_: number): Vector3i;

};

declare global {
  var Vector3i: Vector3iConstructor;
}

export interface Vector3i {
  x: number;
  y: number;
  z: number;

  minAxisIndex(): number;
  maxAxisIndex(): number;
  distanceTo(to_: Vector3i): number;
  distanceSquaredTo(to_: Vector3i): number;
  length(): number;
  lengthSquared(): number;
  sign(): Vector3i;
  abs(): Vector3i;
  clamp(min_: Vector3i, max_: Vector3i): Vector3i;
  clampi(min_: number, max_: number): Vector3i;
  snapped(step_: Vector3i): Vector3i;
  snappedi(step_: number): Vector3i;
  min(with_: Vector3i): Vector3i;
  mini(with_: number): Vector3i;
  max(with_: Vector3i): Vector3i;
  maxi(with_: number): Vector3i;

}

export {};  // Ensure this file is treated as a module
