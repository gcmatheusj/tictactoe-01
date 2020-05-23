import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { initialBoard } from './utils/tictactoe';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181b24',
    alignItems: 'center',
  },
  title: {
    marginTop: 36,
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff',
  },
  board: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  boardButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202229',
    width: Dimensions.get('window').width / 3 - 25,
    height: Dimensions.get('window').width / 3 - 25,
    margin: 5,
  },
  boardButtonText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const App: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);

  const handlePlayX = (): void => {
    console.log('X');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>TicTacToe - 01</Text>
      <View style={styles.board}>
        {board.map((boardPosition, index) => (
          <TouchableOpacity
            style={styles.boardButton}
            key={index}
            onPress={handlePlayX}
          >
            <Text style={styles.boardButtonText}>{boardPosition}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
