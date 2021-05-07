import React from 'react';
import * as eva from '@eva-design/eva';
import {StatusBar, Text, View} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Host} from 'react-native-portalize';
import {myTheme} from './custom-theme';

import Navigation from './src/navigation';

const strictTheme = {['text-font-family']: 'Poppins'};
const customMapping = {strict: strictTheme};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...myTheme}} customMapping={customMapping}>
        <Host>
          <SafeAreaProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <Navigation />
          </SafeAreaProvider>
        </Host>
      </ApplicationProvider>
    </>
  );
};

export default App;
