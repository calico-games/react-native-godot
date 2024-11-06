export declare namespace GD {
    interface Node {
        getNode(name: string): Node | null;
        getParent(): Node | null;
        getChildren(): Node[];
        getChildCount(): number;
    }
}
declare global {
    var GodotNode: GD.Node;
}
export {};
//# sourceMappingURL=Node.d.ts.map