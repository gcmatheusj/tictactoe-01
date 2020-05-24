import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  player: {
    marginHorizontal: 20,
  },
  playerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  vs: {
    color: '#fff',
    fontSize: 24,
  },
});

interface Props {
  xCount: number;
  oCount: number;
}

const Score: React.FC<Props> = ({ xCount, oCount }) => (
  <View style={styles.container}>
    <View style={styles.player}>
      <Text style={styles.playerName}>X</Text>
      <Text style={styles.playerName}>{xCount}</Text>
    </View>
    <Text style={styles.vs}>vs</Text>
    <View style={styles.player}>
      <Text style={styles.playerName}>O</Text>
      <Text style={styles.playerName}>{oCount}</Text>
    </View>
  </View>
);

export default Score;
