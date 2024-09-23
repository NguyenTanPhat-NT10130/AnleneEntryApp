import React from 'react';
import { Text, StyleProp, TextStyle, View } from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface CustomTextGradientProps {
    children: React.ReactNode;
    textType: 'color' | 'gradient'; // Kiểu màu: đơn sắc hoặc gradient
    color?: string; // Màu đơn sắc
    gradientColors?: { color: string; offset: string }[]; // Mảng màu cho gradient
    gradientLocations?: number[]; // Vị trí của các màu gradient
    fontSize?: number; // Kích thước chữ
    fontWeight?: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'; // Sửa lại kiểu của fontWeight
    x?: string; 
    y?: string;
}

const CustomTextGradient: React.FC<CustomTextGradientProps> = ({
    children,
    textType,
    color,
    gradientColors,
    gradientLocations,
    fontSize = 20,
    fontWeight = '700', // Đặt giá trị mặc định là 700 (bold)
    x,
    y
}) => {
    if (textType === 'color') {
        return (
            <Text style={{ color, fontSize, fontWeight, fontFamily: 'SVN-Gotham Bold' }}>
                {children}
            </Text>
        );
    }

    if (textType === 'gradient' && gradientColors) {
        return (
            <Svg height="100" width="300" viewBox="0 0 300 100">
                <Defs>
                    <SvgLinearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                        {gradientColors.map((grad, index) => (
                            <Stop key={index} offset={grad.offset} stopColor={grad.color} />
                        ))}
                    </SvgLinearGradient>
                </Defs>
                <SvgText
                    fill="url(#grad1)"
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    x={x}  // Căn giữa theo chiều ngang với viewBox
                    y={y}  // Căn giữa theo chiều dọc với viewBox
                    textAnchor="middle"  // Giúp text canh giữa chính xác
                    fontFamily='SVN-Gotham Bold'
                >
                    {children}
                </SvgText>
            </Svg>
        );
    }

    return null;
};

export default CustomTextGradient;
