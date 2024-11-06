// THIS FILE IS GENERATED. DO NOT EDIT.

import {Vector3} from './Vector3';

type PlaneConstructor = {
  (): Plane;
  (from_: Plane): Plane;
  (normal_: Vector3): Plane;
  (normal_: Vector3, d_: number): Plane;
  (normal_: Vector3, point_: Vector3): Plane;
  (point1_: Vector3, point2_: Vector3, point3_: Vector3): Plane;
  (a_: number, b_: number, c_: number, d_: number): Plane;

};

declare global {
  var Plane: PlaneConstructor;
}

export interface Plane {
  normal: Vector3;
  d: number;

  normalized(): Plane;
  isEqualApprox(toPlane_: Plane): boolean;
  isFinite(): boolean;
  isPointOver(point_: Vector3): boolean;
  distanceTo(point_: Vector3): number;
  hasPoint(point_: Vector3, tolerance_: number): boolean;
  project(point_: Vector3): Vector3;
  intersect3(b_: Plane, c_: Plane): any;

}

export {};  // Ensure this file is treated as a module
