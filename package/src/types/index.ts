export type NodeConstructor = {
  (): Node;
};

export interface Node {
  getNode(name: string): Node | null;
  getParent(): Node | null;
  getChildren(): Node[];
  getChildCount(): number;
  setName(name: string): void;
  addChild(child: Node): void;
  setScript(script: Script): void;
  call(methodName: string, ...args: any[]): any;
}

type ScriptConstructor = {
  (): Script;
};

export interface Script {
  setSourceCode(source: string): boolean;
}

declare global {
  namespace Godot {
    var Node: NodeConstructor;
    var Script: ScriptConstructor;
  }
}

export {};