import React from 'react';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';

interface GradientTextProps {
  textLines: string[]; // Mảng các chuỗi văn bản muốn hiển thị
}

const GradientText: React.FC<GradientTextProps> = ({ textLines }) => {
  return (
    <Svg height="100" width="300">
      <Defs>
        <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="-0.86%" stopColor="#BA872C" />
          <Stop offset="23%" stopColor="#E8E276" />
          <Stop offset="85.29%" stopColor="#E1D770" />
          <Stop offset="125.89%" stopColor="#885021" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        x="50%"
        y="20"
        fill="url(#grad)"
        fontSize="22"
        fontWeight="bold"
        textAnchor="middle"
      >
        {textLines.map((line, index) => (
          <TSpan key={index} x="50%" dy={`1.2em`}>
            {line}{' '}
          </TSpan>
        ))}
      </SvgText>
    </Svg>
  );
};

export default GradientText;
