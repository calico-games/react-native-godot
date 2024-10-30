import React from 'react';
import type { RefObject, FunctionComponent } from 'react';
import { GodotView } from './GodotView';
import type { GodotViewProps } from './types';
export declare const useGodotRef: () => React.RefObject<GodotView>;
export interface GodotProps extends GodotViewProps {
    ref?: RefObject<GodotView>;
}
export declare const Godot: FunctionComponent<GodotProps & React.RefAttributes<GodotView>>;
//# sourceMappingURL=Godot.d.ts.map