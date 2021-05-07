import React, {useRef} from 'react';
import {View, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {useValue, onScrollEvent} from 'react-native-redash/lib/module/v1';
import Animated, {divide, multiply} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../components/Button';
import SwitchLanguage from '../components/SwitchLanguage';
import Dot from '../components/Dot';
import Slide from '../components/Slide';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const Splash = props => {
  const safeArea = useSafeAreaInsets();
  const scroll = useRef(null);
  const x = useValue(0);
  const onScroll = onScrollEvent({x});
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: safeArea.top || 20,
        height: 40,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        zIndex: 999,
      }}>
        <SwitchLanguage />
      </View>
      <View
        style={{height: height * 0.6}}
      >
        <Animated.ScrollView
          ref={scroll}
          horizontal
          scrollEventThrottle={1}
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          style={{height: '100%'}}
          bounces={false}
          {...{onScroll}}>
          {slides.map(({title, description, image}, index) => (
            <Slide key={index} title={title} image={image} description={description} />
          ))}
        </Animated.ScrollView>
      </View>
      <View style={{ height: height * 0.4 }}>
        <View style={{
          top: -20,
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image style={{ width: 160, height: 160 }} source={require('../assets/images/logo-1.png')} />
          </View>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{index, x}} />
            ))}
          </View>
        </View>
        <Animated.View
          style={[
            styles.footerContent(safeArea),
            {
              width: width * slides.length,
              transform: [{translateX: multiply(x, -1)}],
            },
          ]}>
          {slides.map((_, index) => {
            const last = index === slides.length - 1;

            return (
              <View key={index} style={styles.buttonContainer}>
                <Button
                  status="primary"
                  appearance={last ? 'filled' : 'outline'}
                  icon="arrow-forward-outline"
                  onPress={async () => {
                    if (last) {
                      navigation.push('SignIn');
                      return;
                    }
                    if (scroll.current) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}>
                  {last ? "Let's get Stated" : 'Next'}
                </Button>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerContent: safeArea => ({
    paddingBottom: safeArea.bottom + theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'flex-end',
  }),
  buttonContainer: {
    width,
    padding: theme.spacing.m,
  },
});

const slides = [
  {
    title: 'Treat yourself.',
    description: 'Get a premium massage in your home, office, hotel or wherever you are.',
    image: require('../assets/images/splash-1.png'),
  },
  {
    title: "You're in good hands.",
    description: 'We have a pool of certified massage therapists.',
    image: require('../assets/images/splash-2.png'),
  },
  {
    title: "It's time to relax.",
    description: 'Book your on-demand massage.',
    image: require('../assets/images/splash-1.png'),
  },
];
