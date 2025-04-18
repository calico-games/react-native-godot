import {useEffect, useRef} from 'react';
import {Platform, StatusBar, View, StyleSheet} from 'react-native';
import {createStaticNavigation, NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import withPreventGoBack from '@/Utils/withPreventGoBack';
import {Godot, GodotProvider, GodotView} from 'react-native-godot';

import Home from '@/Screens/Home.tsx';
import CubesExample from '@/Screens/CubesExample';
import EarthExample from '@/Screens/EarthExample.tsx';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    presentation: 'card',
    headerStyle: {backgroundColor: 'transparent'},
    gestureEnabled: true,
    headerShown: false,
  },
  screens: {
    Home: {
      screen: withPreventGoBack(Home),
      options: {
        animation: 'slide_from_bottom',
        headerLargeTitle: true,
      },
    },
    CubesExample: {
      screen: CubesExample,
      options: {
        animation: 'slide_from_right',
      },
    },
    EarthExample: {
      screen: EarthExample,
      options: {
        animation: 'slide_from_right',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack as any);

const Root = () => {
  const navigationRef = useRef<NavigationContainerRef<ParamListBase> | undefined>(undefined);
  const routeNameRef = useRef<string | null>(null);
  const testingNavigation = useRef(true);

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
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
              {Platform.OS === 'android' ? (
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
              ) : (
                <StatusBar barStyle="dark-content" />
              )}
              {testingNavigation.current && (
                <Navigation
                  ref={navigationRef as any}
                  onReady={() => {
                    const root = navigationRef.current?.getCurrentRoute();

                    if (root) {
                      routeNameRef.current = root.name;
                    }
                  }}
                  onStateChange={async _state => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName =
                      navigationRef.current?.getCurrentRoute()?.name;

                    if (previousRouteName !== currentRouteName) {
                      console.log(
                        `Route changed: ${previousRouteName} => ${currentRouteName}`,
                      );
                    }
                    routeNameRef.current = currentRouteName || null;
                  }}
                />
              )}
              {!testingNavigation.current && (
                <View style={{flex: 1, backgroundColor: 'black'}}>
                  <Godot
                    style={{flex: 1}}
                    source={require('@/assets/cube.pck')}
                  />
                </View>
              )}
            </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </GodotProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Root;
