// THIS FILE IS GENERATED. DO NOT EDIT.

import {Plane} from './Plane';
import {Vector3} from './Vector3';

type AABBConstructor = {
  (): AABB;
  (from: AABB): AABB;
  (position: Vector3, size: Vector3): AABB;

};

declare global {
  var AABB: AABBConstructor;
}

export interface AABB {
  position: Vector3;
  size: Vector3;

  abs(): AABB;
  get_center(): Vector3;
  get_volume(): number;
  has_volume(): boolean;
  has_surface(): boolean;
  has_point(point_: Vector3): boolean;
  is_equal_approx(aabb_: AABB): boolean;
  is_finite(): boolean;
  intersects(with_: AABB): boolean;
  encloses(with_: AABB): boolean;
  intersects_plane(plane_: Plane): boolean;
  intersection(with_: AABB): AABB;
  merge(with_: AABB): AABB;
  expand(to_point_: Vector3): AABB;
  grow(by_: number): AABB;
  get_support(dir_: Vector3): Vector3;
  get_longest_axis(): Vector3;
  get_longest_axis_index(): number;
  get_longest_axis_size(): number;
  get_shortest_axis(): Vector3;
  get_shortest_axis_index(): number;
  get_shortest_axis_size(): number;
  get_endpoint(idx_: number): Vector3;
  intersects_segment(from_: Vector3, to_: Vector3): any;
  intersects_ray(from_: Vector3, dir_: Vector3): any;

}

export {};  // Ensure this file is treated as a module
