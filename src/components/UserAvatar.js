import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';

export default function UserAvatar({...props}) {
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;

  let [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    setImageSrc(
      userInfo?.avatar
        ? {uri: userInfo.avatar}
        : require('../assets/icons/user-avatar.png'),
    );
  }, [userInfo.avatar]);

  return (
    <Image
      {...props}
      source={imageSrc}
      onError={() => setImageSrc(require('../assets/icons/user-avatar.png'))}
    />
  );
}
