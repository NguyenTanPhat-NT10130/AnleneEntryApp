import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type CustomBorderGradientProps = {
    children: React.ReactNode;
    borderWidth: number;
    borderRadius: number;
    borderType: 'color' | 'gradient'; // Kiểu điều chỉnh: đơn sắc hoặc gradient
    borderColor?: string; // Màu viền đơn sắc
    gradientColors?: string[]; // Mảng các màu cho gradient
    gradientLocations?: number[]; // Vị trí các màu gradient
    style?: StyleProp<ViewStyle>;
};

const CustomBorderGradient: React.FC<CustomBorderGradientProps> = ({
    children,
    borderWidth,
    borderRadius,
    borderType,
    borderColor,
    gradientColors,
    gradientLocations,
    style,
}) => {
    if (borderType === 'gradient' && gradientColors && gradientColors.length > 0) {
        return (
            <LinearGradient
                colors={gradientColors}
                locations={gradientLocations}
                style={[
                    {
                        borderRadius: borderRadius + borderWidth,
                    },
                ]}
            >
                <View
                    style={[
                        style,
                        {
                            borderRadius, // Set the actual border radius for inner content
                            overflow: 'hidden',
                            backgroundColor: 'white', 
                            margin: borderWidth 
                        },
                    ]}
                >
                    {children}
                </View>
            </LinearGradient>
        );
    } else {
        return (
            <View
                style={[
                    style,
                    {
                        borderWidth: borderWidth,
                        borderColor: borderColor,
                        borderRadius: borderRadius,
                    },
                ]}
            >
                {children}
            </View>
        );
    }
};

export default CustomBorderGradient;
