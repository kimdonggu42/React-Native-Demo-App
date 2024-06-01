import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import Routes from './Routes';
import { COLORS } from './constants/colors';

export default function App() {
  useFonts({
    'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  });

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient colors={[COLORS.primary700, COLORS.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            <Routes />
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  test: {
    color: 'black',
    fontSize: 100,
  },
});
