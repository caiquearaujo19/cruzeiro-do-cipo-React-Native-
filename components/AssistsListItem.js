import React from 'react';
import { ListItem } from 'react-native-elements';

export default function AssistsListItem(props) {
  return (
    <ListItem
      title={props.scorer.name}
      rightSubtitle={props.scorer.assists.toString()}
      leftIcon={{ name: 'person', size: 30 }}
      bottomDivider
    />
  );
}