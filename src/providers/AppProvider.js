import React, {createContext, useEffect, useMemo} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../components/Text';
import {switchLanguage} from '../redux/actions/app';
import {logout} from '../redux/actions/user';
import t, {setLocale} from '../i18n';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const dispatch = useDispatch();
  const AppState = useSelector(state => state.App);

  const {language} = AppState;

  useMemo(() => {
    setLocale(language);
  }, [language]);

  const onSwitchLanguage = lang => {
    dispatch(switchLanguage(lang));
  };

  const onLogout = () => {
    Alert.alert(t('logout'), t('are_you_sure_to_logout'), [
      {
        text: t('no_i_will_stay'),
        style: 'cancel',
      },
      {
        text: t('logout'),
        style: 'destructive',
        onPress: async () => {
          await dispatch(logout());
        },
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        t,
        switchLanguage: onSwitchLanguage,
        logout: onLogout,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
