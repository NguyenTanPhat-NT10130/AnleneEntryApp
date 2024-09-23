import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import ReusableScreenHeader from '../components/HeaderCheck';
import GradientText from '../components/Gradient/GradientText';
import CustomResultGradient from '../components/Gradient/CustomResultsGradient';
import GradientWrapper from '../components/Gradient/GradientWrapper';
import { commonStyles } from '../components/styles';
import WarningGradient from '../components/WarningGradient';
import { Shadow } from 'react-native-shadow-2';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type SolutionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Voucher'>;

type Props = {
  navigation: SolutionScreenNavigationProp;
};


const Voucher: React.FC<Props> = ({ navigation }) => {
  const textLines = [
    { text: 'CHĂM SÓC CƠ-XƯƠNG-KHỚP', fontSize: 24, fontWeight: '700' },
    { text: ' NHẬN LỘC SỨC KHỎE TỪ ANLENE', fontSize: 18.7, fontWeight: '700' },
  ];
  const handlePressLeft = () => {
    Alert.alert('Button pressed!');
  };

  const handlePressRight = () => {
    Alert.alert('Button pressed!');
  };
  const handlePressHome = () => {
    Alert.alert('Button pressed!');
  };
  return (
    <SafeAreaView style={commonStyles.linearGradient}>
      <ScrollView>
        <View style={styles.background}>
          <LinearGradient
            colors={[
              '#0E470E',
              '#1F660D',
              'rgba(32, 104, 13, 0.9)',
              'rgba(35, 110, 13, 0.85)',
              'rgba(39, 117, 13, 0.7)',
              'rgba(46, 130, 13, 0)',
            ]}
            locations={[0.0102, 0.7184, 0.823, 0.8678, 0.914, 1]} // chỉnh % màu
            // start={{ x: 0, y: 0.5 }}
            // end={{ x: 1, y: 0.5 }}
            style={styles.linearGradientTop}
          >
            <View style={styles.header}>
              <ReusableScreenHeader
                currentPage="5"
                totalPages="6"
                onPressLeft={handlePressLeft}
                onPressRight={handlePressRight}
                onPressHome={handlePressHome}
                containerStyle={{ flex: 1 }}  // Ghi đè style container 
                boxIconStyle={{ padding: wp('0%') }}  // Ghi đè style box_icon 
                pageMobileStyle={{ marginBottom: hp('0%'), left: wp('0%') }} // Ghi đè style page_mobile 
              />
              <View style={styles.box_brand_name}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.title}>
              <GradientText textLines={textLines} />
              <View style={styles.top_text_box}>
                <Text style={styles.top_text}>
                  ANLENE LÌ XÌ NGAY 100.000đ KHI ĐẶT MUA HÔM NAY!
                </Text>
                <Text style={[styles.top_text, { fontWeight: '500', lineHeight: 16.14 }]}>
                  Hạn sử dụng: 25/07/2021 - 31/07/2021
                </Text>
              </View>
            </View>

          </LinearGradient>
          <View style={styles.image_box}>
            <Image
              source={require('../../assets/Anlene Coffee18112 1.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <LinearGradient
            colors={[
              'rgba(46, 130, 13, 0)', // Màu cuối cùng của LinearGradient 1 thành màu đầu tiên
              'rgba(39, 117, 13, 0.7)',
              'rgba(35, 110, 13, 0.85)',
              'rgba(32, 104, 13, 0.9)',
              '#1F660D',
              '#0E470E', // Màu đầu tiên của LinearGradient 1 thành màu cuối cùng
            ]}
            locations={[0, 0.086, 0.1322, 0.177, 0.2816, 1]} // Đảo ngược phần trăm
            style={styles.linearGradientBottom}
          >
            <View style={styles.voucher_box}>
              <View style={styles.voucher_code_box}>
                <View style={{ marginTop: hp('1.5%') }}>
                  <Text style={styles.voucher_code_text}>MÃ GIẢM GIÁ</Text>
                  <Text style={styles.voucher_code}>ANLENANMUMW88YQI</Text>
                </View>
              </View>
              <View style={styles.voucher_text_box}>
                <Text style={styles.voucher_text}>ÁP DỤNG TẠI</Text>
                <Image
                  source={require('../../assets/Logo Lazada 2.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
            <TouchableOpacity style={{ marginTop: hp('1%') }}>
              <Shadow
                distance={4.42} // Tương đương shadowRadius
                startColor={'#470202B2'} // Màu shadow
                offset={[0.44, 1.77]} // Offset giống như shadowOffset
              >
                <View style={styles.pay_buton}>
                  <Text style={styles.pay_buton_text}>MUA NGAY</Text>
                </View>
              </Shadow>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Information')}
              style={styles.info_button}
            >
              <Text style={styles.info_button_text}>Tìm hiểu ngay</Text>
            </TouchableOpacity>
            <View style={styles.bottom_box}>
              <Text style={styles.bottom_text}>
                * Voucher chỉ áp dụng cho đơn hàng mua các sản phẩm Anlene Gold 3X, Anlene Gold 5X tại gian hàng Fonterra Official Retail Store trên Lazada
              </Text>
              <Text style={styles.bottom_text}>
                * Voucher chỉ áp dụng cho đơn hàng có giá trị từ 200.000đ
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    // position: 'relative'
  },
  linearGradientTop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('30%')// 32
  },
  linearGradientBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('40%')
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95%'), // Đảm bảo chiếm toàn bộ chiều rộng
    position: 'absolute',
    top: hp('0%'),
    bottom: hp('0%'), //22,
    marginBottom: hp('11%')
  },
  box_brand_name: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: hp('3%')
  },
  logo: {
    width: wp('30%'),// 98
    height: hp('3.3%'), //26
    marginTop: hp('-11%'),
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: hp('-8%')
  },
  top_text_box: {
    marginTop: hp('-0.8%')
  },
  top_text: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
    lineHeight: 16
  },
  image_box: {
    height: hp('41%'), // Chiếm 40% chiều cao màn hình làm khoảng trống
    justifyContent: 'center',
    alignItems: 'center',
    right: wp('0%')
  }
  ,
  image: {
    width: wp('190%'), //200
    height: hp('70%'),
    position: 'absolute', // Cho phép hình ảnh vượt qua các LinearGradient
    top: hp('-19%'), // 20% Điều chỉnh vị trí của hình ảnh cho hiệu ứng fade-in từ trên xuống
    zIndex: -1,  // Đặt hình ảnh phía sau các phần tử khác

  },
  voucher_box: {
    width: 249.9,
    height: 94,
    borderRadius: 6.11,
    borderWidth: 0.93,
    borderColor: '#FFFFFF',
    marginTop: hp('-16%')
  },
  voucher_code_box: {
    backgroundColor: '#FFFFFF',
    width: 249.9,
    height: 51.2,
  },
  voucher_code_text: {
    fontWeight: '700',
    fontSize: 10.7,
    lineHeight: 14.66,
    textAlign: 'center',
    color: '#73A442'
  },
  voucher_code: {
    fontWeight: '700',
    fontSize: 16.81,
    lineHeight: 23.03,
    textAlign: 'center',
    color: '#478449'
  },
  voucher_text_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    marginTop: hp('1.3%')
  },
  voucher_text: {
    fontWeight: '700',
    fontSize: 15.28,
    lineHeight: 20.94,
    textAlign: 'center',
    color: '#ECD24A'
  },
  pay_buton: {
    width: 184,
    height: 44,
    borderRadius: 40,
    backgroundColor: '#B70002',
    justifyContent: 'center',
  },
  pay_buton_text: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: '#00000040', // Màu của shadow (tương tự với '#00000040')
    textShadowOffset: { width: 1.52, height: 1.52 }, // Độ xê dịch của shadow (x, y)
    textShadowRadius: 1.52, // Bán kính của shadow (độ mờ)
  },
  info_button: {
    width: 184,
    height: 32,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#73A442',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginTop: hp('1%')
  },
  info_button_text: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21.92,
    textAlign: 'center',
    color: '#73A442'
  },
  bottom_box: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom_text: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 15.7,
    paddingTop: hp('1%')
  }


})

export default Voucher;