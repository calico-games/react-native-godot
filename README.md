# React Native Godot

Bring **Godot** to **React Native** 🔮.

## Screenshots

[<img src="screenshots/screenshot1.jpeg" alt="Multiple Cubes demo" align="center" width="200" hspace="2" vspace="10">](screenshots/screenshot1.jpeg)
[<img src="screenshots/screenshot2.jpeg" alt="Earth demo" align="center" width="200" hspace="2" vspace="10">](screenshots/screenshot2.jpeg)

## Device Support

iOS support is implemented, full support for Android is almost ready.
We'll ship that soon 😊

| Platform         | Supported |
| ---------------- | --------- |
| iOS Simulator    | ✅        |
| iOS Device       | ✅        |
| Android Emulator | 🚧        |
| Android Device   | 🚧        |

## Requirements

- Godot 4.3

## Installation

```sh
npm install react-native-godot

or

yarn add react-native-godot
```

## Usage

Take a look at `example` folder for a full example 👀.
React Native implementation:

```tsx
import React, {useRef} from 'react';
import {Godot, GodotView} from 'react-native-godot';

const App = () => {
 const earthRef = useRef<GodotView>(null);

  return (
    <Godot
      ref={godotRef}
      style={{flex: 1}}
      source={require('./assets/game.pck')}
      scene="res://main.tscn"
      onMessage={(message) => console.log('Godot message:', message)}
    />
  );
};
```

Godot implementation:

```gdscript
# This class is a demonstration of GDScript with React Native.

extends Node

func _ready() -> void:
  if Engine.has_singleton("ReactNative"):
    Engine.get_singleton("ReactNative").on_receive_message(_on_receive_message)

func _on_receive_message(message: Dictionary) -> void:
  print("React Native message:", message)

func _input(event: InputEvent):    
  if "position" not in event:
    return

  var adjusted_position = adjust_for_window(event.position)

  if Engine.has_singleton("ReactNative"):
    Engine.get_singleton("ReactNative").emit_message({
      "message": "Input event position",
      "x": adjusted_position.x,
      "y": adjusted_position.y
    })

## This function is used to adjust the screen position for the window.
func adjust_for_window(pos: Vector2) -> Vector2:
  var window = get_viewport().get_window()
  var window_id = window.get_window_id()

  if window_id == DisplayServer.MAIN_WINDOW_ID or window_id == DisplayServer.INVALID_WINDOW_ID:
    return pos

  var window_position = Vector2()

  if Engine.has_singleton("ReactNative"):
    window_position = Engine.get_singleton("GDReactNative").get_subwindow_position(window_id)

  return Vector2(
    pos.x + window_position.x,
    pos.y + window_position.y
  )
```

## Godot (How to)

- To import your Godot project into react-native, you need to **generate a pck file** that basically packs up all your game assets, scripts etc.
It's a convenient way to pack your game into a single file.

- First, you need to add a `export_presets.cfg` in the directory of your Godot project.
We provide a working example of this file at the root of this repository.

- After that, you're now able to generate a pck file, just run `./gen-pck PROJECT_FOLDER_PATH`.
Be sure you have `/Applications/Godot.app` set on your machine, if you're using another path or another OS than macOS, just modify this very simple shell at your convenience.

- Then, you just need to move the pck file in your assets folder.

- One last thing, add a `project.godot` in your assets with the pck, see in the example folder for more details.

```gdscript

## Metro

- You need to add the following to your `metro.config.js` in order to treat `.pck` files as assets and exclude them from being treated as source files.

```js
// Treat `.pck` files as assets
assetExts: [...assetExts, 'pck'],
// Exclude `.pck` from being treated as source files
sourceExts: sourceExts.filter(ext => ext !== 'pck'),
```

And...

```js
server: {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (/\.pck$/.test(req.url)) {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
      return middleware(req, res, next);
    };
  },
},
```

## Library Size

The Godot engine is quite large, so the library size is also quite large too 😅.

Godot with all features enabled is around 140MB for iOS (arm64).
`godot-cpp` bindings is around 60MB, which is used to communicate with the Godot engine from React Native.
So for now, it's around 200MB for iOS (arm64), we might be able to reduce this size in the future.

For example by disabling features that are not needed, removing `MoltenVK` for iOS in 4.4 (which is around 9MB), not depending on `godot-cpp` by forking the engine completely, etc.
Also, your pck file must be considered in the size of your app. Which can be quite large too if you have a lot of big assets like 3D models, textures, etc.

## Limitations & Known Issues

- When importing a texture or 3D model, be sure you don't import them as `VRAM Compressed`, for some reason when exporting the pck file, it doesn't work properly. Might be a stupid mistake from our side.... 😅

[<img src="screenshots/screenshot3.jpeg" alt="VRAM Compressed" align="center" width="200" hspace="2" vspace="10">](screenshots/screenshot3.jpeg)

- **Godot Variants**: We don't support all Godot variants yet, like Vector2, Vector3, etc. We only support the most common types for now, which should be enough for most use cases.

- **PCK Asset Swapping**: For now, you can't swap the pck asset at runtime properly, you need to reopen the app to load a new pck asset. It seems to be a limitation of the Godot engine itself, but we're investigating this as it would be super useful to debug on device in real-time.

## Copyright / License

Copyright **Calico Games** 2024. All rights reserved.

This library is released under a **Custom License** with the following conditions:

- **Free for non-commercial use**: You may freely use this library for personal, educational, or open-source projects.
- **Commercial use by revenue-generating entities**: Any company or individual with an annual revenue exceeding $50,000 must obtain a commercial license to use this library.
- **No Redistribution Allowed**: This library cannot be redistributed, repackaged, or resold.

For commercial licensing inquiries, please contact us at `team@calico.games`.
