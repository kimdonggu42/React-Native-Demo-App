import { LinearGradient } from 'expo-linear-gradient';

import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { COLORS } from './constants/colors';

export default function App() {
  const [userPickedNumber, setUserPickedNumber] = useState<number | null>(null);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserPickedNumber(pickedNumber);
  };

  return (
    <LinearGradient colors={[COLORS.primary700, COLORS.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {userPickedNumber ? (
            <GameScreen userPickedNumber={userPickedNumber} />
          ) : (
            <StartGameScreen pickedNumberHandler={pickedNumberHandler} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
