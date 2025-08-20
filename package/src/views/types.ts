import type {ViewProps, ImageSourcePropType} from 'react-native';
import {Node} from '../types';

export interface IGodotViewApi {
  setJsiProperty: <T>(nativeId: number, name: string, value: T) => void;
  pause: (nativeId: number) => void;
  resume: (nativeId: number) => void;
  getRoot: (nativeId: number) => Node | null;
  isReady: (nativeId: number) => boolean;
  startDrawing: () => void;
  stopDrawing: () => void;
  emitMessage: (nativeId: number, message: any) => void;
}

export type GodotMessageEventHandler = (instance: any, message: any) => void;

export interface GodotViewProps extends ViewProps {
  source?: ImageSourcePropType | string | number;
  scene?: string;
  debug?: boolean;
  onMessage?: GodotMessageEventHandler;
  onReady?: (instance: any) => void;
}