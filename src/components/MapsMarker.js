import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function MapsMarkerComponent ({
  init_region,
  init_point,
  setInitRegion,
  setInitPoint,
  setLatLng
}) {

  return (
    <MapView
      style={styles.map}
      region={init_region}
      onRegionChange = (region) => {
          if(region.latitude.toFixed(6) === this.state.region.latitude.toFixed(6)
            && region.longitude.toFixed(6) === this.state.region.longitude.toFixed(6)){
              return;
          }

          this.setState({region});
      }
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
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapsMarkerComponent;
