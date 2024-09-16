import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientWrapper from '../components/GradientWrapper';
import GradientBorder from '../components/BorderGradient';
import ReusableHeader from '../components/HeaderHome';
import GradientText from '../components/GradientText';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';
import { commonStyles } from '../components/styles';
import * as Font from 'expo-font';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};



const Welcome: React.FC<Props> = ({ navigation }) => {

  const textLines = [
    { text: 'TẾT BẬN RỘN', fontSize: 22, fontWeight: '700' },
    { text: 'CƠ-XƯƠNG-KHỚP CÓ KHOẺ', fontSize: 22, fontWeight: '700' },
    { text: 'ĐỂ CHU TOÀN?', fontSize: 22, fontWeight: '700' }
  ];
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SVN-Gotham Bold': require('../../assets/fonts/SVN-Gotham Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Hoặc một màn hình loading nào đó
  }
  const handlePress = () => {
    Alert.alert('Button pressed!');
  };
  const handlePressLeft = () => {
    Alert.alert('Button pressed!');
  };

  const handlePressRight = () => {
    Alert.alert('Button pressed!');
  };

  return (
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
          <ReusableHeader
            currentPage="1"
            totalPages="6"
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
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
          <View style={styles.box_content_title}>
            <Text style={[styles.content_title, { paddingHorizontal: wp('2%') }]}>
              Trăm công nghìn việc dịp cận Tết mà cơ thể nhức mỏi, làm sao chu toàn?
            </Text>
            <Text style={[styles.content_title, { paddingHorizontal: wp('2%') }]}>
              Ngay lúc này, hãy{' '}
              <Text style={styles.highlightedText}>
                Kiểm tra Sức khoẻ Cơ-Xương-Khớp
              </Text>{' '}
              cùng Anlene để Tết này cả nhà vui khoẻ đón Tết, trọn vẹn niềm vui.
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.image_box}>
        <Image
          source={require('../../assets/Picture1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('BodyTest')}
        style={{ position: 'absolute' }}
      >
        <GradientWrapper borderWidth={1.5} borderRadius={30.24} style={styles.button_wrap}>
          <View
            style={styles.customButton}
          >
            <Text style={styles.buttonText}>KIỂM TRA NGAY</Text>
          </View>
        </GradientWrapper>
      </TouchableOpacity>
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
        <View>
          <View style={styles.voucher_container}>
            <GradientBorder borderWidth={1.4} borderRadius={18} style={{marginRight: wp('4%')}}>
              <GradientWrapper borderWidth={1} borderRadius={18} style={styles.voucher_box}>
                <ImageBackground 
                source={require('../../assets/Free.png')}
                resizeMode="contain"
                style={styles.voucher_border}
                >
                  <Text style={styles.voucher_text}>MIỄN PHÍ</Text>
                </ImageBackground>
              </GradientWrapper>
            </GradientBorder>
            <GradientBorder borderWidth={1.4} borderRadius={18} style={{marginRight: wp('4%')}}>
              <GradientWrapper borderWidth={1} borderRadius={18} style={styles.voucher_box}>
                <View style={styles.voucher_border}>
                  <Text style={styles.voucher_text}>Chỉ 5 phút</Text>
                </View>
              </GradientWrapper>
            </GradientBorder>
            <GradientBorder borderWidth={1.4} borderRadius={18}>
              <GradientWrapper borderWidth={1} borderRadius={18} style={styles.voucher_box}>
              <ImageBackground 
                 source={require('../../assets/voucher.png')}
                 resizeMode="contain"
                 style={styles.voucher_border}
                >
                  <Text style={[styles.voucher_text, { fontSize: 8.34 }]}>Voucher</Text>
                  <Text style={[styles.voucher_text, { fontSize: 15.21 }]}>100K</Text>
                </ImageBackground>

              </GradientWrapper>
            </GradientBorder>
          </View>
        </View>
        <View style={styles.bottom_wrap}>
          <Text style={styles.bottom_content}>Bài kiểm tra Cơ, Xương, Khớp này được phát triển bởi đội ngũ Anlene</Text>
          <Text>{'  '}</Text>
          <Text style={[styles.bottom_content, { paddingHorizontal: wp('10%') }]}>Lưu ý: Bài kiểm tra không dành cho đối tượng đang bị chấn thương hoặc có bệnh lý về cơ, xương, khớp hoặc tiểu đường</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  // Welcome
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
    height: hp('40%')// 32
  },
  linearGradientBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('25%')
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95%'), // Đảm bảo chiếm toàn bộ chiều rộng
    position: 'absolute',
    top: hp('0%'),
    bottom: hp('23%'), //19
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // bottom: hp('1%'), //19
    top: hp('2%')
  },
  logo: {
    width: wp('16.7%'),// 60
    height: hp('2%'), //16
    bottom: hp('1.5%'),
  },
  box_brand_name: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  content_title: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    lineHeight: 19
  },
  box_content_title: {
    marginTop: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlightedText: {
    fontSize: 14.5,
    color: '#ECD24A',
    fontWeight: 'bold',
  },
  image_box: {
    height: hp('35%'), // Chiếm 40% chiều cao màn hình làm khoảng trống
    justifyContent: 'center',
    alignItems: 'center',
    right: wp('16%')
  }
  ,
  image: {
    width: wp('190%'), //200
    height: hp('70%'),
    position: 'absolute', // Cho phép hình ảnh vượt qua các LinearGradient
    top: hp('-17%'), // 20% Điều chỉnh vị trí của hình ảnh cho hiệu ứng fade-in từ trên xuống
    zIndex: -1,  // Đặt hình ảnh phía sau các phần tử khác

  },
  button_wrap: {
    top: hp('71%'),
    shadowColor: '#00000040',  // Màu shadow với opacity 25%
    shadowOffset: { width: 1.16, height: 1.16 },  // Độ lệch của shadow
    shadowOpacity: 1,  // Độ mờ của shadow
    shadowRadius: 1.16,  // Bán kính làm mờ shadow
    elevation: 3,  // Thuộc tính dành riêng cho Android để hiển thị shadow,

  },
  customButton: {
    backgroundColor: '#B70002',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 30.24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  voucher_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('67%'),
    bottom: hp('1.5%'),
  },
  voucher_box: {
    width: wp('23%'), //28
    height: hp('8%'),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucher_border: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('17%')
  },
  voucher_text: {
    color: '#478449',
    fontFamily: 'SVN-Gotham Bold',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: wp('3%')
  },
  bottom_wrap: {
    top: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_content: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'SVN-Gotham Bold'
  },
  overlay: {
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
  },

});

export default Welcome;
