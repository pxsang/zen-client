import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Icon} from '@ui-kitten/components';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';
import {getProfile} from '../redux/actions/user';

const {height} = Dimensions.get('screen');

const Rewards = props => {
  const dispatch = useDispatch();
  const {t} = useContext(AppContext);
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;

  const bookingCount = userInfo?.session_count || 0;

  const progressPercent = (bookingCount / 10) * 100;

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <Header title={t('rewards')} {...props} />
      <View style={styles.container}>
        <Layout style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.rewardContainer}>
              <Text bold size={24} style={styles.rewardTitle}>
                {t('reward_title')}
              </Text>

              <View height={10} />

              <View style={styles.progressContainer}>
                <View style={theme.block.row}>
                  <View style={styles.progress(progressPercent)} />
                  <View style={styles.remaining(progressPercent)} />
                </View>
                <View style={styles.rewardIconContainer(progressPercent)}>
                  <View style={styles.rewardIconContent}>
                    <Icon
                      name="gift"
                      style={styles.rewardIcon}
                      fill={theme.color.info}
                    />
                  </View>
                </View>
              </View>
              <View height={10} />
              <Text>
                <Text semiBold size={18} color={theme.color.primary}>
                  {bookingCount}/10
                </Text>
                <Text semiBold> {t('booking')}</Text>
              </Text>
            </View>
          </View>
        </Layout>
      </View>
    </>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 70,
    paddingVertical: 0,
    flex: 1,
    paddingHorizontal: 20,
  },
  rewardContainer: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: 8,
    padding: 15,
  },
  rewardTitle: {
    textTransform: 'uppercase',
  },
  progressContainer: {
    position: 'relative',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: progressPercent => ({
    width: `${progressPercent}%`,
    height: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.color.primary,
  }),
  remaining: progressPercent => ({
    width: `${100 - progressPercent}%`,
    height: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: theme.color.border,
  }),
  rewardIconContainer: progressPercent => ({
    position: 'absolute',
    left: `${progressPercent}%`,
    top: '50%',
    width: 44,
    height: 44,
    borderRadius: 16,
    padding: 4,
    backgroundColor: theme.color.primary,
    transform: [
      {
        translateX:
          progressPercent === 0 ? 0 : progressPercent === 100 ? -44 : -22,
      },
      {
        translateY: -22,
      },
    ],
    zIndex: 1,
  }),
  rewardIconContent: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 32,
    height: 32,
  },
});
