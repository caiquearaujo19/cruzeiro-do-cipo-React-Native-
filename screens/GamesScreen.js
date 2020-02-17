import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';
import 'firebase/firestore';
import Banner from '../assets/images/banner.png';
import GamesListItem from '../components/GamesListItem';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Remover alertas --------------------------------
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
// ------------------------------------------------

const firestore = firebase.firestore();

export default function GamesScreen(props) {

  const [ nextMatch , setNextMatch ] = useState({});
  const [ matches , setMatches ] = useState([]);

  useEffect(() => {
    const nextMatchRef = firestore.collection("nextMatch").doc("1");
    nextMatchRef.get()
    .then(doc => {
      setNextMatch(doc.data());
    })
    .catch(err => alert("Erro ao pegar o próximo jogo: ", err));
  }, []);

  useEffect(() => {
    firestore.collection("matches").get()
    .then(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { adversary, place, date, goalsCipo, goalsAdversary, scorers, assists } = doc.data();
        list.push({
          id: doc.id,
          adversary,
          place,
          date,
          goalsCipo,
          goalsAdversary,
          scorers,
          assists
        });
      });

      setMatches(list);
    })
    .catch(err => alert("Erro ao acessar os jogos: ", err));
  }, []);

  return (
    <View style={styles.container}>
      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Próxixmo jogo</Text>
        </ImageBackground>
      } containerStyle={styles.card}>
        {
          nextMatch.adversary !== undefined ?
            <View>
              <Text style={styles.nextGamePlaceAndDate}>{nextMatch.place + ' - ' + nextMatch.date}</Text>
              <Text style={styles.nextGameAdversary}>{nextMatch.adversary}</Text>
            </View>
          :
            <Text style={styles.nextGameAdversary}>Carregando...</Text>
        }
      </Card>
      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Todos os jogos do ano</Text>
        </ImageBackground>
      } titleStyle={styles.cardTitle} containerStyle={[styles.card, {flex: 1, overflow: 'hidden'}]}>
        <View >
          <FlatList
            contentContainerStyle={{paddingBottom: 120}}
            data={matches}
            renderItem={({item}) => <GamesListItem key={item.date} match={item} {...props}/>}
          />
        </View>
      </Card>
    </View>
  );
}

GamesScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 15
  },
  card: {
    padding: 0
  },
  cardHeader: {
    padding: 15,
    marginBottom: 15
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  nextGamePlaceAndDate: {
    color: 'gray',
    textAlign: 'center'
  },
  nextGameAdversary: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15
  }
});
