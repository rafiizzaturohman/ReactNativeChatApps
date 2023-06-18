/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers'
import LoginForm from './src/components/LoginForm';

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
          <Stack.Screen
            name='LoginForm'
            component={LoginForm}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
