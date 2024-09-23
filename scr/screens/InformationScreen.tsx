import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-virtualized-view';
import ReusableScreenHeader from '../components/HeaderCheck';
import GradientBorder from '../components/Gradient/BorderGradient';
import CustomResultGradient from '../components/Gradient/CustomResultsGradient';
import GradientWrapper from '../components/Gradient/GradientWrapper';
import { commonStyles } from '../components/styles';
import WarningGradient from '../components/WarningGradient';
import CheckGradient from '../components/Gradient/CheckGradient';
const splitTextIntoLines = (text: string, maxCharsPerLineArray: number[]): string[] => {
    const words: string[] = text.split(' '); // Mảng các từ từ đoạn văn bản
    const lines: string[] = []; // Mảng chứa các dòng đã được tách
    let currentLine: string = ''; // Dòng hiện tại
    let lineIndex: number = 0; // Vị trí của dòng hiện tại

    words.forEach((word) => {
        const maxChars: number = maxCharsPerLineArray[lineIndex] || maxCharsPerLineArray[maxCharsPerLineArray.length - 1];

        if ((currentLine + word).length <= maxChars) {
            currentLine += `${word} `;
        } else {
            lines.push(currentLine.trim());
            currentLine = `${word} `;
            lineIndex++;
        }
    });

    if (currentLine) {
        lines.push(currentLine.trim()); // Thêm dòng cuối cùng nếu còn dư từ
    }

    return lines.slice(0, maxCharsPerLineArray.length); // Giới hạn số dòng theo số phần tử của maxCharsPerLineArray
};

const Information: React.FC = () => {
    const text = 'Uống 2 ly Anlene mỗi ngày để bổ sung dinh dưỡng, tăng cường đề kháng đồng thời duy trì thói quen tập thể dục mỗi ngày để giúp hệ Cơ-Xương-Khớp chắc khoẻ, thoải mái tận hưởng cuộc sống năng động, chẳng ngại “rào cản” tuổi tác.';
    const maxCharsPerLineArray = [41, 44, 41, 35, 37, 19]; // Số ký tự khác nhau cho từng dòng

    const lines = splitTextIntoLines(text, maxCharsPerLineArray);
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

            <CheckGradient style={commonStyles.linearGradient}>
                <ScrollView style={{ width: wp('100%') }}>
                    <View style={styles.header}>
                        <ReusableScreenHeader
                            currentPage="6"
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
                        <Text style={styles.title_text}>THÔNG TIN SẢN PHẨM</Text>
                        <Text style={[styles.title_text, { fontSize: 18, lineHeight: 27 }]}>SỮA ANLENE 3 KHỎE</Text>
                    </View>
                    <View style={styles.image_box}>
                        <Image
                            source={require('../../assets/Anlene_Sua.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ marginTop: hp('-6%') }}>
                        {lines.map((line, index) => (
                            <Text key={index} style={styles.content_text}>
                                {line}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.image_advantage_wrap}>
                        <GradientWrapper borderWidth={2.4} borderRadius={12.03} style={styles.image_advantage_box}>
                            <GradientBorder borderWidth={0} borderRadius={12.03}>
                                <Image
                                    source={require('../../assets/co CX-02.png')}
                                    style={styles.image_advantage}
                                    resizeMode="contain"
                                />
                            </GradientBorder>
                        </GradientWrapper>
                        <GradientWrapper borderWidth={2.4} borderRadius={12.03} style={styles.image_advantage_box}>
                            <GradientBorder borderWidth={0} borderRadius={12.03}>
                                <Image
                                    source={require('../../assets/co CX-03.png')}
                                    style={styles.image_advantage}
                                    resizeMode="contain"
                                />
                            </GradientBorder>
                        </GradientWrapper>
                        <GradientWrapper borderWidth={2.4} borderRadius={12.03} style={styles.image_advantage_box}>
                            <GradientBorder borderWidth={0} borderRadius={12.03}>
                                <Image
                                    source={require('../../assets/co CX-04.png')}
                                    style={styles.image_advantage}
                                    resizeMode="contain"
                                />
                            </GradientBorder>
                        </GradientWrapper>
                        <View>
                        </View>
                        <View>
                        </View>
                    </View>
                </ScrollView>
            </CheckGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('95%'), // Đảm bảo chiếm toàn bộ chiều rộng
        position: 'absolute',
        top: hp('0%'),
        bottom: hp('0%'), //22,
        marginBottom: hp('58%')// 82 (marginBottom)
    },
    box_brand_name: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginBottom: hp('67%') //3
    },
    logo: {
        width: wp('30%'),// 98
        height: hp('3.3%'), //26
        marginTop: hp('-11%'),
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('14%')
    },
    title_text: {
        color: '#ECD24A',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 36
    },
    image_box: {
        height: hp('41%'),
        justifyContent: 'center',
        alignItems: 'center',
        right: wp('0%'),
        marginTop: hp('-7%')
    }
    ,
    image: {
        width: 335, //200
        height: 205,
        position: 'absolute', // Cho phép hình ảnh vượt qua các LinearGradient    
    },
    content_text: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.83,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    image_advantage_wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2.5%')

    },
    image_advantage: {
        width: 274, //274
        height: 168
    },
    image_advantage_box: {
        width: wp('70%'),
        marginBottom: hp('3%'),
    },


})
export default Information;