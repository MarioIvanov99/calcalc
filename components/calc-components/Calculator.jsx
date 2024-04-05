import React, {useState} from 'react';

import {View} from 'react-native';
import ItemSelector from './ItemSelector';
import data from './testData.json';

export default function Calculator() {
  const [optionStrings, setOptions] = useState(data.map(option => option.name));

  return (
    <View>
      <ItemSelector optionStrings={optionStrings} data={data} />
    </View>
  );
}
