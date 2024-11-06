import { Vector2 } from './Vector2';
type Transform2DConstructor = {
    (): Transform2D;
    (from_: Transform2D): Transform2D;
    (rotation_: number, position_: Vector2): Transform2D;
    (rotation_: number, scale_: Vector2, skew_: number, position_: Vector2): Transform2D;
    (xAxis_: Vector2, yAxis_: Vector2, origin_: Vector2): Transform2D;
};
declare global {
    var Transform2D: Transform2DConstructor;
}
export interface Transform2D {
    x: Vector2;
    y: Vector2;
    origin: Vector2;
    inverse(): Transform2D;
    affineInverse(): Transform2D;
    getRotation(): number;
    getOrigin(): Vector2;
    getScale(): Vector2;
    getSkew(): number;
    orthonormalized(): Transform2D;
    rotated(angle_: number): Transform2D;
    rotatedLocal(angle_: number): Transform2D;
    scaled(scale_: Vector2): Transform2D;
    scaledLocal(scale_: Vector2): Transform2D;
    translated(offset_: Vector2): Transform2D;
    translatedLocal(offset_: Vector2): Transform2D;
    basisXform(v_: Vector2): Vector2;
    basisXformInv(v_: Vector2): Vector2;
    interpolateWith(xform_: Transform2D, weight_: number): Transform2D;
    isEqualApprox(xform_: Transform2D): boolean;
    isFinite(): boolean;
}
export {};
//# sourceMappingURL=Transform2D.d.ts.map