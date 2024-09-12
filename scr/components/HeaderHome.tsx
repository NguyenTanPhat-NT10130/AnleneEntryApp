import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
type HeadeHomerProps = {
  currentPage: string;
  totalPages: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  page_mobileStyle?: ViewStyle;
};

const ReusableHeaderHome: React.FC<HeadeHomerProps> = ({ currentPage, totalPages, onPressLeft, onPressRight, page_mobileStyle}) => {
  return (
      <View style={[styles.page_mobile, page_mobileStyle]}>
        <TouchableOpacity onPress={onPressLeft}>
          <Icon name='chevron-left' size={15} type='font-awesome' color='#FFFFFF' />
        </TouchableOpacity>
        <View style={styles.box_text_page}>
          <Text style={styles.text_page}>{`Trang ${currentPage}/${totalPages}`}</Text>
        </View>
        <TouchableOpacity onPress={onPressRight}>
          <Icon name='chevron-right' size={15} type='font-awesome' color='#FFFFFF' />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
      page_mobile: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp('2%'), // 2
        left: wp('34%') // 34
      },
      box_text_page: {
        paddingHorizontal: wp('2%'),
      },
      text_page: {
        color: 'white',
        fontSize: 15,
      },
})

export default ReusableHeaderHome;
