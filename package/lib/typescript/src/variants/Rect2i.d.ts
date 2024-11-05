import { Rect2 } from './Rect2';
import { Vector2i } from './Vector2i';
type Rect2iConstructor = {
    (): Rect2i;
    (from: Rect2i): Rect2i;
    (from: Rect2): Rect2i;
    (position: Vector2i, size: Vector2i): Rect2i;
    (x: number, y: number, width: number, height: number): Rect2i;
};
declare global {
    var Rect2i: Rect2iConstructor;
}
export interface Rect2i {
    position: Vector2i;
    size: Vector2i;
    get_center(): Vector2i;
    get_area(): number;
    has_area(): boolean;
    has_point(point_: Vector2i): boolean;
    intersects(b_: Rect2i): boolean;
    encloses(b_: Rect2i): boolean;
    intersection(b_: Rect2i): Rect2i;
    merge(b_: Rect2i): Rect2i;
    expand(to_: Vector2i): Rect2i;
    grow(amount_: number): Rect2i;
    grow_individual(left_: number, top_: number, right_: number, bottom_: number): Rect2i;
    abs(): Rect2i;
}
export {};
//# sourceMappingURL=Rect2i.d.ts.map