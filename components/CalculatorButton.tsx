import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isOperation?: boolean;
}

export function CalculatorButton({
  label,
  onPress,
  style,
  textStyle,
  isOperation = false,
}: Props) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(
        isOperation
          ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Light,
      );
    }
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, isOperation && styles.operationButton, style]}
      onPress={handlePress}>
      <Text style={[styles.buttonText, isOperation && styles.operationText, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#333333',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  operationButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  operationText: {
    color: 'white',
  },
});