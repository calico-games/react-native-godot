import { AABB } from './AABB';
import { Rect2 } from './Rect2';
import { Transform3D } from './Transform3D';
import { Vector2 } from './Vector2';
import { Vector4 } from './Vector4';
type ProjectionConstructor = {
    (): Projection;
    (from: Projection): Projection;
    (from: Transform3D): Projection;
    (x_axis: Vector4, y_axis: Vector4, z_axis: Vector4, w_axis: Vector4): Projection;
};
declare global {
    var Projection: ProjectionConstructor;
}
export interface Projection {
    x: Vector4;
    y: Vector4;
    z: Vector4;
    w: Vector4;
    create_depth_correction(flip_y_: boolean): Projection;
    create_light_atlas_rect(rect_: Rect2): Projection;
    create_perspective(fovy_: number, aspect_: number, z_near_: number, z_far_: number, flip_fov_: boolean): Projection;
    create_perspective_hmd(fovy_: number, aspect_: number, z_near_: number, z_far_: number, flip_fov_: boolean, eye_: number, intraocular_dist_: number, convergence_dist_: number): Projection;
    create_for_hmd(eye_: number, aspect_: number, intraocular_dist_: number, display_width_: number, display_to_lens_: number, oversample_: number, z_near_: number, z_far_: number): Projection;
    create_orthogonal(left_: number, right_: number, bottom_: number, top_: number, z_near_: number, z_far_: number): Projection;
    create_orthogonal_aspect(size_: number, aspect_: number, z_near_: number, z_far_: number, flip_fov_: boolean): Projection;
    create_frustum(left_: number, right_: number, bottom_: number, top_: number, z_near_: number, z_far_: number): Projection;
    create_frustum_aspect(size_: number, aspect_: number, offset_: Vector2, z_near_: number, z_far_: number, flip_fov_: boolean): Projection;
    create_fit_aabb(aabb_: AABB): Projection;
    determinant(): number;
    perspective_znear_adjusted(new_znear_: number): Projection;
    flipped_y(): Projection;
    jitter_offseted(offset_: Vector2): Projection;
    get_fovy(fovx_: number, aspect_: number): number;
    get_z_far(): number;
    get_z_near(): number;
    get_aspect(): number;
    get_fov(): number;
    is_orthogonal(): boolean;
    get_viewport_half_extents(): Vector2;
    get_far_plane_half_extents(): Vector2;
    inverse(): Projection;
    get_pixels_per_meter(for_pixel_width_: number): number;
    get_lod_multiplier(): number;
}
export {};
//# sourceMappingURL=Projection.d.ts.map