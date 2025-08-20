// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector2} from './Vector2';

type Vector2iConstructor = {
  (): Vector2i;
  (from_: Vector2i): Vector2i;
  (from_: Vector2): Vector2i;
  (x_: number, y_: number): Vector2i;

};

export interface Vector2i {
  x: number;
  y: number;

  aspect(): number;
  maxAxisIndex(): number;
  minAxisIndex(): number;
  distanceTo(to_: Vector2i): number;
  distanceSquaredTo(to_: Vector2i): number;
  length(): number;
  lengthSquared(): number;
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

declare global {
  namespace Godot {
    var Vector2i: Vector2iConstructor;
  }
}

export {};  // Ensure this file is treated as a module
