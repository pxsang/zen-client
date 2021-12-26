import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import dateformat from 'dateformat';
import _ from 'underscore';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Spinner} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header3';
import Image from '../components/Image';
import theme from '../constants/theme';
import {getSessionHistory} from '../redux/actions/session';
import {priceFormat} from '../helpers/display';
import {AppContext} from '../providers/AppProvider';

const {height} = Dimensions.get('screen');

const HistoryItem = ({navigation, data}) => {
  if (_.isEmpty(data)) return null;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('RideDetail', {sessionId: data.id})}>
      <View style={styles.itemContainer}>
        <View style={theme.block.row}>
          <View style={theme.block.center}>
            <Text>{dateformat(data.created_at, 'hh:MM')}</Text>
            <View height={5} />
            <View style={styles.timeMarker}>
              <Text size={11} color="#7F7F7F">
                {dateformat(data.created_at, 'TT')}
              </Text>
            </View>
          </View>

          <View width={20} />

          <View>
            <Text size={16}>
              {data.request_services[0]?.group_service_name}
            </Text>
            <View height={5} />
            <Text size={12} color="#797979">
              Paid by MoMo
            </Text>
          </View>
        </View>
        <View>
          <Text size={16}>{priceFormat(data.total_amount)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const History = props => {
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const {
    history: {isLoading, data},
  } = SessionState;
  let [historyByDate, setHistoryByDate] = useState([]);
  const {t} = useContext(AppContext);

  useEffect(() => {
    dispatch(getSessionHistory());
  }, [dispatch]);

  useEffect(() => {
    const historyGroupByDate = _.groupBy(data, item =>
      moment(item.created_at).format('DD/MM/YYYY'),
    );

    setHistoryByDate(
      Object.keys(historyGroupByDate).map(key => ({
        date: key,
        list: historyGroupByDate[key],
      })),
    );
  }, [data]);

  return (
    <>
      <Header title={t('history')} {...props} />
      <View style={styles.container}>
        <Layout style={styles.contentContainer}>
          <View style={theme.block.paddingHorizontal(20)}>
            {isLoading ? (
              <View style={theme.block.rowCenter}>
                <Spinner />
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.content}
                contentContainerStyle={theme.block.paddingBottom(40)}
                data={historyByDate}
                renderItem={({item}) => {
                  return (
                    <FlatList
                      ListHeaderComponent={
                        <Text size={18} bold color={theme.color.primary}>
                          {item.date}
                        </Text>
                      }
                      ListHeaderComponentStyle={theme.block.paddingVertical(10)}
                      ItemSeparatorComponent={() => <View height={15} />}
                      data={item.list}
                      renderItem={({item}) => (
                        <HistoryItem {...props} data={item} />
                      )}
                      keyExtractor={item => item.id}
                    />
                  );
                }}
                keyExtractor={item => item.date}
                ItemSeparatorComponent={() => <View height={20} />}
                ListEmptyComponent={() => (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text semiBold size={22}>
                      {t('history_empty_title')}
                    </Text>
                    <Image
                      style={{width: 240, height: 240}}
                      source={require('../assets/images/looking.png')}
                    />
                    <Text>{t('history_empty_description')}</Text>
                    <View style={styles.buttonContainer}>
                      <Button
                        appearance="rounded"
                        style={styles.button}
                        onPress={() => props.navigation.navigate('Home')}>
                        {t('book_zen_massage_now')}
                      </Button>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
          {/* <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
              <Text size={16} color="#797979">Mon, 01 March 2021</Text>
              <View height={10} />
              <HistoryItem {...props} />
              <View height={15} />
              <HistoryItem {...props} />
            </View>
            <View style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
              <Text size={16} color="#797979">Mon, 01 March 2021</Text>
              <View height={10} />
              <HistoryItem {...props} />
              <View height={15} />
              <HistoryItem {...props} />
            </View>
          </ScrollView> */}
        </Layout>
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 70,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    // flex: 1,
  },
  fullname: {
    fontSize: 23,
  },
  therapist: {
    color: theme.color.gray,
  },
  rating: {
    fontSize: 16,
    color: theme.color.primary,
    marginTop: 5,
  },
  section: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  sectionHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: theme.color.gray,
  },
  summaryValue: {
    marginTop: 5,
    fontSize: 18,
  },
  headerIOS: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 142,
    zIndex: 99,
  },
  headerAndroid: {
    height: 142,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactInfoLast: {
    marginBottom: 0,
  },
  contactLabel: {
    fontSize: 15,
  },
  contactValue: {
    fontSize: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: theme.color.border,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  timeMarker: {
    width: 35,
    height: 18,
    backgroundColor: '#F2F5F7',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
