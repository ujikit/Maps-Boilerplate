import React, {useState, useEffect} from 'react';
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
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from "react-native-maps";
import {connect, useDispatch} from 'react-redux';

// configs
import {GOOGLE_API_KEY} from '../configs'
// redux actions
import {userCurrentLocationDispatch} from '../states/actions/global_all_action'
import {currentLocationDispatch, destinationLocationDispatch} from '../states/actions/destination_all_action'

function ChooseLocationScreen ({
  route,
  navigation,
  user_current_location_reducer,
  type_location_reducer,
  selected_location_reducer,
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

  useEffect(() => {
    _handleGetGeocodeAPI(selected_location_reducer.geometry.location.lat, selected_location_reducer.geometry.location.lng)
  }, [])

  _handleGetCurrentPosition = () => {
    Geolocation.getCurrentPosition((info) => {
      let {coords} = info;
      dispatch(userCurrentLocationDispatch(coords));
      setInitRegion({
        ...init_region,
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: init_region.latitudeDelta,
        longitudeDelta: init_region.longitudeDelta
      })
      setInitPoint({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
      setLatLng({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    });
  }

  _handleSetDestinationLocation = () => {

    setTimeout(() => {
      type_location_reducer == 'current' ? dispatch(currentLocationDispatch(location_found[0].name)) : dispatch(destinationLocationDispatch(location_found[0].name))
      navigation.goBack();
    }, 1500)
  }

  _handleGetGeocodeAPI = (latitude, longitude) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`)
      .then(async response_geocoding => {

        let json = await response_geocoding.json();
        console.log('success_fetching_geocoding_maps', json);
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${json.results[0].place_id}&key=${GOOGLE_API_KEY}`)
          .then(async response_place => {

            let json = await response_place.json();
            console.log('success_fetching_place_maps', json);
            setLocationFound([{...json.result}])
            setInitRegion({
              ...init_region,
              latitude: selected_location_reducer.geometry.location.lat,
              longitude: selected_location_reducer.geometry.location.lng,
              latitudeDelta: init_region.latitudeDelta,
              longitudeDelta: init_region.longitudeDelta
            })
            setInitPoint({
              latitude: selected_location_reducer.geometry.location.lat,
              longitude: selected_location_reducer.geometry.location.lng
            })
            setLatLng({
              latitude: selected_location_reducer.geometry.location.lat,
              longitude: selected_location_reducer.geometry.location.lng
            })
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
              _handleGetGeocodeAPI(region.latitude, region.longitude);
            }}
          >
            <Marker coordinate={init_point} />
          </MapView>
        </View>
        <View style={styles.bottom}>
          <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 45, height: 45, borderRadius: 90 }}>
                <Icon type="AntDesign" name="arrowleft" style={{ color: 'rgb(97, 94, 94)', fontSize: 23 }} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => _handleGetCurrentPosition()} style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: 'white', width: 45, height: 45, borderRadius: 90 }}>
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
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 15, marginBottom: 25}}>
              <TouchableOpacity onPress={() => _handleSetDestinationLocation()} style={{width: '100%', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgb(75, 147, 29)'}}>
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
  user_current_location_reducer: state.global_all_reducer.user_current_location_reducer,
  type_location_reducer: state.destination_all_reducer.type_location_reducer,
  selected_location_reducer: state.destination_all_reducer.selected_location_reducer,
}))(ChooseLocationScreen);
