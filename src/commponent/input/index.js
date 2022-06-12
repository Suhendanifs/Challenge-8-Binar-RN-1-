import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const Input = ({onChangeText, value, placeHolder, error, secureTextEntry}) => {
  return (
    <View style={styles.containform}>
      <TextInput
        style={styles.containInput}
        onChangeText={onChangeText}
        value={value}
        placeHolder={placeHolder}
        secureTextEntry={secureTextEntry}
      />
      <Text style={{color: 'red', marginTop: 5}}>{error}</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  containform: {
    width: '80%',
    height: 70,
    marginVertical: 5,
    marginHorizontal: 40,
  },

  containInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3dde02',
    borderRadius: 10,
  },
});
