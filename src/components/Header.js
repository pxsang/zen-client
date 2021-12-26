import React from 'react';
import {View, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '@ui-kitten/components';
import Text from '../components/Text';
import SwitchLanguage from '../components/SwitchLanguage';

const {width, height} = Dimensions.get('screen');

const Header = ({title, navigation, hiddenBack}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={{
      height: height / 2,
      width,
      backgroundColor: '#F18C8E',
      borderBottomLeftRadius: 45,
      borderBottomRightRadius: 45,
      overflow: 'hidden',
    }}>
      <View>
        <Image
          source={require('../assets/images/background.png')}
          style={{
            width: width * 2,
            height: width * 2,
            resizeMode: 'contain',
            transform: [{
              translateX: -width / 2,
            }, {
              translateY: -width / 2,
            }],
            zIndex: -1,
          }}
        />
      </View>
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: safeArea.top,
        zIndex: 99,
      }}>
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          {!hiddenBack ? (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon
                  name="arrow-back-outline"
                  fill="white"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View />
          )}
          <SwitchLanguage />
        </View>
      </View>
      <View style={{
        position: 'absolute',
        right: -20,
        top: 60,
      }}>
        <Image
          source={require('../assets/images/boy.png')}
          style={{
            height: height / 2,
            width: height / 4,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{
        position: 'absolute',
        left: 0,
        bottom: '50%',
      }}>
        <View style={{
          paddingHorizontal: 20,
          paddingRight: 80,
        }}>
          <Text size={24} bold color="white">{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
