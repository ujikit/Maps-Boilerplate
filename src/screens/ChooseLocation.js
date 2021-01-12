import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
  Icon,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from "react-native-maps";
import {connect, useDispatch} from 'react-redux';

// redux actions
import {userCurrentLocationDispatch} from '../states/actions/global_all_action'

function ChooseLocationScreen ({
  route,
  navigation,
  user_current_location_reducer,
}) {
  const dispatch = useDispatch();

  let [init_region, setInitRegion] = useState({
    latitude: user_current_location_reducer.latitude,
    longitude: user_current_location_reducer.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0
  })
  let [init_point, setInitPoint] = useState({
    latitude: user_current_location_reducer.latitude,
    longitude: user_current_location_reducer.longitude
  })
  let [lat_lng, setLatLng] = useState({
    latitude: user_current_location_reducer.latitude,
    longitude: user_current_location_reducer.longitude
  })

  return (
    <Container>
      <View style={styles.container}>
        {
          /*
          <MapView
            style={styles.map}
            region={init_region}
            onRegionChangeComplete={region => {
              console.log('dddddd', region);

              setInitRegion({
                ...init_region,
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta
              })
              setInitPoint({
                latitude: region.latitude,
                longitude: region.longitude
              })
              setLatLng({
                latitude: region.latitude,
                longitude: region.longitude
              })
            }}
          >
            <Marker coordinate={init_point} />
          </MapView>
          */
        }
      </View>
      <View style={styles.bottom}>
        <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15}}>
          <View style={{flex: 1}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 45, height: 45, borderRadius: 90 }}>
              <Icon type="AntDesign" name="arrowleft" style={{ color: 'rgb(97, 94, 94)', fontSize: 23 }} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: 'white', width: 45, height: 45, borderRadius: 90 }}>
              <Icon type="MaterialCommunityIcons" name="target" style={{ color: 'rgb(97, 94, 94)', fontSize: 23 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: 'white', height: 270, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
          <View style={{flexDirection: 'row', paddingTop: 5, height: 60}}>
            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
              <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 18, color: 'rgb(70, 68, 68)'}}>Set destination location</Text>
            </View>
            <View style={{width: 100, justifyContent: 'center', paddingHorizontal: 15}}>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 5, paddingHorizontal: 15}}>
            <View style={{width: 60}}>
              <Image
                resizeMode="stretch"
                style={{width: 40, height: 40}}
                source={require('../assets/images/icons/Gojek/destination-orange.png')}
              />
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 17, color: 'rgb(70, 68, 68)'}}>Set destination location</Text>
              <Text numberOfLines={4} style={{fontSize: 15, color: 'rgb(70, 68, 68)', marginTop: 10}}>Jl. KH. AhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmadAhmad</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15}}>
            <TouchableOpacity style={{width: '100%', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgb(75, 147, 29)'}}>
              <Text style={{paddingVertical: 15, paddingHorizontal: 30, color: 'white', fontWeight: 'bold'}}>Set destination location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottom: {
    flex: 1,
    width: "100%",
    position: 'absolute',
    bottom: 0
  },
});

export default connect(state => ({
  user_current_location_reducer: state.global_all_reducer.user_current_location_reducer
}))(ChooseLocationScreen);
