import type {IGodotViewApi} from './types';

declare global {
  var GodotViewApi: IGodotViewApi;
}

export const {GodotViewApi} = global;