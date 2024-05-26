import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      {/* 기본적으로 아무 설정없이는 Stack.Navigator의 첫 번째 자식 요소(여기선 StartGameScreen)가 루트(시작) 페이지가 되지만,
          Stack.Navigator에 initialRouteName 프로퍼티를 사용하여 루트(시작) 페이지를 지정할 수도 있다. */}
      <Stack.Navigator
        initialRouteName='StartGameScreen'
        screenOptions={{
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'transparent' },
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name='StartGameScreen'
          component={StartGameScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name='GameScreen'
          component={GameScreen}
          options={{
            headerTitle: '',
            headerBackTitle: '뒤로가기',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
