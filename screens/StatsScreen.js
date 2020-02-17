import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Banner from '../assets/images/banner.png';

import ScorersListItem from '../components/ScorersListItem';
import AssistsListItem from '../components/AssistsListItem';

const firestore = firebase.firestore();

export default function StatsScreen() {

  const [ matches , setMatches ] = useState([]);
  const [ players , setPlayers ] = useState([]);
  const [wins, setWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [defeats, setDefeats] = useState(0);
  const [goalsScored, setGoalsScored] = useState(0);
  const [goalsConceded, setGoalsConceded] = useState(0);

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
    .catch(err => alert("Erro ao pegar os jogos: ", err));
  }, []);

  useEffect(() => {
    firestore.collection("players").get()
    .then(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { name, goals, assists } = doc.data();
        list.push({
          id: doc.id,
          name,
          goals,
          assists
        });
      });
      
      setPlayers(list);
    })
    .catch(err => alert("Erro ao pegar os jogadores: " + err));
  }, [])

  useEffect(() => {
    var countWins = 0;
    var countDraws = 0;
    var countDefeats = 0;
    var countGoalsScored = 0;
    var countGoalsConceded = 0;

    matches.map((match) => {
      match.goalsCipo > match.goalsAdversary ?
        countWins ++
      : match.goalsCipo === match.goalsAdversary ?
        countDraws ++
      : countDefeats ++

      countGoalsScored = countGoalsScored + match.goalsCipo;
      countGoalsConceded = countGoalsConceded + match.goalsAdversary;
    });

    setWins(countWins);
    setDraws(countDraws);
    setDefeats(countDefeats);
    setGoalsScored(countGoalsScored);
    setGoalsConceded(countGoalsConceded);
  }, [matches]);

  return (
    <View style={styles.container}>
      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{matches.length + ' jogos'}</Text>
        </ImageBackground>
      } titleStyle={styles.cardTitle} containerStyle={styles.card}>
        <View style={styles.cardGames}>
          <View style={styles.cardGamesItem}>
            <Text style={styles.number}>{wins}</Text>
            <Text>Vitórias{"\n"}</Text>
          </View>
          <View style={styles.cardGamesItem}>
            <Text style={styles.number}>{draws}</Text>
            <Text >Empates{"\n"}</Text>
          </View>
          <View style={styles.cardGamesItem}>
            <Text style={styles.number}>{defeats}</Text>
            <Text>Derrotas{"\n"}</Text>
          </View>
          <View style={styles.cardGamesItem}>
            <Text style={styles.number}>{goalsScored}</Text>
            <Text style={{textAlign: 'center'}}>Gols{"\n"}marcados</Text>
          </View>
          <View style={styles.cardGamesItem}>
            <Text style={styles.number}>{goalsConceded}</Text>
            <Text style={{textAlign: 'center'}}>Gols{"\n"}sofridos</Text>
          </View>
        </View>
      </Card>

      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Gols</Text>
        </ImageBackground>
      } titleStyle={styles.cardTitle} containerStyle={[styles.card, {flex: 1, overflow: 'hidden'}]}>
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={players}
          renderItem={({item}) => item.goals > 0 ? <ScorersListItem key={item.id} scorer={item}/> : false}
        />
      </Card>

      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Assistências</Text>
        </ImageBackground>
      } titleStyle={styles.cardTitle} containerStyle={[styles.card, {flex: 1, overflow: 'hidden'}]}>
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={players}
          renderItem={({item}) => item.assists > 0 ? <AssistsListItem key={item.id} scorer={item}/> : false}
        />
      </Card>
    </View>
  );
}

StatsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 15
  },
  cardGames: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 70
  },
  cardGamesItem: {
    flex: 1,
    alignItems: 'center',
  },
  number: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#96989A'
  },
  sectionTitle: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
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
});
