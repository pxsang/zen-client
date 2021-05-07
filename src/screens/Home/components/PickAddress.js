import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';
import {Icon, Input, Divider, List, ListItem} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

const PinIcon = props => <Icon {...props} name="pin" />;
const ShakeIcon = props => <Icon {...props} name="shake" />;

const PinIconColor = props => (
  <Icon {...props} name="pin" fill={theme.color.primary} />
);

const data = new Array(10).fill({
  title: '147 Tôn Dật Tiên',
  description: '1km - 147, Tôn Dật Tiên, Tân Phong, Quận 7, TP.HCM',
});

const currentLocation = {
  title: 'Use my current location',
  description: '147 Tôn Dật Tiên, Phường Tân Phong, Quận 7',
};

const PickAddress = ({onSelectAddress}) => {
  const modalizeRef = useRef(null);

  let [search, setSearch] = useState('');
  let [locationList, setLocationList] = useState([currentLocation]);

  useEffect(() => {
    if (search) {
      setLocationList(data);
    } else {
      setLocationList([currentLocation]);
    }
  }, [search]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  console.log('locationList', locationList);

  return (
    <>
      <View style={styles.container}>
        <Text bold size={18}>
          Book a Massage
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
                <Text color={theme.color.primary}>Where are you?</Text>
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
            <Text bold>Book ZEN Massage now!</Text>
          </View>
        </View>
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          HeaderComponent={() => (
            <>
              <View
                style={[
                  theme.block.paddingHorizontal(20),
                  theme.block.paddingVertical(20),
                ]}>
                <Text bold size={16} color={theme.color.primary}>
                  Where are you?
                </Text>
                <View height={15} />
                <Input
                  placeholder="Where are you?"
                  accessoryLeft={PinIconColor}
                  value={search}
                  onChangeText={value => setSearch(value)}
                />
              </View>
              <View style={styles.separator} />
            </>
          )}
          flatListProps={{
            data: locationList,
            renderItem: ({item, index}) => (
              <>
                <ListItem
                  title={`${item.title}`}
                  description={`${item.description}`}
                  accessoryLeft={search ? PinIcon : ShakeIcon}
                  onPress={() => {
                    onSelectAddress(item);
                    onClose();
                  }}
                />
                <Divider />
              </>
            ),
            keyExtractor: (item, index) => index,
            showsVerticalScrollIndicator: false,
          }}
        />
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
    marginTop: 20,
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
