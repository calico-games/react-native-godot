// THIS FILE IS GENERATED. DO NOT EDIT.

import {Basis} from './Basis';
import {Vector3} from './Vector3';

type QuaternionConstructor = {
  (): Quaternion;
  (from: Quaternion): Quaternion;
  (from: Basis): Quaternion;
  (axis: Vector3, angle: number): Quaternion;
  (arc_from: Vector3, arc_to: Vector3): Quaternion;
  (x: number, y: number, z: number, w: number): Quaternion;

};

declare global {
  var Quaternion: QuaternionConstructor;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;

  length(): number;
  length_squared(): number;
  normalized(): Quaternion;
  is_normalized(): boolean;
  is_equal_approx(to_: Quaternion): boolean;
  is_finite(): boolean;
  inverse(): Quaternion;
  log(): Quaternion;
  exp(): Quaternion;
  angle_to(to_: Quaternion): number;
  dot(with_: Quaternion): number;
  slerp(to_: Quaternion, weight_: number): Quaternion;
  slerpni(to_: Quaternion, weight_: number): Quaternion;
  spherical_cubic_interpolate(b_: Quaternion, pre_a_: Quaternion, post_b_: Quaternion, weight_: number): Quaternion;
  spherical_cubic_interpolate_in_time(b_: Quaternion, pre_a_: Quaternion, post_b_: Quaternion, weight_: number, b_t_: number, pre_a_t_: number, post_b_t_: number): Quaternion;
  get_axis(): Vector3;
  get_angle(): number;

}

export {};  // Ensure this file is treated as a module
