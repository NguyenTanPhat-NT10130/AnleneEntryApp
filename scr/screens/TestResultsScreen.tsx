import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, TextInput, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReusableScreenHeader from '../components/HeaderCheck';
import CustomResultGradient from '../components/CustomResultsGradient';
import { commonStyles } from '../components/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type TestResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestResults'>;

type Props = {
    navigation: TestResultsScreenNavigationProp;
};
const TestResults: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);
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
        <CustomResultGradient
            backgroundType="color"
            backgroundColor="#969696"
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
            <View style={{ top: hp('2%') }}>
                <Text style={[styles.result_text, {}]}>HOÀN THÀNH BÀI KIỂM TRA</Text>
                <Text style={[styles.result_text, { fontSize: 26, lineHeight: 35.62, paddingTop: 0 }]}>LƯU Ý MỘT CHÚT!</Text>
                <Text style={styles.result_contentText}>Tuy rằng có vẻ bạn đang có đề kháng tốt nhưng cần quan tâm đến hệ vận động nhiều hơn nhé,
                    bởi sau tuổi 40,...</Text>
                <Text style={styles.instructions_text}>Điền thông tin bên dưới để xem đầy đủ
                    kết quả và nhận ngay Voucher ưu đãi lên đến 100.000đ từ Anlene.</Text>
            </View>
            <View style={styles.form_input}>
                <View>
                    <Text style={styles.label}>Họ tên:<Text style={styles.label_note}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập họ và tên"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Số điện thoại:<Text style={styles.label_note}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                <View>
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
                onPress={() => navigation.navigate('Solution')}
                style={styles.submit}
            >
                <Text style={styles.submit_text}>HOÀN THÀNH</Text>
            </TouchableOpacity>
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
        top: hp('1.9%'),
    },
    result_text: {
        color: '#DF1E13',
        fontSize: 13,
        lineHeight: 17.81,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 16
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
        fontWeight: '500'
    },
    label_note: {
        color: '#ECD24A'
    },
    input: {
        width: hp('46.2%'), // 327
        height: hp('5.6%'), //40
        fontSize: 14,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#BABABA',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        lineHeight: 18,
        fontWeight: '400'
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
    }
})

export default TestResults;