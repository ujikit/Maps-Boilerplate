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

// components
import Loader from '../components/Loader'
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

  // let {current_location} = route.params;

  // let [is_loading, setIsLoading] = useState(true);
  let [is_loading, setIsLoading] = useState(false);
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
    // setTimeout(() => {
    //   setIsLoading(false);
    //   _handleGetGeocodeAPI(current_location.geometry.location.lat, current_location.geometry.location.lng)
    // }, 1500)
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
    setIsLoading(true);
    setTimeout(() => {
      type_location_reducer == 'current' ? dispatch(currentLocationDispatch(location_found[0])) : dispatch(destinationLocationDispatch(location_found[0]))
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
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: init_region.latitudeDelta,
              longitudeDelta: init_region.longitudeDelta
            })
            setInitPoint({
              latitude: latitude,
              longitude: longitude
            })
            setLatLng({
              latitude: latitude,
              longitude: longitude
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
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Loader show={is_loading}/>
        {
          /*
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={init_region}
              minZoomLevel={0}
              maxZoomLevel={20}
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
          */
        }
        <View style={styles.bottom}>
          <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 45, height: 45, borderRadius: 90 }}>
                <Icon type="AntDesign" name="arrowleft" style={{ color: 'rgb(97, 94, 94)', fontSize: 23 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 220, backgroundColor: 'white'}}>
            <TouchableOpacity style={{height: 65, flexDirection: 'row', paddingHorizontal: 15}}>
              <View style={{width: 110, flexDirection: 'row'}}>
                <View style={{width: 40, justifyContent: 'center'}}>
                  <Image
                    resizeMode="stretch"
                    style={{width: 30, height: 30}}
                    source={require('../assets/images/icons/LinkAja.png')}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 15, color: 'rgb(70, 68, 68)'}}>LinkAja</Text>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(84, 84, 84)', borderRadius: 90}}>
                  <Icon type="SimpleLineIcons" name="options" style={{ color: 'white', fontSize: 11 }} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{height: 65, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
              <TouchableOpacity disabled={true} style={{flex: 1, height: 35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', paddingHorizontal: 15, backgroundColor: 'rgb(0, 168, 230)', borderTopLeftRadius: 25, borderBottomLeftRadius: 25}}>
                  <Text numberOfLines={1} style={{fontSize: 12, color: 'white'}}>Try PayLater and pay by the end of the month</Text>
                </View>
                <View style={{width: 50, justifyContent: 'center', alignItems: 'center', height: '100%', paddingHorizontal: 15, backgroundColor: 'rgb(3, 137, 186)', borderTopRightRadius: 25, borderBottomRightRadius: 25}}>
                  <Text numberOfLines={1} style={{fontSize: 12, color: 'white'}}>Try</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, marginBottom: 25}}>
              <View style={{height: 60}}>
                <TouchableOpacity onPress={() => _handleSetDestinationLocation()} style={{flex: 1, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 20, backgroundColor: 'rgb(75, 147, 29)'}}>
                  <View style={{width: 110, justifyContent: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Order GoRide</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>Rp. 20.000</Text>
                      </View>
                      <View style={{width: 40, alignItems: 'flex-end'}}>
                        <Icon type="Ionicons" name="arrow-forward-circle" style={{ color: 'white', fontSize: 30 }} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {
          /*
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
          */
        }
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
