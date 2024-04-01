import React, {useState} from 'react';

import {View, Button} from 'react-native';
import Ingredient from './Ingredient';

export default function Calculator() {
  const [ingredients, setIngredients] = useState([<Ingredient />]);

  function addIngredient() {
    setIngredients(prevArray => [...prevArray, [<Ingredient />]]);
  }

  return (
    <View>
      {ingredients}
      <Button
        onPress={addIngredient}
        title="Add Ingredient"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
