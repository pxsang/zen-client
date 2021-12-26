import React from 'react';
import * as eva from '@eva-design/eva';
import {StatusBar, Text, View} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Geocoder from 'react-native-geocoding';

import {myTheme} from './custom-theme';
import AppProvider from './src/providers/AppProvider';
import Navigation from './src/navigation';
import getStore from './src/redux';

const strictTheme = {['text-font-family']: 'Baloo2-Regular'};
const customMapping = {strict: strictTheme};

const {store, persistor} = getStore();

Geocoder.init('AIzaSyD7Jj_OhSYIWgrBLNDS0ILeaI-sWnGid_Q');

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApplicationProvider {...eva} theme={{...eva.light, ...myTheme}} customMapping={customMapping}>
            <SafeAreaProvider>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
              />
              <AppProvider>
                <Host>
                  <Navigation />
                </Host>
              </AppProvider>
            </SafeAreaProvider>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
