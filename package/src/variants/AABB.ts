// THIS FILE IS GENERATED. DO NOT EDIT.

import {Plane} from './Plane';
import {Vector3} from './Vector3';

type AABBConstructor = {
  (): AABB;
  (from_: AABB): AABB;
  (position_: Vector3, size_: Vector3): AABB;

};

declare global {
  var AABB: AABBConstructor;
}

export interface AABB {
  position: Vector3;
  size: Vector3;

  abs(): AABB;
  getCenter(): Vector3;
  getVolume(): number;
  hasVolume(): boolean;
  hasSurface(): boolean;
  hasPoint(point_: Vector3): boolean;
  isEqualApprox(aabb_: AABB): boolean;
  isFinite(): boolean;
  intersects(with_: AABB): boolean;
  encloses(with_: AABB): boolean;
  intersectsPlane(plane_: Plane): boolean;
  intersection(with_: AABB): AABB;
  merge(with_: AABB): AABB;
  expand(toPoint_: Vector3): AABB;
  grow(by_: number): AABB;
  getSupport(dir_: Vector3): Vector3;
  getLongestAxis(): Vector3;
  getLongestAxisIndex(): number;
  getLongestAxisSize(): number;
  getShortestAxis(): Vector3;
  getShortestAxisIndex(): number;
  getShortestAxisSize(): number;
  getEndpoint(idx_: number): Vector3;
  intersectsSegment(from_: Vector3, to_: Vector3): any;
  intersectsRay(from_: Vector3, dir_: Vector3): any;

}

export {};  // Ensure this file is treated as a module
