// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector2} from './Vector2';

type Vector2iConstructor = {
  (): Vector2i;
  (from: Vector2i): Vector2i;
  (from: Vector2): Vector2i;
  (x: number, y: number): Vector2i;

};

declare global {
  var Vector2i: Vector2iConstructor;
}

export interface Vector2i {
  x: number;
  y: number;

  aspect(): number;
  max_axis_index(): number;
  min_axis_index(): number;
  distance_to(to_: Vector2i): number;
  distance_squared_to(to_: Vector2i): number;
  length(): number;
  length_squared(): number;
  sign(): Vector2i;
  abs(): Vector2i;
  clamp(min_: Vector2i, max_: Vector2i): Vector2i;
  clampi(min_: number, max_: number): Vector2i;
  snapped(step_: Vector2i): Vector2i;
  snappedi(step_: number): Vector2i;
  min(with_: Vector2i): Vector2i;
  mini(with_: number): Vector2i;
  max(with_: Vector2i): Vector2i;
  maxi(with_: number): Vector2i;

}

export {};  // Ensure this file is treated as a module
