export class GodotView extends React.Component<any, any, any> {
    /**
     * Start drawing the Godot view.
     */
    static startDrawing(): void;
    /**
     * Stop drawing the Godot view
     */
    static stopDrawing(): void;
    constructor(props: any);
    _nativeID: number;
    get nativeId(): number;
    componentDidUpdate(prevProps: any): void;
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
     * Emit a message to the Godot view.
     */
    emitMessage(message: any): void;
    /**
     * Check if the Godot view is ready.
     */
    get isReady(): boolean;
    render(): React.CElement<object, React.Component<object, {}, any> & Readonly<import("react-native").NativeMethods>>;
}
import React from 'react';
//# sourceMappingURL=GodotView.d.ts.map