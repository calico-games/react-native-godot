// THIS FILE IS GENERATED. DO NOT EDIT.

import {Rect2i} from './Rect2i';
import {Vector2} from './Vector2';

type Rect2Constructor = {
  (): Rect2;
  (from: Rect2): Rect2;
  (from: Rect2i): Rect2;
  (position: Vector2, size: Vector2): Rect2;
  (x: number, y: number, width: number, height: number): Rect2;

};

declare global {
  var Rect2: Rect2Constructor;
}

export interface Rect2 {
  position: Vector2;
  size: Vector2;

  get_center(): Vector2;
  get_area(): number;
  has_area(): boolean;
  has_point(point_: Vector2): boolean;
  is_equal_approx(rect_: Rect2): boolean;
  is_finite(): boolean;
  intersects(b_: Rect2, include_borders_: boolean): boolean;
  encloses(b_: Rect2): boolean;
  intersection(b_: Rect2): Rect2;
  merge(b_: Rect2): Rect2;
  expand(to_: Vector2): Rect2;
  grow(amount_: number): Rect2;
  grow_individual(left_: number, top_: number, right_: number, bottom_: number): Rect2;
  abs(): Rect2;

}

export {};  // Ensure this file is treated as a module
