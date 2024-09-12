import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useWizard, Wizard } from 'react-use-wizard';
import * as Progress from 'react-native-progress';

const Step1: React.FC = () => {
  const { nextStep } = useWizard();
  return (
    <View style={styles.stepContainer}>
      <Text>Step 1</Text>
      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

const Step2: React.FC = () => {
  const { nextStep, previousStep } = useWizard();
  return (
    <View style={styles.stepContainer}>
      <Text>Step 2</Text>
      <Button title="Previous" onPress={previousStep} />
      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

const Step3: React.FC = () => {
  const { previousStep } = useWizard();
  return (
    <View style={styles.stepContainer}>
      <Text>Step 3</Text>
      <Button title="Previous" onPress={previousStep} />
    </View>
  );
};

const WizardComponent: React.FC = () => {
  return (
    <Wizard>
      <ProgressBar />
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard>
  );
};

const ProgressBar: React.FC = () => {
  const { activeStep, stepCount } = useWizard();

  return (
    <View style={styles.progressContainer}>
      {[...Array(stepCount)].map((_, index) => (
        <View key={index} style={styles.stepWrapper}>
          <View style={[styles.stepCircle, index === activeStep && styles.activeStepCircle]}>
            {index === activeStep && <View style={styles.innerCircle} />}
          </View>
          {index < stepCount - 1 && (
            <Progress.Bar
              progress={1}
              width={50}
              color="#E0E0E0"
              unfilledColor="#FFFFFF"
              borderWidth={0}
              style={styles.progressBar}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeStepCircle: {
    borderColor: '#FFD700',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFD700',
  },
  progressBar: {
    marginHorizontal: 5,
  }
});

export default WizardComponent;
