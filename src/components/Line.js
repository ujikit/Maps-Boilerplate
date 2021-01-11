import React from "react";
import {View} from 'react-native'

function LineComponent ({
  height,
  margin_left,
}) {

  return (
    <View>
      <View style={{height: height, backgroundColor: 'rgb(233, 233, 233)', marginLeft: margin_left}}/>
    </View>
  )
}

export default LineComponent;
