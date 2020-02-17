import React, { useState, useEffect } from 'react';
import { ListItem } from 'react-native-elements'

export default function GamesListItem(props) {

  const [avatarUrl, setAvatarUrl] = useState(props.match.goalsCipo > props.match.goalsAdversary ? 'https://i.imgur.com/N7FStO9.png' : props.match.goalsCipo === props.match.goalsAdversary ? 'https://i.imgur.com/fKJJTP1.png' : 'https://i.imgur.com/HaoLPuW.png');

  return (
    <ListItem
      leftAvatar={{ source: { uri: avatarUrl } }}
      title={props.match.adversary + ' - (' + props.match.goalsCipo + ' X ' + props.match.goalsAdversary + ')'}
      subtitle={props.match.place + ' - ' + props.match.date}
      bottomDivider
      onPress={() => props.navigation.navigate('GameDetails', {match: props.match, avatar: avatarUrl})}
    />
  );
}