import React from 'react';
import { View, StyleProp, ViewStyle} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from './styles';
interface CustomResultGradientProps {
    backgroundType: 'color' | 'gradient'; // Kiểu màu nền: đơn sắc hoặc gradient
    backgroundColor?: string; // Màu nền đơn sắc
    gradientColors?: string[]; // Mảng các màu cho gradient
    gradientLocations?: number[]; 
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }
  

const CustomResultGradient: React.FC<CustomResultGradientProps> = ({backgroundType, style, backgroundColor, gradientColors, gradientLocations, children}) => {
    return(
        <View style={commonStyles.linearGradient}>
        {backgroundType === 'color' && (
          <View style={[style, { backgroundColor }]}>
            {children}
          </View>
        )}
  
        {backgroundType === 'gradient' && gradientColors && (
          <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}  // Sử dụng locations cho gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={style}
          >
            {children}
          </LinearGradient>
        )}
      </View>
    )
}

export default CustomResultGradient; 