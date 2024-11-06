export declare namespace GD {
  export interface Node {
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