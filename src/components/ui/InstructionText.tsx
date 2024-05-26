import { Text, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

interface InstructionTextProps {
  children: string;
  style?: object;
}

export default function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: COLORS.accent500,
    fontSize: 24,
  },
});
