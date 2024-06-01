import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function NumberContainer({ children }: { children: number }) {
  const { width } = useWindowDimensions();
  const marginAndPadding = width < 380 ? 12 : 24;
  const fontSize = width < 380 ? 28 : 24;

  return (
    <View style={[styles.container, { padding: marginAndPadding }, { margin: marginAndPadding }]}>
      <Text style={[styles.numberText, { fontSize }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: COLORS.primary800,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: COLORS.primary800,
    fontFamily: 'open-sans-bold',
  },
});
