/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from './components/Header';
import Calculator from './components/calc-components/Calculator';

function App(): React.JSX.Element {
  return (
    <View>
      <Header />
      <Calculator />
    </View>
  );
}

export default App;
