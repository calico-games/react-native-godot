import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {GodotView} from 'react-native-godot';
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
    const unsubscribe = navigation.addListener('transitionEnd', (e: any) => {
      if (!e.data.closing) {
        GodotView.startDrawing();
      }
    });

    return () => {
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
      <GodotView
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
      <GodotView
        style={styles.cube}
        source={require('@/assets/cube.pck')}
      />
      <GodotView
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
