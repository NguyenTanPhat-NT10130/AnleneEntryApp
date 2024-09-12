import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type WarningGradientProps = {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

const WarningGradient: React.FC<WarningGradientProps> = ({
    children,
    style,
}) => {
    return (
        <LinearGradient
            colors={['#376E48', '#187B33']}
            start={{ x: -0.058, y: 0 }}  // tương đương với -5.8%
            end={{ x: 0.3608, y: 1 }}    // tương đương với 36.08%
            style={style}
        >
            {children}
        </LinearGradient>
    );
};

export default WarningGradient;