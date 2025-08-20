import React from 'react';
import {GodotProvider} from 'react-native-godot';
import Root from './src/Root';

export default function App() {
  return (
    <GodotProvider>
      <Root />
    </GodotProvider>
  );
}