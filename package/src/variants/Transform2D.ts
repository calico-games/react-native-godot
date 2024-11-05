// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector2} from './Vector2';

type Transform2DConstructor = {
  (): Transform2D;
  (from: Transform2D): Transform2D;
  (rotation: number, position: Vector2): Transform2D;
  (rotation: number, scale: Vector2, skew: number, position: Vector2): Transform2D;
  (x_axis: Vector2, y_axis: Vector2, origin: Vector2): Transform2D;

};

declare global {
  var Transform2D: Transform2DConstructor;
}

export interface Transform2D {
  x: Vector2;
  y: Vector2;
  origin: Vector2;

  inverse(): Transform2D;
  affine_inverse(): Transform2D;
  get_rotation(): number;
  get_origin(): Vector2;
  get_scale(): Vector2;
  get_skew(): number;
  orthonormalized(): Transform2D;
  rotated(angle_: number): Transform2D;
  rotated_local(angle_: number): Transform2D;
  scaled(scale_: Vector2): Transform2D;
  scaled_local(scale_: Vector2): Transform2D;
  translated(offset_: Vector2): Transform2D;
  translated_local(offset_: Vector2): Transform2D;
  basis_xform(v_: Vector2): Vector2;
  basis_xform_inv(v_: Vector2): Vector2;
  interpolate_with(xform_: Transform2D, weight_: number): Transform2D;
  is_equal_approx(xform_: Transform2D): boolean;
  is_finite(): boolean;

}

export {};  // Ensure this file is treated as a module
