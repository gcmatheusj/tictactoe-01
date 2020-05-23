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
import { AntDesign } from '@expo/vector-icons';

import api from './services/api';
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
  reload: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3ff40',
    height: 56,
    width: 250,
    borderRadius: 50,
    marginTop: 60,
  },
});

const App: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);

  const handlePlayO = async (boardString: string): Promise<void> => {
    const response = await api.post(
      '/',
      {
        board: boardString,
        level: 'expert',
      },
      {
        headers: {
          Authorization: 'Bearer ckafe9un5000001l558e0dvek',
        },
      },
    );
    const responseBoard = response.data.board.split('');
    setBoard(responseBoard);
  };

  const handlePlayX = (position: number): void => {
    if (board[position] !== ' ') {
      return;
    }

    const newBoard = board.map((value, index) => {
      if (index === position) {
        value = 'X';
      }
      return value;
    });

    let boardString = '';

    newBoard.map((value) => {
      boardString = boardString.concat(value);
      return value;
    });

    setBoard(newBoard);
    handlePlayO(boardString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Tictactoe - 01</Text>
      <View style={styles.board}>
        {board.map((boardPosition, index) => (
          <TouchableOpacity
            style={styles.boardButton}
            key={index}
            onPress={() => handlePlayX(index)}
          >
            <Text style={styles.boardButtonText}>{boardPosition}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.reload}
          onPress={() => setBoard(initialBoard)}
        >
          <AntDesign name="reload1" size={32} color="#181b24" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
