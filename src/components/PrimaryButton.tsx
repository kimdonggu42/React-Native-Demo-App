import { View, Text, Pressable, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

interface PrimaryButtonProps {
  children: string;
  onPress: any;
}

export default function PrimaryButton({ children, onPress }: PrimaryButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
        }
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: COLORS.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
