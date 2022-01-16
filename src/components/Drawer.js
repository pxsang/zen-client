import React, {useContext} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Drawer as UIDrawer, DrawerItem} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import UserAvatar from './UserAvatar';
import Text from './Text';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';

const Drawer = ({navigation, state}) => {
  const {t} = useContext(AppContext);
  const safeArea = useSafeAreaInsets();
  const UserState = useSelector(_ => _.User);
  const {userInfo} = UserState;

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return 'Good morning,';
    }

    return 'Good afternoon,';
  };

  return (
    <UIDrawer
      // selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}
      appearance="noDivider"
      header={() => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Profile');
          }}>
          <View style={styles.headerContainer(safeArea)}>
            <UserAvatar style={styles.avatar} />
            <View>
              <Text size={12}>{getGreeting()}</Text>
              <Text bold size={24}>
                {userInfo?.name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      footer={() => (
        <View style={styles.footerContainer(safeArea)}>
          <Text bold size={12} color={theme.color.gray}>
            Do more
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Make money giving therapeutic massage.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Refer a certified massage therapist.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Rate us on store.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            ZenAppPro.com
          </Text>
        </View>
      )}>
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('history')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('History');
        }}
      />
      {/* <DrawerItem
        title={
          <Text bold size={24}>
            Session History
          </Text>
        }
        onPress={() => navigation.navigate('SessionHistory')}
      /> */}
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('rewards')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Rewards');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('settings')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Settings');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('support')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Support');
        }}
      />
    </UIDrawer>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  headerContainer: safeArea => ({
    paddingVertical: 30,
    paddingTop: safeArea.top + 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    marginBottom: 20,
  }),
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    marginRight: 20,
  },
  footerContainer: safeArea => ({
    paddingHorizontal: 20,
    paddingBottom: safeArea.bottom + 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
    marginTop: 20,
  }),
  footerItem: {
    marginTop: 5,
  },
});
