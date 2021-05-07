import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../components/Text';
import SwitchLanguage from '../components/SwitchLanguage';

const {width, height} = Dimensions.get('screen');

const Header = ({title}) => {
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
        right: 0,
        top: safeArea.top,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
      }}>
        <SwitchLanguage />
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
