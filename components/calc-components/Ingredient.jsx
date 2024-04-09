import React, {useState, useContext} from 'react';
import {Context} from '../Hero';
import {TextInput, Text, View} from 'react-native';

export default function Ingredient(props) {
  const [itemAmount, onChangeAmount] = useState(`${props.data.amount}`);
  const [itemWeight, onChangeWeight] = useState(
    `${props.weight ? props.weight : props.data.weight}`,
  );
  const [calories, setCalories] = useState(props.data.calories);
  const [ingList, setIngList] = useContext(Context);
  const [oldCal, setOldCal] = useState(0);
  const caloriesRef = React.useRef(calories);
  const itemAmountRef = React.useRef(itemAmount);
  const itemWeightRef = React.useRef(itemWeight);

  function calculateCalories() {
    setOldCal(calories);
    setCalories(
      parseInt(itemAmount) *
        (parseFloat(itemWeight) / props.data.weight) *
        props.data.calories,
    );
    itemAmountRef.current = itemAmount;
    itemWeightRef.current = itemWeight;
  }

  function addDelta() {
    props.onUpdate(calories - oldCal);
  }

  React.useEffect(() => {
    addDelta();
    caloriesRef.current = calories;
  }, [calories]);

  React.useEffect(() => {
    // This function runs when the component is mounted
    calculateCalories();

    // Return a cleanup function
    return () => {
      // This function runs when the component is unmounted
      props.onUpdate(-caloriesRef.current);
      const ing = {
        key: props.id, // Generate a unique key for the new ingredient
        data: {
          id: props.data.id,
          name: props.data.name,
          isCountable: props.data.isCountable,
          amount: parseInt(itemAmountRef.current),
          weight: props.data.weight,
          calories: props.data.calories,
        },
        tempWeight: parseInt(itemWeightRef.current),
      };

      setIngList(prevArray => [...prevArray, ing]);
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
