import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import {Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';

import theme from '../constants/theme';

import BottomActions from './BottomActions';
import useTranslate from '../hooks/useTranslate';

export default function UpdateAvatar({size, data, onChange}) {
  const t = useTranslate();

  let [isOpenBottomAction, setOpenBottomAction] = useState(false);

  const onChooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (image) {
        handlePickPhoto(image);
      }
    });
  };

  const onTakePhoto = () => {
    ImagePicker.openCamera({
      width: 250,
      height: 250,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (image) {
        handlePickPhoto(image);
      }
    });
  };

  const handlePickPhoto = image => {
    onChange({
      path: image.path,
      base64: `data:${image.mime};base64,${image.data}`,
    });
    // setFormData({
    //   ...formData,
    //   avatar: image.path,
    //   avatarBase64Data: `data:${image.mime};base64,${image.data}`,
    // });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpenBottomAction(true)}>
        <View style={styles.avatarContainer(size)}>
          <Image
            style={styles.avatarImage(size)}
            source={
              data
                ? {
                    uri: data,
                  }
                : require('../assets/icons/avatar.png')
            }
          />
          <View style={styles.cameraIconContainer}>
            <Icon
              name="camera-outline"
              fill={theme.color.gray}
              style={styles.cameraIcon}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <BottomActions
        isVisible={isOpenBottomAction}
        onClose={() => setOpenBottomAction(false)}
        actions={[
          {
            title: t('choose_from_library'),
            onPress: onChooseFromLibrary,
          },
          {
            title: t('take_a_photo'),
            onPress: onTakePhoto,
          },
        ]}
      />
    </>
  );
}

UpdateAvatar.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func,
};

UpdateAvatar.defaultProps = {
  size: 142,
};

const styles = StyleSheet.create({
  avatarContainer: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  }),
  avatarImage: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
  cameraIconContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 48,
    height: 48,
  },
});
