import {useRef} from 'react';
import {Platform, StatusBar, View, StyleSheet} from 'react-native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import withPreventGoBack from '@/Utils/withPreventGoBack';
import {GodotProvider} from 'react-native-godot';

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
    animationDuration: 250,
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
  const navigationRef = useRef<any>();
  const routeNameRef = useRef<string>();

  return (
    <GodotProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <View style={styles.container}>
              {Platform.OS === 'android' ? (
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
              ) : (
                <StatusBar barStyle="dark-content" />
              )}
              <Navigation
                ref={navigationRef}
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
                  routeNameRef.current = currentRouteName;
                }}
              />
            </View>
          </BottomSheetModalProvider>
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
