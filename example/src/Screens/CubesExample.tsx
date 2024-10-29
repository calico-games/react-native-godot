import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Godot, GodotView} from 'react-native-godot';
import {useNavigation} from '@react-navigation/native';

const CubesExample: React.FC = _props => {
  const navigation = useNavigation<any>();

  const cube1Ref = useRef<GodotView>(null);
  const cube2Ref = useRef<GodotView>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', (e: any) => {
      if (e.data.closing) {
        GodotView.stopDrawing();
      } else {
        GodotView.startDrawing();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('gestureCancel', () => {
      GodotView.startDrawing();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Godot
        ref={cube1Ref}
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
      <Godot
        ref={cube2Ref}
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cube: {
    flex: 2,
  },
});

export default CubesExample;
