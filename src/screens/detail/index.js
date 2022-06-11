import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {baseApi} from '../../helpers/API';

const Details = ({navigation, route}) => {
  const [detailPokemon, setDetailPokemon] = useState([]);
  const [species, setSpecies] = useState([]);

  const getDetailsPokemon = async () => {
    try {
      const result = await axios.get(`${baseApi}/${route.params.name}`);
      setDetailPokemon(result.data);
      console.log(result.data);
      const resultSpe = await axios.get(`${detailPokemon?.species?.url}`);
      setSpecies(resultSpe.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getSpeciesPokemon = async () => {
  //   try {
  //     const result = await axios.get(`${detailPokemon?.species?.url}`);
  //     setSpecies(result.data);
  //     console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const renderPokemon = ({item}) => {
    return (
      <View>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    getDetailsPokemon();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <FlatList renderItem={renderPokemon} />
        <Image
          source={{
            uri: `${detailPokemon?.sprites?.other['official-artwork'].front_default}`,
          }}
          style={styles.pokeImage}
        />

        <Text style={styles.pokeName}>{detailPokemon.name}</Text>
      </View>

      <View>
        <View>
          <Text style={styles.pokeTitle}>Height</Text>
          <Text style={styles.pokeDetails}>{detailPokemon.height}</Text>
        </View>
        <View>
          <Text style={styles.pokeTitle}>Weight</Text>
          <Text style={styles.pokeDetails}>{detailPokemon.weight}</Text>
        </View>
        <View>
          <Text style={styles.pokeTitle}>Species</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={species?.egg_groups}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <Text style={styles.pokeDetails}>{item.name} </Text>
            )}
          />
        </View>
      </View>

      <Text style={styles.pokeTitle}>Type</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.types}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.type.name} | </Text>
        )}
      />

      <Text style={styles.pokeTitle}>Ability</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.abilities}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.ability.name} | </Text>
        )}
      />

      <Text style={styles.pokeTitle}>Moves</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={detailPokemon?.moves}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <Text style={styles.pokeDetails}>{item.move.name} | </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  pokeImage: {
    height: 300,
    width: 300,
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
    fontSize: 16,
  },
});
