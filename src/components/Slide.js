import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';

const {width} = Dimensions.get('screen');

const Slide = ({title, description, image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image
        source={image}
        style={styles.image}
      />
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D2D8B',
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    color: '#5D2D8B',
    textAlign: 'center',
  },
  image: {
    width: width - 40,
    height: (width - 40) * 0.6,
    resizeMode: 'contain',
  },
});
