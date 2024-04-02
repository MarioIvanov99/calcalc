import React, {useState} from 'react';

import {View, Button, Text} from 'react-native';
import Ingredient from './Ingredient';
import uuid from 'react-native-uuid';
import data from './testData.json';

export default function Calculator() {
  const [optionStrings, setOptions] = useState(data.map(option => option.name));
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [ingredients, setIngredients] = useState([
    <Ingredient
      key={uuid.v4()}
      data={data}
      optionStrings={optionStrings}
      onUpdate={updateTotal}
      onUpdateSelections={setSelectedOptions}
    />,
  ]);
  const [totalCalories, setTotalCalories] = useState(0);

  function addIngredient() {
    setIngredients(prevArray => [
      ...prevArray,
      <Ingredient
        key={uuid.v4()}
        data={data}
        optionStrings={optionStrings}
        onUpdate={updateTotal}
        onUpdateSelections={setSelectedOptions}
      />,
    ]);
  }

  //function updateSelections()

  function updateTotal(delta) {
    console.log('seeeeee', selectedOptions);
    setTotalCalories(prevTotal => prevTotal + delta);
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
      <Text>Total Calories: {totalCalories}</Text>
    </View>
  );
}
