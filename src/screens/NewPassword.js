import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import {Input, Icon} from '@ui-kitten/components';
import {setPassword} from '../redux/actions/user';
import {AppContext} from '../providers/AppProvider';
import theme from '../constants/theme';

const {height} = Dimensions.get('screen');

const NewPassword = props => {
  const {t} = useContext(AppContext);
  const zoomIconRef = useRef();
  const dispatch = useDispatch();
  // const UserState = useSelector(state => state.User);
  // const {
  //   isLoading,
  //   isSuccessful,
  //   isFailed,
  //   errorMessage,
  // } = UserState.updatePassword;
  let [shownNewPassword, setShownNewPassword] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  const {navigation} = props;

  const renderCheckMarkIcon = iconProps => (
    <Icon
      {...iconProps}
      ref={zoomIconRef}
      animation="zoom"
      name="checkmark-circle-2"
      fill={isEqualConfirmPassword() ? theme.color.primary : theme.color.gray}
    />
  );

  const renderNewPasswordEyeIcon = iconProps => (
    <TouchableWithoutFeedback
      onPress={() => setShownNewPassword(!shownNewPassword)}>
      <Icon {...iconProps} name={shownNewPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  let [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });

  const handleSetPassword = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');

      const action = setPassword(formData);
      const result = await dispatch(action);

      if (result) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isEqualConfirmPassword = () => {
    const {new_password, confirm_password} = formData;

    return confirm_password && confirm_password === new_password;
  };

  const canSubmit = () => {
    const {new_password, confirm_password} = formData;

    return (
      isEqualConfirmPassword() &&
      new_password &&
      new_password.length >= 6 &&
      confirm_password &&
      confirm_password.length >= 6
    );
  };

  const renderError = () => {
    if (!isFailed) {
      return null;
    }

    return (
      <View>
        <View style={theme.block.rowMiddle}>
          <Icon
            style={styles.errorIcon}
            fill={theme.color.error}
            name="alert-triangle-outline"
          />
          <View width={10} />
          <Text color={theme.color.error}>{errorMessage}</Text>
        </View>
        <View height={10} />
      </View>
    );
  };

  return (
    <>
      <Header hiddenBack title={t('forgot_password')} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text bold size={24} color="#2E384D">
            {t('very_easy')}
          </Text>
          <View style={theme.block.paddingVertical(20)}>
            <View style={styles.formContainer}>
              <View height={20} />
              <View>
                <View>
                  <Input
                    label={
                      <Text style={styles.inputLabel}>{t('new_password')}</Text>
                    }
                    caption={t('password_caption')}
                    placeholder={t('enter_new_password')}
                    value={formData.new_password}
                    onChangeText={nextValue =>
                      setFormData({...formData, new_password: nextValue})
                    }
                    accessoryRight={renderNewPasswordEyeIcon}
                    secureTextEntry={!shownNewPassword}
                  />
                </View>

                <View height={30} />

                <View>
                  <Input
                    label={
                      <Text style={styles.inputLabel}>
                        {t('confirm_password')}
                      </Text>
                    }
                    placeholder={t('enter_confirm_password')}
                    value={formData.confirm_password}
                    accessoryRight={renderCheckMarkIcon}
                    onChangeText={nextValue =>
                      setFormData({...formData, confirm_password: nextValue})
                    }
                    secureTextEntry
                  />
                </View>

                <View height={30} />
              </View>
            </View>
            <View>
              {renderError()}
              <Button
                isLoading={isLoading}
                disabled={!canSubmit()}
                onPress={handleSetPassword}
                icon="arrow-forward-outline">
                {t('complete')}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    padding: 20,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#FEF3F3',
    borderRadius: 30,
    flex: 1,
    padding: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: theme.color.border,
  },
  countryCodeIcon: {
    width: 24,
    height: 16,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  countryCode: {
    marginLeft: 5,
    fontSize: 18,
  },
  inputLabel: {
    fontWeight: '400',
    fontSize: 12,
    color: '#8C98A9',
  },
  input: {
    borderRadius: 5,
    fontSize: 13,
  },
  errorIcon: {
    width: 24,
    height: 24,
  },
});
