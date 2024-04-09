/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from './components/Header';
import Hero from './components/Hero';

function App(): React.JSX.Element {
  return (
    <View>
      <Header />
      <Hero />
    </View>
  );
}

export default App;
