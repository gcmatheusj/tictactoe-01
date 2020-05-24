import React from 'react';
import {
  Modal as RNModal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#d3ff40',
    height: 44,
    width: 190,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: '#181b24',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

interface Props {
  open: boolean;
  handleClose(): void;
}

const Modal: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <RNModal animationType="fade" transparent visible={open}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.textStyle}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
