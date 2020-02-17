import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Colors from '../constants/Colors';
import Banner from '../assets/images/banner.png';

const firestore = firebase.firestore();

export default function GameDetailsScreen(props) {

  const match = props.navigation.getParam('match');

  return (
    <View style={styles.container}>
      <ListItem
        leftAvatar={{ source: { uri: props.navigation.getParam('avatar') } }}
        title={match.adversary}
        subtitle={match.place + ' - ' + match.date}
        bottomDivider
      />
      <Card title={
        <ImageBackground source={Banner} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Resultado</Text>
        </ImageBackground>
      } titleStyle={styles.cardTitle} containerStyle={styles.card}>
        <View style={styles.cardResult}>
          <Text style={styles.goalsCipo}>{match.goalsCipo}</Text>
          <Text style={styles.versus}>X</Text>
          <Text style={styles.goals}>{match.goalsAdversary}</Text>
        </View>
      </Card>
      {
        match.goalsCipo > 0 ?
          <Card title={
            <ImageBackground source={Banner} style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Gols e assistências</Text>
            </ImageBackground>
          } titleStyle={styles.cardTitle} containerStyle={styles.card}>
            {
              match.scorers.map((scorer, i) => (
                <View key={i} style={styles.goalOccurrence}>
                  <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-football' : 'md-football'}
                    size={35}
                    style={{ marginBottom: -3, marginRight: 10 }}
                    color="gray"
                  />
                  <View>
                    <Text style={styles.scorer}>{scorer.name}</Text>
                    {match.assists[i] !== null ? <Text style={styles.assist}>(Assist.: {match.assists[i].name})</Text> : null }
                  </View>
                </View>
              )) }
          </Card>
        :
          null
      }
    </View>
  );
}

GameDetailsScreen.navigationOptions = {
  title: 'Detalhes',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardResult: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50
  },
  goalsCipo: {
    fontSize: 80,
    fontWeight: 'bold',
    color: Colors.tintColor
  },
  goals: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'lightgray'
  },
  versus: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 40,
    color: '#F0F0F0'
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
  goalOccurrence: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 40
  },
  scorer: {
    fontWeight: 'bold'
  },
  assist: {
    color: 'gray'
  }
});
