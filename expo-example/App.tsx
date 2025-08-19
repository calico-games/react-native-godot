import React, {useEffect} from 'react';
import {View, NativeModules, Platform} from 'react-native';
import {GodotProvider, GodotView} from 'react-native-godot';

export default function App() {
  const random  = Math.random().toString(36).substring(2, 15);
  
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
  

  return (
    <GodotProvider>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <GodotView
          style={{flex: 1}}
          source={`http://${metroHost}/assets/?unstable_path=./assets/cube.pck&hash=${random}`}
        />
      </View>
    </GodotProvider>
  );
}