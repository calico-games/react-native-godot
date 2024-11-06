import React from 'react';
import type { GodotViewProps } from './types';
export declare class GodotView extends React.Component<GodotViewProps> {
    constructor(props: GodotViewProps);
    private _nativeID;
    get nativeId(): number;
    componentDidUpdate(prevProps: GodotViewProps): void;
    /**
     * Pause the Godot view.
     */
    pause(): void;
    /**
     * Resume the Godot view.
     */
    resume(): void;
    /**
     * Resume the Godot view.
     */
    getRoot(): number;
    /**
     * Start drawing the Godot view.
     */
    static startDrawing(): void;
    /**
     * Stop drawing the Godot view
     */
    static stopDrawing(): void;
    /**
     * Emit a message to the Godot view.
     */
    emitMessage(message: any): void;
    /**
     * Check if the Godot view is ready.
     */
    get isReady(): boolean;
    render(): React.JSX.Element;
}
//# sourceMappingURL=GodotView.d.ts.map