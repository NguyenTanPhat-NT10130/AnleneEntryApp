import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientWrapperProps = {
  children: React.ReactNode;
  borderWidth: number;
  borderRadius: number;
  style?: StyleProp<ViewStyle>;
};

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children, borderWidth, borderRadius, style }) => {
  return (
    <LinearGradient
      colors={['#FFC200', '#FFFCAB', '#ECD24A', '#ECD24A', '#FFC200']}
      locations={[0.0114, 0.1288, 0.4911, 0.8636, 0.9912]} // Thêm locations ở đây
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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

export default GradientWrapper;
