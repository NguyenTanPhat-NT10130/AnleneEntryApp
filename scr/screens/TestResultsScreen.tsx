import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, TextInput, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReusableScreenHeader from '../components/HeaderCheck';
import CustomResultGradient from '../components/Gradient/CustomResultsGradient';
import { commonStyles } from '../components/styles';
import CustomTextGradient from '../components/Gradient/CustomTextGradient';
import CustomBorderGradient from '../components/Gradient/CustomBorderGradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResultStepsFromFirestore } from '../redux/action/steps';
import { resetSteps } from '../redux/action/stepResultsSlice';
import { RootState, AppDispatch } from '../redux/store/ConfigureStore';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../firebase/firebaseConfig';
import { evaluateStepResults } from '../utils/evaluateStepResults';
import { generateConfig } from '../components/resources';
type TestResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestResults'>;

type Props = {
    navigation: TestResultsScreenNavigationProp;
};
interface ModalNotificationProps {
    onClose: () => void; // Nhận prop onClose từ parent
    navigation: TestResultsScreenNavigationProp;
    name: string;
    email: string;
    phone: string;
}
const ModalNotification: React.FC<ModalNotificationProps> = ({ onClose, navigation, name, email, phone }) => {
    const dispatch: AppDispatch = useDispatch();
    const stepResults = useSelector((state: RootState) => state.step.stepResults);
    const handleCancel = () => {
        dispatch(resetSteps());  // Reset lại các stepResults
        navigation.navigate('Welcome');  // Điều hướng về trang Welcome
        onClose();  // Đóng Modal
    };
    // Hàm lưu dữ liệu lên Firestore và điều hướng sau khi lưu thành công
    const handleSaveAndNavigate = async () => {
        try {
            const evaluate = evaluateStepResults(stepResults);
        
            // Lưu dữ liệu vào Firestore collection 'user'
            await addDoc(collection(FIRESTORE, 'user'), {
                name: name,
                email: email,
                phone: phone,
                evaluate: evaluate,
            });
            console.log('Dữ liệu đã được lưu thành công!');

            // Điều hướng đến trang Solution
            navigation.navigate('Solution');
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu lên Firestore:', error);
        }
    };
    return (
        <View style={styles.modal_container}>
            <View style={{ top: hp('4.5%') }}>
                <Text style={styles.modal_title}>THÔNG BÁO!</Text>
                <Text style={styles.modal_text}>Bạn có muốn huỷ bỏ kết quả kiểm tra sức khoẻ trước đó không?</Text>
                <View style={styles.modal_btn_box}>
                    <TouchableOpacity style={styles.modal_cancel_btn}>
                        <Text
                            onPress={handleCancel}
                            style={styles.modal_btn_text}
                        >
                            HỦY
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //   onPress={navigateBasedOnResults}
                        onPress={handleSaveAndNavigate}
                        style={styles.modal_continue_btn}
                    >
                        <Text style={[styles.modal_btn_text, { color: '#FFFFFF' }]}>ĐỒNG Ý</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const TestResults: React.FC<Props> = ({ navigation }) => {
    const { backgroundType, backgroundColor, gradientColors, gradientLocations } = useSelector(
        (state: RootState) => state.background
    );

    const stepResults = useSelector((state: RootState) => state.step.stepResults);
    console.log('Received params:', backgroundType, backgroundColor, gradientColors, gradientLocations, stepResults);
    const dispatch: AppDispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlePressLeft = () => {
        setShowModal(true);
    };
    // Fetch dữ liệu từ Firestore khi component được mount
    useEffect(() => {
        dispatch(fetchResultStepsFromFirestore());
    }, [dispatch]);
    // Lấy dữ liệu resultSteps từ Redux store
    const resultSteps = useSelector((state: RootState) => state.step.resultSteps);
   
    const evaluate = evaluateStepResults(stepResults);
    // Áp dụng điều kiện dựa trên stepResults để thay đổi nội dung và màu sắc
    const config = generateConfig(resultSteps);

    let finalConfig;

    switch (evaluate) {
        case 'dangerous':
            finalConfig = config.case1;
            break;
        case 'safe':
            finalConfig = config.case2;
            break;
        case 'good':
            finalConfig = config.case3;
            break;
        default:
            // Cung cấp giá trị mặc định nếu không có case nào khớp
            finalConfig = {
                firstResultText: { text: "Đang tải...", type: 'color', color: '#000000' },
                secondResultText: { text: "Đang tải...", type: 'color', color: '#000000' },
                contentText: "Đang tải...",
                borderType: 'color',
                validaText: { type: 'color', color: '#000000' },
                borderColor: '#000000',
                gradientColors: [],
                gradientLocations: []
            };
            break;
    }

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isInputFilled, setIsInputFilled] = useState({ name: false, phone: false, email: false });
    const [isFormValid, setIsFormValid] = useState(false);
    const validateForm = () => {
        const isNameFilled = name.trim() !== '';
        const isPhoneFilled = phone.trim() !== '';
        const isEmailFilled = email.trim() !== '';

        setIsInputFilled({
            name: !isNameFilled,
            phone: !isPhoneFilled,
            email: !isEmailFilled,
        });

        // Nếu tất cả các trường đều có giá trị, form hợp lệ
        setIsFormValid(isNameFilled && isPhoneFilled && isEmailFilled);
    };
    const validatePhoneNumber = async (): Promise<boolean> => {
        // Kiểm tra nếu giá trị nhập là số
        const isNumber = /^\d+$/.test(phone);
        if (!isNumber) {
            Alert.alert('Thông báo', 'Vui lòng nhập một dãy số hợp lệ.');
            return false;
        }

        // Kiểm tra độ dài số điện thoại không vượt quá 10 chữ số
        if (phone.length > 10) {
            Alert.alert('Thông báo', 'Số điện thoại không được vượt quá 10 chữ số.');
            return false;
        }

        // Kiểm tra xem số điện thoại đã tồn tại trong Firebase chưa
        const phoneExists = await checkPhoneNumberInFirebase(phone);
        if (phoneExists) {
            Alert.alert('Thông báo', 'Số điện thoại đã tồn tại trong hệ thống.');
            return false;
        }

        // Nếu tất cả kiểm tra đều qua, số điện thoại hợp lệ
        return true;
    };

    // Hàm kiểm tra số điện thoại trong Firebase
    const checkPhoneNumberInFirebase = async (phone: string) => {
        const phoneRef = collection(FIRESTORE, 'user'); // Điều chỉnh 'users' theo đúng tên collection
        const q = query(phoneRef, where('phone', '==', phone));
        const querySnapshot = await getDocs(q);

        // Trả về true nếu tồn tại ít nhất một document
        return !querySnapshot.empty;
    };

    useEffect(() => {
        validateForm(); // Kiểm tra lại mỗi khi một trong các input thay đổi
    }, [name, phone, email]);
    const [, forceUpdate] = useState(0);  // forceUpdate để làm mới layout

    const handleConfirm = async () => {
        // Kiểm tra validate số điện thoại trước
        const isPhoneValid = await validatePhoneNumber();

        if (!isPhoneValid) {
            // Nếu số điện thoại không hợp lệ, dừng việc xử lý tiếp theo
            return;
        }

        // Sau khi kiểm tra số điện thoại hợp lệ, thực hiện các kiểm tra khác
        if (!name || !phone || !email) {
            setIsConfirmed(true); // Chỉ khi chưa có dữ liệu đầy đủ, hiện thông báo lỗi
        } else {
            setIsConfirmed(false); // Ẩn thông báo lỗi khi form hợp lệ
            setShowModal(true);    // Hiện modal khi form hợp lệ
        }

        forceUpdate(n => n + 1);
    };





    const handlePressRight = () => {
        Alert.alert('Button pressed!');
    };
    const handlePressHome = () => {
        Alert.alert('Button pressed!');
    };
    return (
        <CustomResultGradient
            backgroundType={backgroundType}
            backgroundColor={backgroundColor}
            gradientColors={gradientColors}
            gradientLocations={gradientLocations}
            style={commonStyles.linearGradient}
        >
            <View style={commonStyles.header}>
                <ReusableScreenHeader
                    currentPage="3"
                    totalPages="6"
                    onPressLeft={handlePressLeft}
                    onPressRight={handlePressRight}
                    onPressHome={handlePressHome}
                    containerStyle={styles.headers}  // Ghi đè style container 
                    boxIconStyle={{ padding: wp('0%') }}  // Ghi đè style box_icon 
                    pageMobileStyle={{ marginBottom: hp('0%'), left: wp('0%') }} // Ghi đè style page_mobile 
                />
            </View>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.result_text_container}>
                <View style={{height: hp('7%'), justifyContent: 'center', top: 12}}>
                <CustomTextGradient
                    textType={finalConfig.firstResultText.type}
                    color={finalConfig.firstResultText.color || []}
                    gradientColors={finalConfig.firstResultText.gradientColors || []}
                    fontSize={13}
                    x='150'
                    y='50'
                >
                    {finalConfig.firstResultText.text}
                </CustomTextGradient>
                </View>
                {/* Hiển thị secondResultText */}
                <View style={{ height: hp('7%'), justifyContent: 'center', bottom: 10}}>
                <CustomTextGradient
                    textType={finalConfig.secondResultText.type}
                    color={finalConfig.secondResultText.color || []}
                    gradientColors={finalConfig.secondResultText.gradientColors || []}
                    fontSize={26}
                    x='150'
                    y='50'
                >
                    {finalConfig.secondResultText.text}
                </CustomTextGradient>
                </View>
                {/* Phần nội dung của đoạn text chính */}
                <Text style={styles.result_contentText}>
                    {finalConfig.contentText}
                </Text>
                <Text style={styles.instructions_text}>Điền thông tin bên dưới để xem đầy đủ
                    kết quả và nhận ngay Voucher ưu đãi lên đến 100.000đ từ Anlene.</Text>
            </View>
            <View style={styles.form_input}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ width: wp('30%') }}>
                        <Text style={styles.label}>Họ tên:
                            <CustomTextGradient
                                fontSize={14}
                                fontWeight='500'
                                textType={finalConfig.validaText.type}
                                color={finalConfig.validaText.color || []}
                                gradientColors={finalConfig.validaText.gradientColors || []}
                                x='4.3'
                                y='100'
                            >
                                *
                            </CustomTextGradient>
                        </Text>
                    </View>
                    <CustomBorderGradient
                        borderWidth={isConfirmed && isInputFilled.name ? 1.5 : 0}
                        borderRadius={8}
                        borderType={finalConfig.borderType}
                        borderColor={finalConfig.borderColor}
                        gradientColors={finalConfig.gradientColors}
                        gradientLocations={finalConfig.gradientLocations}
                        style={styles.input}
                    >
                        <TextInput
                            placeholder="Nhập họ và tên"
                            value={name}
                            onChangeText={setName}
                        />
                    </CustomBorderGradient>
                    {isConfirmed && isInputFilled.name ? (
                        <View style={styles.validate_box}>
                            <CustomTextGradient
                                fontSize={12}
                                fontWeight='500'
                                textType={finalConfig.validaText.type}
                                color={finalConfig.validaText.color || []}
                                gradientColors={finalConfig.validaText.gradientColors || []}
                                x='64'
                                y='17'
                            >
                                Vui lòng nhập họ và tên
                            </CustomTextGradient>
                        </View>
                    ) : null}
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ width: wp('30%') }}>
                        <Text style={styles.label}>Số điện thoại:
                            <CustomTextGradient
                                fontSize={14}
                                fontWeight='500'
                                textType={finalConfig.validaText.type}
                                color={finalConfig.validaText.color || []}
                                gradientColors={finalConfig.validaText.gradientColors || []}
                                x='4.3'
                                y='100'
                            >
                                *
                            </CustomTextGradient>
                        </Text>
                    </View>

                    <CustomBorderGradient
                        borderWidth={isConfirmed && isInputFilled.phone ? 1.5 : 0}
                        borderRadius={8}
                        borderType={finalConfig.borderType}
                        borderColor={finalConfig.borderColor}
                        gradientColors={finalConfig.gradientColors}
                        gradientLocations={finalConfig.gradientLocations}
                        style={styles.input}
                    >
                        <TextInput
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                            style={{ height: '95%', width: '100%' }}
                        />
                    </CustomBorderGradient>
                    {isConfirmed && isInputFilled.phone ? (
                        <View style={styles.validate_box}>
                            <CustomTextGradient
                                fontSize={12}
                                fontWeight='500'
                                textType={finalConfig.validaText.type}
                                color={finalConfig.validaText.color || []}
                                gradientColors={finalConfig.validaText.gradientColors || []}
                                x='75'
                                y='17'
                            >
                                Vui lòng nhập số điện thoại
                            </CustomTextGradient>
                        </View>
                    ) : null}
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>
            <View style={styles.commit_container}>
                <View style={styles.commit}>
                    <View style={styles.checkbox}>
                        <CheckBox
                            checked={isChecked}
                            onPress={() => setIsChecked(!isChecked)}
                        />
                    </View>
                    <Text style={styles.checkbox_text}>Tôi đồng ý để Anlene Vietnam liên hệ trong bất kỳ chương trình quảng cáo sản phẩm hay khuyến mãi nào</Text>
                </View>
                <Text style={styles.commmit_text}>Bằng cách điền bảng thông tin này, tôi đồng ý với việc thông tin của mình để xử lý dựa trên chính sách bảo mật của Anlene</Text>
            </View>
            <TouchableOpacity

                style={[
                    styles.submit,
                    { backgroundColor: isFormValid ? '#B70002' : '#B8B8B8' },
                ]}
                onPress={handleConfirm}
            >
                <Text style={styles.submit_text}>HOÀN THÀNH</Text>
            </TouchableOpacity>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modal_wrap}>
                    <ModalNotification
                        onClose={handleCloseModal}
                        navigation={navigation}
                        name={name}
                        email={email}
                        phone={phone}

                    />
                </View>
            </Modal>
        </CustomResultGradient>
    )
}

