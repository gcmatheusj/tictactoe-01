import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  inputIOS: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#fff',
    paddingRight: 30,
    width: 230,
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    width: 230,
  },
});

interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const Level: React.FC<Props> = ({ value, onChange }) => (
  <View style={styles.container}>
    <RNPickerSelect
      style={styles}
      value={value}
      placeholder={{ label: 'Selecione a Dificuldade' }}
      onValueChange={(level) => onChange(level)}
      items={[
        { label: 'Fácil', value: 'easy' },
        { label: 'Médio', value: 'medium' },
        { label: 'Difícil', value: 'hard' },
        { label: 'Expert', value: 'expert' },
      ]}
    />
  </View>
);

export default Level;
