import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '@/components/game/NumberContainer';
import Title from '@/components/ui/Title';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
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

export default function GameScreen({ route }: any) {
  const { pickedNumber: stringPickedNumber } = route.params;
  const pickedNumber = Number(stringPickedNumber);
  const initialCuess = generateRandomBetween(minBoundary, maxBoundary, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialCuess);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      setGameIsOver(true);
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction: string) => {
    return () => {
      if (
        (direction === 'lower' && currentGuess < pickedNumber) ||
        (direction === 'greater' && currentGuess > pickedNumber)
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
    <>
      {gameIsOver ? (
        <Text>Game is Over!</Text>
      ) : (
        <View style={styles.screen}>
          <Title>Opponent's Guess</Title>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler('lower')}>
                  <Ionicons name='remove' size={24} color='white' />
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler('greater')}>
                  <Ionicons name='add' size={24} color='white' />
                </PrimaryButton>
              </View>
            </View>
          </Card>
          {/* <View>LOG ROUNDS</View> */}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
