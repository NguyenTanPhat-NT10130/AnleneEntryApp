import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientBorderProps = {
    children: React.ReactNode;
    borderWidth: number;
    borderRadius: number;
    style?: StyleProp<ViewStyle>;
};

const GradientBorder: React.FC<GradientBorderProps> = ({ children, borderWidth, borderRadius, style }) => {
    return (
        <LinearGradient
            colors={['#73A442', '#478449']}
            start={{ x: 0.28365, y: 0 }}
            end={{ x: 0.9767, y: 1 }}
            style={[
                style,
                {
                    padding: borderWidth,
                    borderRadius: borderRadius + borderWidth,
                },
            ]}
        >
            <View style={{ borderRadius: borderRadius, overflow: 'hidden' }}>
                {children}
            </View>
        </LinearGradient>
    );
};

export default GradientBorder;
