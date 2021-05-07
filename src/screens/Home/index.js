import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, TextInput, ScrollView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {Layout, Icon, Input, Divider, List, ListItem} from '@ui-kitten/components';
import { Modalize } from 'react-native-modalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/Header2';
import Text from '../../components/Text';
import Button from '../../components/Button';
import GhostButton from '../../components/GhostButton';
import theme from '../../constants/theme';
import {numberFormat} from '../../helpers/display';

import PickAddress from './components/PickAddress';
import ConfirmAddress from './components/ConfirmAddress';
import PickMassageType from './components/PickMassageType';
import WaitingForAccept from './components/WaitingForAccept';
import Accepted from './components/Accepted';
import Arrived from './components/Arrived';
import Started from './components/Started';
import BookingInfo from './components/BookingInfo';

const STATUS = {
  PREPARE_DATA: 0,
  WAITING_FOR_ACCEPT: 1,
  ACCEPTED: 2,
  ARRIVED: 3,
  STARTED: 4,
  COMPLETED: 5,
};

const MASSAGE_TIME = 10000;

const Home = () => {
  const safeArea = useSafeAreaInsets();

  let [address, setAddress] = useState();
  let [addressConfirmed, setAddressConfirmed] = useState(false);
  let [massageId, setMassageId] = useState(1);
  let [status, setStatus] = useState(STATUS.PREPARE_DATA);
  let [rating, setRating] = useState(0);

  useEffect(() => {
    if (status === STATUS.WAITING_FOR_ACCEPT) {
      setTimeout(() => {
        setStatus(STATUS.ACCEPTED);
      }, 5000);
    }
  }, [status]);

  useEffect(() => {
    if (status === STATUS.ACCEPTED) {
      setTimeout(() => {
        setStatus(STATUS.ARRIVED);
      }, 5000);
    }
  }, [status]);

  useEffect(() => {
    if (status === STATUS.ARRIVED) {
      setTimeout(() => {
        setStatus(STATUS.STARTED);
      }, 5000);
    }
  }, [status]);

  useEffect(() => {
    if (status === STATUS.STARTED) {
      setTimeout(() => {
        setStatus(STATUS.COMPLETED);
      }, MASSAGE_TIME);
    }
  }, [status]);

  const renderFooterContent = () => {
    switch (status) {
      case STATUS.PREPARE_DATA: {
        if (address) {
          if (addressConfirmed) {
            return (
              <PickMassageType
                selectedMassageId={massageId}
                onSelectMassageType={value => setMassageId(value)}
                onBookMassage={() => setStatus(STATUS.WAITING_FOR_ACCEPT)}
              />
            );
          }

          return (
            <ConfirmAddress
              onBack={() => setAddress()}
              onConfirm={() => setAddressConfirmed(true)}
            />
          );
        }

        return <PickAddress onSelectAddress={value => setAddress(value)} />;
      }
      case STATUS.WAITING_FOR_ACCEPT:
        return <WaitingForAccept />;
      case STATUS.ACCEPTED:
        return <Accepted />;
      case STATUS.ARRIVED:
        return <Arrived />;
      case STATUS.STARTED:
        return <Started onStatusChange={value => setStatus(value)} />;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (status) {
      case STATUS.COMPLETED: {
        return (
          <View style={{ flex : 1, zIndex: 99 }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              <Text size={12}>Complete</Text>
              <Text bold size={24}>Summary of Session</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, }}>
              <View style={{ marginBottom: 20 }}>
                <BookingInfo />
              </View>
              <View style={{ marginBottom: 20 }}>
                <BookingInfo />
              </View>
              <View style={{ marginBottom: 20 }}>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                  <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
                    {Array(5).fill("").map((_, index) => (
                      <TouchableWithoutFeedback onPress={() => setRating(index + 1)}>
                        <Icon
                          style={styles.starIcon}
                          fill={(index + 1) <= rating ? '#FAD647' : '#8F9BB3'}
                          name="star"
                        />
                      </TouchableWithoutFeedback>
                    ))}
                    </View>
                  <Text center>Cecilia Bolocco</Text>
                  <View style={styles.buttonContainer}>
                    <Button appearance="rounded" style={styles.button} onPress={() => {
                      setStatus(STATUS.PREPARE_DATA);
                      setAddress();
                      setAddressConfirmed(false);
                      setMassageId();
                    }}>Rate Therapist</Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }
      default:
        return (
          <View style={styles.content}>
            <MapView
              // provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 10.7721095,
                longitude: 106.6982784,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{
                  latitude: 10.7721095,
                  longitude: 106.6982784,
                }}>
                <Image
                  style={{ width: 86, height: 86 }}
                  source={require('../../assets/icons/location.png')}
                />
              </Marker>
            </MapView>
            <View style={styles.footer(safeArea)}>{renderFooterContent()}</View>
          </View>
        );
    }
  }

  console.log('render Home');

  return (
    <Layout style={styles.container}>
      <Header />
      {[
        STATUS.ACCEPTED,
        STATUS.ARRIVED,
        STATUS.STARTED,
      ].includes(status) ? (
        <View style={{
          ...StyleSheet.absoluteFillObject,
          top: safeArea.top + 75,
          left: 0,
          right: 0,
          zIndex: 99,
          paddingHorizontal: 20,
        }}>
          <BookingInfo />
        </View>
      ) : null}
      {renderContent()}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: safeArea => ({
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: safeArea.bottom + 20,
  }),
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    height: 40,
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  starIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 3,
  }
});
