import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  install: () => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>("GodotModule") as Spec | null;