// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector3} from './Vector3';

type Vector3iConstructor = {
  (): Vector3i;
  (from: Vector3i): Vector3i;
  (from: Vector3): Vector3i;
  (x: number, y: number, z: number): Vector3i;

};

declare global {
  var Vector3i: Vector3iConstructor;
}

export interface Vector3i {
  x: number;
  y: number;
  z: number;

  min_axis_index(): number;
  max_axis_index(): number;
  distance_to(to_: Vector3i): number;
  distance_squared_to(to_: Vector3i): number;
  length(): number;
  length_squared(): number;
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
