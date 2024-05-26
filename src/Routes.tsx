import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { ROUTE_NAME } from './constants/path';
import { RootStackParamList } from '../navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      {/* 기본적으로 아무 설정없이는 Stack.Navigator의 첫 번째 자식 요소(여기선 StartGameScreen)가 루트(시작) 페이지가 되지만,
          Stack.Navigator에 initialRouteName 프로퍼티를 사용하여 루트(시작) 페이지를 지정할 수도 있다. */}
      <RootStack.Navigator
        initialRouteName={ROUTE_NAME.startGameScreen}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <RootStack.Screen name={ROUTE_NAME.startGameScreen} component={StartGameScreen} />
        <RootStack.Screen name={ROUTE_NAME.gameScreen} component={GameScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
