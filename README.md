<picture>
  <img alt="react-native-godot" src="./static/banner.png" />
</picture>

<br />

Bring **Godot** to **React Native** 🔮.
Create immersive 3D experiences or interactive games directly within React Native, allowing for high-performance graphics and responsive interactions.

[![npm version](https://img.shields.io/npm/v/react-native-godot.svg?style=flat)](https://www.npmjs.com/package/react-native-godot)
[![godot engine](https://img.shields.io/badge/Godot-4.4.1-blue)](https://godotengine.org/download)

## Screenshots 📸

[<img src="screenshots/screenshot1.jpeg" alt="Multiple Cubes demo" align="center" width="150" hspace="2" vspace="10">](screenshots/screenshot1.jpeg)
[<img src="screenshots/screenshot2.jpeg" alt="Earth demo" align="center" width="150" hspace="2" vspace="10">](screenshots/screenshot2.jpeg)

### Features 🚀

* 🏎️ Native C++ JSI performance
* 🔥 GPU-accelerated by Metal and OpenGL/Vulkan
* ✅ Supports old and new arch
* 🙂 Supports Godot Variants in React Native
* 🧨 Call GDScript methods in React Native
* 📦 Easy import of your Godot projects

## Device Support 📱

iOS support is implemented, full support for Android is almost ready.
We'll ship that soon 😊

| Platform         | Supported |
| ---------------- | --------- |
| iOS Simulator    | ✅        |
| iOS Device       | ✅        |
| Android Emulator | 🚧        |
| Android Device   | 🚧        |

## Requirements 🥸

* Godot 4.4.1 ([https://godotengine.org/](https://godotengine.org/))

## Installation 🚀

```sh
npm install react-native-godot

or

yarn add react-native-godot
```

## Usage 👇

Take a look at the `example` folder for a full implem 👀.

### React Native <-> Godot Communication 📡

You can send messages from React Native to Godot and receive messages from Godot in React Native.

* **React Native -> Godot**: You can send messages from React Native to Godot using the `emitMessage` method.
* **Godot -> React Native**: You can receive messages from Godot in React Native using the `onMessage` prop.

```tsx
// ⚠️ IMPORTANT ⚠️
// GodotProvider is required to initalize Godot properly
// (See in the example folder for more details)
//
// <GodotProvider>
//    <Example />
// <GodotProvider/>
//
// It should be at the root of your app.
// The highest level is recommended. e.g. App.tsx

import React, {useRef} from 'react';
import {Godot, GodotView, GodotProvider, useGodot} from 'react-native-godot';

const Example = () => {
 const godotRef = useRef<GodotView>(null);
 const {Vector3, Vector2} = useGodot(); 

  // Call gdsript method from React Native
  useEffect(() => {  
    if (!godotRef.current || !godotRef.current?.isReady) {
      return;
    }

    // Emit a message to Godot from React Native
    godotRef.current?.emitMessage({
      message: 'Hello from React Native!',
      position: Vector3(1, 2, 3),
    });

    // Use Godot Vector3 and Vector2 variants
    // All methods and properties are available too :)
    console.log('Vector3 y:', Vector3(1, 2, 3).y);
    console.log('Length', Vector2(3, 1).length());
  
    // Retrieve a node from your scene
    const node = godotRef.current?.getRoot()?.getNode('MySuperNode');
    if (!node) {
      return;
    }

    // Call method `hello_world` from the gdscript attached to the node in your scene
    node.hello_world();

    // You can also call your method and return a value with any supported types
    const something = node.method_that_returns_something();
    console.log('Something:', something);
  }, [godotRef.current?.isReady]);

  return (
    <Godot
      ref={godotRef}
      style={{flex: 1}}
      source={require('./assets/game.pck')}
      scene="res://main.tscn"
      {/* Receive messages from Godot */}
      onMessage={(message) => console.log('Godot message:', message)}
    />
  );
};
```

### Godot implementation (GDScript) 🧙‍♂️

```gdscript
# This class is a demonstration of GDScript with React Native.

extends Node

func _ready() -> void:
  if Engine.has_singleton("ReactNative"): # Always check if the ReactNative singleton exists
    Engine.get_singleton("ReactNative").on_message(_on_message)

func _on_message(message: Dictionary) -> void:
  print("React Native message:", message)

func _input(event: InputEvent) -> void:    
  if "position" not in event:
    return

  var adjusted_position = adjust_for_window(event.position)

  if Engine.has_singleton("ReactNative"):
    # Emit a message to React Native
    Engine.get_singleton("ReactNative").emit_message({
      "message": "Input event position",
      "pos": adjusted_position,
    })

func hello_world() -> void:
  print("Hello World!")

func method_that_returns_something() -> int:
  return 42

## This function is used to adjust the screen position for the window.
func adjust_for_window(pos: Vector2) -> Vector2:
  var window = get_viewport().get_window()
  var window_id = window.get_window_id()

  if window_id == DisplayServer.MAIN_WINDOW_ID or window_id == DisplayServer.INVALID_WINDOW_ID:
    return pos

  var window_position = Vector2()

  if Engine.has_singleton("ReactNative"):
    window_position = Engine.get_singleton("ReactNative").get_subwindow_position(window_id)

  return Vector2(
    pos.x + window_position.x,
    pos.y + window_position.y
  )
```

## Godot Variants 🍭

Godot variants are available in React Native, here is the list:
`AABB | Basis | Color | Plane | Projection | Quaternion | Rect2 | Rect2i | Transform2D | Transform3D | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i`.

For primitives like `int`, `float`, `bool`, `dictionary`, `array`, etc, you can use normal JS types and it will be automatically converted to Godot variants and vice versa.

All methods and properties are available too, for instance, you can use `Vector3(1, 2, 3).length()`.
Complete documentation is available at [https://docs.godotengine.org/en/stable/classes/index.html#variant-types](https://docs.godotengine.org/en/stable/classes/index.html#variant-types).

## Access any Godot Nodes from React Native 🎯

You can retrieve a node from your scene in React Native and call methods on it.

Current supported methods for a Node are:

* getNode(name: string): Node | null
* getParent(): Node | null
* getChildren(): Node[]
* getChildCount(): number

(+ Any method you've defined in your gdscript 😌)

## Import your Godot Project (How to) 📥

* To import your **Godot project** into React Native, you need to **generate a pck file** that basically packs up all your game assets, scripts etc.
It's a convenient way to pack your game into a single file.

* First, you need to add a `export_presets.cfg` in the directory of your Godot project.
We provide a working example of this file at the root of this repository.

* After that, you're now able to generate a pck file, just run `./gen-pck PROJECT_FOLDER_PATH`.
Be sure you have `/Applications/Godot.app` set on your machine, if you're using another path or another OS than macOS, just modify this very simple shell at your convenience.

* Then, you just need to move the pck file in your assets folder.

* One last important thing, don't forget to add a `project.godot` in your XCode project, see in the example folder for more details.

## Metro Config 🚇

* You need to add the following to your `metro.config.js` in order to treat `.pck` files as assets and exclude them from being treated as source files.

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

## Limitations & Known Issues 🚧

* When importing a texture or 3D model, be sure you don't import them as `VRAM Compressed`, for some reason when exporting the pck file, it doesn't import the assets. Might be a mistake from our side.... (TBD) 😅

[<img src="screenshots/screenshot3.png" alt="VRAM Compressed" align="center" width="200" hspace="2" vspace="10">](screenshots/screenshot3.png)

* **PCK Asset Swapping**: For now, you can't swap the pck asset at runtime properly, you need to reopen the app to load a new pck asset. It seems to be a limitation of the Godot engine itself, but we're investigating this as it would be super useful to debug on device in almost real-time.

## TODO 📝

* [x] iOS support
* [ ] Android support
* [x] Improve library size
* [x] Add support for all Godot variants
* [ ] Investigate PCK asset swapping
* [x] Add support for more Godot features

## Contributing 🤝

We're open to any contributions. Feel free to open an issue if you want to help us improve this library.

All the interesting stuff is located in a private repository so if you want to contribute, just send us an email at `team@calico.games`.
You should have previous experiences of building the Godot Engine yourself, C++, and building blazing fast React Native libraries is a plus.
[Bazel](https://github.com/bazelbuild/bazel) is also used internally to build the library fyk.

## Copyright / License 👨‍⚖️

Copyright **Calico Games** 2024. All rights reserved.

This library is released under a **Custom License** with the following conditions:

* **Free for non-commercial use**: You may freely use this library for personal, educational, or open-source projects.
* **Commercial use by revenue-generating entities**: Any company or individual with an annual revenue exceeding $50,000 must obtain a commercial license to use this library.
* **No Redistribution Allowed**: This library cannot be redistributed, repackaged, or resold.

PS: We are pretty flexible atm and we would like to also support the Godot Foundation by giving them a share of the revenue generated by this library.

For commercial licensing inquiries, please contact us at `team@calico.games`.

## Credits 🙏

* Special thanks to all the contributors of the [Godot Engine](https://github.com/godotengine/godot).
* A big shoutout to [Migeran](https://github.com/migeran) that helped us a lot to build this library.
