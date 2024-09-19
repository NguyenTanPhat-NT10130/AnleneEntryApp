import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

interface StepProps {
  label: string;
  active: boolean;
  stepnum: string;
  selected: boolean;
  confirmed: boolean;
  selectedImage: any; // This will be the image displayed after confirmation
}

const StepCircle: React.FC<StepProps> = ({ label, active, stepnum, selected, confirmed, selectedImage }) => {
  return (
    <View style={styles.stepContainer}>
      <View style={[styles.outerCircle, active ? styles.activeOuterCircle : styles.inactiveOuterCircle]}>
        {confirmed ? (  // Hiển thị hình ảnh nếu đã xác nhận
          <Image contentFit="contain" source={selectedImage} style={styles.stepImage} />
        ) : (
          <>
            {active ? <View style={styles.innerCircle} /> : <Text style={styles.stepNum}>{stepnum}</Text>}
          </>
        )}
      </View>
      <Text style={[styles.stepLabel, { width: wp('16.5%'), textAlign: 'center' }]}>{label}</Text>
    </View>
  );
};

interface ProgressStepsProps {
  stepStates: any[]; // You can replace `any` with a type for your steps
}

const ProgressStepsComponent: React.FC<ProgressStepsProps> = ({ stepStates }) => {
  return (
    <View style={styles.stepsWrapper}>
      {stepStates.map((step, index) => (
        <React.Fragment key={index}>
          <StepCircle
            label={step.label}
            active={step.active}
            stepnum={(index + 1).toString()}
            selected={step.selected}
            confirmed={step.confirmed}
            selectedImage={step.selectedImage}
          />
          {index < stepStates.length - 1 && <View style={styles.dashedLine} />}
        </React.Fragment>
      ))}
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
  stepImage: {
    width: wp('8.5%'),
    height: hp('4%')
  }
});

export default ProgressStepsComponent;
