import { Rect2i } from './Rect2i';
import { Vector2 } from './Vector2';
type Rect2Constructor = {
    (): Rect2;
    (from_: Rect2): Rect2;
    (from_: Rect2i): Rect2;
    (position_: Vector2, size_: Vector2): Rect2;
    (x_: number, y_: number, width_: number, height_: number): Rect2;
};
declare global {
    var Rect2: Rect2Constructor;
}
export interface Rect2 {
    position: Vector2;
    size: Vector2;
    getCenter(): Vector2;
    getArea(): number;
    hasArea(): boolean;
    hasPoint(point_: Vector2): boolean;
    isEqualApprox(rect_: Rect2): boolean;
    isFinite(): boolean;
    intersects(b_: Rect2, includeBorders_: boolean): boolean;
    encloses(b_: Rect2): boolean;
    intersection(b_: Rect2): Rect2;
    merge(b_: Rect2): Rect2;
    expand(to_: Vector2): Rect2;
    grow(amount_: number): Rect2;
    growIndividual(left_: number, top_: number, right_: number, bottom_: number): Rect2;
    abs(): Rect2;
}
export {};
//# sourceMappingURL=Rect2.d.ts.map