export const __esModule: boolean;
declare const GodotView_base: any;
export class GodotView extends GodotView_base {
    [x: string]: any;
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
     * Emit a message to the Godot view.
     */
    emitMessage(message: any): void;
    render(): any;
}
export {};
//# sourceMappingURL=GodotView.d.ts.map