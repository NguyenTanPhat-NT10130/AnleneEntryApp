// styles.ts
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const commonStyles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%')
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95%'), // Đảm bảo chiếm toàn bộ chiều rộng
    position: 'absolute',
    top: hp('0%'),
    bottom: hp('85%'),
    // zIndex: 1
  },
});
