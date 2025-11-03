import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {GodotView, GodotViewRef, useGodot, useGodotRef} from 'react-native-godot';
import {useAsset} from './useAsset';

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
  const godotView = useGodotRef();
  const {Script, Node} = useGodot();
  
  // Use the clean hook to load the .pck asset
  const assetUri = useAsset('./godot/earth.pck');

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
    if (!isGodotReady || !godotView.current) {
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

  if (!assetUri) {
    return null;
  }

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
        source={assetUri}
      />
      {!isGodotReady && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(20, 20, 20)',
  },
});

export default Root;
