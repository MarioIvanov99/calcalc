import React, {useState} from 'react';

import {View, Text, Button, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function AddForm(props) {
  const [formVisible, setFormVisible] = useState(false);
  const [ing, setIng] = useState({
    name: '', //Text input
    isCountable: true, //Radio
    weight: '', //Text input
    calories: '', //Text input
  });

  function handleChange(name, value, type) {
    setIng(prevFormData => {
      return {
        ...prevFormData,
        [name]: value, //How to dynamically choose what to update
      };
    });
  }

  return (
    <View>
      {formVisible && (
        <View>
          <TextInput
            placeholder="Ingredient Name"
            value={ing.name}
            onChangeText={text => handleChange('name', text, 'text')}
          />
          <TextInput
            placeholder="Ingredient Weight"
            value={ing.weight}
            keyboardType="number-pad"
            onChangeText={text => handleChange('weight', text, 'text')}
          />
          <TextInput
            placeholder="Calories per specified weight"
            value={ing.calories}
            keyboardType="number-pad"
            onChangeText={text => handleChange('calories', text, 'text')}
          />
          <Text>Is it countable?</Text>
          <CheckBox
            value={ing.isCountable}
            onValueChange={value =>
              handleChange('isCountable', value, 'checkbox')
            }
          />
          <Button
            title="Save"
            onPress={() => {
              props.add(ing);
              setFormVisible(false);
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setFormVisible(false);
              setIng({
                name: '', //Text input
                isCountable: true, //Radio
                weight: '', //Text input
                calories: '', //Text input
              });
            }}
          />
        </View>
      )}

      {!formVisible && (
        <Button title="Add Ingredient" onPress={() => setFormVisible(true)} />
      )}
    </View>
  );
}
