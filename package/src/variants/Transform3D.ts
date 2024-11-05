// THIS FILE IS GENERATED. DO NOT EDIT.

import {Basis} from './Basis';
import {Projection} from './Projection';
import {Vector3} from './Vector3';

type Transform3DConstructor = {
  (): Transform3D;
  (from: Transform3D): Transform3D;
  (basis: Basis, origin: Vector3): Transform3D;
  (x_axis: Vector3, y_axis: Vector3, z_axis: Vector3, origin: Vector3): Transform3D;
  (from: Projection): Transform3D;

};

declare global {
  var Transform3D: Transform3DConstructor;
}

export interface Transform3D {
  basis: Basis;
  origin: Vector3;

  inverse(): Transform3D;
  affine_inverse(): Transform3D;
  orthonormalized(): Transform3D;
  rotated(axis_: Vector3, angle_: number): Transform3D;
  rotated_local(axis_: Vector3, angle_: number): Transform3D;
  scaled(scale_: Vector3): Transform3D;
  scaled_local(scale_: Vector3): Transform3D;
  translated(offset_: Vector3): Transform3D;
  translated_local(offset_: Vector3): Transform3D;
  interpolate_with(xform_: Transform3D, weight_: number): Transform3D;
  is_equal_approx(xform_: Transform3D): boolean;
  is_finite(): boolean;

}

export {};  // Ensure this file is treated as a module
