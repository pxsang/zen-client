import React, {useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import PaymentSummary from '../../../components/PaymentSummary';
import theme from '../../../constants/theme';
import {numberFormat} from '../../../helpers/display';
import useTranslate from '../../../hooks/useTranslate';

const PickMassageType = ({
  selectedService,
  onBack,
  onSelectService,
  onBookMassage,
}) => {
  const modalizeRef = useRef(null);
  const t = useTranslate();
  const ServiceState = useSelector(state => state.Service);
  const {services} = ServiceState;
  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();
  const selectedParentService = services.find(
    _ => _.id === selectedService.service_id,
  );
  const selectedServiceData = {
    service: selectedParentService,
    sub_service: selectedParentService?.sub_services.find(
      _ => _.id === selectedService.sub_service_id,
    ),
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={onBack}>
        <View style={styles.backContainer}>
          <Icon
            style={styles.backIcon}
            fill={theme.color.primary}
            name="arrow-back"
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.header}>
        <Text semiBold>{t('suggested_massage_type')}</Text>
        <TouchableWithoutFeedback onPress={onOpen}>
          <Text bold color={theme.color.info}>
            {t('view_all')}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <MassageTypeItem data={selectedServiceData} isSelected t={t} />
      </View>
      <View style={styles.footer}>
        <PaymentSummary totalAmount={selectedServiceData.sub_service.price} />
        <View height={20} />
        <Button icon="arrow-forward-outline" onPress={onBookMassage}>
          {t('book_massage')}
        </Button>
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          closeOnOverlayTap={true}
          HeaderComponent={() => (
            <>
              <View
                style={[
                  theme.block.paddingHorizontal(20),
                  theme.block.paddingVertical(20),
                ]}>
                <Text bold size={16} color={theme.color.primary}>
                  {t('select_massage_type')}
                </Text>
              </View>
              <View style={styles.separator} />
            </>
          )}
          flatListProps={{
            data: services,
            renderItem: ({item}) => (
              <View key={item.id} style={theme.block.paddingVertical(10)}>
                <View
                  style={[
                    theme.block.paddingHorizontal(15),
                    theme.block.paddingVertical(10),
                  ]}>
                  <Text bold size={16}>
                    {item.name}
                  </Text>
                </View>
                {item.sub_services.map(_ => {
                  const isSelected =
                    selectedService.service_id === item.id &&
                    _.id === selectedService.sub_service_id;

                  return (
                    <TouchableWithoutFeedback
                      key={_.id}
                      onPress={() => {
                        onSelectService({
                          service_id: item.id,
                          sub_service_id: _.id,
                        });
                        onClose();
                      }}>
                      <View style={styles.subServiceContainer(isSelected)}>
                        <View style={styles.subServiceContent}>
                          <View>
                            <Text semiBold>{item.name}</Text>
                            <View height={5} />
                            <Text size={12}>
                              {t('mins', {mins: _.duration})}
                            </Text>
                          </View>
                          <View>
                            <Text semiBold>{numberFormat(_.price)}đ</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ),
            keyExtractor: item => item.id,
            showsVerticalScrollIndicator: false,
          }}
        />
      </Portal>
    </View>
  );
};

export default PickMassageType;

const MassageTypeItem = ({data, isSelected, onSelect}) => {
  const t = useTranslate();

  return (
    <TouchableWithoutFeedback onPress={() => onSelect && onSelect(data.id)}>
      <View style={styles.massageTypeItemContainer(isSelected)}>
        <View>
          <Text semiBold>{data.service.name}</Text>
          <View height={5} />
          <Text size={12}>{t('mins', {mins: data.sub_service.duration})}</Text>
        </View>
        <View>
          <Text semiBold>{numberFormat(data.sub_service.price)}đ</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    top: -70,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
  massageTypeItemContainer: isSelected => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'rgba(241, 140, 142, 0.04)',
    borderRadius: 8,
    borderColor: theme.color.primary,
    borderWidth: isSelected ? 1 : 0,
  }),
  separator: {
    height: 8,
    backgroundColor: theme.color.border,
  },
  subServiceContainer: isSelected => ({
    backgroundColor: isSelected ? 'rgba(241, 140, 142, 0.08)' : 'transparent',
    paddingHorizontal: 15,
    paddingLeft: 30,
  }),
  subServiceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: theme.color.border,
    borderBottomWidth: 0.5,
  },
});
