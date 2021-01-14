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
import MapView, { Marker, Polyline } from "react-native-maps";
const polyline = require('@mapbox/polyline');
import {connect, useDispatch} from 'react-redux';

// components
import Line from '../components/Line'
import Loader from '../components/Loader'
// configs
import {GOOGLE_API_KEY} from '../configs'
import {MAIN_COLOR} from '../configs/Color'
// redux actions
import {userCurrentLocationDispatch} from '../states/actions/global_all_action'
import {currentLocationDispatch, destinationLocationDispatch} from '../states/actions/destination_all_action'
import {setIsEditDispatch} from '../states/actions/choose_location_all_action'

function ChooseLocationScreen ({
  route,
  navigation,
  user_current_location_reducer,
  type_location_reducer,
  selected_location_reducer,
  choose_ride_type_reducer,
  current_location_reducer,
  destination_location_reducer,
  is_edit_reducer,
}) {
  const dispatch = useDispatch();

  let {current_location} = route.params;

  let [is_loading, setIsLoading] = useState(true);
  // let [is_loading, setIsLoading] = useState(false);
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
  let [direction, setDirection] = useState([
    {
      latitude: 0,
      longitude: 0,
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      _handleGetGeocodeAPI(current_location.geometry.location.lat, current_location.geometry.location.lng)
    }, 2000)
  }, [])

  _handleGetCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (info) => {
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
        _handleGetGeocodeAPI(coords.latitude, coords.longitude)
      },
      (error) => {
        console.log('error_getting_geolocation', error.code, error.message);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
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
            if (is_edit_reducer) {
              if (type_location_reducer == 'current' && current_location_reducer.place_id !== json.result.place_id) {
                dispatch(currentLocationDispatch({...json.result}))
              }
              else if (type_location_reducer == 'destination' && destination_location_reducer.place_id !== json.result.place_id) {
                dispatch(destinationLocationDispatch({...json.result}))
              }
            }
            else {
              current_location_reducer.place_id ? dispatch(destinationLocationDispatch({...json.result})) : destination_location_reducer.place_id && dispatch(currentLocationDispatch({...json.result}))
            }

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
            if (current_location_reducer.place_id || destination_location_reducer.place_id) {
              _handleGetDirectionAPI()
            }
          })
          .catch(error_place => console.error('error_fetching_place_maps', error_place))
      })
      .catch(error_geocoding => {
        console.error('error_fetching_geocoding_maps', error_geocoding)
      })
  }

  _handleGetDirectionAPI = () => {
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${current_location_reducer.place_id}&destination=place_id:${destination_location_reducer.place_id}&key=${GOOGLE_API_KEY}`)
      .then(async response_direction => {
        let json = await response_direction.json();
        console.log('success_fetching_direction_maps', json);

        let points = polyline.decode(json.routes[0].overview_polyline.points)
        console.log('pointspointspoints',points);
        let coords = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))
        console.log('coordscoordscoords',coords);
        setDirection(coords)
      })
      .catch(error_direction => console.error('error_fetching_direction_maps', error_place))
  }

  _handleEditDirection = () => {
    dispatch(setIsEditDispatch(true))
    navigation.goBack()
  }

  return (
    <Container>
      <View style={{flex: 1}}>
        <Loader show={is_loading}/>
        {
          current_location_reducer.place_id || destination_location_reducer.place_id ?
            <View style={{width: '100%', paddingHorizontal: 15, paddingTop: 20}}>
              <View style={{width: '100%', height: 80, flexDirection: 'row', paddingHorizontal: 15, backgroundColor: 'white', padding: 15, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                <View style={{width: 35}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image
                      resizeMode="stretch"
                      style={{width: 20, height: 20}}
                      source={require('../assets/images/icons/Gojek/current-location-green.png')}
                      />
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <View/>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image
                      resizeMode="stretch"
                      style={{width: 20, height: 20}}
                      source={require('../assets/images/icons/Gojek/destination-orange.png')}
                      />
                  </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingRight: 15}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1}>{current_location_reducer.name}</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Line height={2} margin_left={0}/>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1}>{destination_location_reducer.name}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => _handleEditDirection()} style={{width: 80, justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{borderWidth: 2, borderColor: MAIN_COLOR, borderRadius: 15}}>
                    <Text style={{fontSize: 17, color: MAIN_COLOR, fontWeight: 'bold', paddingHorizontal: 20, paddingVertical: 5}}>
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          :
            null
        }
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={init_region}
            minZoomLevel={0}
            maxZoomLevel={20}
            onRegionChangeComplete={region => {
              console.log('dddddd', region);

              // prevent maps rendering multiple times
              if(region.latitude.toFixed(6) === init_region.latitude.toFixed(6)
                && region.longitude.toFixed(6) === init_region.longitude.toFixed(6)){
                  return;
              }
              if (current_location_reducer.place_id || destination_location_reducer.place_id) {
                return
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
            {
              current_location_reducer.place_id || destination_location_reducer.place_id ?
                <View>
                  {
                    [
                      {
                        id: 1,
                        name: current_location_reducer.name,
                        image: require('../assets/images/icons/Gojek/ChooseLocation/current.png'),
                        latitude: current_location_reducer.geometry.location.lat,
                        longitude: current_location_reducer.geometry.location.lng,
                      },
                      {
                        id: 2,
                        name: destination_location_reducer.name,
                        image: require('../assets/images/icons/Gojek/ChooseLocation/destination.png'),
                        latitude: destination_location_reducer.geometry.location.lat,
                        longitude: destination_location_reducer.geometry.location.lng,
                      },
                    ].map(item => (
                      <Marker key={item.id} coordinate={{latitude: item.latitude, longitude: item.longitude}} />
                    ))
                  }
                  <Polyline
                    coordinates={direction}
                    strokeColor={MAIN_COLOR}
                    strokeColors={[
                      '#7F0000',
                      '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                      '#B24112',
                      '#E5845C',
                      '#238C23',
                      '#7F0000'
                    ]}
                    strokeWidth={7}
                  />
                </View>
              :
                <Marker coordinate={init_point} />
            }
          </MapView>
        </View>
        {
          current_location_reducer.place_id || destination_location_reducer.place_id ?
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
              <View style={{height: 305, backgroundColor: 'white'}}>
                <TouchableOpacity onPress={() => navigation.navigate('ChooseData')} style={{height: 80, flexDirection: 'row', paddingHorizontal: 15}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 40, justifyContent: 'center'}}>
                      <Image
                        resizeMode="stretch"
                        style={{width: 33, height: 33}}
                        source={choose_ride_type_reducer.image}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}>
                      <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 15, color: 'rgb(70, 68, 68)'}}>{choose_ride_type_reducer.name}</Text>
                      <Text numberOfLines={1} style={{fontSize: 14, color: 'rgb(70, 68, 68)'}}>{choose_ride_type_reducer.person}</Text>
                    </View>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(84, 84, 84)', borderRadius: 90}}>
                      <Icon type="SimpleLineIcons" name="options" style={{ color: 'white', fontSize: 11 }} />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity disabled={true} style={{height: 65, flexDirection: 'row', paddingHorizontal: 15}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 40, justifyContent: 'center'}}>
                      <Image
                        resizeMode="stretch"
                        style={{width: 30, height: 30}}
                        source={require('../assets/images/icons/LinkAja.png')}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 15, color: 'rgb(70, 68, 68)', paddingLeft: 5}}>LinkAja</Text>
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
                            <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>{choose_ride_type_reducer.price}</Text>
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
          :
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
              <View style={{backgroundColor: 'white', height: 270, borderTopRightRadius: 25, borderTopLeftRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 15 }}>
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
                      source={type_location_reducer == 'current' ? require('../assets/images/icons/Gojek/current-location-green.png') : require('../assets/images/icons/Gojek/destination-orange.png')}
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
  current_location_reducer: state.destination_all_reducer.current_location_reducer,
  destination_location_reducer: state.destination_all_reducer.destination_location_reducer,
  choose_ride_type_reducer: state.choose_data_all_reducer.choose_ride_type_reducer,
  is_edit_reducer: state.choose_location_all_reducer.is_edit_reducer,
}))(ChooseLocationScreen);
