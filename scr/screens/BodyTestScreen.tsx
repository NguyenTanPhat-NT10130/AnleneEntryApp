import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import CheckGradient from '../components/CheckGradient';
import GradientWrapper from '../components/GradientWrapper';
import ReusableScreenHeader from '../components/HeaderCheck';
import ProgressStepsComponent from '../components/ProgressSteps';
import { commonStyles } from '../components/styles';
import GradientText from '../components/GradientText';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type BodyTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BodyTest'>;
interface Props {
  navigation: BodyTestScreenNavigationProp;
  currentStep: number;
  stepStates: any[]; // You can replace `any` with your step state type if you have one
  setStepStates: (steps: any[]) => void; // Function to update step states
}
interface ModalCongratulationsProps {
  onClose: () => void; // Nhận prop onClose từ parent
  navigation: BodyTestScreenNavigationProp;
}
const ModalCongratulations: React.FC<ModalCongratulationsProps> = ({ onClose, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const handleContinue = () => {
    onClose();  // Đóng modal
    navigation.navigate('TestResults');  // Chuyển hướng sang trang mới
  };
  return (
    <View style={styles.modal_container}>
      <View style={{ top: hp('2%') }}>
        <Text style={styles.modal_title}>CẢM ƠN</Text>
        <Text style={styles.modal_text}>Bạn đã tham gia bài kiểm tra sức khoẻ Hãy tiếp tục để có thể nhận kết quả kiểm tra sức khoẻ của bạn.</Text>
        <View style={styles.modal_btn_box}>
          <TouchableOpacity style={styles.modal_cancel_btn}>
            <Text
              onPress={onClose}
              style={styles.bodal_btn_text}
            >
              HỦY
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity 
          onPress={handleContinue}
          style={styles.modal_continue_btn}
          >
            <Text style={[styles.bodal_btn_text, { color: '#FFFFFF' }]}>TIẾP TỤC</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const BodyTest: React.FC<Props> = ({navigation ,stepStates, setStepStates }) => {
  const textLines = [
    { text: 'KIỂM TRA CƠ', fontSize: 18, fontWeight: '700' },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  [stepStates, setStepStates] = React.useState([
    { label: 'Cơ', active: true, selected: false, confirmed: false, selectedImage: null, videoSrc: require('../../assets/Video_co.mp4'), description: 'Thẳng lưng trước ghế, đứng lên ngồi xuống 5 lần từ 6-10 giây' },
    { label: 'Xương', active: false, selected: false, confirmed: false, selectedImage: null, videoSrc: require('../../assets/Video_xuong.mp4'), description: 'Duỗi 2 tay về phía trước, từ từ cúi xuống để chạm vào mũi bàn chân' },
    { label: 'Khớp', active: false, selected: false, confirmed: false, selectedImage: null, videoSrc: require('../../assets/Video_khop.mp4'), description: 'Đứng rộng chân, lưng thẳng đứng, tay đưa ra sau và đan vào nhau' },
    { label: 'Đề kháng', active: false, selected: false, confirmed: false, selectedImage: null, description: '6 tháng gần đây, bạn có gặp các triệu chứng: ho, sổ mũi, cảm sốt?' },
  ]);
  const [selectedOption, setSelectedOption] = React.useState<'yes' | 'no' | null>(null);
  const [confirmButtonColor, setConfirmButtonColor] = React.useState('#B8B8B8'); // Màu mặc định cho nút xác nhận
  const [showModal, setShowModal] = useState(false); 
  const handleSelect = (option: 'yes' | 'no') => {
    setSelectedOption(option);
    console.log('option', option);
    // Update stepStates
    const updatedSteps = [...stepStates];
    const selectedImage = option === 'yes' ? require('../../assets/yes_step.png') : require('../../assets/no_step.png');

    updatedSteps[currentStep] = { ...updatedSteps[currentStep], selected: true, selectedImage };
    setStepStates(updatedSteps);
  };


  const handleConfirm = () => {
    if (!selectedOption) return;

    const updatedSteps = [...stepStates];
    updatedSteps[currentStep] = { ...updatedSteps[currentStep], confirmed: true };

    if (currentStep < updatedSteps.length - 1) {
      updatedSteps[currentStep + 1].active = true;
      setCurrentStep(currentStep + 1);
      setSelectedOption(null); // Reset lựa chọn cho bước tiếp theo
    } else {
      // Bước cuối cùng, đổi màu background nút và hiển thị thông báo hoàn thành
      setConfirmButtonColor('#B70002');
      setShowModal(true);
    }

    setStepStates(updatedSteps);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
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
  const isLastStep = currentStep === stepStates.length - 1;
  return (
    <ScrollView>
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
          <ProgressStepsComponent stepStates={stepStates} />
        </View>
        <View style={styles.gradientText_container}>
          <GradientText textLines={textLines} />
        </View>
        {/* Nội dung Body Test với video và lựa chọn */}
        <View style={{ position: 'relative' }}>
          {!isLastStep ? (
            <View
              style={[
                styles.check_image_container,
                selectedOption === 'yes' && { borderColor: '#73A442', borderWidth: 3 }, // Xanh lá khi chọn 'yes'
                selectedOption === 'no' && { borderColor: '#C6463A', borderWidth: 3 }, // Đỏ khi chọn 'no'
                !selectedOption && { borderColor: 'transparent', borderWidth: 0 }, // Không có border khi không có lựa chọn
              ]}
            >

              <Video
                source={stepStates[currentStep].videoSrc} // Đường dẫn tới video trong thư mục dự án
                rate={3.5}
                volume={1.0}
                isMuted={true}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                style={styles.check_image}
              />
            </View>
          ) : (
            <View
              style={[
                styles.check_image_container,
                selectedOption && styles.selected_video_border, // Highlight when an option is selected
              ]}
            >
              <Image
                source={require('../../assets/image_Dekhang.png')}
                style={[styles.check_image, { width: wp('88%'), height: hp('42%'), right: wp('0%') }]}
              />
            </View>
          )}
          {/* Hình ảnh dựa trên lựa chọn */}
          {selectedOption === 'yes' && (
            <Image
              source={require('../../assets/Yes.png')}
              style={styles.resultImage}
              contentFit="contain"
            />
          )}

          {selectedOption === 'no' && (
            <Image
              source={require('../../assets/No.png')}
              style={styles.resultImage}
              contentFit="contain"
            />
          )}
        </View>

        <Text style={styles.checkText_content}>{stepStates[currentStep].description}</Text>
        <View style={styles.check_container}>
          {/* Lựa chọn 'Yes' */}
          {selectedOption === 'yes' && styles.selected_box ? (
            <GradientWrapper borderWidth={1.5} borderRadius={10.29} style={styles.selected_box}>
              <TouchableOpacity style={styles.check_box} onPress={() => handleSelect('yes')}>
                <Image
                  source={require('../../assets/smile_face.png')}
                  style={styles.image_icon}
                  contentFit="contain"
                />
                <Text style={styles.check_text}>Được</Text>
              </TouchableOpacity>
            </GradientWrapper>
          ) : (
            <TouchableOpacity style={styles.check_box} onPress={() => handleSelect('yes')}>
              <Image
                source={require('../../assets/smile_face.png')}
                style={styles.image_icon}
                contentFit="contain"
              />
              <Text style={styles.check_text}>{isLastStep ? 'Hiếm khi' : 'Được'}</Text>
            </TouchableOpacity>
          )}

          <Text>{'       '}</Text>
          {/* Lựa chọn 'No' */}
          {selectedOption === 'no' ? (
            <GradientWrapper borderWidth={1.5} borderRadius={10.29} style={styles.selected_box}>
              <TouchableOpacity style={styles.check_box} onPress={() => handleSelect('no')}>
                <Image
                  source={require('../../assets/sad_face.png')}
                  style={styles.image_icon}
                  contentFit="contain"
                />
                <Text style={styles.check_text}>{isLastStep ? 'Nhiều lần' : 'Không được'}</Text>
              </TouchableOpacity>
            </GradientWrapper>
          ) : (
            <TouchableOpacity style={styles.check_box} onPress={() => handleSelect('no')}>
              <Image
                source={require('../../assets/sad_face.png')}
                style={styles.image_icon}
                contentFit="contain"
              />
              <Text style={styles.check_text}>Không được</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          
          onPress={() => handleConfirm()}
          disabled={!selectedOption}
          style={[styles.confirm_btn, { backgroundColor: confirmButtonColor }]}
        >
          <Text style={[styles.confirm_text]}>XÁC NHẬN</Text>
        </TouchableOpacity>
        <Text style={styles.note_text}>*Lưu ý: Hãy dừng bài tập ngay nếu cảm thấy không thoải mái. Đảm bảo vị trí tập an toàn để không té ngã.</Text>
      </CheckGradient>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal} 
      >
        <View style={styles.modal_wrap}>
          <ModalCongratulations onClose={handleCloseModal} navigation={navigation}/>
        </View>

      </Modal>
    </ScrollView>
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
    height: hp('11%'),
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
    width: wp('27%'),
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10.29,

  },
  selected_box: {
    transform: [{ scale: 1.1 }],
    borderColor: 'yellow',
  },
  image_icon: {
    width: 44,
    height: 44
  },
  check_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  confirm_btn: {
    backgroundColor: '#B8B8B8',
    width: wp('45%'), // 160
    height: hp('5.5%'), // 44
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
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 13,
    paddingHorizontal: wp('10%'),
    top: hp('5%')
  },
  check_image_container: {
    backgroundColor: '#71A162',
    width: wp('88%'), // 327
    height: hp('37%'), // 317
    borderRadius: 16,
    bottom: hp('2%'),
    overflow: 'hidden',
  },
  selected_video_border: {
    borderWidth: 3,
    borderColor: '#73A442',
  },
  resultImage: {
    position: 'absolute',
    zIndex: 1,
    width: wp('10%'),
    height: hp('10%'),
    top: hp('-6%'),
    right: wp('-2%')
  },
  check_image:
  {
    width: wp('100%'),
    height: hp('38%'), //27.9,
    right: wp('12%')
  },
  // Modal
  modal_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    width: 336,
    height: 194,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

  },
  modal_title: {
    fontFamily: 'SVN-Gotham Bold',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#478449'
  },
  modal_text: {
    fontFamily: 'SVN-Gotham Bold',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18.83,
    textAlign: 'center',
    color: '#1D1C1C',
    paddingHorizontal: wp('7%')
  },
  modal_btn_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: hp('1%'),
    paddingHorizontal: wp('6%')
  },
  modal_cancel_btn: {
    width: 140,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#B70002',
    justifyContent: 'center',
    alignItems: 'center'


  },
  modal_continue_btn: {
    width: 140,
    height: 40,
    backgroundColor: '#B70002',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodal_btn_text: {
    fontFamily: 'SVN-Gotham Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21.92,
    textAlign: 'center',
    color: '#B70002'
  },
});


export default BodyTest;