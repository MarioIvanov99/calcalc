import React, {useState} from 'react';

import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import Ingredient from './Ingredient';

export default function ItemSelector(props) {
  //Picker props
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [selectedString, setSelectedString] = useState('Select item');
  const [optionStrings, setOptions] = useState(
    props.optionStrings.map(option => {
      return {label: option, value: option};
    }),
  );

  //Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  function updateTotal(delta) {
    setTotalCalories(prevTotal => prevTotal + delta);
  }

  function mapIngredients() {
    return ingredients.map(ingredient => (
      <Ingredient
        key={ingredient.key} // Use the key consistently
        data={ingredient.data}
        onUpdate={ingredient.onUpdate}
      />
    ));
  }

  React.useEffect(() => {
    if (ingredients.length > value.length) {
      const filteredIngredients = ingredients.filter(ingredient =>
        value.includes(ingredient.data.name),
      );
      setIngredients([...filteredIngredients]);
    } else if (ingredients.length < value.length) {
      const missingValue = value.find(
        val => !ingredients.some(ingredient => ingredient.data.name === val),
      );

      const ing = {
        key: uuid.v4(), // Generate a unique key for the new ingredient
        data: props.data.find(item => item.name === missingValue),
        onUpdate: updateTotal,
      };
      setIngredients(prevArray => [...prevArray, ing]);
    }
  }, [value]);

  return (
    <View>
      <DropDownPicker
        placeholder={selectedString}
        listMode="MODAL"
        open={open}
        value={value}
        items={optionStrings}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setOptions}
        multiple={true}
        searchable={true}
        mode="BADGE"
        min={0}
      />
      {mapIngredients()}
      <Text>Total Calories: {totalCalories.toFixed(2)}</Text>
    </View>
  );
}
