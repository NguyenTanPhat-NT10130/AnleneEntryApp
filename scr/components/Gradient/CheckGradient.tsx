import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type CheckGradientProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CheckGradient: React.FC<CheckGradientProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={['#0E470E', '#20680D', '#2E820D', '#13500E']}
      // start={{ x: 0.1, y: 0 }}      
      // end={{ x: 0.9, y: 1 }}        
      locations={[0, 0.2396, 0.724, 1]}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default CheckGradient;
