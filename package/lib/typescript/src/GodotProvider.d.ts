import React from 'react';
interface GodotContextType {
    AABB: typeof global.AABB | null;
    Basis: typeof global.Basis | null;
    Color: typeof global.Color | null;
    Plane: typeof global.Plane | null;
    Projection: typeof global.Projection | null;
    Quaternion: typeof global.Quaternion | null;
    Rect2: typeof global.Rect2 | null;
    Rect2i: typeof global.Rect2i | null;
    Transform2D: typeof global.Transform2D | null;
    Transform3D: typeof global.Transform3D | null;
    Vector2: typeof global.Vector2 | null;
    Vector2i: typeof global.Vector2i | null;
    Vector3: typeof global.Vector3 | null;
    Vector3i: typeof global.Vector3i | null;
    Vector4: typeof global.Vector4 | null;
    Vector4i: typeof global.Vector4i | null;
    isInitialized: boolean;
}
export declare const GodotContext: React.Context<GodotContextType | undefined>;
export declare const GodotProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useGodot: () => GodotContextType;
export {};
//# sourceMappingURL=GodotProvider.d.ts.map