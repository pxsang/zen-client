import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {Extrapolate, interpolateNode, lessThan, multiply} from 'react-native-reanimated';
import theme from '../constants/theme';
import HalfCircle from './HalfCircle';

const CircularProgress = ({progress}) => {
  const theta = multiply(progress, 2 * 3.14);
  const rotate = interpolateNode(theta, {
    inputRange: [3.14, 2 * 3.14],
    outputRange: [0, 3.14],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = lessThan(theta, 3.14);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', transform: [{ rotate: "90deg" }] }}>
      <View style={{ zIndex: 1 }}>
        <HalfCircle color={theme.color.primary} />
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            {translateY: 60 / 2},
            {rotate: theta},
            {translateY: -60 / 2},
          ],
          opacity
          }}>
          <HalfCircle color="#F4CACA" />
        </Animated.View>
      </View>
      <View style={{
        transform: [{
          rotate: "180deg"
        }]
      }}>
        <HalfCircle color={theme.color.primary} />
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            {translateY: 60 / 2},
            {rotate},
            {translateY: -60 / 2},
          ],
        }}>
          <HalfCircle color="#F4CACA" />
        </Animated.View>
      </View>
    </View>
  )
}

export default CircularProgress;
