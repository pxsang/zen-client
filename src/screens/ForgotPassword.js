import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import {Input, Icon} from '@ui-kitten/components';
import {forgotPassword} from '../redux/actions/user';
import {phoneValidator, convertTo0PhoneNumber} from '../helpers/display';
import theme from '../constants/theme';
import useTranslate from '../hooks/useTranslate';

const {height} = Dimensions.get('screen');

const ForgotPassword = props => {
  const dispatch = useDispatch();
  const t = useTranslate();
  const {navigation} = props;
  // const UserState = useSelector(state => state.User);
  // const {isLoading, isFailed, errorMessage} = UserState.forgotPassword;
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');

      const action = forgotPassword(convertTo0PhoneNumber(`+84${phoneNumber}`));
      const result = await dispatch(action);

      if (result) {
        navigation.navigate('VerifyOTP', {
          type: 'forgot_password',
          phoneNumber: convertTo0PhoneNumber(`+84${phoneNumber}`),
        });
      }
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    if (!isFailed) {
      return null;
    }

    return (
      <View>
        <View height={10} />
        <View style={[theme.block.rowMiddle]}>
          <Icon
            style={styles.errorIcon}
            fill={theme.color.error}
            name="alert-triangle-outline"
          />
          <View width={10} />
          <Text color={theme.color.error}>{errorMessage}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header {...props} title={t('forgot_password')} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* <Text size={12} color="#2E384D">Forgot Password?!</Text> */}
          <Text bold size={24} color="#2E384D">
            {t('dont_worry')}
          </Text>
          <View style={theme.block.paddingVertical(20)}>
            <View style={styles.formContainer}>
              <Input
                keyboardType="phone-pad"
                placeholder={t('enter_your_phone_number')}
                // accessoryLeft={renderCountryCode}
                size="large"
                value={phoneNumber}
                status={isFailed ? 'danger' : 'basic'}
                caption={renderError()}
                onChangeText={nextValue => setPhoneNumber(nextValue)}
                textStyle={styles.inputText}
                style={styles.input}
              />

              <View height={20} />

              <View>
                <GhostButton onPress={() => navigation.navigate('SignIn')}>
                  <View>
                    <View style={styles.resendContainer}>
                      <Text>
                        <Text>{t('no_problem')} </Text>
                        <Text bold>{t('sign_in')}</Text>
                      </Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <View>
              <Button
                isLoading={isLoading}
                disabled={!phoneValidator(phoneNumber)}
                icon="arrow-forward-outline"
                onPress={handleForgotPassword}>
                {t('continue')}
              </Button>
              <View style={theme.block.rowCenter}>
                <GhostButton onPress={() => navigation.navigate('TermOfUse')}>
                  {t('terms_and_conditions')}
                </GhostButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

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
  inputText: {
    paddingVertical: 3,
  },
  input: {
    borderRadius: 12,
  },
  errorIcon: {
    width: 24,
    height: 24,
  },
});
