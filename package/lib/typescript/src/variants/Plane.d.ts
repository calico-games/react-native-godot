import { Vector3 } from './Vector3';
type PlaneConstructor = {
    (): Plane;
    (from: Plane): Plane;
    (normal: Vector3): Plane;
    (normal: Vector3, d: number): Plane;
    (normal: Vector3, point: Vector3): Plane;
    (point1: Vector3, point2: Vector3, point3: Vector3): Plane;
    (a: number, b: number, c: number, d: number): Plane;
};
declare global {
    var Plane: PlaneConstructor;
}
export interface Plane {
    normal: Vector3;
    d: number;
    normalized(): Plane;
    is_equal_approx(to_plane_: Plane): boolean;
    is_finite(): boolean;
    is_point_over(point_: Vector3): boolean;
    distance_to(point_: Vector3): number;
    has_point(point_: Vector3, tolerance_: number): boolean;
    project(point_: Vector3): Vector3;
    intersect_3(b_: Plane, c_: Plane): any;
}
export {};
//# sourceMappingURL=Plane.d.ts.map