// THIS FILE IS GENERATED. DO NOT EDIT.

import {Basis} from './Basis';
import {Projection} from './Projection';
import {Vector3} from './Vector3';

type Transform3DConstructor = {
  (): Transform3D;
  (from_: Transform3D): Transform3D;
  (basis_: Basis, origin_: Vector3): Transform3D;
  (xAxis_: Vector3, yAxis_: Vector3, zAxis_: Vector3, origin_: Vector3): Transform3D;
  (from_: Projection): Transform3D;

};

export interface Transform3D {
  basis: Basis;
  origin: Vector3;

  inverse(): Transform3D;
  affineInverse(): Transform3D;
  orthonormalized(): Transform3D;
  rotated(axis_: Vector3, angle_: number): Transform3D;
  rotatedLocal(axis_: Vector3, angle_: number): Transform3D;
  scaled(scale_: Vector3): Transform3D;
  scaledLocal(scale_: Vector3): Transform3D;
  translated(offset_: Vector3): Transform3D;
  translatedLocal(offset_: Vector3): Transform3D;
  interpolateWith(xform_: Transform3D, weight_: number): Transform3D;
  isEqualApprox(xform_: Transform3D): boolean;
  isFinite(): boolean;

}

declare global {
  namespace Godot {
    var Transform3D: Transform3DConstructor;
  }
}

export {};  // Ensure this file is treated as a module
