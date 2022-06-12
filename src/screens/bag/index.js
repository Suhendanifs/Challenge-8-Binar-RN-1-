import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {myDb} from '../../helpers/API';
import PokeCard from '../../commponent/pokeCard';

const PokeBag = ({navigation}) => {
  const [dataPokeBag, setDataPokeBag] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {_user} = useSelector(state => state.login);

  const onRefresh = () => {
    setRefresh(true);
    getPokeBag();
    setRefresh(false);
  };

  useEffect(() => {
    getPokeBag();
  }, [_user]);

  const renderItem = ({item}) => (
    <PokeCard name={item.name} navigation={navigation} />
  );

  const getPokeBag = async () => {
    try {
      const res = await myDb.ref(`Bag/${_user._id}/`).once('value');

      console.log(res.val());
      setDataPokeBag(res.val().name);
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginHorizontal: 10,
            padding: 10,
            color: 'black',
          }}>
          PokeBag
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        numColumns={2}
        data={dataPokeBag}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default PokeBag;
