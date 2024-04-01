import React, {useState} from 'react';

import {TextInput, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import data from './testData.json';

export default function Ingredient(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemAmount, onChangeAmount] = useState('');
  const [itemWeight, onChangeWeight] = useState('');
  const [calories, setCalories] = useState(0);

  const handleChange = itemName => {
    const selectedItem = data.find(item => item.name === itemName);
    setSelectedItem(selectedItem);
    console.log(selectedItem);
  };

  function calculateCalories() {
    setCalories(
      parseInt(itemAmount) *
        (parseFloat(itemWeight) / selectedItem.weight) *
        selectedItem.calories,
    );
  }

  const optionStrings = selectedItem ? [] : ['Select Item'];

  for (let i = 0; i < data.length; i++) {
    optionStrings.push(data[i].name);
  }

  const options = optionStrings.map(option => {
    return <Picker.Item label={option} value={option} />;
  });

  React.useEffect(() => {
    console.log(`${itemAmount} ${itemWeight}`);
  }, [itemAmount, itemWeight]);

  React.useEffect(() => {
    if (selectedItem) {
      console.log(`This ${selectedItem.amount} ${selectedItem.weight}`);
      onChangeAmount(`${selectedItem.amount}`);
      onChangeWeight(`${selectedItem.weight}`);
      console.log(itemWeight);
      setCalories(selectedItem.calories);
    }
  }, [selectedItem]);

  return (
    <View>
      <Picker
        id="ingredients-list"
        selectedValue={selectedItem ? selectedItem.name : null}
        onValueChange={handleChange}
        name="ingredientSelect">
        {options}
      </Picker>
      {selectedItem && (
        <View>
          <TextInput
            placeholder="useless placeholder"
            onChangeText={onChangeAmount}
            keyboardType="number-pad"
            value={itemAmount}
            onEndEditing={calculateCalories}
          />
          <TextInput
            placeholder="useless placeholder"
            onChangeText={onChangeWeight}
            keyboardType="number-pad"
            value={itemWeight}
            onEndEditing={calculateCalories}
          />
          <Text>Calories: {calories}</Text>
        </View>
      )}
    </View>
  );
}
