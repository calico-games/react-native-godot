import type { ViewProps, ImageSourcePropType } from 'react-native';
export interface IGodotViewApi {
    setJsiProperty: <T>(nativeId: number, name: string, value: T) => void;
    pause: (nativeId: number) => void;
    resume: (nativeId: number) => void;
    startDrawing: () => void;
    stopDrawing: () => void;
    emitMessage: (nativeId: number, message: any) => void;
}
export type GodotMessageEventHandler = (message: any) => void;
type Source = ImageSourcePropType;
export interface GodotViewProps extends ViewProps {
    source?: Source;
    debug?: boolean;
    onMessage?: GodotMessageEventHandler;
}
export {};
//# sourceMappingURL=types.d.ts.map