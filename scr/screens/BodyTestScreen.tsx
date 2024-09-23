import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import CheckGradient from '../components/Gradient/CheckGradient';
import GradientWrapper from '../components/Gradient/GradientWrapper';
import ReusableScreenHeader from '../components/HeaderCheck';
import ProgressStepsComponent from '../components/ProgressSteps';
import { commonStyles } from '../components/styles';
import GradientText from '../components/Gradient/GradientText';
import { videoResources } from '../components/resources';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/ConfigureStore';
import { setStepResult, selectStepOption, setSteps, activateNextStep, updateStepSelection } from '../redux/action/stepResultsSlice';
import { fetchStepsFromFirestore } from '../redux/action/steps';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { FIRESTORE } from '../firebase/firebaseConfig';
import { setBackground } from '../redux/action/backgroundSlice';

type BodyTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BodyTest'>;
type BodyTestScreenRouteProp = RouteProp<RootStackParamList, 'BodyTest'>;

interface StepState {
  id: number;
  label: string;
  title: string;
  active: boolean;
  selected: boolean;
  confirmed: boolean;
  selectedImage: string | null;
  videoSrc?: any;
  description: string;
}
interface Props {
  navigation: BodyTestScreenNavigationProp;
  route: BodyTestScreenRouteProp;
}
interface ModalCongratulationsProps {
  onClose: () => void; // Nhận prop onClose từ parent
  navigation: BodyTestScreenNavigationProp;
}
const ModalCongratulations: React.FC<ModalCongratulationsProps> = ({ onClose, navigation }) => {
  // Lấy stepResults từ Redux store
  const stepResults = useSelector((state: RootState) => state.step.stepResults);

  useEffect(() => {
    console.log('stepResults updated: ', stepResults); // Lắng nghe sự thay đổi của stepResults
  }, [stepResults]);
  const dispatch = useDispatch();
  const navigateBasedOnResults = () => {
    
    let backgroundType: 'color' | 'gradient' = 'color';
    let backgroundColor: string | undefined;
    let gradientColors: string[] | undefined;
    let gradientLocations: number[] | undefined;

    // Đóng modal khi điều hướng
    onClose();

    // Kiểm tra xem đã có 4 kết quả hay chưa
    if (stepResults.length === 4) {
      // Trường hợp nếu kết quả là [True, False, False, False]
      if (stepResults[0] && !stepResults[1] && !stepResults[2] && !stepResults[3]) {
        backgroundType = 'color';
        backgroundColor = '#969696';
      }
      // Trường hợp nếu kết quả là [True, True, True, False]
      else if (stepResults[0] && stepResults[1] && stepResults[2] && !stepResults[3]) {
        backgroundType = 'gradient';
        gradientColors = ['#FD9500', '#FEBF00', '#FB8402'];
        gradientLocations = [0, 0.5312, 1];
      }
      // Trường hợp tất cả kết quả đều là True [True, True, True, True]
      else if (stepResults.every(result => result)) {
        backgroundType = 'gradient';
        gradientColors = ['#0E470E', '#20680D', '#2E820D', '#13500E'];
        gradientLocations = [0, 0.2396, 0.724, 1];
      }

      // Debug kết quả
      console.log('backgroundType ', backgroundType);
      console.log('backgroundColor ', backgroundColor);
      console.log('gradientColors ', gradientColors);
      console.log('gradientLocations ', gradientLocations);

      // Cập nhật trạng thái background thông qua Redux
      dispatch(setBackground({
        backgroundType,
        backgroundColor,
        gradientColors,
        gradientLocations
      }));

      // Điều hướng sang trang TestResults
      navigation.navigate('TestResults', {
        backgroundType,
        backgroundColor,
        gradientColors,
        gradientLocations,
        stepResults
      });
    }
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
              style={styles.modal_btn_text}
            >
              HỦY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateBasedOnResults}
            style={styles.modal_continue_btn}
          >
            <Text style={[styles.modal_btn_text, { color: '#FFFFFF' }]}>TIẾP TỤC</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const BodyTest: React.FC<Props> = ({ navigation }) => {

  const [currentStep, setCurrentStep] = useState(0);

  const dispatch: AppDispatch = useDispatch(); // Sử dụng kiểu AppDispatch
  const stepStates = useSelector((state: RootState) => state.step.stepStates);
  const [textLines, setTextLines] = useState([
    { text: 'Loading...', fontSize: 18, fontWeight: '700' },
  ]);
  useEffect(() => {
    setCurrentStep(0);
    // Dispatch action để lấy dữ liệu từ Firestore
    dispatch(fetchStepsFromFirestore());

    // Quản lý listener trực tiếp trong useEffect
    const stepCollectionRef = collection(FIRESTORE, 'Step');
    const unsubscribe = onSnapshot(stepCollectionRef, (snapshot) => {
      // Xử lý snapshot tại đây nếu cần
      console.log('Real-time data from Firestore:', snapshot.docs.map(doc => doc.data()));
    });

    // Hủy listener khi component unmount
    return () => unsubscribe();
  }, [dispatch]);


  const [selectedOption, setSelectedOption] = React.useState<'yes' | 'no' | null>(null);
  const [confirmButtonColor, setConfirmButtonColor] = React.useState('#B8B8B8'); // Màu mặc định cho nút xác nhận
  const [showModal, setShowModal] = useState(false);


  const handleSelect = (option: 'yes' | 'no') => {
    setSelectedOption(option);
    console.log('option', option);

    // Chọn hình ảnh tương ứng dựa trên lựa chọn của người dùng
    const selectedImage = option === 'yes'
      ? require('../../assets/yes_step.png') // Hình ảnh cho Yes
      : require('../../assets/no_step.png'); // Hình ảnh cho No
    dispatch(updateStepSelection({ stepIndex: currentStep, selectedImage }));
    console.log('selectedImage ', selectedImage);
    console.log('currentStep ', currentStep);
  };


  useEffect(() => {
    if (stepStates.length > 0 && currentStep === 0) {
      // Cập nhật textLines khi stepStates có dữ liệu
      setTextLines([{ text: stepStates[0].title, fontSize: 18, fontWeight: '700' }]);
    }
    console.log('Current step has changed: ', currentStep);
    console.log('Step state for current step: ', stepStates[currentStep]);
  }, [currentStep, stepStates]);

  const handleConfirm = () => {
    if (!selectedOption) return;

    // Xác định kết quả `true` hoặc `false` dựa trên `selectedOption`
    const result = selectedOption === 'yes';

    // Dispatch để cập nhật kết quả (result) nhưng luôn cập nhật confirmed = true
    dispatch(setStepResult({ stepIndex: currentStep, result }));  // Kết quả dựa vào lựa chọn

    // Sau khi xác nhận, cập nhật hình ảnh cho step hiện tại
    const selectedImage = result
      ? require('../../assets/yes_step.png')
      : require('../../assets/no_step.png');

    // Dispatch cập nhật hình ảnh sau khi bước đã được xác nhận 
    dispatch(updateStepSelection({ stepIndex: currentStep, selectedImage }));

    // Nếu còn bước tiếp theo, di chuyển sang bước tiếp theo
    if (currentStep < stepStates.length - 1) {
      dispatch(activateNextStep(currentStep + 1));

      // Cập nhật bước hiện tại và reset lựa chọn
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setTextLines([{ text: stepStates[currentStep + 1].title, fontSize: 18, fontWeight: '700' }]);
      console.log("current title: ", stepStates[currentStep + 1].title);
    } else {
      // Khi hoàn thành tất cả các bước
      setConfirmButtonColor('#B70002');
      setShowModal(true);
    }
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
          <ProgressStepsComponent />
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

              {
                stepStates.length > 0 && stepStates[currentStep] && stepStates[currentStep].label ? (
                  <Video
                    source={{ uri: stepStates[currentStep].videoSrc }}
                    // source={videoResources[stepStates[currentStep].label]} // Đường dẫn tới video
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                    style={styles.check_image}
                  />
                ) : (
                  <Text>Video is loading or unavailable</Text> // Thông báo khi video chưa có
                )
              }

            </View>
          ) : (
            <View
              style={[
                styles.check_image_container,
                selectedOption === 'yes' && { borderColor: '#73A442', borderWidth: 3 }, // Xanh lá khi chọn 'yes'
                selectedOption === 'no' && { borderColor: '#C6463A', borderWidth: 3 }, // Đỏ khi chọn 'no'
                !selectedOption && { borderColor: 'transparent', borderWidth: 0 }, // Không có border khi không có lựa chọn
              ]}
            >
              <Image
                source={{ uri: stepStates[currentStep].videoSrc }}
                // source={require('../../assets/image_Dekhang.png')}
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

        {
          stepStates.length > 0 && stepStates[currentStep] && stepStates[currentStep].description ? (
            <Text style={styles.checkText_content}>
              {stepStates[currentStep].description}
            </Text>
          ) : (
            <Text>Description is loading or unavailable</Text> // Thông báo khi description chưa có
          )
        }

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
                <Text style={styles.check_text}>{isLastStep ? 'Hiếm khi' : 'Được'}</Text>
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
              <Text style={styles.check_text}>{isLastStep ? 'Nhiều lần' : 'Không được'}</Text>
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
          <ModalCongratulations onClose={handleCloseModal} navigation={navigation} />
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
  modal_btn_text: {
    fontFamily: 'SVN-Gotham Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21.92,
    textAlign: 'center',
    color: '#B70002'
  },
});


export default BodyTest;