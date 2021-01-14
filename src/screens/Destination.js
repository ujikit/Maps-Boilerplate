import React, {useState, useEffect, useRef} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import {Container, Icon, Input} from 'native-base'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Loader,
  Shine,
  ShineOverlay,
} from 'rn-placeholder'
import {connect, useDispatch} from 'react-redux';

// components
import FormInput from '../components/FormInput'
import Header from '../components/Header'
import Line from '../components/Line'
// configs
import {GOOGLE_API_KEY} from '../configs'
// redux actions
import {setTypeLocationDispatch, currentLocationDispatch, destinationLocationDispatch, selectedLocationDispatch} from '../states/actions/destination_all_action'

const PADDING_HORIZONTAL = 15;

function DestinationScreen ({
  route,
  navigation,
  current_location_reducer,
  destination_location_reducer
}) {
  const dispatch = useDispatch();
  const ref_autocomplete = useRef(null);

  let [is_fetching_location, setIsFetchingLocation] = useState(false);
  let [current_location, setCurrentLocation] = useState('');
  let [destination_location, setDestinationLocation] = useState('');
  let [geocode_found, setGeocodeFound] = useState([]);
  let [location_found, setLocationFound] = useState([]);

  _handleTypeCurrentLocation = (current_location) => {
    setCurrentLocation(current_location);
    dispatch(currentLocationDispatch({name: current_location}))
    dispatch(setTypeLocationDispatch('current'))
    if (current_location.split("").length <= 1) {
      return console.log('String must more than 1 character.');
    }
    if (!current_location) {
      return setLocationFound([])
    }
    clearInterval(ref_autocomplete.current);
    _handleGetGeocodeAPI(current_location)
  }

  _handleTypeDestinationLocation = (destination_location) => {
    setDestinationLocation(destination_location);
    dispatch(destinationLocationDispatch({name: destination_location}))
    dispatch(setTypeLocationDispatch('destination'))
    if (destination_location.split("").length <= 1) {
      return console.log('String must more than 1 character.');
    }
    if (!destination_location) {
      return setLocationFound([])
    }
    clearInterval(ref_autocomplete.current);
    _handleGetGeocodeAPI(destination_location)
  }

  _handleGetGeocodeAPI = (location) => {
    let parse_current_location = location.replace(/\s/g, '+')
    setIsFetchingLocation(true);
    ref_autocomplete.current = setTimeout(async () => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${parse_current_location}&key=${GOOGLE_API_KEY}`)
        .then(async response_geocoding => {

          let json = await response_geocoding.json();
          console.log('success_fetching_geocoding_maps', json);
          if (!json.results.length) {
            setIsFetchingLocation(false);
            return setLocationFound([])
          }
          setGeocodeFound([{...json.results[0]}])
          fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${json.results[0].place_id}&key=${GOOGLE_API_KEY}`)
            .then(async response_place => {

              let json = await response_place.json();
              console.log('success_fetching_place_maps', json);
              setLocationFound([{...json.result}])
            })
            .catch(error_place => console.error('error_fetching_place_maps', error_place))
            .finally(() => setIsFetchingLocation(false));
        })
        .catch(error_geocoding => {
          console.error('error_fetching_geocoding_maps', error_geocoding)

          setIsFetchingLocation(false)
        })
    }, 1500)
  }

  _handlePickLocation = () => {
    dispatch(selectedLocationDispatch(geocode_found[0]))
    navigation.navigate('ChooseLocation', {
      current_location: geocode_found[0]
    })
  }

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
            value={current_location_reducer.name}
            setState={_handleTypeCurrentLocation}
          />
          </View>
          <Line height={2} margin_left={32}/>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
            <Image
              resizeMode="stretch"
              style={{width: 22, height: 22}}
              source={require('../assets/images/icons/Gojek/destination-orange.png')}
            />
            <FormInput
              placeholder="Search for a destination"
              value={destination_location_reducer.name}
              setState={_handleTypeDestinationLocation}
            />
          </View>
        </View>
        <TouchableOpacity disabled={true}>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <View style={{flexDirection: 'row', borderRadius: 18, borderWidth: 1, borderColor: 'rgb(238, 234, 234)'}}>
              <View style={{flexDirection: 'row', paddingHorizontal: PADDING_HORIZONTAL, paddingVertical: 9}}>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    resizeMode="stretch"
                    style={{width: 19, height: 19}}
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
          <Line height={2} margin_left={0}/>
        </View>
        <View style={{flex: 1, marginTop: current_location || destination_location || location_found.length ? 0 : 20, paddingHorizontal: location_found.length ? 0 : PADDING_HORIZONTAL}}>
          {
            is_fetching_location ?
              <View style={{width: '100%', alignSelf: 'center'}}>
                <View style={{width: '100%', paddingTop: 20}}>
                  <Placeholder
                    Animation={Shine}
                    Left={PlaceholderMedia}
                    >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                  </Placeholder>
                </View>
              </View>
            :
              !location_found.length?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>Lokasi tidak ditemukan</Text>
                </View>
              :
                !is_fetching_location && current_location || destination_location && location_found.length ?
                  (<FlatList
                    data={location_found}
                    showsVerticalScrollIndicator={false}
                    keyExtractor = { (item, index) => index.toString() }
                    ListFooterComponentStyle={{paddingVertical: 18}}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={()=> _handlePickLocation(item)} style={{height: 90}}>
                          <View style={{flexDirection: 'row', paddingVertical: 15}}>
                            <View style={{width: 40, alignItems: 'center'}}>
                              <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: 'rgb(199, 197, 197)', fontSize: 23 }} />
                            </View>
                            <View style={{flex: 1, marginTop: -5}}>
                              <View>
                                <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                              </View>
                              <View style={{paddingTop: 5}}>
                                <Text numberOfLines={2} style={{fontSize: 12.5}}>{item.formatted_address}</Text>
                              </View>
                            </View>
                          </View>
                          <Line height={1} margin_left={0}/>
                        </TouchableOpacity>
                      )
                    }}
                  />)
                :
                  !current_location && !destination_location &&
                    (
                      <View style={{alignSelf: 'center'}}>
                        <Image
                          resizeMode="stretch"
                          style={{width: 300, height: 60}}
                          source={require('../assets/images/icons/Gojek/order-gojek-now.png')}
                        />
                      </View>
                    )
          }
        </View>
      </View>
    </Container>
  )
}

export default connect(state => ({
  current_location_reducer: state.destination_all_reducer.current_location_reducer,
  destination_location_reducer: state.destination_all_reducer.destination_location_reducer,
}))(DestinationScreen);
