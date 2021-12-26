import React from 'react';
import FastImage from 'react-native-fast-image';

const Image = props => {
  return <FastImage {...props} resizeMode={FastImage.resizeMode.contain} />;
};

export default Image;
