import { Basis } from './Basis';
import { Vector2 } from './Vector2';
import { Vector3i } from './Vector3i';
type Vector3Constructor = {
    (): Vector3;
    (from_: Vector3): Vector3;
    (from_: Vector3i): Vector3;
    (x_: number, y_: number, z_: number): Vector3;
};
declare global {
    var Vector3: Vector3Constructor;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
    minAxisIndex(): number;
    maxAxisIndex(): number;
    angleTo(to_: Vector3): number;
    signedAngleTo(to_: Vector3, axis_: Vector3): number;
    directionTo(to_: Vector3): Vector3;
    distanceTo(to_: Vector3): number;
    distanceSquaredTo(to_: Vector3): number;
    length(): number;
    lengthSquared(): number;
    limitLength(length_: number): Vector3;
    normalized(): Vector3;
    isNormalized(): boolean;
    isEqualApprox(to_: Vector3): boolean;
    isZeroApprox(): boolean;
    isFinite(): boolean;
    inverse(): Vector3;
    clamp(min_: Vector3, max_: Vector3): Vector3;
    clampf(min_: number, max_: number): Vector3;
    snapped(step_: Vector3): Vector3;
    snappedf(step_: number): Vector3;
    rotated(axis_: Vector3, angle_: number): Vector3;
    lerp(to_: Vector3, weight_: number): Vector3;
    slerp(to_: Vector3, weight_: number): Vector3;
    cubicInterpolate(b_: Vector3, preA_: Vector3, postB_: Vector3, weight_: number): Vector3;
    cubicInterpolateInTime(b_: Vector3, preA_: Vector3, postB_: Vector3, weight_: number, bT_: number, preAT_: number, postBT_: number): Vector3;
    bezierInterpolate(control1_: Vector3, control2_: Vector3, end_: Vector3, t_: number): Vector3;
    moveToward(to_: Vector3, delta_: number): Vector3;
    dot(with_: Vector3): number;
    cross(with_: Vector3): Vector3;
    outer(with_: Vector3): Basis;
    abs(): Vector3;
    floor(): Vector3;
    ceil(): Vector3;
    round(): Vector3;
    posmod(mod_: number): Vector3;
    posmodv(modv_: Vector3): Vector3;
    project(b_: Vector3): Vector3;
    slide(n_: Vector3): Vector3;
    bounce(n_: Vector3): Vector3;
    reflect(n_: Vector3): Vector3;
    sign(): Vector3;
    octahedronEncode(): Vector2;
    min(with_: Vector3): Vector3;
    minf(with_: number): Vector3;
    max(with_: Vector3): Vector3;
    maxf(with_: number): Vector3;
    octahedronDecode(uv_: Vector2): Vector3;
}
export {};
//# sourceMappingURL=Vector3.d.ts.map