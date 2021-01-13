import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';

const Loader = ({show, type}) => {
  return (
    <Modal visible={show} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{fontSize: 30}}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.59)',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
  },
});

export default Loader;
