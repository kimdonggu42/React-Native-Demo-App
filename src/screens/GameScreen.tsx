import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import NumberContainer from '@/components/game/NumberContainer';
import Title from '@/components/ui/Title';
import PrimaryButton from '@/components/ui/PrimaryButton';

interface GameScreenProps {
  userPickedNumber: number;
}

const generateRandomBetween = (min: number, max: number, exclude: number): any => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  // 앱이 사용자가 처음 입력한 값을 바로 맞히지 못하도록 하기 위함
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userPickedNumber }: GameScreenProps) {
  const initialCuess = generateRandomBetween(minBoundary, maxBoundary, userPickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialCuess);

  const nextGuessHandler = (direction: string) => {
    return () => {
      if (
        (direction === 'lower' && currentGuess < userPickedNumber) ||
        (direction === 'greater' && currentGuess > userPickedNumber)
      ) {
        Alert.alert("Don't lie!", 'You know that this is wrong...', [
          {
            text: 'Sorry!',
            style: 'cancel',
          },
        ]);
        return;
      }

      if (direction === 'lower') {
        maxBoundary = currentGuess;
      } else {
        minBoundary = currentGuess + 1;
      }
      const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
      setCurrentGuess(newRandomNumber);
    };
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler('lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler('greater')}>+</PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
