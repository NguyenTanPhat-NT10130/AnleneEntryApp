import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface StepProps {
  label: string;
  active: boolean;
  stepnum: string;
}

const StepCircle: React.FC<StepProps> = ({ label, active, stepnum }) => {
  return (
    <View style={styles.stepContainer}>
      <View style={[styles.outerCircle, active ? styles.activeOuterCircle : styles.inactiveOuterCircle]}>
        {active ? (
          <View style={styles.innerCircle} />
        ) : (
          <Text style={styles.stepNum}>{stepnum}</Text>
        )}
      </View>
      <Text style={[styles.stepLabel, { width: wp('16.5%'), textAlign: 'center' }]}>
        {label}
      </Text>
    </View>
  );
};

const ProgressStepsComponent: React.FC = () => {
  return (
    <View style={styles.stepsWrapper}>
      <StepCircle label="Cơ" active={true} stepnum="1" />
      <View style={styles.dashedLine} />
      <StepCircle label="Xương" active={false} stepnum="2" />
      <View style={styles.dashedLine} />
      <StepCircle label="Khớp" active={false} stepnum="3" />
      <View style={styles.dashedLine} />
      <StepCircle label="Đề kháng" active={false} stepnum="4" />
    </View>
  );
};

const styles = StyleSheet.create({
  stepsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    right: wp('2%')
  },
  stepContainer: {
    alignItems: 'center',
  },
  outerCircle: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  activeOuterCircle: {
    borderColor: '#ECD24A',
    backgroundColor: '#FFFFFF',
  },
  inactiveOuterCircle: {
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('3%'),
    backgroundColor: '#ECD24A',
  },
  stepNum: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepLabel: {
    marginTop: 5,
    color: '#FFFFFF',
  },
  dashedLine: {
    width: wp('13%'), //14
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FFFFFF',
    marginHorizontal: -wp('5%'), // 4
    bottom: hp('1.4%')
  },
});

export default ProgressStepsComponent;
