import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {Routes} from '@/Routes';

export const examples = [
  {
    screen: 'CubesExample',
    title: '🔢 Cubes',
  },
  {
    screen: 'EarthExample',
    title: '🌎 Earth',
  },
] as const;

const Home: React.FC = _props => {
  const {navigate} = useNavigation<NativeStackNavigationProp<Routes, 'Home'>>();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior={'automatic'}>
      {examples.map(thumbnail => (
        <RectButton
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}>
          <View style={styles.thumbnail}>
            <Text style={styles.title}>{thumbnail.title}</Text>
            <Text style={styles.arrow}>➡️</Text>
          </View>
        </RectButton>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebf5f7',
  },
  content: {
    paddingBottom: 100,
    backgroundColor: 'clear',
  },
  thumbnail: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#afc8e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 32,
  },
});

export default Home;
