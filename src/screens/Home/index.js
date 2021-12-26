import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Layout,
  Icon,
  Input,
  Divider,
  List,
  ListItem,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'underscore';
import firestore from '@react-native-firebase/firestore';
import {Modalize} from 'react-native-modalize';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// SKIP DIRECTIONS
import MapViewDirections from 'react-native-maps-directions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Value, set, useCode} from 'react-native-reanimated';
import {timing} from 'react-native-redash/lib/module/v1';
import Header from '../../components/Header2';
import Text from '../../components/Text';
import Button from '../../components/Button';
import CircularProgress from '../../components/CircularProgress';
import GhostButton from '../../components/GhostButton';
import BookingInfo from '../../components/BookingInfo';
import theme from '../../constants/theme';
import {numberFormat} from '../../helpers/display';

import PickAddress from './components/PickAddress';
import ConfirmAddress from './components/ConfirmAddress';
import PickMassageType from './components/PickMassageType';
import WaitingForAccept from './components/WaitingForAccept';
import WaitingForPayment from './components/WaitingForPayment';
import Accepted from './components/Accepted';
import Arrived from './components/Arrived';
import Started from './components/Started';
import DisabledUser from './components/DisabledUser';
import {SESSION_STATUS, USER_STATUS} from '../../constants/Constants';
import {getServices} from '../../redux/actions/service';
import {
  createSession,
  getSession,
  cancelSession,
  completeSession,
  clean,
} from '../../redux/actions/session';
import CompletedSession from './components/CompletedSession';
import {AppContext} from '../../providers/AppProvider';
// import {details, geocode} from '../../third-party/goong';
import {details, geocode} from '../../third-party/google-maps';

const {width, height} = Dimensions.get('window');

const STATUS = {
  PREPARE_DATA: 0,
  WAITING_FOR_ACCEPT: 1,
  ACCEPTED: 2,
  ARRIVED: 3,
  STARTED: 4,
  FINISHED: 5,
  COMPLETED: 6,
};

const DEFAULT_MAP_LOCATION = {
  latitude: 10.7721148,
  longitude: 106.6960844,
};

