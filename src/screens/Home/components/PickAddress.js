import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import {Icon, Spinner, Divider, ListItem} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';
import DebounceInput from '../../../components/DebounceInput';
// import {autocomplete, details} from '../../../third-party/goong';
import {autocomplete, details} from '../../../third-party/google-maps';
import {distanceFormat} from '../../../helpers/display';
import useTranslate from '../../../hooks/useTranslate';

const PinIcon = props => <Icon {...props} name="pin" />;
const ShakeIcon = props => <Icon {...props} name="shake" />;

const PinIconColor = props => (
  <Icon {...props} name="pin" fill={theme.color.primary} />
);

const data = new Array(10).fill({
  title: '147 Tôn Dật Tiên',
  description: '1km - 147, Tôn Dật Tiên, Tân Phong, Quận 7, TP.HCM',
  latitude: 10.7232237,
  longitude: 106.7133497,
});

const PickAddress = ({currentLocation, onSelectAddress, picking}) => {
  const t = useTranslate();

  const myLocation = useMemo(() => {
    if (currentLocation) {
      return {
        title: t('use_my_current_location'),
        ...currentLocation,
      };
    }

    return null;
  }, [currentLocation, t]);

  const modalizeRef = useRef(null);

  let [isOpenModalAddress, setOpenModalAddress] = useState(false);
  let [search, setSearch] = useState('');
  let [suggestions, setSuggestions] = useState([]);
  let [isSearching, setSearching] = useState(false);
  let [locationList, setLocationList] = useState(
    myLocation ? [myLocation] : [],
  );

  useEffect(() => {
    if (suggestions && suggestions.length) {
      setLocationList(suggestions);
    } else {
      setLocationList(myLocation ? [myLocation] : []);
    }
  }, [suggestions, myLocation]);

  // useEffect(() => {
  //   console.log('picking', picking);
  //   if (picking) {
  //     setTimeout(() => {
  //       onOpen();
  //     });
  //   } else {
  //     onClose();
  //   }
  // }, [picking]);

  const onOpen = () => {
    setOpenModalAddress(true);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    setOpenModalAddress(false);
    modalizeRef.current?.close();
  };

  useEffect(() => {
    onSearchAddress(search);
  }, [search, onSearchAddress]);

  const onSearchAddress = useCallback(
    async searchTerm => {
      if (searchTerm && searchTerm.length >= 5) {
        try {
          setSearching(true);
          const result = await autocomplete(searchTerm, currentLocation);
          if (result.status === 'OK') {
            const {predictions} = result;

            const suggestionList = predictions.map(_ => ({
              short_address: _.structured_formatting.main_text,
              address: _.description,
              place_id: _.place_id,
              distance_meters: _.distance_meters,
            }));

            setSuggestions(suggestionList);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.log('error', error);
          setSuggestions([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    },
    [currentLocation],
  );

  const onUseCurrentLocation = useCallback(() => {
    onSelectAddress(currentLocation);
    onClose();
  }, [currentLocation]);

  const onSuggestionSelect = useCallback(async item => {
    const result = await details(item.place_id);
    if (result.status === 'OK') {
      const selectedAddress = {
        latitude: result.result.geometry.location.lat,
        longitude: result.result.geometry.location.lng,
        address: result.result.formatted_address,
        title: result.result.name,
      };

      onSelectAddress(selectedAddress);
      onClose();
    }
  }, []);

  const renderContent = () => {
    if (isSearching) {
      return (
        <View style={[theme.block.rowCenter, theme.block.paddingVertical(20)]}>
          <Spinner />
        </View>
      );
    }

    if (suggestions && suggestions.length) {
      return (
        // <FlatList
        //   data={locationList}
        //   renderItem={({item, index}) => (
        //     <View style={[theme.block.rowMiddle, { paddingHorizontal: 15, paddingVertical: 15 }]}>
        //       <View style={{
        //         flexBasis: 24,
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //       }}>
        //         <Icon name="pin" style={{ width: 24, height: 24 }} fill='#8F9BB3' />
        //       </View>
        //       <View style={{
        //         flexBasis: 'auto',
        //         flexShrink: 1,
        //         paddingLeft: 15,
        //       }}>
        //         <Text semiBold>{item.short_address}</Text>
        //         <Text size={12} color={theme.color.secondary}>{item.address}</Text>
        //       </View>
        //     </View>
        //   )}
        //   ItemSeparatorComponent={() => <Divider />}
        //   keyExtractor={(item, index) => index}
        //   showsVerticalScrollIndicator={false}
        // />
        <View>
          {locationList?.map(location => (
            <TouchableWithoutFeedback
              key={location.place_id}
              onPress={() => onSuggestionSelect(location)}>
              <View
                style={[
                  theme.block.rowMiddle,
                  {paddingHorizontal: 15, paddingVertical: 15},
                ]}>
                <View
                  style={{
                    flexBasis: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="pin"
                    style={{width: 24, height: 24}}
                    fill="#8F9BB3"
                  />
                </View>
                <View
                  style={{
                    flexBasis: 'auto',
                    flexShrink: 1,
                    paddingLeft: 15,
                  }}>
                  <Text semiBold>{location.short_address}</Text>
                  <Text size={12} color={theme.color.secondary}>
                    {location.distance_meters !== undefined
                      ? `${distanceFormat(location.distance_meters)} - `
                      : ''}
                    {location.address}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    }

    if (currentLocation) {
      return (
        <TouchableWithoutFeedback onPress={onUseCurrentLocation}>
          <View
            style={[
              theme.block.rowMiddle,
              {paddingHorizontal: 15, paddingVertical: 15},
            ]}>
            <View
              style={{
                flexBasis: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="shake"
                style={{width: 24, height: 24}}
                fill="#8F9BB3"
              />
            </View>
            <View
              style={{
                flexBasis: 'auto',
                flexShrink: 1,
                paddingLeft: 15,
              }}>
              <Text semiBold>{t('use_my_current_location')}</Text>
              <Text size={12} color={theme.color.secondary}>
                {currentLocation.address}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <Text bold size={18}>
          {t('book_a_massage')}
        </Text>
        <View style={theme.block.paddingVertical(15)}>
          <TouchableWithoutFeedback onPress={onOpen}>
            <View style={styles.inputContainer}>
              <View style={theme.block.rowMiddleCenter}>
                <Icon
                  style={styles.icon}
                  fill={theme.color.primary}
                  name="pin"
                />
                <View width={15} />
                <Text color={theme.color.primary}>{t('where_are_you')}</Text>
              </View>
              <Icon style={styles.icon} fill="#8F9BB3" name="search" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bookNowContainer}>
          <View style={styles.bookNowIconContainer}>
            <Image
              source={require('../../../assets/images/scooter-guy.png')}
              style={styles.bookNowIcon}
            />
          </View>
          <View>
            <Text bold>{t('book_zen_massage_now')}</Text>
          </View>
        </View>
      </View>
      <Portal>
        <Modalize
          // avoidKeyboardLikeIOS
          // alwaysOpen={isOpenModalAddress ? 400 : 0}
          ref={modalizeRef}
          // withReactModal
          HeaderComponent={() => (
            <>
              <View
                style={[
                  theme.block.paddingHorizontal(20),
                  theme.block.paddingVertical(20),
                ]}>
                <Text bold size={16} color={theme.color.primary}>
                  {t('where_are_you')}
                </Text>
                <View height={15} />
                <DebounceInput
                  placeholder={t('where_are_you')}
                  accessoryLeft={PinIconColor}
                  // value={search}
                  onSearch={setSearch}
                />
              </View>
              <View style={styles.separator} />
            </>
          )}
          // flatListProps={{
          //   data: locationList,
          //   renderItem: ({item, index}) => (
          //     <>
          //       <ListItem
          //         title={`${item.title}`}
          //         description={<Text numberOfLines={1}>{item.address}</Text>}
          //         accessoryLeft={search ? PinIcon : ShakeIcon}
          //         onPress={() => {
          //           onSelectAddress(item);
          //           onClose();
          //         }}
          //       />
          //       <Divider />
          //     </>
          //   ),
          //   keyExtractor: (item, index) => index,
          //   showsVerticalScrollIndicator: false,
          // }}
        >
          {renderContent()}
        </Modalize>
      </Portal>
    </>
  );
};

export default PickAddress;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.color.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  bookNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bookNowIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#F6AEA9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  bookNowIcon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  separator: {
    height: 8,
    backgroundColor: theme.color.border,
  },
});
