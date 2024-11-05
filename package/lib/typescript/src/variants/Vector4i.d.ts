import { Vector4 } from './Vector4';
type Vector4iConstructor = {
    (): Vector4i;
    (from: Vector4i): Vector4i;
    (from: Vector4): Vector4i;
    (x: number, y: number, z: number, w: number): Vector4i;
};
declare global {
    var Vector4i: Vector4iConstructor;
}
export interface Vector4i {
    x: number;
    y: number;
    z: number;
    w: number;
    min_axis_index(): number;
    max_axis_index(): number;
    length(): number;
    length_squared(): number;
    sign(): Vector4i;
    abs(): Vector4i;
    clamp(min_: Vector4i, max_: Vector4i): Vector4i;
    clampi(min_: number, max_: number): Vector4i;
    snapped(step_: Vector4i): Vector4i;
    snappedi(step_: number): Vector4i;
    min(with_: Vector4i): Vector4i;
    mini(with_: number): Vector4i;
    max(with_: Vector4i): Vector4i;
    maxi(with_: number): Vector4i;
    distance_to(to_: Vector4i): number;
    distance_squared_to(to_: Vector4i): number;
}
export {};
//# sourceMappingURL=Vector4i.d.ts.map