const Home = () => {
  const dispatch = useDispatch();
  const ServiceState = useSelector(state => state.Service);
  const {services} = ServiceState;
  const UserState = useSelector(state => state.User);
  const SessionState = useSelector(state => state.Session);
  const {userInfo} = UserState;
  const {detail: sessionDetail} = SessionState;
  const safeArea = useSafeAreaInsets();
  const {t} = useContext(AppContext);
  // SKIP DIRECTIONS
  let [therapistAddress, setTherapistAddress] = useState();
  let [address, setAddress] = useState();
  let [addressConfirmed, setAddressConfirmed] = useState(false);
  let [currentLocation, setCurrentLocation] = useState();
  let [massageId, setMassageId] = useState(1);
  let [service, setService] = useState();
  let [status, setStatus] = useState(STATUS.PREPARE_DATA);
  let [rating, setRating] = useState(0);

  let mapViewRef = useRef(null);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  console.log('sessionDetail', sessionDetail);

  const getCurrentProgress = useCallback(() => {
    if (!sessionDetail || sessionDetail.status !== SESSION_STATUS.STARTED) {
      return 0;
    }

    const sessionDuration =
      sessionDetail.request_services[0].duration * 60 * 1000;

    const delta = new Date().getTime() - sessionDetail.started_at;

    return delta / sessionDuration;
  }, [sessionDetail]);

  let progress = new Value(0);

  useEffect(() => {
    progress.setValue(getCurrentProgress());
  }, [getCurrentProgress, progress]);

  useEffect(() => {
    let remainingIntervalId;

    if (status === STATUS.STARTED) {
      remainingIntervalId = setInterval(() => {
        const currentProgress = getCurrentProgress();
        progress.setValue(currentProgress);
      }, 60 * 1000);
    } else {
      clearInterval(remainingIntervalId);
    }

    return () => clearInterval(remainingIntervalId);
  }, [status, progress, sessionDetail, getCurrentProgress]);

  // SKIP DIRECTIONS
  useEffect(() => {
    let trackingSubscribe;
    if (status === STATUS.ACCEPTED) {
      trackingSubscribe = firestore()
        .collection('sessions')
        .doc(sessionDetail?.id.toString())
        .onSnapshot(snapshot => {
          if (snapshot) {
            const data = snapshot.data();
            console.log('sessionsdata', data);
            setTherapistAddress({
              latitude: data?.therapist_lat,
              longitude: data?.therapist_long,
            });
          }
        });
    }

    return () => typeof trackingSubscribe === 'function' && trackingSubscribe();
  }, [status, sessionDetail]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('customers')
      .doc(userInfo.code)
      .onSnapshot(snapshot => {
        if (snapshot) {
          const data = snapshot.data();
          console.log('data', data);

          if (_.isEmpty(data)) {
            dispatch(clean());
            return;
          }

          if (data.assign_session) {
            if (
              !sessionDetail ||
              sessionDetail.id !== data.assign_session ||
              sessionDetail.last_updated_at < data.last_updated_at
            ) {
              dispatch(getSession(data));
            }
          }

          // if (!_.isEmpty(data) && data.assign_session) {
          //   if (!sessionDetail || sessionDetail.id !== data.assign_session) {
          //   } else if (
          //     sessionDetail.status !== SESSION_STATUS.COMPLETED &&
          //     (
          //       sessionDetail.id !== data.assign_session ||
          //       sessionDetail.last_updated_at < data.last_updated_at
          //     )
          //   ) {
          //     dispatch(getSession(data));
          //   }
          // }
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch, sessionDetail, userInfo.code]);

  useEffect(() => {
    if (!_.isEmpty(sessionDetail)) {
      switch (sessionDetail.status) {
        case SESSION_STATUS.WAITING_FOR_THERAPIST:
          setStatus(STATUS.WAITING_FOR_ACCEPT);
          break;
        case SESSION_STATUS.ACCEPTED:
          setStatus(STATUS.ACCEPTED);
          break;
        case SESSION_STATUS.CANCELED:
          setStatus(STATUS.PREPARE_DATA);
          break;
        case SESSION_STATUS.ARRIVED:
          setStatus(STATUS.ARRIVED);
          break;
        case SESSION_STATUS.STARTED:
          // dispatch(started());
          setStatus(STATUS.STARTED);
          break;
        case SESSION_STATUS.FINISHED:
          setStatus(STATUS.FINISHED);
          break;
        case SESSION_STATUS.COMPLETED:
          setStatus(STATUS.PREPARE_DATA);
          setAddress();
          setAddressConfirmed(false);
          setMassageId();
          break;
        case SESSION_STATUS.WAITING_FOR_PAYMENT:
          setStatus(STATUS.WAITING_FOR_PAYMENT);
          Linking.openURL(sessionDetail.pay_url);
          break;
        // case SESSION_STATUS.CANCELED:
        //   setStatus(STATUS.OFFLINE);
        //   break;
        default:
          // setStatus(STATUS.OFFLINE);
          break;
      }
    }
  }, [sessionDetail]);

  useEffect(() => {
    if (!_.isEmpty(services)) {
      setService({
        service_id: services[0].id,
        sub_service_id: services[0].sub_services[0].id,
      });
    }
  }, [services]);

  const hasPermissionIOS = async () => {
    const locationServiceStatus = await Geolocation.requestAuthorization(
      'whenInUse',
    );

    if (locationServiceStatus === 'granted') {
      return true;
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const locationServiceStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (locationServiceStatus === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const hasPermission = await hasLocationPermission();
      console.log('hasPermission', hasPermission);
      if (hasPermission) {
        getOneTimeLocation();
        // subscribeLocationLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      async pos => {
        try {
          const result = await geocode(
            pos.coords.latitude,
            pos.coords.longitude,
          );

          if (result.status === 'OK') {
            const {place_id} = result.results[0];

            try {
              const detailResult = await details(place_id);

              if (detailResult.status === 'OK') {
                const currentAddress = detailResult.result;

                setCurrentLocation({
                  latitude: currentAddress.geometry.location.lat,
                  longitude: currentAddress.geometry.location.lng,
                  address: currentAddress.formatted_address,
                  title: currentAddress.name,
                });
              }
            } catch (error) {
              console.log('error', error);
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      },
      error => {
        console.log('error', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  // const subscribeLocationLocation = () => {
  //   watchId.current = Geolocation.watchPosition(
  //     position => {
  //       console.log('subscribeLocationLocation', position);
  //       setPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {
  //       accuracy: {
  //         android: 'high',
  //         ios: 'best',
  //       },
  //       enableHighAccuracy: true,
  //       fastestInterval: 2000,
  //     },
  //   );
  // };

  const handleCreateSession = () => {
    dispatch(
      createSession({
        services: [
          {
            service_id: service.service_id,
            sub_service_id: [service.sub_service_id],
          },
        ],
        customer_address: address.address,
        customer_lat: address.latitude,
        customer_long: address.longitude,
      }),
    );
  };

  const handleCancelSession = () => {
    Alert.alert(t('cancel_booking'), t('are_you_sure_to_cancel'), [
      {
        text: t('no'),
        style: 'cancel',
      },
      {
        text: t('cancel_booking'),
        onPress: () => dispatch(cancelSession(sessionDetail.id)),
      },
    ]);
  };

  const renderFooterContent = () => {
    if (userInfo.status === USER_STATUS.REJECTED) {
      return <DisabledUser t={t} />;
    }

    switch (status) {
      case STATUS.PREPARE_DATA: {
        if (address) {
          if (addressConfirmed) {
            return (
              <PickMassageType
                t={t}
                selectedService={service}
                onSelectService={newService => setService(newService)}
                onBookMassage={handleCreateSession}
                onBack={() => setAddressConfirmed(false)}
              />
            );
          }

          return (
            <ConfirmAddress
              address={address}
              t={t}
              onBack={() => setAddress()}
              onConfirm={() => setAddressConfirmed(true)}
            />
          );
        }

        return (
          <PickAddress
            currentLocation={currentLocation}
            t={t}
            onSelectAddress={value => setAddress(value)}
          />
        );
      }
      case STATUS.WAITING_FOR_PAYMENT:
        return (
          <WaitingForPayment
            t={t}
            sessionDetail={sessionDetail}
            onCancel={handleCancelSession}
          />
        );
      case STATUS.WAITING_FOR_ACCEPT:
        return (
          <WaitingForAccept
            t={t}
            sessionDetail={sessionDetail}
            onCancel={handleCancelSession}
          />
        );
      case STATUS.ACCEPTED:
        return (
          <Accepted
            t={t}
            sessionDetail={sessionDetail}
            onCancel={handleCancelSession}
          />
        );
      case STATUS.ARRIVED:
        return <Arrived t={t} sessionDetail={sessionDetail} />;
      case STATUS.STARTED:
        return (
          <Started
            t={t}
            sessionDetail={sessionDetail}
            onStatusChange={value => setStatus(value)}
          />
        );
      default:
        break;
    }
  };

  // SKIP DIRECTIONS
  const onReady = result => {
    mapViewRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10,
      },
    });
  };

  const getMapLocation = useCallback(() => {
    if (
      status === STATUS.WAITING_FOR_PAYMENT ||
      status === STATUS.WAITING_FOR_ACCEPT ||
      status === STATUS.ACCEPTED
    ) {
      return {
        latitude: sessionDetail?.client_lat,
        longitude: sessionDetail?.client_long,
      };
    } else if (status === STATUS.PREPARE_DATA) {
      return address || currentLocation || DEFAULT_MAP_LOCATION;
    }
  }, [status, address, currentLocation, sessionDetail]);

  // SKIP DIRECTIONS
  // const getOrigin = useCallback(() => {
  //   if (status === STATUS.ACCEPTED) {
  //     return therapistAddress;
  //   }

  //   return getMapLocation();
  // }, [status, therapistAddress, getMapLocation]);

  const renderContent = () => {
    if (userInfo.status === USER_STATUS.REJECTED) {
      return <View style={styles.content} />;
    }
    switch (status) {
      case STATUS.PREPARE_DATA:
      case STATUS.WAITING_FOR_PAYMENT:
      case STATUS.WAITING_FOR_ACCEPT:
      case STATUS.ACCEPTED: {
        const mapLocation = getMapLocation();
        // SKIP DIRECTIONS
        // const origin = getOrigin() || DEFAULT_MAP_LOCATION;

        return (
          <View style={styles.content}>
            <MapView
              ref={mapViewRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                ...mapLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {mapLocation && (
                <Marker coordinate={mapLocation}>
                  <Icon
                    name="pin"
                    fill={theme.color.error}
                    style={{width: 40, height: 40}}
                  />
                </Marker>
              )}
              {status === STATUS.ACCEPTED && therapistAddress && (
                <>
                  <Marker coordinate={therapistAddress}>
                    <Icon
                      name="pin"
                      fill={theme.color.link}
                      style={{width: 40, height: 40}}
                    />
                  </Marker>
                  <MapViewDirections
                    origin={therapistAddress}
                    destination={{
                      latitude: sessionDetail?.client_lat,
                      longitude: sessionDetail?.client_long,
                    }}
                    mode="DRIVING"
                    strokeWidth={4}
                    strokeColor={theme.color.primary}
                    onReady={onReady}
                    optimizeWaypoints={true}
                    apikey="AIzaSyB8NQbCQbLY7CSK9GBNyzzRPzbr_6s6xVg"
                  />
                </>
              )}
            </MapView>
          </View>
        );
      }
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return (
          <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.startMassageContent}>
              <View>
                <Text bold center size={18} color={theme.color.primary}>
                  {t('start_massage')}
                </Text>
                <View height={15} />
                <View>
                  <CircularProgress progress={progress} />
                </View>
              </View>
            </ScrollView>
          </View>
        );
      case STATUS.FINISHED: {
        return (
          <CompletedSession
            t={t}
            sessionDetail={sessionDetail}
            onComplete={async rating => {
              await dispatch(completeSession(sessionDetail.id, rating));
            }}
          />
        );
      }
      default:
        return null;
    }
  };

  const renderFooter = () => {
    return <View style={styles.footer(safeArea)}>{renderFooterContent()}</View>;
  };

  return (
    <Layout style={styles.container}>
      <Header />
      {[STATUS.ACCEPTED, STATUS.ARRIVED, STATUS.STARTED].includes(status) ? (
        <View
          style={{
            position: 'absolute',
            top: safeArea.top + 75,
            left: 0,
            right: 0,
            zIndex: 99,
            paddingHorizontal: 20,
          }}>
          <BookingInfo
            data={[
              {
                label: t('booking_address'),
                value: sessionDetail?.client_address,
              },
              {
                label: t('type_of_massage'),
                value: sessionDetail?.request_services[0]?.group_service_name,
              },
            ]}
          />
        </View>
      ) : null}
      {renderContent()}
      {renderFooter()}
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
    paddingBottom: safeArea.bottom || 20,
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
  },
  startMassageContent: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#2699FB',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 200,
    paddingHorizontal: 20,
  },
});
