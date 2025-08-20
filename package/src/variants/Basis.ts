// THIS FILE IS GENERATED. DO NOT EDIT.

import {Quaternion} from './Quaternion';
import {Vector3} from './Vector3';

type BasisConstructor = {
  (): Basis;
  (from_: Basis): Basis;
  (from_: Quaternion): Basis;
  (axis_: Vector3, angle_: number): Basis;
  (xAxis_: Vector3, yAxis_: Vector3, zAxis_: Vector3): Basis;

};

export interface Basis {
  x: Vector3;
  y: Vector3;
  z: Vector3;

  inverse(): Basis;
  transposed(): Basis;
  orthonormalized(): Basis;
  determinant(): number;
  rotated(axis_: Vector3, angle_: number): Basis;
  scaled(scale_: Vector3): Basis;
  getScale(): Vector3;
  tdotx(with_: Vector3): number;
  tdoty(with_: Vector3): number;
  tdotz(with_: Vector3): number;
  slerp(to_: Basis, weight_: number): Basis;
  isEqualApprox(b_: Basis): boolean;
  isFinite(): boolean;
  getRotationQuaternion(): Quaternion;
  fromScale(scale_: Vector3): Basis;

}

declare global {
  namespace Godot {
    var Basis: BasisConstructor;
  }
}

export {};  // Ensure this file is treated as a module
