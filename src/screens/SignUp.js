import React, {useState, useContext, useRef} from 'react';
import ReactNative, {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import UpdateAvatar from '../components/UpdateAvatar';
import {
  IndexPath,
  Input,
  Tab,
  TabView,
  Select,
  SelectItem,
  Datepicker,
  Icon,
} from '@ui-kitten/components';
import {register} from '../redux/actions/user';
import {GENDER_LIST, GENDER_LABEL} from '../constants/Constants';
import {AppContext} from '../providers/AppProvider';
import theme from '../constants/theme';
import {convertTo0PhoneNumber, phoneValidator} from '../helpers/display';

const {width, height} = Dimensions.get('screen');

const CalendarIcon = props => <Icon {...props} name="calendar" />;

const SignUp = props => {
  const {t} = useContext(AppContext);
  const dispatch = useDispatch();
  // const UserState = useSelector(state => state.User);
  // const {isLoading, isFailed, errorMessage} = UserState.signup;
  const {navigation} = props;
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [genderIndex, setGenderIndex] = useState(new IndexPath(0));
  let [shownPassword, setShownPassword] = useState(false);
  let [formData, setFormData] = useState({
    name: '',
    gender: '',
    date_of_birth: '',
    email: '',
    password: '',
    phone_number: '',
    avatar: '',
  });
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const scrollRef = useRef(null);

  const _scrollToInput = reactNode => {
    setTimeout(() => {
      const scrollResponder = scrollRef.current.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        reactNode,
        height / 2,
        true,
      );
    }, 50);
  };

  const toggleShownPassword = () => {
    setShownPassword(!shownPassword);
  };

  const renderEyeIcon = iconProps => (
    <TouchableWithoutFeedback onPress={toggleShownPassword}>
      <Icon {...iconProps} name={shownPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCountryCode = () => (
    <View style={styles.countryCodeContainer}>
      <Text style={styles.countryCode}>+84</Text>
    </View>
  );

  const genderDisplayValue = () => {
    const selectedGender = GENDER_LIST[genderIndex.row].value;

    return GENDER_LABEL[selectedGender];
  };

  const handleAvatarChange = ({path, base64}) => {
    setFormData({
      ...formData,
      avatar: path,
      avatarBase64Data: base64,
    });
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');

      const action = register({
        ...formData,
        avatar: formData.avatarBase64Data || formData.avatar,
        phone_number: convertTo0PhoneNumber(`+84${formData.phone_number}`),
      });

      await dispatch(action);
    } catch (error) {
      console.log(error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const canFirstStepContinue = () => {
    const {name, date_of_birth} = formData;

    return name && date_of_birth;
  };

  const canSubmit = () => {
    const {email, phone_number, password} = formData;
    const isValidPhoneNumber = phoneValidator(phone_number);

    return (
      canFirstStepContinue() &&
      email &&
      isValidPhoneNumber &&
      password &&
      password.length >= 6
    );
  };

  const renderError = () => {
    if (!isFailed) {
      return null;
    }

    return (
      <View>
        <View style={[theme.block.rowMiddle]}>
          <Icon
            style={styles.errorIcon}
            fill={theme.color.error}
            name="alert-triangle-outline"
          />
          <View width={10} />
          <Text color={theme.color.error}>{errorMessage}</Text>
        </View>
        <View height={15} />
      </View>
    );
  };

  return (
    <>
      <Header {...props} title={t('sign_up_title')} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={[
              theme.block.paddingHorizontal(20),
              theme.block.paddingTop(20),
            ]}>
            <Text size={28} color="#2E384D">
              {t('sign_up')}
            </Text>
          </View>
          <TabView
            indicatorStyle={styles.indicator}
            selectedIndex={selectedIndex}
            tabBarStyle={styles.tabBar}
            style={{height: '100%'}}
            onSelect={index => {
              Keyboard.dismiss();
              setSelectedIndex(index);
            }}>
            <Tab
              title={
                <Text size={16} center style={styles.tabTitle}>
                  {t('personal_info')}
                </Text>
              }>
              <KeyboardAvoidingView
                style={{flex: 1}}
                keyboardVerticalOffset={200}
                behavior={Platform.OS === 'ios' ? 'height' : null}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    contentContainerStyle={styles.tabContainer}>
                    <View
                      style={[
                        theme.block.rowMiddleCenter,
                        theme.block.marginBottom(10),
                      ]}>
                      <UpdateAvatar
                        size={96}
                        data={formData.avatar}
                        onChange={handleAvatarChange}
                      />
                    </View>
                    <View>
                      <Input
                        label={
                          <Text style={styles.inputTitle}>
                            {t('full_name')}
                          </Text>
                        }
                        placeholder={t('enter_your_full_name')}
                        value={formData.name}
                        onChangeText={nextValue =>
                          setFormData({
                            ...formData,
                            name: nextValue,
                          })
                        }
                        style={styles.input}
                      />
                    </View>

                    <View height={15} />

                    <View>
                      <Select
                        label={
                          <Text style={styles.inputTitle}>{t('gender')}</Text>
                        }
                        value={genderDisplayValue()}
                        selectedIndex={genderIndex}
                        onSelect={index => setGenderIndex(index)}
                        style={styles.input}>
                        {GENDER_LIST.map(_ => (
                          <SelectItem
                            key={_.value}
                            value={_.value}
                            title={_.label}
                          />
                        ))}
                      </Select>
                    </View>

                    <View height={15} />

                    <View>
                      <Datepicker
                        label={
                          <Text style={styles.inputTitle}>
                            {t('date_of_birth')}
                          </Text>
                        }
                        placement="top"
                        placeholder={t('enter_your_birthday')}
                        accessoryRight={CalendarIcon}
                        date={formData.date_of_birth}
                        onSelect={nextDate =>
                          setFormData({
                            ...formData,
                            date_of_birth: nextDate,
                          })
                        }
                        min={new Date('1900-01-01')}
                        max={new Date()}
                      />
                    </View>

                    <View height={15} />

                    {/* <View style={{ marginBottom: 10 }}>
                      <Input
                        label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>How did you hear about us? *</Text>}
                        placeholder="Google, Referral, TV, or Other"
                        style={{
                          borderRadius: 5,
                          fontSize: 13,
                        }}
                      />
                    </View> */}
                    <View style={styles.footer}>
                      <Button
                        icon="arrow-forward-outline"
                        disabled={!canFirstStepContinue()}
                        onPress={() => setSelectedIndex(1)}>
                        {t('continue')}
                      </Button>
                      <View style={theme.block.rowCenter}>
                        <GhostButton
                          onPress={() => navigation.navigate('SignIn')}>
                          <Text>
                            {t('already_have_an_account')}
                            <Text color="#2E5BFF"> {t('sign_in')}</Text>
                          </Text>
                        </GhostButton>
                      </View>
                    </View>
                  </ScrollView>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Tab>
            <Tab
              title={
                <Text size={16} center style={styles.tabTitle}>
                  {t('account_details')}
                </Text>
              }>
              <KeyboardAvoidingView
                style={{flex: 1}}
                keyboardVerticalOffset={200}
                behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                    contentContainerStyle={styles.tabContainer}>
                    <View>
                      <Input
                        autoCompleteType="email"
                        keyboardType="email-address"
                        label={
                          <Text style={styles.inputTitle}>{t('email')}</Text>
                        }
                        placeholder={t('enter_your_email')}
                        style={styles.input}
                        value={formData.email}
                        onChangeText={nextValue =>
                          setFormData({
                            ...formData,
                            email: nextValue,
                          })
                        }
                        onFocus={event =>
                          _scrollToInput(
                            ReactNative.findNodeHandle(event.target),
                          )
                        }
                      />
                    </View>

                    <View height={15} />

                    <View>
                      <Input
                        label={
                          <Text style={styles.inputTitle}>
                            {t('phone_number')}
                          </Text>
                        }
                        keyboardType="phone-pad"
                        placeholder={t('enter_your_phone_number')}
                        accessoryLeft={renderCountryCode}
                        value={formData.phone_number}
                        onChangeText={nextValue =>
                          setFormData({
                            ...formData,
                            phone_number: nextValue,
                          })
                        }
                        onFocus={event =>
                          _scrollToInput(
                            ReactNative.findNodeHandle(event.target),
                          )
                        }
                      />
                    </View>

                    <View height={15} />

                    <View>
                      <Input
                        label={
                          <Text style={styles.inputTitle}>
                            {t('create_your_password')}
                          </Text>
                        }
                        placeholder={t('enter_your_password')}
                        accessoryRight={renderEyeIcon}
                        secureTextEntry={!shownPassword}
                        value={formData.password}
                        caption={t('password_caption')}
                        onChangeText={nextValue =>
                          setFormData({
                            ...formData,
                            password: nextValue,
                            confirm_password: nextValue,
                          })
                        }
                        onFocus={event =>
                          _scrollToInput(
                            ReactNative.findNodeHandle(event.target),
                          )
                        }
                      />
                    </View>

                    <View height={15} />

                    <View style={styles.footer}>
                      {renderError()}
                      <Button
                        icon="arrow-forward-outline"
                        disabled={!canSubmit()}
                        isLoading={isLoading}
                        onPress={() => handleSignUp()}>
                        {t('submit')}
                      </Button>
                      <View style={theme.block.rowCenter}>
                        <GhostButton
                          onPress={() => navigation.navigate('SignIn')}>
                          <Text>
                            {t('already_have_an_account')}
                            <Text color="#2E5BFF"> {t('sign_in')}</Text>
                          </Text>
                        </GhostButton>
                      </View>
                    </View>
                  </ScrollView>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Tab>
          </TabView>
        </View>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    padding: 20,
    flex: 1,
    height: height - height / 4,
  },
  contentContainer: {
    backgroundColor: '#FEF3F3',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  tabContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
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
  indicator: {
    height: 2,
    borderRadius: 0,
    backgroundColor: '#F18C8E',
  },
  tabBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  tabTitle: {
    fontWeight: '400',
  },
  inputTitle: {
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
