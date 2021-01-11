import React from "react";
import {View} from 'react-native'

function LineComponent ({
  margin_left,
}) {

  return (
    <View>
      <View style={{height: 2, backgroundColor: 'rgb(233, 233, 233)', marginLeft: margin_left}}/>
    </View>
  )
}

export default LineComponent;
