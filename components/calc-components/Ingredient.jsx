import React, {useState} from 'react';

import {TextInput, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Ingredient(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemAmount, onChangeAmount] = useState('');
  const [itemWeight, onChangeWeight] = useState('');
  const [calories, setCalories] = useState(0);
  const [oldCal, setOldCal] = useState(0);

  const handleChange = itemName => {
    const selectedItem = props.data.find(item => item.name === itemName);
    setSelectedItem(selectedItem);
    console.log(props.optionStrings);
  };

  function calculateCalories() {
    setOldCal(calories);
    setCalories(
      parseInt(itemAmount) *
        (parseFloat(itemWeight) / selectedItem.weight) *
        selectedItem.calories,
    );
  }

  function addDelta() {
    props.onUpdate(calories - oldCal);
  }

  // function updateOptions() {
  //   const tempArray = props.optionStrings
  //   props.onOptionChange();
  // }

  const options = props.optionStrings.map(option => {
    return (
      <Picker.Item
        key={props.optionStrings.indexOf(option)}
        label={option}
        value={option}
      />
    );
  });

  React.useEffect(() => {
    console.log(`${itemAmount} ${itemWeight}`);
  }, [itemAmount, itemWeight]);

  React.useEffect(() => {
    if (selectedItem) {
      onChangeAmount(`${selectedItem.amount}`);
      onChangeWeight(`${selectedItem.weight}`);
      setOldCal(calories);
      setCalories(selectedItem.calories);

      props.onUpdateSelections(prevArray => [...prevArray, selectedItem.name]);
      //updateOptions();
    }
  }, [selectedItem]);

  React.useEffect(() => {
    console.log(`Calroies: ${calories} \n Old Calroies: ${oldCal}`);
    addDelta();
  }, [calories]);

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
