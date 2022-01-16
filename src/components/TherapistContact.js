import {StyleSheet} from 'react-native';
import theme from '../constants/theme';

const TherapistContact = ({data}) => {
  return null;
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.chatContainer}>
  //       <Icon
  //         style={styles.chatIcon}
  //         fill="#8F9BB3"
  //         name="message-square-outline"
  //       />
  //       <Text size={12} color={theme.color.secondary}>
  //         {t('chat_with_therapist')}
  //       </Text>
  //     </View>
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       onPress={() => Linking.openURL(`tel:${data?.phone_number}`)}>
  //       <View style={styles.callContainer}>
  //         <Icon style={styles.phoneIcon} fill="#8F9BB3" name="phone-outline" />
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default TherapistContact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.border,
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 15,
  },
  callContainer: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderColor: '#8F9BB3',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
});
