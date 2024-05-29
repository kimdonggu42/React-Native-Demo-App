import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function Card({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const marginTop = width < 380 ? 18 : 36;

  return <View style={[styles.card, { marginTop }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: COLORS.primary800,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
