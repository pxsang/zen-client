import React from 'react';
import {View, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Layout, Icon, Input, Divider, List, ListItem} from '@ui-kitten/components';
import Text from '../components/Text';

const {width, height} = Dimensions.get('screen');

const Header = ({title, i18nKey, small, navigation, hideRightMenu}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={{
      height: height / 2,
      width,
      backgroundColor: '#5AA6C8',
      overflow: 'hidden',
    }}>
      <View>
        <Image
          source={require('../assets/images/background-2.png')}
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
        top: safeArea.top + 20,
      }}>
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
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
          {/* {!hideRightMenu &&
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <View style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon
                  name="menu-outline"
                  fill="white"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          } */}
        </View>
      </View>
      <View style={{
        position: 'absolute',
        left: 0,
        top: small ? safeArea.top + 80 : 'auto',
        bottom: !small ? '50%' : 'auto',
      }}>
        <View style={{
          paddingHorizontal: 20,
          paddingRight: 80,
        }}>
          <Text size={small ? 14 : 24} bold color="white" i18nKey={i18nKey}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
