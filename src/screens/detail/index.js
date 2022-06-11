import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {baseApi} from '../../helpers/API';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {myDb} from '../../helpers/myDb';

const Details = ({navigation, route}) => {
  const {_user} = useSelector(state => state.login);
  const [dataPokemon, setDataPokemon] = useState({
    name: '',
    photo: '',
    height: '',
    weight: '',
    species: '',
    type: [{name: ''}],
    ability: [{name: ''}],
  });

  const handleDataPokemon = (field, value) => {
    setDataPokemon(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
  };

  const getDataPoke = async () => {
    try {
      const res = await axios.get(`${baseApi}/${route.params.cardData}`);
      console.log('DATA RES: ', res.data);
      console.log(
        'DATA TYPES : ',
        res.data.types.map(item => item.type),
      );
      handleDataPokemon('name', res.data.name);
      handleDataPokemon('photo', res.data.sprites.front_default);
      handleDataPokemon('height', res.data.height);
      handleDataPokemon('weight', res.data.weight);
      handleDataPokemon('species', res.data.species.name);
      console.log(res.data.species.name);
      handleDataPokemon(
        'type',
        res.data.types.map(item => item.type),
      );
      handleDataPokemon(
        'ability',
        res.data.abilities.map(item => item.ability),
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const catchPokemon = async payload => {
  //   const randomCatch = Math.ceil(Math.random() * 100);
  //   console.log(randomCatch);
  //   if (randomCatch > 70) {
  //     myDB.ref(`bag/${_user}`).update({});
  //     console.log(await myDB.ref(`bag/${_user}/`).once('value'));
  //     Alert.alert(`${name} Catched and stored to your bag!`);
  //     navigation.navigate('Bag');
  //   } else {
  //     Alert.alert(`${name} has Released from the Pokeball!`);
  //   }
  // };
  useEffect(() => {
    getDataPoke();
    getPokeBag();
  }, []);
  const [catchs, setCatchs] = useState({name: []});
  const [isTrue, setIsTrue] = useState(false);

  const getPokeBag = async () => {
    const res = await myDb.ref(`pokeBag/${_user.id}/`).once('value');

    console.log('RES POKEBAG: ', res.val());
    setCatchs(res.val().name);
  };
  const randomGenerator = useCallback(
    async value => {
      let random = Math.ceil(Math.random() * 30);
      if (value === random) {
        setIsTrue(true);
        try {
          await myDb.ref(`pokeBag/${_user.id}`).update({
            name: [...catchs, route.params.cardData],
          });
          Alert.alert('Horee', 'Anda mendapatkan pokemon', [
            {
              text: 'Lihat Bag',
              onPress: () => {
                navigation.navigate('PokeBag');
              },
            },
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsTrue(false);
        Alert.alert('Yahhh', 'Anda belum beruntung');
      }
    },
    [catchs],
  );

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Pokemon Detail
          </Text>
          <TouchableOpacity
            onPress={() => randomGenerator(Math.ceil(Math.random() * 30))}
            style={{
              left: 300,
              backgroundColor: 'orange',
              width: 90,
              height: 30,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                paddingLeft: 20,
                // paddingVertical: 4,
                fontSize: 20,
                fontWeight: '500',
              }}>
              Catch
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Image source={{uri: dataPokemon.photo}} style={styles.pokeImage} />
            <Text
              style={{
                fontSize: 26,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                color: 'black',
              }}>
              {dataPokemon.name}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Species :
              </Text>
              <View>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    left: 3,
                    fontSize: 18,
                    color: 'black',
                  }}>
                  {dataPokemon.species}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Height
              </Text>
              <View>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    left: 3,
                    fontSize: 18,
                    color: 'black',
                  }}>
                  : {dataPokemon.height}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Weight
              </Text>
              <View>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    left: 3,
                    fontSize: 18,
                    color: 'black',
                  }}>
                  : {dataPokemon.weight}
                </Text>
              </View>
            </View>
          </View>
          <View style={{top: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Type
            </Text>
            <FlatList
              data={dataPokemon.type}
              keyExtractor={item => item.name}
              renderItem={item => {
                return <Text style={styles.card}>{item.item.name}</Text>;
              }}
            />
          </View>
          <View style={{top: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Ability
            </Text>
            <FlatList
              data={dataPokemon.ability}
              keyExtractor={item => item.name}
              renderItem={item => {
                return <Text style={styles.card}>{item.item.name}</Text>;
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'grey'},
  pokeImage: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  pokeName: {
    color: 'black',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  pokeTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  pokeDetails: {
    color: 'black',
    fontSize: 20,
  },
});
