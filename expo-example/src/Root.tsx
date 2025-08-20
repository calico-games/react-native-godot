import React, {useEffect} from 'react';
import {View, NativeModules, Platform, StyleSheet} from 'react-native';
import {GodotView, GodotViewRef, useGodot, useGodotRef} from 'react-native-godot';

const gdscriptCode = `extends Node

@onready var singleton = Engine.get_singleton("ReactNative")

func _ready():
	if singleton:
		var message = {"message": "Hello world!"}
		singleton.emit_message(message)

func fibonacci(n: int) -> int:
	if n <= 1:
		return n
	return fibonacci(n - 1) + fibonacci(n - 2)

func test2(value):
	return pow(value, 2)
`;

const Root = () => {
  const random  = Math.random().toString(36).substring(2, 15);
  const godotView = useGodotRef();
  const {Script, Node} = useGodot();

  // Get Metro bundler URL dynamically
  let metroHost = 'localhost:8081';
  
  if (__DEV__) {
    const scriptURL = NativeModules.SourceCode?.getConstants().scriptURL || '';
    
    if (scriptURL) {
      // Extract host and port from scriptURL
      // Example: "http://192.168.1.24:8081/index.bundle?platform=ios&dev=true"
      const match = scriptURL.match(/http:\/\/([\d.\w]+:\d+)\//);
      if (match) {
        metroHost = match[1];
      }
    } else if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to access host machine
      metroHost = '10.0.2.2:8081';
    }
  } else {
    // TODO
  }

  useEffect(() => {
    if (!GodotView) {
      return;
    }
    GodotView.startDrawing();

    return () => {
      GodotView.stopDrawing();
    }
  }, []);

  const [isGodotReady, setIsGodotReady] = React.useState(false);

  const script = Script();
  const node = Node();

  useEffect(() => {
    if (!isGodotReady || !godotView.current || !godotView.current.isReady) {
      return;
    }

    if (script.setSourceCode(gdscriptCode)) {
      // Attach the compiled script to the node
      node.setScript(script);
      node.setName("MyScript");
      
      const root = godotView.current.getRoot();
      
      // Add script node to scene tree
      root.addChild(node);
      
      // Execute script methods
      console.log("Fibonacci result:", (node as any)?.fibonacci(10));
      
      const result = node.call("test2", 123);
      console.log("Script calculation result:", result);
    }
  }, [isGodotReady, gdscriptCode]);

  return (
    <View style={styles.container}>
      <GodotView
        ref={godotView}
        onReady={(_instance: GodotViewRef) => {
          setIsGodotReady(true);
        }}
        onMessage={(_instance, message) => {
          console.log("📩 Message from Godot:", message);
        }}
        style={{flex: 1}}
        source={`http://${metroHost}/assets/?unstable_path=./assets/cube.pck&hash=${random}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

export default Root;
