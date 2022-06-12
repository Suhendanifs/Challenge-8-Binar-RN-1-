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
      const res = await axios.get(
        `${baseApi}?offset=${currentOffset}&limit=20`,
      );
      setPokemon([...res.data.results]);
    } catch (error) {
      console.log(error);
    }
  };
  const nextPage = useCallback(() => {
    setCurrentOffset(currentOffset + 20);
    setPage(page + 1);
  }, [currentOffset, setPage]);

  const prevPage = useCallback(() => {
    if (currentOffset <= 0) {
      return;
    } else {
      setCurrentOffset(currentOffset - 20);
      setPage(page - 1);
    }
  }, [currentOffset, setPage]);

  const renderItem = ({item}) => (
    <PokeCard name={item.name} navigation={navigation} />
  );

  const Header = () => {
    return (
      <View>
        <Text style={styles.HeadTitle}>PokeDex</Text>
      </View>
    );
  };
  const Footer = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <TouchableOpacity onPress={prevPage} style={styles.FooterPrev}>
          <Text style={styles.FooterText}>Prev</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 10, color: 'black'}}>{page}</Text>
        <TouchableOpacity onPress={nextPage} style={styles.FooterNext}>
          <Text style={styles.FooterText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        data={pokemon}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HeadTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 140,
    color: 'black',
    backgroundColor: '#f59127',
    textAlign: 'center',
    borderRadius: 20,
    marginVertical: 1,
  },
  FooterPrev: {
    width: 150,
    backgroundColor: '#f59127',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    textAlign: 'center',
  },
  FooterNext: {
    width: 150,
    backgroundColor: '#77b7db',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  FooterText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 19,
  },
});
