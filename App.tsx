/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers'
import LoginForm from './src/components/LoginForm';
import ChatForm from './src/containers/ChatForm';

// import { styles } from './src/styles/styles';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginForm'>
          <Stack.Screen name='LoginForm' component={LoginForm} options={{ headerShown: false }} />

          <Stack.Screen name='ChatForm' component={ChatForm} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;