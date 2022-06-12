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

const Detail = ({navigation, route}) => {
  const {_user} = useSelector(state => state.login);
  const [pokemonBag, SetPokemonBag] = useState({name: []});
  const [dataPokemon, setDataPokemon] = useState({
    name: '',
    pict: 'pict',
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
      SetPokemonBag(res.data);
      console.log('DATA RES: ', res.data);
      console.log(
        'DATA TYPES : ',
        res.data.types.map(item => item.type),
      );
      handleDataPokemon('name', res.data.name);
      handleDataPokemon('pict', res.data.sprites.front_default);
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

  useEffect(() => {
    getDataPoke();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.pokeTitle}>Pokemon Detail</Text>
        <TouchableOpacity
          style={{
            top: -30,
            left: 158,
            backgroundColor: '#f0271d',
            width: 90,
            height: 40,
            borderRadius: 10,
          }}>
          <Text
            style={{
              top: 5,
              color: 'black',
              paddingLeft: 20,
              fontSize: 20,
              fontWeight: '500',
            }}>
            Catch
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.containerImage}>
          <Image source={{uri: dataPokemon.pict}} style={styles.pokeImage} />
          <Text style={styles.pokeName}>{dataPokemon.name}</Text>
        </View>
        <View style={styles.stat}>
          <View style={styles.card}>
            <Text style={styles.labelSkillStat}>Species</Text>
            <View>
              <Text style={styles.pokeStat}>{dataPokemon.species}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.labelSkillStat}>Height</Text>
            <View>
              <Text style={styles.pokeStat}>{dataPokemon.height}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.labelSkillStat}>Weight</Text>
            <View>
              <Text style={styles.pokeStat}>{dataPokemon.weight}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statSkill}>
          <View style={styles.cards}>
            <Text style={styles.labelSkill}>Type</Text>
            <FlatList
              data={dataPokemon.type}
              keyExtractor={item => item.name}
              renderItem={item => {
                return <Text style={styles.pokeSkill}>{item.item.name}</Text>;
              }}
            />
          </View>
          <View style={styles.cards}>
            <Text style={styles.labelSkill}>Ability</Text>
            <FlatList
              data={dataPokemon.ability}
              keyExtractor={item => item.name}
              renderItem={item => {
                return <Text style={styles.pokeSkill}>{item.item.name}</Text>;
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {backgroundColor: '#e8e7e6', flex: 1},
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeImage: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  pokeName: {
    fontSize: 26,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: 'black',
  },
  pokeTitle: {
    color: 'black',
    fontSize: 25,
    marginVertical: 50,
    fontWeight: '700',
    textAlign: 'center',
  },
  pokeDetails: {
    color: 'black',
    fontSize: 20,
  },

  stat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pokeStat: {
    color: 'black',
    fontSize: 20,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  card: {
    top: 10,
    width: 130,
    height: 75,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'orange',
  },
  cards: {
    top: 20,
    width: 100,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1c9dd9',
    backgroundColor: '#d2d3d4',
  },
  statSkill: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pokeSkill: {
    color: 'black',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  labelSkill: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#1c9dd9',
    width: 98,
    borderRadius: 8,
    paddingLeft: 10,
    paddingBottom: 6,
  },
  labelSkillStat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'orange',
    width: 126,
    borderRadius: 8,
    paddingLeft: 10,
    paddingBottom: 6,
  },
});