const styles = StyleSheet.create({
    headers: {
        flex: 1,
    },
    logo: {
        width: wp('37%'),// 116.85
        height: hp('4.3%'), //31
        marginTop: hp('0%'),
    },
    result_text_container: {
        marginTop: hp('-2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    result_text_box: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('5%')
    },
    result_contentText: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: wp('14%')
    },
    instructions_text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20.55,
        textAlign: 'center',
        paddingHorizontal: wp('12%')
    },
    form_input: {
        top: hp('3%')
    },
    label: {
        fontSize: 14,
        lineHeight: 18.83,
        marginBottom: 5,
        color: '#FFFFFF',
        fontWeight: '500',
        // backgroundColor: 'red',
        // height: hp('100%')
    },
    // label_note: {
    //     color: '#ECD24A'
    // },
    input: {
        width: hp('46.2%'), // 327, 46.2
        height: hp('5.6%'), //40,  
        fontSize: 14,
        paddingHorizontal: 10,
        color: '#BABABA',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        lineHeight: 18,
        fontWeight: '400',
        justifyContent: 'center',
    },
    validate_box: {
        height: hp('3%')
    },
    commit_container: {
        top: hp('2%')
    },
    commit: {
        flexDirection: 'row',
        width: '100%',
    },
    checkbox: {
        left: wp('6%'), //6
        bottom: hp('1%'),
        zIndex: 1
    },
    checkbox_text: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        top: hp('1%'),
        right: wp('7%'),
        paddingHorizontal: wp('9%')
    },
    commmit_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        paddingHorizontal: wp('14%'),
        opacity: 0.8, // 80%,
        bottom: hp('1%')
    },
    submit: {
        backgroundColor: '#B8B8B8',
        borderRadius: 24,
        width: wp('44.5%'), // 160
        height: hp('6.3%'), // 44
        justifyContent: 'center',
        alignItems: 'center',
        top: hp('5%')
    },
    submit_text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 21.92,
        textAlign: 'center'
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
        paddingHorizontal: wp('11.2%')
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
})

export default TestResults;