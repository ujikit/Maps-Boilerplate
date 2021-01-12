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

// configs
import {GOOGLE_API_KEY} from '../configs'
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
  let [location_found, setLocationFound] = useState([
    {
      name: '',
      formatted_address: '',
    }
  ]);

  _handleGetGeocodeAPI = (region) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude || user_current_location_reducer.latitude},${region.longitude || user_current_location_reducer.longitude}&key=${GOOGLE_API_KEY}`)
      .then(async response_geocoding => {
        console.log('success_fetching_geocoding_maps', response_geocoding);

        let json = await response_geocoding.json();
        console.log('jsonjson', json);
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${json.results[0].place_id}&key=${GOOGLE_API_KEY}`)
          .then(async response_place => {
            console.log('success_fetching_place_maps', response_place);

            let json = await response_place.json();
            console.log('jsonjson22', json);
            setLocationFound([{...json.result}])
          })
          .catch(error_place => console.error('error_fetching_place_maps', error_place))
      })
      .catch(error_geocoding => {
        console.error('error_fetching_geocoding_maps', error_geocoding)
      })
  }

  return (
    <Container>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={init_region}
            onRegionChangeComplete={region => {
              console.log('dddddd', region);

              if(region.latitude.toFixed(6) === init_region.latitude.toFixed(6)
                && region.longitude.toFixed(6) === init_region.longitude.toFixed(6)){
                  return;
              }
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
              _handleGetGeocodeAPI(region);
            }}
          >
            <Marker coordinate={init_point} />
          </MapView>
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
                <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 17, color: 'rgb(70, 68, 68)'}}>{location_found[0].name}</Text>
                <Text numberOfLines={4} style={{fontSize: 15, color: 'rgb(70, 68, 68)', marginTop: 10}}>{location_found[0].formatted_address}</Text>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15}}>
              <TouchableOpacity style={{width: '100%', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgb(75, 147, 29)'}}>
                <Text style={{paddingVertical: 15, paddingHorizontal: 30, color: 'white', fontWeight: 'bold'}}>Set destination location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '70%',
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
