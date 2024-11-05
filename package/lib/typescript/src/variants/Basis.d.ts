import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
type BasisConstructor = {
    (): Basis;
    (from: Basis): Basis;
    (from: Quaternion): Basis;
    (axis: Vector3, angle: number): Basis;
    (x_axis: Vector3, y_axis: Vector3, z_axis: Vector3): Basis;
};
declare global {
    var Basis: BasisConstructor;
}
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
    get_scale(): Vector3;
    tdotx(with_: Vector3): number;
    tdoty(with_: Vector3): number;
    tdotz(with_: Vector3): number;
    slerp(to_: Basis, weight_: number): Basis;
    is_equal_approx(b_: Basis): boolean;
    is_finite(): boolean;
    get_rotation_quaternion(): Quaternion;
    from_scale(scale_: Vector3): Basis;
}
export {};
//# sourceMappingURL=Basis.d.ts.map