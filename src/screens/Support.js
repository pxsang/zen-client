import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import Text from '../components/Text';
import Header from '../components/Header3';
import useTranslate from '../hooks/useTranslate';

const {height} = Dimensions.get('screen');

const Support = props => {
  const t = useTranslate();

  return (
    <>
      <Header title={t('support')} {...props} />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: height / 4,
          flex: 1,
          paddingTop: 30,
        }}>
        <Layout style={[styles.container]}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${'0981346304'}`)}>
              <View
                style={{
                  padding: 25,
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
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 15,
                    }}
                    fill="#47D1C3"
                    name="phone-outline"
                  />
                  <Text semiBold size={16}>
                    {t('call_us')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Layout>
      </View>
    </>
  );
};

export default Support;

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
