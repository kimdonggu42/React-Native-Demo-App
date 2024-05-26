import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTE_NAME } from '@/constants/path';

type RootStackParamList = {
  StartGameScreen: undefined;
  GameScreen: { pickedNumber: string };
};

export type StartGameScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ROUTE_NAME.startGameScreen
>;
export type GameScreenProps = NativeStackScreenProps<RootStackParamList, ROUTE_NAME.gameScreen>;
