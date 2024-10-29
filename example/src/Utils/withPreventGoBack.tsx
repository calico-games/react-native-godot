import {useEffect} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// Prevent the user from going back to the previous screen
const withPreventGoBack = (WrappedComponent: any) => {
  const PreventGoBackComponent = (props: any) => {
    const isFocused = useIsFocused();

    useEffect(() => {
      let backHandler: NativeEventSubscription;

      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (!isFocused) {
          return false;
        }

        BackHandler.exitApp();
        console.log('Prevented going back');
        return true;
      });

      return () => {
        backHandler ? backHandler.remove() : null;
      };
    }, [isFocused]);

    return <WrappedComponent {...props} />;
  };

  return PreventGoBackComponent;
};

export default withPreventGoBack;
