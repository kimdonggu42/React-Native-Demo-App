import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '@/components/game/NumberContainer';
import Title from '@/components/ui/Title';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';
import GuessLogItem from '@/components/game/GuessLogItem';
import { COLORS } from '@/constants/colors';

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

export default function GameScreen({ navigation, route, setPickedNumber }: any) {
  const { pickedNumber: stringPickedNumber } = route.params;
  const pickedNumber = Number(stringPickedNumber);
  const initialCuess = generateRandomBetween(minBoundary, maxBoundary, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialCuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialCuess]);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      setGameIsOver(true);
    }
  }, [currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
      setGuessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);
    };
  };

  const startNewGameHandler = () => {
    setPickedNumber('');
    navigation.navigate('StartGameScreen');
  };

  return (
    <>
      {gameIsOver ? (
        <View style={styles.rootContainer}>
          <Title>GAME OVER!</Title>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../assets/images/success.png')} />
          </View>
          <Text style={styles.summaryText}>
            Your Phone needed <Text style={styles.highlight}>{guessRounds.length}</Text> rounds to
            guess the number <Text style={styles.highlight}>{pickedNumber}</Text>.
          </Text>
          <PrimaryButton onPress={startNewGameHandler}>Start New Game</PrimaryButton>
        </View>
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
          <View style={styles.listContainer}>
            <FlatList
              data={guessRounds}
              renderItem={(itemData) => (
                <GuessLogItem
                  roundNumber={guessRounds.length - itemData.index}
                  guess={itemData.item}
                />
              )}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: COLORS.primary700,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: COLORS.primary500,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
