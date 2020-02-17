import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppNavigator from './navigation/AppNavigator';
import GameDetailsScreen from './screens/GameDetailsScreen';

const RootStack = createStackNavigator({
  Home: {
    screen: AppNavigator,
    navigationOptions: {
      header: null,
    }
  },
  GameDetails: GameDetailsScreen,
})

const App = createAppContainer(RootStack);

export default App;
