import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '../Themed';

const HabitCheckButton = ({ onPress, isChecked, couleur }) => {

    const tickColor = couleur ? couleur : "green"

  const primaryColor = useThemeColor({}, 'Primary');
  const secondaryColor = useThemeColor({}, 'Secondary');

  const animation = useSharedValue(0);

  const handlePress = () => {

    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: primaryColor },
      ]}
    >
      <View style={styles.iconContainer}>
          <Feather name="check" size={30} color={isChecked ? tickColor : "transparent"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HabitCheckButton;