import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, Platform, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import BottomActions from '../components/BottomActions';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';
import {LANGUAGE_TITLE, LANGUAGE_LIST} from '../constants/Constants';

const {width, height} = Dimensions.get('screen');

const Settings = props => {
  const {navigation} = props;
  const {t, language, switchLanguage, logout} = useContext(AppContext);

  let [isOpenSelectLanguage, setOpenSelectLanguage] = useState(false);

  return (
    <>
      <Header {...props} title={t('settings')} hideRightMenu />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        flex: 1,
        paddingTop: 30,
      }}>
      <Layout style={[styles.container]}>
        <View
          style={styles.content}
        >
          <TouchableWithoutFeedback onPress={() => navigation.navigate('UpdateProfile')}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 12,
              backgroundColor: 'white',
              shadowColor: '#303030',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 10,
              marginBottom: 40,
            }}>
              <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
                <Icon
                  style={{ width: 22, height: 22 }}
                  fill={theme.color.primary}
                  name='settings-outline'
                />
                <View width={10} />
                <Text color={theme.color.primary}>{t('edit_profile')}</Text>
              </View>
              <Icon
                style={{ width: 24, height: 24 }}
                fill='#8F9BB3'
                name='arrow-ios-forward-outline'
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setOpenSelectLanguage(true)}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 12,
              backgroundColor: 'white',
              shadowColor: '#303030',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 10,
              marginBottom: 40,
            }}>
              <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
                <Icon
                  style={{ width: 22, height: 22 }}
                  fill={theme.color.primary}
                  name='globe-outline'
                />
                <View width={10} />
                <Text color={theme.color.primary}>{t('language')}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text color={theme.color.secondary}>
                  {LANGUAGE_TITLE[language]}
                </Text>
                <View width={10} />
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='#8F9BB3'
                  name='arrow-ios-downward-outline'
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={theme.block.rowCenter}>
            <TouchableWithoutFeedback onPress={logout}>
              <Text center color={theme.color.link}>{t('logout')}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Layout>
      </View>
      <BottomActions
        isVisible={isOpenSelectLanguage}
        onClose={() => setOpenSelectLanguage(false)}
        actions={LANGUAGE_LIST.map(({_, value}) => ({
          title: t(value),
          i18nKey: value,
          onPress: () => switchLanguage(value),
        }))}
      />
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 70,
    flex: 1,
    paddingHorizontal: 20,
  },
});
