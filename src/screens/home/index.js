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

const Home = ({navigation}) => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);

  const getDataPokemon = async () => {
    try {
      const res = await axios.get(`${baseApi}/pokemon?offset=${page}&limit=10`);
      setPokemon([...pokemon, ...res.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  //   const renderItem = ({item}) => (

  //   );
  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity>
          <Image style={styles.imageColumn} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.head}>
          <Text style={styles.judul}>Title :</Text>
          <Text style={styles.judul}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const loadMoreItem = useCallback(() => {
    setPage(page + 10);
    console.log(page);
  }, [page]);

  useEffect(() => {
    getDataPokemon();
  }, [page]);

  return (
    <View>
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        onEndReached={loadMoreItem}
        initialNumToRender={1}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
