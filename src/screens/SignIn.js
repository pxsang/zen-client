import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Input, Icon} from '@ui-kitten/components';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import {phoneValidator, convertTo0PhoneNumber} from '../helpers/display';
import {loginWithPassword} from '../redux/actions/user';
import theme from '../constants/theme';
import useTranslate from '../hooks/useTranslate';

const {height} = Dimensions.get('screen');

const SignIn = props => {
  const t = useTranslate();
  const dispatch = useDispatch();
  const {navigation} = props;
  let [phoneNumber, setPhoneNumber] = useState('');
  let [password, setPassword] = useState('');
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const handlePhoneLogin = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');

      const action = loginWithPassword(
        convertTo0PhoneNumber(`+84${phoneNumber}`),
        password,
      );
      await dispatch(action);
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
      <View style={styles.errorContainer}>
        <Icon
          style={styles.errorIcon}
          fill={theme.color.error}
          name="alert-triangle-outline"
        />
        <Text color={theme.color.error}>{errorMessage}</Text>
      </View>
    );
  };

  return (
    <>
      <Header {...props} hiddenBack title={t('sign_in_title')} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text size={28} color="#2E384D">
            {t('sign_in')}
          </Text>
          <View height={20} />
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={200}
            behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <ScrollView style={styles.content}>
                <View>
                  <Input
                    keyboardType="phone-pad"
                    label={
                      <Text style={styles.inputLabel}>
                        {t('email_phone_number')}
                      </Text>
                    }
                    placeholder={t('enter_your_email_phone_number')}
                    value={phoneNumber}
                    onChangeText={nextValue => setPhoneNumber(nextValue)}
                    style={styles.input}
                  />
                  <View height={15} />
                  <Input
                    label={
                      <Text style={styles.inputLabel}>{t('password')}</Text>
                    }
                    placeholder={t('enter_your_password')}
                    value={password}
                    status={isFailed ? 'danger' : 'basic'}
                    caption={renderError()}
                    onChangeText={nextValue => setPassword(nextValue)}
                    secureTextEntry
                  />
                  <GhostButton
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    {t('forgot_password')}
                  </GhostButton>
                  <View>
                    <Button
                      isLoading={isLoading}
                      icon="arrow-forward-outline"
                      disabled={!phoneValidator(phoneNumber)}
                      onPress={() => handlePhoneLogin()}>
                      {t('login')}
                    </Button>
                    <GhostButton onPress={() => navigation.navigate('SignUp')}>
                      {t('or_create_my_account')}
                    </GhostButton>
                  </View>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('TermOfUse')}>
                  <Text>
                    <Text>{t('terms_description_1')}</Text>{' '}
                    <Text bold>{t('terms_description_2')}</Text>{' '}
                    <Text>{t('terms_description_3')} </Text>{' '}
                    <Text bold>{t('terms_description_4')}</Text>
                  </Text>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  errorIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    padding: 20,
    height: height - height / 4,
  },
  contentContainer: {
    backgroundColor: '#FEF3F3',
    borderRadius: 30,
    flex: 1,
    padding: 20,
  },
  content: {
    // flex: 1,
    // justifyContent: 'space-between',
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
});
