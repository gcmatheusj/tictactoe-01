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
import LottieView from 'lottie-react-native';

import Modal from './components/Modal';

import api from './services/api';
import { initialBoard, winningPositions } from './utils/tictactoe';
import winnerAnimation from './animations/winner.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181b24',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
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
  modalText: {
    fontSize: 24,
    textAlign: 'center',
  },
  draw: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  lottie: {
    width: 150,
    height: 150,
    marginTop: -6,
    marginBottom: 5,
  },
});

const App: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const handleWinner = (player: string, updatedBoard: string[]): boolean => {
    const hasWinner = winningPositions.find((_, index) => {
      const positionOne = updatedBoard[winningPositions[index][0]] === player;
      const positionTwo = updatedBoard[winningPositions[index][1]] === player;
      const positionThree = updatedBoard[winningPositions[index][2]] === player;

      return positionOne && positionTwo && positionThree;
    });

    return !!hasWinner;
  };

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

    const hasWinner = handleWinner('O', responseBoard);

    if (hasWinner) {
      setGameOver(true);
      setWinner('O');
      setBoard(responseBoard);
    }

    setBoard(responseBoard);
  };

  const handlePlayX = (position: number): void => {
    if (gameOver) return;

    if (board[position] !== ' ') return;

    const updatedBoard = board.map((value, index) => {
      if (index === position) {
        value = 'X';
      }
      return value;
    });

    let boardString = '';

    updatedBoard.map((value) => {
      boardString = boardString.concat(value);
      return value;
    });

    setBoard(updatedBoard);

    const hasWinner = handleWinner('X', updatedBoard);
    const checkEmpty = updatedBoard.find((value) => value === ' ');

    if (hasWinner) {
      setGameOver(true);
      setWinner('X');
    } else if (!checkEmpty) {
      setGameOver(true);
    } else {
      handlePlayO(boardString);
    }
  };

  const handleClose = (): void => {
    setBoard(initialBoard);
    setGameOver(false);
    setWinner('');
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
      <Modal open={gameOver} handleClose={handleClose}>
        {winner ? (
          <>
            <Text style={styles.modalText}>
              {`O jogador ${winner} ganhou!`}
            </Text>
            <LottieView
              source={winnerAnimation}
              style={styles.lottie}
              autoPlay
              loop={false}
            />
          </>
        ) : (
          <Text style={styles.draw}>Ninguem ganhou!</Text>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default App;
