import React from 'react';
import { Svg, Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface GradientTextWithShadowProps {
    children: React.ReactNode;
    gradientColors: { color: string; offset: string }[]; // Array of gradient colors and offsets
    fontSize?: number; // Font size for the text
    fontWeight?: string; // Font weight for the text
    shadowColor?: string; // Shadow color (optional)
    shadowOpacity?: number; // Shadow opacity (optional)
    shadowDy?: number; // Shadow displacement on Y axis (optional)
    x?: string; // X position
    y?: string; // Y position
}

const GradientTextWithShadow: React.FC<GradientTextWithShadowProps> = ({
    children,
    gradientColors,
    fontSize = 13,
    fontWeight = '700',
    shadowColor = 'black',
    shadowOpacity = 0.2,
    shadowDy = 2,
    x = '50%',
    y = '50',
}) => {
    return (
        <Svg height="55" width="300">
            <Defs>
                <SvgLinearGradient id="grad" x1="110%" y1="0%" x2="50%" y2="0%">
                    {gradientColors.map((grad, index) => (
                        <Stop key={index} offset={grad.offset} stopColor={grad.color} />
                    ))}
                </SvgLinearGradient>
            </Defs>
            {/* Shadow Text */}
            <SvgText
                x={x}
                y={y}
                fill={shadowColor}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAnchor="middle"
                opacity={shadowOpacity} // Shadow opacity
                dy={shadowDy} // Shadow Y offset
            >
                {children}
            </SvgText>
            {/* Main Gradient Text */}
            <SvgText
                x={x}
                y={y}
                fill="url(#grad)"
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAnchor="middle"
            >
                {children}
            </SvgText>
        </Svg>
    );
};

export default GradientTextWithShadow;
