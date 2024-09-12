import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import CheckGradient from '../components/CheckGradient';
import ReusableScreenHeader from '../components/HeaderCheck';
import ProgressStepsComponent from '../components/ProgressSteps';
import { commonStyles } from '../components/styles';
import GradientText from '../components/GradientText';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type BodyTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: BodyTestScreenNavigationProp;
};

const BodyTest: React.FC<Props> = ({navigation}) => {
  const handlePressLeft = () => {
    Alert.alert('Button pressed!');
  };
  const handlePressBack = () => {
    Alert.alert('Button pressed!');
  };
  const handlePressRight = () => {
    Alert.alert('Button pressed!');
  };
  const handlePressHome = () => {
    Alert.alert('Button pressed!');
  };

  return (
    // <ScrollView>
    <CheckGradient style={commonStyles.linearGradient}>
      <View style={commonStyles.header}>
        <ReusableScreenHeader
          currentPage="2"
          totalPages="6"
          onPressLeft={handlePressLeft}
          onPressRight={handlePressRight}
          onPressHome={handlePressHome}
          containerStyle={styles.headers}  // Ghi đè style container 
          boxIconStyle={{ padding: wp('0%') }}  // Ghi đè style box_icon 
          pageMobileStyle={{ marginBottom: hp('0%'), left: wp('0%') }} // Ghi đè style page_mobile 
        />
      </View>
      <Text style={styles.title}>KIỂM TRA CƠ - XƯƠNG - KHỚP</Text>
      <View style={styles.progressStepsContainer}>
        <ProgressStepsComponent />
      </View>
      <View style={styles.gradientText_container}>
        <GradientText textLines={['KIỂM TRA CƠ']} />
      </View>
      <View style={styles.check_image_container}>
      <ImageBackground
        source={require('../../assets/gifit_1725640797338.gif')}
        style={styles.check_image} 
      />
      </View>
      <Text style={styles.checkText_content}>Thẳng lưng trước ghế, đứng lên ngồi xuống 5 lần từ 6-10 giây</Text>
      <View style={styles.check_container}>
        <TouchableOpacity style={styles.check_box}>
          <Icon
            name="emotsmile"
            type="simple-line-icon"
            size={44}
            color="#FFFFFF"
            backgroundColor='#478449'
            borderRadius={30}
          />
          <Text style={styles.check_text}>Được</Text>
        </TouchableOpacity>
        <Text>{'       '}</Text>
        <TouchableOpacity style={styles.check_box}>
          <Icon
            name='frowno'
            size={44}
            type='antdesign'
            backgroundColor='#E23F30'
            color='#FFFFFF'
            borderRadius={40}
          />
          <Text style={styles.check_text}>Không được</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
      onPress={() => navigation.navigate('TestResults')}
      style={styles.confirm_btn}
      >
        <Text style={styles.confirm_text}>XÁC NHẬN</Text>
      </TouchableOpacity>
      <Text style={styles.note_text}>*Lưu ý: Hãy dừng bài tập ngay nếu cảm thấy không thoải mái. Đảm bảo vị trí tập an toàn để không té ngã.</Text>
    </CheckGradient>
    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  headers: {
    flex: 1,  // Đảm bảo nó chiếm hết không gian ngang có sẵn
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    top: hp('5%'),
    fontWeight: 'bold'
  },
  progressStepsContainer: {
    backgroundColor: '#FFFFFF26',
    width: wp('85%'),
    height: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('4%'),
    top: hp('6%')
  },
  gradientText_container: {
    top: hp('4%')
  },
  checkText_content: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20.18,
    paddingHorizontal: wp('19%'),
    bottom: hp('1%')
  },
  //icon check
  check_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('1%'),
  },
  check_box: {
    backgroundColor: '#71A162',
    width: wp('30%'),
    height: hp('14%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10.29,

  },
  check_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  confirm_btn: {
    backgroundColor: '#B8B8B8',
    width: wp('45%'), // 160
    height: hp('7%'), // 44
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    top: hp('3.8%')
  },
  confirm_text: {
    fontSize: 16,
    lineHeight: 21.92,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  note_text: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 13,
    paddingHorizontal: wp('8%'),
    top: hp('5%')
  },
  check_image_container: {
    backgroundColor: '#71A162',
    width: wp('88%'), // 327
    height: hp('28%'), // 317
    borderRadius: 16,
    bottom: hp('2%'),
    overflow: 'hidden',
  },
  check_image:
  {
    height: hp('27.9%'),
  }
  

});


export default BodyTest;