import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

const {width, height} = Dimensions.get('screen');

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const SignUp = props => {
  const {navigation} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  let [shownPassword, setShownPassword] = useState(false);

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

  return (
    <>
      <Header title="Welcome to a world of Health & Wellness" />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        padding: 20,
        flex: 1,
      }}>
        <View style={{
          backgroundColor: '#FEF3F3',
          borderRadius: 30,
          flex: 1,
          padding: 20,
        }}>
          <Text size={28} color="#2E384D">Sign up</Text>
          <View style={{ paddingVertical: 20 }}>
            <TabView
              tabBarStyle={{backgroundColor: 'transparent'}}
              indicatorStyle={{
                height: 2,
                borderRadius: 0,
                backgroundColor: '#F18C8E'
              }}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              <Tab style={{backgroundColor: 'transparent'}} title={<Text size={16} style={{ fontWeight: '400' }}>Personal info</Text>}>
                <View style={styles.tabContainer}>
                  <View style={{ marginBottom: 15 }}>
                    <Input
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Full Name</Text>}
                      placeholder="My name is"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                      }}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Select
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Gender</Text>}
                      placeholder="I am a"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                      }}
                    >
                      <SelectItem title="Male" />
                      <SelectItem title="Female" />
                      <SelectItem title="LGBT" />
                    </Select>
                  </View>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Select
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Date of Birth</Text>}
                      placeholder="DD"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                        flex: 1,
                        marginRight: 10,
                      }}
                    >
                      <SelectItem title="Male" />
                      <SelectItem title="Female" />
                      <SelectItem title="LGBT" />
                    </Select>
                    <Select
                      placeholder="MM"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                        flex: 1,
                        marginRight: 10,
                      }}
                    >
                      <SelectItem title="Male" />
                      <SelectItem title="Female" />
                      <SelectItem title="LGBT" />
                    </Select>
                    <Select
                      placeholder="YYYY"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                        flex: 1,
                      }}
                    >
                      <SelectItem title="Male" />
                      <SelectItem title="Female" />
                      <SelectItem title="LGBT" />
                    </Select>
                  </View> */}
                  <View style={{ marginBottom: 15 }}>
                    <Datepicker
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Date of Birth</Text>}
                      placeholder="My birthday is"
                      accessoryRight={CalendarIcon}
                    />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Input
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>How did you hear about us? *</Text>}
                      placeholder="Google, Referral, TV, or Other"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                      }}
                    />
                  </View>
                  <View style={styles.footer}>
                    <Button icon="arrow-forward-outline" onPress={() => setSelectedIndex(1)}>Continue</Button>
                    <View style={{ alignItems: 'center' }}>
                      <GhostButton onPress={() => navigation.navigate('SignIn')}>
                        <Text>
                          Already have an account?
                          <Text color="#2E5BFF"> Sign In</Text>
                        </Text>
                      </GhostButton>
                    </View>
                  </View>
                </View>
              </Tab>
              <Tab title={<Text size={16} style={{ fontWeight: '400' }}>Account details</Text>}>
                <View style={styles.tabContainer}>
                  <View style={{ marginBottom: 15 }}>
                    <Input
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Email ID</Text>}
                      placeholder="My email is"
                      style={{
                        borderRadius: 5,
                        fontSize: 13,
                      }}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Input
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Create new password</Text>}
                      placeholder="Enter your password"
                      accessoryRight={renderEyeIcon}
                      secureTextEntry={!shownPassword}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Input
                      label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Phone Number (Optional)</Text>}
                      keyboardType="phone-pad"
                      placeholder="Enter your phone number"
                      accessoryLeft={renderCountryCode}
                    />
                  </View>
                  <View style={styles.footer}>
                    <Button icon="arrow-forward-outline" onPress={() => navigation.navigate('VerifyOTP')}>Submit</Button>
                    <View style={{ alignItems: 'center' }}>
                      <GhostButton onPress={() => navigation.navigate('SignIn')}>
                        <Text>
                          Already have an account?
                          <Text color="#2E5BFF"> Sign In</Text>
                        </Text>
                      </GhostButton>
                    </View>
                  </View>
                </View>
              </Tab>
            </TabView>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 20,
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
});
