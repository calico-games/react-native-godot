import NativeGodotModule from './specs/NativeGodotModule';

if (global.GodotViewApi == null) {
  // Initialize RN Godot
  const GodotModule = NativeGodotModule;
  if (GodotModule == null || typeof GodotModule.install !== "function") {
    throw new Error(
      "Native RNGodot Module cannot be found! Make sure you correctly " +
        "installed native dependencies and rebuilt your app."
    );
  }
  const result = GodotModule.install();
  if (result !== true) {
    throw new Error(
      `Native Godot Module failed to correctly install JSI Bindings! Result: ${result}`
    );
  }

  console.info("[react-native-godot] Native Godot Module initialized successfully");
}