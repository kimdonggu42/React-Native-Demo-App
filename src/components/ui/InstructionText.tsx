import { Text, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function InstructionText({ children, style }: any) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: COLORS.accent500,
    fontSize: 24,
  },
});
