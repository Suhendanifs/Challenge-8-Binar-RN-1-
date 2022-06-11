import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {baseApi} from '../../helpers/API';
import PokeCard from '../../commponent/pokeCard';

const Home = ({navigation}) => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    getDataPokemon();
  }, [currentOffset]);
  const getDataPokemon = async () => {
    try {
      const res = await axios.get(`${baseApi}?offset=${page}&limit=20`);
      setPokemon([...res.data.results]);
    } catch (error) {
      console.log(error);
    }
  };
  const nextPage = useCallback(() => {
    setCurrentOffset(currentOffset + 1);
    setPage(page + 1);
  }, [currentOffset, setPage]);

  const prevPage = useCallback(() => {
    if (currentOffset <= 0) {
      return;
    } else {
      setCurrentOffset(currentOffset - 1);
      setPage(page - 1);
    }
  }, [currentOffset, setPage]);

  const renderItem = ({item}) => (
    <PokeCard name={item.name} navigation={navigation} />
  );

  const renderHeader = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 10,
            padding: 10,
            color: 'black',
          }}>
          PokeDex
        </Text>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={prevPage}
          style={{
            backgroundColor: '#bb35a1',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Prev</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 10, color: 'black'}}>{page}</Text>
        <TouchableOpacity
          onPress={nextPage}
          style={{
            backgroundColor: '#77b7db',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        data={pokemon}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
