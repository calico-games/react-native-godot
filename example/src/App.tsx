import {JSX} from 'react';
import {enableScreens} from 'react-native-screens';
enableScreens(true);

import Sound from 'react-native-sound';
Sound.setCategory('Ambient', true);

import Root from '@/Root';

function App(): JSX.Element {
  return <Root />;
}

export default App;
