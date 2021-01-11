import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {Container, Icon, Input} from 'native-base'

// components
import FormInput from '../components/FormInput'
import Header from '../components/Header'
import Line from '../components/Line'

const PADDING_HORIZONTAL = 15;

function DestinationScreen ({
  route,
  navigation,
}) {

  let [current_location, setCurrentLocation] = useState('');
  let [destination_location, setDestinationLocation] = useState('');

  return (
    <Container>
      <View style={{height: 65}}>
        <Header navigation={navigation} title="Set pickup location"/>
      </View>
      <View style={{flex: 1, marginTop: 20, paddingHorizontal: PADDING_HORIZONTAL}}>
        <View style={{height: 90, backgroundColor: 'rgb(244, 244, 244)', borderRadius: 20, borderWidth: 2, borderColor: 'rgb(238, 234, 234)', paddingHorizontal: PADDING_HORIZONTAL}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
            <Image
              resizeMode="stretch"
              style={{width: 22, height: 22}}
              source={require('../assets/images/icons/Gojek/current-location-green.png')}
            />
          <FormInput
            placeholder="Your current location"
            value={current_location}
            setState={setCurrentLocation}
          />
          </View>
          <Line margin_left={32}/>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
            <Image
              resizeMode="stretch"
              style={{width: 22, height: 22}}
              source={require('../assets/images/icons/Gojek/destination-orange.png')}
            />
            <FormInput
              placeholder="Search for a destination"
              value={destination_location}
              setState={setDestinationLocation}
            />
          </View>
        </View>
        <TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <View style={{flexDirection: 'row', borderRadius: 18, borderWidth: 1, borderColor: 'rgb(238, 234, 234)'}}>
              <View style={{flexDirection: 'row', paddingHorizontal: PADDING_HORIZONTAL, paddingVertical: 9}}>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    resizeMode="stretch"
                    style={{width: 17, height: 17}}
                    source={require('../assets/images/icons/Gojek/maps.png')}
                  />
                </View>
                <View style={{justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={{fontSize: 15, color: 'rgb(153, 153, 153)'}}>Select via map</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <Line margin_left={0}/>
        </View>
        <View style={{alignSelf: 'center', marginTop: 20, paddingHorizontal: PADDING_HORIZONTAL}}>
          <Image
            resizeMode="stretch"
            style={{width: 300, height: 60}}
            source={require('../assets/images/icons/Gojek/order-gojek-now.png')}
          />
        </View>
      </View>
    </Container>
  )
}

export default DestinationScreen;
