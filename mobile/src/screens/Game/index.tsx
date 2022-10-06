import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native'
import {TouchableOpacity, View, Image, FlatList } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons'
import LogoImg from '../../assets/logo-nlw-esports.png'
import { GameParams } from '../../@types/navigation';
import { styles } from './styles';
import { Background } from '../../components/background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


import { THEME } from '../../theme';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  const route = useRoute()
  const game = route.params as GameParams

  const navigation = useNavigation()
  function handleGoBack(){
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.15.61:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity onPress={handleGoBack}>
                  <Entypo
                    name='chevron-thin-left'
                    color={THEME.COLORS.CAPTION_300}
                    size={20}
                  />
              </TouchableOpacity>
              <Image
              source={LogoImg}
              style={styles.logo}
              />
              <View style={styles.right}/>
          </View>
          <Image
            source={{uri: game.bannerUrl}}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading
            title={game.title}
            subtitle='Conecte-se e comece a jogar'
          />
          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DuoCard data={item}/>
            )}
          />

          
      </SafeAreaView>
    </Background>
  );
}