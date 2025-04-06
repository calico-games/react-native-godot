import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Godot, GodotView} from 'react-native-godot';
import {useNavigation} from '@react-navigation/native';

const CubesExample: React.FC = _props => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', (e: any) => {
      if (e.data.closing) {
        GodotView.stopDrawing();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let timeout: number | null = null;

    const unsubscribe = navigation.addListener('transitionEnd', (e: any) => {
      if (!e.data.closing) {
        timeout = setTimeout(() => {
          GodotView.startDrawing();
        }, 250);
      }
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      unsubscribe();
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('gestureCancel', () => {
      GodotView.startDrawing();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Godot
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
      <Godot
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
      <Godot
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cube: {
    flex: 1,
  },
});

export default CubesExample;
