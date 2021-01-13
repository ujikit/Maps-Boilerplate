import React, {useEffect} from 'react';
import {
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {connect, useDispatch} from 'react-redux';

// redux actions
import {userCurrentLocationDispatch} from '../states/actions/global_all_action'

function HomeScreen ({
  route,
  navigation,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    requestLocationPermission()
  }, []);

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        Geolocation.getCurrentPosition(
          (info) => {
            let {coords} = info;
            dispatch(userCurrentLocationDispatch(coords));
          },
          (error) => {
            console.log('error_getting_geolocation', error.code, error.message);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        alert('Permission Denied');
      }
    } catch (err) {
      alert('err', err);
    }
  };

  return (
    <Container>
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10, paddingHorizontal: 10}}>
        <View style={{backgroundColor: 'white', height: 90, width: '100%', borderRadius: 35, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, paddingHorizontal: 30}}>
          <View style={{marginVertical: 5, alignSelf: 'center', width: 30, height: 4, backgroundColor: '#bdbcbd', borderRadius: 20}}/>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Destination')} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode="stretch"
                style={{width: 55, height: 55}}
                source={require('../assets/images/icons/GoRide.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode="stretch"
                style={{width: 55, height: 55}}
                source={require('../assets/images/icons/GoCar.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode="stretch"
                style={{width: 55, height: 55}}
                source={require('../assets/images/icons/GoFood.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode="stretch"
                style={{width: 55, height: 55}}
                source={require('../assets/images/icons/GoMart.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  )
}

export default HomeScreen;
