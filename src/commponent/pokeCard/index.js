import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';

const Card = ({name, navigation}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {cardData: name})}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.imagebackground}>
          <Image
            source={require('../../assets/image/pokeball.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: 180,
    height: 55,
    marginLeft: 10,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  imagebackground: {
    top: -30,
    left: -100,
  },

  name: {
    fontSize: 20,
    top: 12,
    color: 'black',
    left: 5,
  },

  image: {
    position: 'absolute',
    width: 55,
    height: 55,
    left: 225,
    top: 3,
  },
});
