import React from "react";
import {View} from 'react-native'
import {Input} from 'native-base'

function HeaderComponent ({
  route,
  navigation,
  placeholder,
  value,
  setState
}) {

  return (
    <View>
      <Input autoCapitalize="sentences" keyboardType="default" placeholder={placeholder} placeholderTextColor="rgb(153, 153, 153)" onChangeText={(_value) => setState(_value)} value={value} style={{ fontSize: 15, marginLeft: 5, color: 'black' }}/>
    </View>
  )
}

export default HeaderComponent;
