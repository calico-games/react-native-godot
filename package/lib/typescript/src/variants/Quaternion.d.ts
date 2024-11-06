import { Basis } from './Basis';
import { Vector3 } from './Vector3';
type QuaternionConstructor = {
    (): Quaternion;
    (from_: Quaternion): Quaternion;
    (from_: Basis): Quaternion;
    (axis_: Vector3, angle_: number): Quaternion;
    (arcFrom_: Vector3, arcTo_: Vector3): Quaternion;
    (x_: number, y_: number, z_: number, w_: number): Quaternion;
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
    lengthSquared(): number;
    normalized(): Quaternion;
    isNormalized(): boolean;
    isEqualApprox(to_: Quaternion): boolean;
    isFinite(): boolean;
    inverse(): Quaternion;
    log(): Quaternion;
    exp(): Quaternion;
    angleTo(to_: Quaternion): number;
    dot(with_: Quaternion): number;
    slerp(to_: Quaternion, weight_: number): Quaternion;
    slerpni(to_: Quaternion, weight_: number): Quaternion;
    sphericalCubicInterpolate(b_: Quaternion, preA_: Quaternion, postB_: Quaternion, weight_: number): Quaternion;
    sphericalCubicInterpolateInTime(b_: Quaternion, preA_: Quaternion, postB_: Quaternion, weight_: number, bT_: number, preAT_: number, postBT_: number): Quaternion;
    getAxis(): Vector3;
    getAngle(): number;
}
export {};
//# sourceMappingURL=Quaternion.d.ts.map