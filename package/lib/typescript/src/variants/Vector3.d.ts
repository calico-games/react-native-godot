import { Basis } from './Basis';
import { Vector2 } from './Vector2';
import { Vector3i } from './Vector3i';
type Vector3Constructor = {
    (): Vector3;
    (from: Vector3): Vector3;
    (from: Vector3i): Vector3;
    (x: number, y: number, z: number): Vector3;
};
declare global {
    var Vector3: Vector3Constructor;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
    min_axis_index(): number;
    max_axis_index(): number;
    angle_to(to_: Vector3): number;
    signed_angle_to(to_: Vector3, axis_: Vector3): number;
    direction_to(to_: Vector3): Vector3;
    distance_to(to_: Vector3): number;
    distance_squared_to(to_: Vector3): number;
    length(): number;
    length_squared(): number;
    limit_length(length_: number): Vector3;
    normalized(): Vector3;
    is_normalized(): boolean;
    is_equal_approx(to_: Vector3): boolean;
    is_zero_approx(): boolean;
    is_finite(): boolean;
    inverse(): Vector3;
    clamp(min_: Vector3, max_: Vector3): Vector3;
    clampf(min_: number, max_: number): Vector3;
    snapped(step_: Vector3): Vector3;
    snappedf(step_: number): Vector3;
    rotated(axis_: Vector3, angle_: number): Vector3;
    lerp(to_: Vector3, weight_: number): Vector3;
    slerp(to_: Vector3, weight_: number): Vector3;
    cubic_interpolate(b_: Vector3, pre_a_: Vector3, post_b_: Vector3, weight_: number): Vector3;
    cubic_interpolate_in_time(b_: Vector3, pre_a_: Vector3, post_b_: Vector3, weight_: number, b_t_: number, pre_a_t_: number, post_b_t_: number): Vector3;
    bezier_interpolate(control_1_: Vector3, control_2_: Vector3, end_: Vector3, t_: number): Vector3;
    move_toward(to_: Vector3, delta_: number): Vector3;
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
    octahedron_encode(): Vector2;
    min(with_: Vector3): Vector3;
    minf(with_: number): Vector3;
    max(with_: Vector3): Vector3;
    maxf(with_: number): Vector3;
    octahedron_decode(uv_: Vector2): Vector3;
}
export {};
//# sourceMappingURL=Vector3.d.ts.map