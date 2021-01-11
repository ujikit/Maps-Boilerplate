import React from "react";
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {Container} from 'native-base'

function HeaderComponent ({
  route,
  navigation,
  title
}) {

  return (
    <Container>
      <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 15}}>
        <View style={{width: 20, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="stretch"
              style={{width: 15, height: 15}}
              source={require('../assets/images/close.png')}
            />
        </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 15 }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
        </View>
      </View>
    </Container>
  )
}

export default HeaderComponent;
