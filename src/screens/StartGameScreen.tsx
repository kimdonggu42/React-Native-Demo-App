import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';
import { COLORS } from '@/constants/colors';

interface StartGameScreenProps {
  pickedNumberHandler: (pickedNumber: number) => void;
}

export default function StartGameScreen({ pickedNumberHandler }: StartGameScreenProps) {
  const [pickedNumber, setPickedNumber] = useState<string>('');

  const numberInputHandler = (enteredText: string) => {
    setPickedNumber(enteredText);
  };

  const resetInputHandler = () => {
    setPickedNumber('');
  };

  const confirmInputHandler = () => {
    const choseNumber = Number(pickedNumber);

    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber >= 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler,
        },
      ]);
      return;
    }

    pickedNumberHandler(choseNumber);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType='number-pad'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={pickedNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: COLORS.primary800,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderBottomColor: COLORS.accent500,
    borderBottomWidth: 2,
    color: COLORS.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
