import React, {useState} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import Calculator from './calc-components/Calculator';
import AddForm from './new-ingredient-component/AddForm';
import data from './testData.json';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'black',
  },
});

export const Context = React.createContext();

export default function Hero() {
  const [optionStrings, setOptions] = useState(data.map(option => option.name));
  const [ingList, setIngList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  function newIngredient(ingredient) {
    const existingIngredient = data.find(item => item.name === ingredient.name);

    if (existingIngredient) {
      // Ingredient already exists, show error message
      setError('Ingredient already exists');
      setTimeout(() => {
        setError(null);
      }, 2000); // Hide error message after 2 seconds
      return; // Don't add the duplicate ingredient
    }

    const newIng = {
      ...ingredient,
      weight: parseInt(ingredient.weight), //Text input
      calories: parseInt(ingredient.calories), //Text input
      id: data.length + 1,
      amount: 1,
    };
    data.push(newIng);
    setOptions(data.map(option => option.name));
  }

  return (
    <View>
      {/* {loadPage()} */}
      <Context.Provider value={[ingList, setIngList]}>
        {page === 0 && <Calculator optionStrings={optionStrings} data={data} />}
        {page === 1 && <AddForm add={newIngredient} />}
      </Context.Provider>
      <>
        {error && <Text style={{color: 'red'}}>{error}</Text>}
        {/* Your other components */}
      </>
      <View style={styles.buttonContainer}>
        <Button
          title="Button 0"
          onPress={() => setPage(0)}
          style={styles.button}
        />
        <Button
          title="Button 1"
          onPress={() => setPage(1)}
          style={styles.button}
        />
        <Button
          title="Button 2"
          onPress={() => console.log('Button 3 pressed')}
          style={styles.button}
        />
        <Button
          title="Button 3"
          onPress={() => console.log('Button 4 pressed')}
          style={styles.button}
        />
      </View>
    </View>
  );
}
