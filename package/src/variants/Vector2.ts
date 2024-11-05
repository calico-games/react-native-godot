// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector2i} from './Vector2i';

type Vector2Constructor = {
  (): Vector2;
  (from: Vector2): Vector2;
  (from: Vector2i): Vector2;
  (x: number, y: number): Vector2;

};

declare global {
  var Vector2: Vector2Constructor;
}

export interface Vector2 {
  x: number;
  y: number;

  angle(): number;
  angle_to(to_: Vector2): number;
  angle_to_point(to_: Vector2): number;
  direction_to(to_: Vector2): Vector2;
  distance_to(to_: Vector2): number;
  distance_squared_to(to_: Vector2): number;
  length(): number;
  length_squared(): number;
  limit_length(length_: number): Vector2;
  normalized(): Vector2;
  is_normalized(): boolean;
  is_equal_approx(to_: Vector2): boolean;
  is_zero_approx(): boolean;
  is_finite(): boolean;
  posmod(mod_: number): Vector2;
  posmodv(modv_: Vector2): Vector2;
  project(b_: Vector2): Vector2;
  lerp(to_: Vector2, weight_: number): Vector2;
  slerp(to_: Vector2, weight_: number): Vector2;
  cubic_interpolate(b_: Vector2, pre_a_: Vector2, post_b_: Vector2, weight_: number): Vector2;
  cubic_interpolate_in_time(b_: Vector2, pre_a_: Vector2, post_b_: Vector2, weight_: number, b_t_: number, pre_a_t_: number, post_b_t_: number): Vector2;
  bezier_interpolate(control_1_: Vector2, control_2_: Vector2, end_: Vector2, t_: number): Vector2;
  max_axis_index(): number;
  min_axis_index(): number;
  move_toward(to_: Vector2, delta_: number): Vector2;
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
  from_angle(angle_: number): Vector2;

}

export {};  // Ensure this file is treated as a module
