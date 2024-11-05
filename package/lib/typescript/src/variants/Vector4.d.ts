import { Vector4i } from './Vector4i';
type Vector4Constructor = {
    (): Vector4;
    (from: Vector4): Vector4;
    (from: Vector4i): Vector4;
    (x: number, y: number, z: number, w: number): Vector4;
};
declare global {
    var Vector4: Vector4Constructor;
}
export interface Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
    min_axis_index(): number;
    max_axis_index(): number;
    length(): number;
    length_squared(): number;
    abs(): Vector4;
    sign(): Vector4;
    floor(): Vector4;
    ceil(): Vector4;
    round(): Vector4;
    lerp(to_: Vector4, weight_: number): Vector4;
    cubic_interpolate(b_: Vector4, pre_a_: Vector4, post_b_: Vector4, weight_: number): Vector4;
    cubic_interpolate_in_time(b_: Vector4, pre_a_: Vector4, post_b_: Vector4, weight_: number, b_t_: number, pre_a_t_: number, post_b_t_: number): Vector4;
    posmod(mod_: number): Vector4;
    posmodv(modv_: Vector4): Vector4;
    snapped(step_: Vector4): Vector4;
    snappedf(step_: number): Vector4;
    clamp(min_: Vector4, max_: Vector4): Vector4;
    clampf(min_: number, max_: number): Vector4;
    normalized(): Vector4;
    is_normalized(): boolean;
    direction_to(to_: Vector4): Vector4;
    distance_to(to_: Vector4): number;
    distance_squared_to(to_: Vector4): number;
    dot(with_: Vector4): number;
    inverse(): Vector4;
    is_equal_approx(to_: Vector4): boolean;
    is_zero_approx(): boolean;
    is_finite(): boolean;
    min(with_: Vector4): Vector4;
    minf(with_: number): Vector4;
    max(with_: Vector4): Vector4;
    maxf(with_: number): Vector4;
}
export {};
//# sourceMappingURL=Vector4.d.ts.map