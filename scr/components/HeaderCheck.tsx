import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import ReusableHeaderHome from './HeaderHome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
type ReusableScreenHeaderProps = {
  currentPage: string;
  totalPages: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressHome: () => void;
  containerStyle?: ViewStyle;  // Tùy chọn style cho container
  boxIconStyle?: ViewStyle;    // Tùy chọn style cho box_icon
  pageMobileStyle?: ViewStyle; // Tùy chọn style cho ReusableHeaderHome
};

const ReusableScreenHeader: React.FC<ReusableScreenHeaderProps> = ({
  currentPage,
  totalPages,
  onPressLeft,
  onPressRight,
  onPressHome,
  containerStyle,
  boxIconStyle,
  pageMobileStyle,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.box_icon, boxIconStyle]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' size={40} type='material' color='#FFFFFF' />
        </TouchableOpacity>
      </View>
      <ReusableHeaderHome
        currentPage={currentPage}
        totalPages={totalPages}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        page_mobileStyle={pageMobileStyle}
      />
      <View style={[styles.box_icon, boxIconStyle]}>
        <TouchableOpacity onPress={onPressHome}>
          <Icon name='home' size={30} type='material' color='#FFFFFF' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Đảm bảo nó chiếm đủ không gian ngang
    bottom: hp('2%'),
    paddingHorizontal: wp('2%')
  },
  box_icon: {
    padding: 10,
  },
});

export default ReusableScreenHeader;
