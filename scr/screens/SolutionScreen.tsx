import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, TextInput, SafeAreaView, Animated, LayoutAnimation } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import ReusableScreenHeader from '../components/HeaderCheck';
import CustomResultGradient from '../components/CustomResultsGradient';
import GradientWrapper from '../components/GradientWrapper';
import { commonStyles } from '../components/styles';
import WarningGradient from '../components/WarningGradient';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type SolutionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Solution'>;

type Props = {
  navigation: SolutionScreenNavigationProp;
};

const Solution: React.FC<Props> = ({navigation}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const handlePresstExpanded = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (isExpanded) {
            // Thu gọn text
            Animated.timing(animation, {
                toValue: isExpanded ? 0 : 8,
                duration: 300,
                useNativeDriver: false, // Không nên dùng nativeDriver với chiều cao
            }).start();
        } else {
            // Mở rộng text
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setIsExpanded(!isExpanded);
    };
    const maxHeight = animation.interpolate({
        inputRange: [0, 8],
        outputRange: [0, 500], // Chiều cao tối đa của đoạn text đầy đủ (tùy chỉnh)
    });
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
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <CustomResultGradient
                backgroundType="color"
                backgroundColor="#969696"
                style={commonStyles.linearGradient}
            >
                <ScrollView>
                    <View style={[commonStyles.header, {marginBottom: hp('-1%')}, isExpanded && {marginBottom: hp('6%')}]}>
                        <ReusableScreenHeader
                            currentPage="4"
                            totalPages="6"
                            onPressLeft={handlePressLeft}
                            onPressRight={handlePressRight}
                            onPressHome={handlePressHome}
                            containerStyle={{ flex: 1 }}  // Ghi đè style container 
                            boxIconStyle={{ padding: wp('0%') }}  // Ghi đè style box_icon 
                            pageMobileStyle={{ marginBottom: hp('0%'), left: wp('0%') }} // Ghi đè style page_mobile 
                        />
                    </View>
                    
                    <View style={{ /*bottom: hp('2.5%'), 7*/ marginBottom: hp('7%'), alignItems: 'center', }}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.warning_box}>
                            <Text style={styles.warning_text}>
                                HÃY CẨN THẬN!
                            </Text>
                            <Text style={[styles.warning_contenttext, { /*top: hp('3%')*/ marginTop: hp('0%') }]}>
                                Tuy rằng có vẻ bạn đang có đề kháng tốt nhưng cần quan tâm đến hệ vận động nhiều hơn nhé, bởi sau tuổi 40, sức khoẻ Cơ-Xương-Khớp{'         '}suy giảm:
                            </Text>
                        </View>
                        <View style={styles.image_wrapp}>
                            <View style={styles.image_box}>
                                <Image
                                    source={require('../../assets/co.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                                <WarningGradient style={styles.imagetext_box}>
                                    <Text style={[styles.image_text, { paddingHorizontal: wp('3%') }]}>
                                        KHỐI CƠ <Text style={styles.highlightedText}>MẤT ĐI</Text>
                                    </Text>
                                </WarningGradient>
                            </View>
                            <View style={styles.image_box}>
                                <Image
                                    source={require('../../assets/xuong.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                                <WarningGradient style={[styles.imagetext_box, { width: wp('32%') }]}>
                                    <Text style={styles.image_text}>
                                        MẬT ĐỘ XƯƠNG <Text style={styles.highlightedText}>SUY GIẢM</Text>
                                    </Text>
                                </WarningGradient>
                            </View>
                            <View style={styles.image_box}>
                                <Image
                                    source={require('../../assets/Khop.png')}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                                <WarningGradient style={styles.imagetext_box}>
                                    <Text style={[styles.image_text, { paddingHorizontal: wp('4%') }]}>
                                        KHỚP <Text style={styles.highlightedText}>THOÁI HOÁ</Text>
                                    </Text>
                                </WarningGradient>
                            </View>
                        </View>
                        <View style={{ /*top: hp('6%'), marginTop 1, 48*/ marginTop: hp('48%'), position: 'absolute' }}>
                            <Text style={[
                                styles.warning_contenttext,
                                {
                                    fontSize: 12,
                                    lineHeight: 16.14,
                                    paddingHorizontal: wp('11%')// 8.8
                                }
                            ]}>
                                Bạn có thể sẽ phải đối mặt với những cơn đau nhức mỏi thường xuyên, gây khó khăn trong vận động và sinh hoạt hằng ngày.
                            </Text>
                        </View>
                        <View style={styles.product_image_container}>
                            <Image
                                source={require('../../assets/product_image.png')}
                                style={styles.product_image}
                                resizeMode="contain"
                            />
                            <View style={styles.note_text}>
                                <Text style={styles.first_note_text}>*Mỗi 10 năm. Nguồn: Daly et al., 2013. BMC Geriatrics 13:71</Text>
                                <Text style={styles.second_note_text}>**Mỗi 5-7 năm sau khi mãn kinh. Nguồn: National Osteoporosis Foundation (2009). Hormones and Healthy Bones</Text>
                            </View>
                        </View>
                        <View style={styles.bottom_container}>
                            <View style={styles.bottom_gradient_text}>
                                <Svg height="55" width="300">
                                    <Defs>
                                        <SvgLinearGradient id="grad" x1="110%" y1="0%" x2="50%" y2="0%">
                                            <Stop offset="1.14%" stopColor="#FFC200" />
                                            <Stop offset="12.88%" stopColor="#FFFCAB" />
                                            <Stop offset="49.11%" stopColor="#ECD24A" />
                                            <Stop offset="86.36%" stopColor="#ECD24A" />
                                            <Stop offset="99.12%" stopColor="#FFC200" />
                                        </SvgLinearGradient>
                                    </Defs>
                                    <SvgText
                                        x="50%"
                                        y="50"
                                        fill="black"
                                        fontSize="13"
                                        fontWeight="700"
                                        textAnchor="middle"
                                        opacity="0.2" // Độ mờ của bóng
                                        dy="2" // Đẩy bóng ra ngoài
                                    >
                                        LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ

                                    </SvgText>
                                    <SvgText
                                        x="50%"
                                        y="50"
                                        fill="url(#grad)"
                                        fontSize="13"
                                        fontWeight="700"
                                        textAnchor="middle"
                                    >
                                        LỰA CHỌN GIÚP CƠ-XƯƠNG-KHỚP CHẮC KHOẺ
                                    </SvgText>
                                </Svg>
                            </View>
                            <View style={[styles.bottom_box, isExpanded && styles.expanded_bottom_box]}>
                                <Text style={styles.bottom_text}>
                                    Đừng chậm trễ, cùng Anlene giúp bạn chăm sóc sức khoẻ Cơ-Xương-Khớp ngay hôm nay với Ưu đãi hấp dẫn đang chờ bạn!
                                </Text>
                                {isExpanded ? (
                                    <Animated.View style={{ maxHeight, marginTop: hp('0%')  }}>
                                        <Text style={[styles.bottom_expand]}>
                                            *Anlene 3 Khoẻ với công thức MovePro chứa các dưỡng chất Đạm, Canxi, Collagen cùng các Vitamin, Khoáng chất giúp
                                            Cơ-Xương-Khớp chắc khỏe và tăng sức đề kháng, cho bạn thoải mái vận động, tận hưởng cuộc sống.
                                        </Text>
                                        <TouchableOpacity onPress={handlePresstExpanded}>
                                            <Text style={[styles.bottom_text, {marginTop: hp('0%') }]}>Thu gọn</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                ) : (
                                    <TouchableOpacity onPress={handlePresstExpanded}>
                                        <Text style={[styles.bottom_text, { color: '#ECD24A'}]}>Xem thêm</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <GradientWrapper borderWidth={1.5} borderRadius={24} style={[styles.button_wrap, isExpanded && styles.button_expand]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Voucher')}
                                style={styles.customButton}
                            >
                                <Text style={styles.buttonText}>NHẬN NGAY</Text>
                            </TouchableOpacity>
                        </GradientWrapper>
                    </View>
                </ScrollView>
            </CustomResultGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: wp('24.6%'),// 88
        height: hp('6%'), //33
        // top: hp('3%'),
        marginTop: hp('6%'), // 6
        position: 'absolute'
    },
    warning_box:
    {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp('12%') // 10
    },
    warning_text: {
        color: '#DF1E13',
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 36,
        fontWeight: '700',
        // top: hp('3%')
        marginBottom: hp('0%')
    },
    warning_contenttext: {
        color: '#FFFFFF',
        width: wp('100%'),//340
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 17.49, // 17.49
        fontWeight: '500',
        paddingHorizontal: wp('15%'),// 11.4
    },
    image_wrapp: {
        flexDirection: 'row',
        width: '100%',
        // top: hp('5%')
        marginTop: hp('28%'), // 1, 28
        // position: 'absolute',


    },
    image_box: {
        paddingLeft: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    image: {
        width: wp('24%'), //86
        height: hp('12.2%'), //86
    },
    imagetext_box: {
        width: wp('27.8%'), // 100
        height: hp('5.9%'), // 42
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: '#FFFFFF',
        borderWidth: 1.5,
        marginTop: hp('1%')
    },
    image_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '900',
        lineHeight: 16.68

    },
    highlightedText: {
        color: '#ECD24A',
        fontWeight: '600'
    },
    product_image_container: {
        // top: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: hp('53%') // 44
    },
    product_image: {
        width: 282,
        height: 211.59
    },
    note_text: {
        width: 189,
        height: 26.87,
        // bottom: hp('2%')
        marginTop: hp('-2%')// -2

    },
    first_note_text: {
        color: '#FFFFFF',
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 6.11,
        lineHeight: 7.95,
        textAlign: 'center'
    },
    second_note_text: {
        color: '#FFFFFF',
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 6.11,
        lineHeight: 7.95,
        textAlign: 'center'
    },
    bottom_container: {
        alignItems: 'center',
        justifyContent: 'center',
        // top: hp('1%')
        marginTop: hp('29%')// -4, 61.5

    },
    bottom_gradient_text: {
        shadowColor: '#1E211D',
        shadowOffset: { width: 0, height: 4 },  // Tạo đổ bóng ngang và dọc
        shadowOpacity: 0.2,                     // Độ mờ của bóng
        shadowRadius: 10,                        // Bán kính đổ bóng
        elevation: 5, // Đổ bóng cho Android,
    },
    bottom_box: {
        width: 340,
        height: 68, // 68
        alignItems: 'center',
        justifyContent: 'center',
    },
    expanded_bottom_box: {
        width: 340,
        height: 68, // 68
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2.5%')
    },
    bottom_text:
    {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.14,
        textAlign: 'center',
        paddingHorizontal: wp('5%'),
    },

    bottom_expand: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 14.3,
        textAlign: 'center',
        fontStyle: 'italic',
        paddingHorizontal: wp('5%')
    },
    button_wrap: {
        // position: 'absolute',
        // top: hp('93%'), // 93, top
        width: wp('40%'),
        marginTop: hp('-7%'),// -7, -15
        shadowColor: '#00000040',  // Màu shadow với opacity 25%
        shadowOffset: { width: 1.16, height: 1.16 },  // Độ lệch của shadow
        shadowOpacity: 1,  // Độ mờ của shadow
        shadowRadius: 1.16,  // Bán kính làm mờ shadow
        elevation: 3,  // Thuộc tính dành riêng cho Android để hiển thị shadow,

    },
    button_expand: {
        // position: 'absolute',
        // top: hp('93%'), // 93, top
        width: wp('40%'),
        marginTop: hp('-2%'),// -2
        shadowColor: '#00000040',  // Màu shadow với opacity 25%
        shadowOffset: { width: 1.16, height: 1.16 },  // Độ lệch của shadow
        shadowOpacity: 1,  // Độ mờ của shadow
        shadowRadius: 1.16,  // Bán kính làm mờ shadow
        elevation: 3,  // Thuộc tính dành riêng cho Android để hiển thị shadow,

    },
    customButton: {
        backgroundColor: '#B70002',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        zIndex: 1
    },
})

export default Solution