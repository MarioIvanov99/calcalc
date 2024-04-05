import React, {useState} from 'react';

import {TextInput, Text, View} from 'react-native';

export default function Ingredient(props) {
  const [itemAmount, onChangeAmount] = useState(`${props.data.amount}`);
  const [itemWeight, onChangeWeight] = useState(`${props.data.weight}`);
  const [calories, setCalories] = useState(props.data.calories);
  const [oldCal, setOldCal] = useState(0);

  function calculateCalories() {
    setOldCal(calories);
    setCalories(
      parseInt(itemAmount) *
        (parseFloat(itemWeight) / props.data.weight) *
        props.data.calories,
    );
  }

  function addDelta() {
    props.onUpdate(calories - oldCal);
  }

  React.useEffect(() => {
    addDelta();
  }, [calories]);

  React.useEffect(() => {
    // This function runs when the component is mounted

    // Return a cleanup function
    return () => {
      // This function runs when the component is unmounted
      props.onUpdate(-calories);
    };
  }, []);

  return (
    <View>
      <Text>{props.data.name}:</Text>
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
      <Text>Calories: {calories.toFixed(2)}</Text>
    </View>
  );
}
