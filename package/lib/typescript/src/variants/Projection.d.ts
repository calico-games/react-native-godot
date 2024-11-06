import { AABB } from './AABB';
import { Rect2 } from './Rect2';
import { Transform3D } from './Transform3D';
import { Vector2 } from './Vector2';
import { Vector4 } from './Vector4';
type ProjectionConstructor = {
    (): Projection;
    (from_: Projection): Projection;
    (from_: Transform3D): Projection;
    (xAxis_: Vector4, yAxis_: Vector4, zAxis_: Vector4, wAxis_: Vector4): Projection;
};
declare global {
    var Projection: ProjectionConstructor;
}
export interface Projection {
    x: Vector4;
    y: Vector4;
    z: Vector4;
    w: Vector4;
    createDepthCorrection(flipY_: boolean): Projection;
    createLightAtlasRect(rect_: Rect2): Projection;
    createPerspective(fovy_: number, aspect_: number, zNear_: number, zFar_: number, flipFov_: boolean): Projection;
    createPerspectiveHmd(fovy_: number, aspect_: number, zNear_: number, zFar_: number, flipFov_: boolean, eye_: number, intraocularDist_: number, convergenceDist_: number): Projection;
    createForHmd(eye_: number, aspect_: number, intraocularDist_: number, displayWidth_: number, displayToLens_: number, oversample_: number, zNear_: number, zFar_: number): Projection;
    createOrthogonal(left_: number, right_: number, bottom_: number, top_: number, zNear_: number, zFar_: number): Projection;
    createOrthogonalAspect(size_: number, aspect_: number, zNear_: number, zFar_: number, flipFov_: boolean): Projection;
    createFrustum(left_: number, right_: number, bottom_: number, top_: number, zNear_: number, zFar_: number): Projection;
    createFrustumAspect(size_: number, aspect_: number, offset_: Vector2, zNear_: number, zFar_: number, flipFov_: boolean): Projection;
    createFitAabb(aabb_: AABB): Projection;
    determinant(): number;
    perspectiveZnearAdjusted(newZnear_: number): Projection;
    flippedY(): Projection;
    jitterOffseted(offset_: Vector2): Projection;
    getFovy(fovx_: number, aspect_: number): number;
    getZFar(): number;
    getZNear(): number;
    getAspect(): number;
    getFov(): number;
    isOrthogonal(): boolean;
    getViewportHalfExtents(): Vector2;
    getFarPlaneHalfExtents(): Vector2;
    inverse(): Projection;
    getPixelsPerMeter(forPixelWidth_: number): number;
    getLodMultiplier(): number;
}
export {};
//# sourceMappingURL=Projection.d.ts.map