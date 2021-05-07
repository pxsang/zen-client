import React, {useRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {MASSAGE_TYPE_LIST} from '../../../constants/Constants';
import theme from '../../../constants/theme';
import {numberFormat} from '../../../helpers/display';

const ALL_MASSAGE_TYPES = MASSAGE_TYPE_LIST.reduce(
  (result, item) =>
    result.concat(...item.childs.map(_ => ({..._, name: item.name}))),
  [],
);

const PickMassageType = ({selectedMassageId, onBack, onSelectMassageType, onBookMassage}) => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const selectedMassageType = ALL_MASSAGE_TYPES.find(
    _ => _.id === selectedMassageId,
  );

  const suggestionMassageType = ALL_MASSAGE_TYPES.find(
    _ => _.name !== selectedMassageType.name,
  );

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
        <Text semiBold>Suggested Massage Types</Text>
        <TouchableWithoutFeedback onPress={onOpen}>
          <Text bold color={theme.color.info}>
            View All
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <MassageTypeItem data={selectedMassageType} isSelected />
        <MassageTypeItem
          data={suggestionMassageType}
          onSelect={id => onSelectMassageType(id)}
        />
      </View>
      <View style={styles.footer}>
        <Button icon="arrow-forward-outline" onPress={onBookMassage}>
          Book Massage
        </Button>
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
                  Select Massage Type
                </Text>
              </View>
              <View style={styles.separator} />
            </>
          )}
          flatListProps={{
            data: MASSAGE_TYPE_LIST,
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
                {item.childs.map(_ => {
                  const isSelected = _.id === selectedMassageId;

                  return (
                    <TouchableWithoutFeedback
                      key={_.id}
                      onPress={() => {
                        onSelectMassageType(_.id);
                        onClose();
                      }}>
                      <View style={{
                        backgroundColor: isSelected ? 'rgba(241, 140, 142, 0.08)' : 'transparent',
                        paddingHorizontal: 15,
                        paddingLeft: 30,
                      }}>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 15,
                          borderBottomColor: theme.color.border,
                          borderBottomWidth: 0.5,
                        }}>
                          <View>
                            <Text semiBold>{item.name}</Text>
                            <View height={5} />
                            <Text size={12}>{_.time} mins</Text>
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
            keyExtractor: item => item.heading,
            showsVerticalScrollIndicator: false,
          }}
        />
      </Portal>
    </View>
  );
};

export default PickMassageType;

const MassageTypeItem = ({data, isSelected, onSelect}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onSelect && onSelect(data.id)}>
      <View style={styles.massageTypeItemContainer(isSelected)}>
        <View>
          <Text semiBold>{data.name}</Text>
          <View height={5} />
          <Text size={12}>{data.time} mins</Text>
        </View>
        <View>
          <Text semiBold>{numberFormat(data.price)}đ</Text>
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
});
