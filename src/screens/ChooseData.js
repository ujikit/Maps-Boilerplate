import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
} from 'native-base';
import {connect, useDispatch} from 'react-redux';

// components
import Line from '../components/Line'
// redux actions
import {chooseRideTypeDispatch} from '../states/actions/choose_data_all_action'

function ChooseData ({
  route,
  navigation,
}) {
  const dispatch = useDispatch();

  let [data, setData] = useState([
    {
      name: 'GoRide',
      image: require('../assets/images/icons/Gojek/ChooseLocation/ride.jpg'),
      person: '1 person',
      price: 'Rp. 18.000'
    },
    {
      name: 'GoCar',
      image: require('../assets/images/icons/Gojek/ChooseLocation/car-medium.jpg'),
      person: '1 - 4 people',
      price: 'Rp. 28.000'
    },
    {
      name: 'GoCar (L)',
      image: require('../assets/images/icons/Gojek/ChooseLocation/car-large.jpg'),
      person: '1 - 5 people',
      price: 'Rp. 32.000'
    },
  ])

  _handlePickRideType = (data) => {
    dispatch(chooseRideTypeDispatch(data))
    setTimeout(() => {
      navigation.goBack()
    }, 500)
  }

  return (
    <Container>
      <View>
        <FlatList
          style={{paddingLeft: 15}}
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 9}}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => _handlePickRideType(item)}>
              <View style={{height: 75, flexDirection: 'row', paddingRight: 15}}>
                <View style={{width: 53, justifyContent: 'center'}}>
                  <Image
                    resizeMode="stretch"
                    style={{width: 45, height: 45}}
                    source={item.image}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 15, color: 'rgb(70, 68, 68)'}}>{item.name}</Text>
                  <Text numberOfLines={1} style={{fontSize: 14, color: 'rgb(70, 68, 68)'}}>{item.person}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16, color: 'rgb(70, 68, 68)'}}>{item.price}</Text>
                </View>
              </View>
              <Line height={1.5} margin_left={0}/>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  )
}

export default ChooseData;
