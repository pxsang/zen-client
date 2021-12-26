import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {Icon} from '@ui-kitten/components';
import ClientInfo from '../../../components/ClientInfo';
import theme from '../../../constants/theme';
import {priceFormat} from '../../../helpers/display';

const CompletedSession = ({t, sessionDetail, onComplete, onRating}) => {
  let [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      <View style={theme.block.paddingHorizontal(20)}>
        <Text size={12}>Complete</Text>
        <Text bold size={24}>
          {t('summary_of_session')}
        </Text>
      </View>
      <View height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          theme.block.paddingHorizontal(20),
          theme.block.paddingVertical(10),
        ]}>
        <View>
          <ClientInfo
            data={[
              {
                label: t('booking_address'),
                value: sessionDetail?.client_address,
              },
              {
                label: t('type_of_massage'),
                value: sessionDetail?.request_services[0].group_service_name,
              },
            ]}
          />
        </View>
        <View height={20} />
        <View>
          <ClientInfo
            data={[
              {
                label: 'Session Price',
                value: priceFormat(sessionDetail?.total_amount),
              },
              {
                label: 'Tip to Therapist',
                value: t('tips_description'),
              },
            ]}
          />
        </View>
        <View height={20} />
        <View>
          <View style={styles.ratingContainer}>
            <View style={theme.block.rowMiddleCenter}>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => setRating(index + 1)}>
                    <Icon
                      style={styles.starIcon}
                      fill={index + 1 <= rating ? '#FAD647' : '#8F9BB3'}
                      name="star"
                    />
                  </TouchableWithoutFeedback>
                ))}
            </View>
            <View height={10} />
            <Text center>{sessionDetail?.therapist.name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                appearance="rounded"
                style={styles.button}
                onPress={() => {
                  // setStatus(STATUS.PREPARE_DATA);
                  // setAddress();
                  // setAddressConfirmed(false);
                  // setMassageId();
                  onComplete(rating);
                }}>
                Rate Therapist
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompletedSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    height: 40,
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  ratingContainer: {
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
  },
  ratingIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 2.5,
    resizeMode: 'contain',
  },
  starIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 3,
  },
});
