import React from 'react';
import { ListItem } from 'react-native-elements'

export default function ScorersListItem(props) {
  return (
    <ListItem
      title={props.scorer.name}
      rightSubtitle={props.scorer.goals.toString()}
      leftIcon={{ name: 'person', size: 30 }}
      bottomDivider
    />
  );
}