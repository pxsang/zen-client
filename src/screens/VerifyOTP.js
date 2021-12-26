import React, {useCallback, useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import OTP from '../components/OTP';
import GhostButton from '../components/GhostButton';
import Button from '../components/Button';
import theme from '../constants/theme';
import {verifyOTP} from '../redux/actions/user';
import {AppContext} from '../providers/AppProvider';

const {height} = Dimensions.get('screen');

const VerifyOTP = props => {
  const dispatch = useDispatch();
  const {t} = useContext(AppContext);
  const safeArea = useSafeAreaInsets();
  const {route} = props;
  const {phoneNumber, type} = route.params || {};

  // const UserState = useSelector(state => state.User);
  // const { isLoading, isFailed, errorMessage } = UserState.login;
  let [otp, setOTP] = useState('1111');
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const handleVerifyOTP = useCallback(async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');
      const action = verifyOTP(phoneNumber, otp, type);
      await dispatch(action);
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, otp, phoneNumber, type]);

  useEffect(() => {
    setTimeout(() => {
      handleVerifyOTP();
    });
  }, [handleVerifyOTP]);

  return (
    <>
      <Header {...props} title={t('phone_verification')} />
      <View style={styles.container(safeArea)}>
        <View style={styles.contentContainer}>
          <Text bold size={24} color="#2E384D">
            {t('enter_your_otp_code')}
          </Text>
          <View style={theme.block.paddingVertical(20)}>
            <Text>
              {t('phone_verification_description', {phoneNumber})}
              {/* <Text bold color="#F18C8E"> Did you enter the correct number?</Text> */}
            </Text>
            <View style={styles.formContainer}>
              <OTP
                value={otp}
                autoFocus
                isNumberInput
                length={4}
                onChangeOTP={setOTP}
              />
              {isFailed && (
                <View>
                  <View height={10} />
                  <Text color={theme.color.error}>{errorMessage}</Text>
                </View>
              )}
              <View>
                <GhostButton>
                  <View>
                    <View style={styles.resendContainer}>
                      <Text>{t('resend_code_in')} </Text>
                      <Text bold>{t('seconds', {seconds: 10})}</Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <Button
              icon="arrow-forward-outline"
              isLoading={isLoading}
              disabled={otp?.length < 4}
              onPress={handleVerifyOTP}>
              {t('continue')}
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: safeArea => ({
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    padding: 20,
    paddingBottom: safeArea.bottom || 20,
    flex: 1,
  }),
  contentContainer: {
    backgroundColor: '#FEF3F3',
    borderRadius: 30,
    flex: 1,
    padding: 20,
  },
  formContainer: {
    paddingVertical: 20,
  },
  otpContainer: {
    marginVertical: 40,
  },
  resendContainer: {
    flexDirection: 'row',
  },
});
