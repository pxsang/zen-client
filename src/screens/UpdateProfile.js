import React, {useEffect, useState, useRef} from 'react';
import ReactNative, {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Input,
  Datepicker,
  Icon,
} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header3';
import UpdateAvatar from '../components/UpdateAvatar';
import {phoneNumberFormat} from '../helpers/display';
import {updateProfile} from '../redux/actions/user';
import {GENDER, GENDER_LIST, GENDER_LABEL} from '../constants/Constants';
import useTranslate from '../hooks/useTranslate';

const {height} = Dimensions.get('screen');

const CalendarIcon = props => <Icon {...props} name="calendar" />;

const Profile = props => {
  const t = useTranslate();
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;
  const {navigation} = props;
  let [isLoading, setLoading] = useState(false);
  let [genderIndex, setGenderIndex] = useState(
    new IndexPath(userInfo.gender?.toLowerCase() === 'female' ? 1 : 0),
  );
  let [formData, setFormData] = useState({
    gender: userInfo.gender?.toLowerCase() || GENDER.MALE,
    name: userInfo.name,
    email: userInfo.email,
    phone_number: userInfo.phone_number,
    avatar: userInfo.avatar,
    date_of_birth: userInfo.date_of_birth,
  });

  const scrollRef = useRef(null);

  const genderDisplayValue = () => {
    const selectedGender = GENDER_LIST[genderIndex.row].value;
    return GENDER_LABEL[selectedGender];
  };

  useEffect(() => {
    const selectedGender = GENDER_LIST[genderIndex.row].value;
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  }, [genderIndex]);

  const handleAvatarChange = ({path, base64}) => {
    setFormData({
      ...formData,
      avatar: path,
      avatarBase64Data: base64,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await dispatch(
        updateProfile({
          ...formData,
          avatar: formData.avatarBase64Data || formData.avatar,
        }),
      );
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const _scrollToInput = reactNode => {
    setTimeout(() => {
      const scrollResponder = scrollRef.current.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        reactNode,
        height * 0.55,
        true,
      );
    }, 50);
  };

  return (
    <>
      <Header title={t('update_profile')} {...props} small hideRightMenu />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: height / 4,
          flex: 1,
          paddingTop: 30,
        }}>
        <Layout style={[styles.container]}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="height">
            <View style={styles.header}>
              <UpdateAvatar
                data={formData.avatar}
                onChange={handleAvatarChange}
              />
              {/* <View style={styles.genderContainer}>
                <UIButton
                  appearance={
                    formData.gender === GENDER.MALE ? 'filled' : 'outline'
                  }
                  style={[styles.genderButton, styles.genderButtonLeft]}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      gender: GENDER.MALE,
                    })
                  }>
                  {t('male')}
                </UIButton>
                <UIButton
                  appearance={
                    formData.gender === GENDER.FEMALE ? 'filled' : 'outline'
                  }
                  style={[styles.genderButton, styles.genderButtonRight]}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      gender: GENDER.FEMALE,
                    })
                  }>
                  {t('female')}
                </UIButton>
              </View> */}
            </View>
            <ScrollView
              ref={scrollRef}
              style={styles.form(safeArea)}
              contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 80}}
              showsVerticalScrollIndicator={false}>
              <Input
                label={
                  <Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>
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
                autoCapitalize="words"
                style={{
                  borderRadius: 5,
                  fontSize: 13,
                }}
              />

              <View height={20} />

              <Input
                label={
                  <Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>
                    {t('email')}
                  </Text>
                }
                placeholder={t('enter_your_email')}
                value={formData.email}
                onChangeText={nextValue =>
                  setFormData({
                    ...formData,
                    email: nextValue,
                  })
                }
                keyboardType="email-address"
                style={{
                  borderRadius: 5,
                  fontSize: 13,
                }}
                onFocus={event =>
                  _scrollToInput(ReactNative.findNodeHandle(event.target))
                }
              />

              <View height={20} />

              <View>
                <Select
                  label={<Text style={styles.inputTitle}>{t('gender')}</Text>}
                  value={genderDisplayValue()}
                  selectedIndex={genderIndex}
                  onSelect={index => setGenderIndex(index)}
                  style={styles.input}>
                  {GENDER_LIST.map(_ => (
                    <SelectItem key={_.value} value={_.value} title={_.label} />
                  ))}
                </Select>
              </View>

              <View height={20} />

              <Datepicker
                label={
                  <Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>
                    {t('date_of_birth')}
                  </Text>
                }
                placeholder={t('enter_your_birthday')}
                accessoryRight={CalendarIcon}
                date={new Date(formData.date_of_birth)}
                placement="top"
                onSelect={nextDate =>
                  setFormData({
                    ...formData,
                    date_of_birth: nextDate,
                  })
                }
                min={new Date('1900-01-01')}
                max={new Date()}
              />

              <View height={20} />

              <Input
                label={
                  <Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>
                    {t('phone_number')}
                  </Text>
                }
                keyboardType="phone-pad"
                value={phoneNumberFormat(formData.phone_number)}
                disabled
              />

              <View height={20} />

              <Button
                icon="arrow-forward-outline"
                disabled={!formData.name}
                isLoading={isLoading}
                onPress={handleUpdateProfile}>
                {t('update_profile')}
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
          {/* <ScrollView
            style={styles.content}
            contentContainerStyle={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text bold center style={styles.fullname}>{userInfo.name}</Text>
              <Text bold center style={styles.rating}>4,75</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>
                  {phoneNumberFormat(userInfo.phone_number)}
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{userInfo.email || '--'}</Text>
              </View>
              <View style={[styles.contactInfo, styles.contactInfoLast]}>
                <Text style={styles.contactLabel}>Language</Text>
                <Text style={styles.contactValue}>Vietnamese, English</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Button appearance="rounded" onPress={logout}>
                Log Out
              </Button>
            </View>
          </ScrollView> */}
        </Layout>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 71,
  },
  form: safeArea => ({
    // height: '100%',
    marginTop: 80,
    paddingVertical: 20,
    paddingBottom: safeArea.bottom || 20,
  }),
  header: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 150,
    zIndex: 99,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  genderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  genderButton: {
    height: 42,
    width: '50%',
    borderRadius: 0,
  },
  genderButtonLeft: {
    marginRight: 5,
  },
  genderButtonRight: {
    marginLeft: 5,
  },
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
