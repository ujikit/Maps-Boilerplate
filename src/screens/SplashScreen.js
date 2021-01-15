import React, {useEffect} from 'react';
import {
  Image,
  View,
} from 'react-native';
import {StackActions} from '@react-navigation/routers';
import {connect} from 'react-redux';

function SplashScreen ({route, navigation}) {

  useEffect(() => {
    setTimeout(async () => {
      navigation.dispatch(
        StackActions.replace('Home')
      );
    }, 3000)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        resizeMode="stretch"
        style={{width: 130, height: 138}}
        source={require('../assets/images/icons/Gojek/logo2.jpg')}
      />
    </View>
  )
}

export default connect(state => ({}))(SplashScreen);
