import React, { useState } from "react";
import { FlatList, StyleSheet, Image, Dimensions, TextInput, Platform, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { Container, Card, Footer, Text, Content, View, Button, Header, Icon } from 'native-base'
import MapView, {Marker} from 'react-native-maps'

function TestMapScreen ({
  route,
  navigation,
}) {

  // development
  let [all_search_lodging_data] = useState([
    {
      id: 1,
      name: "Kumala 1",
      type: 'Kost',
      rating: 0,
      allowed_gender: 'laki-laki',
      location: {
        province: 'Di Yogyakarta',
        city: 'Kota Yogyakarta',
        address:
          'JL. RANTAUAN DARAT PEKAULAMAN NO. 17 RT. 15, BANJARMASIN',
      },
      coordinates: {
        longitude: 114.5892632,
        latitude: -3.328000,
      },
      pictures: [
        {
          id: 36,
          url:
            'https://picsum.photos/200/300',
        },
      ],
      picture: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: "Kumala 2",
      type: 'Kost',
      rating: 0,
      allowed_gender: 'laki-laki',
      location: {
        province: 'Di Yogyakarta',
        city: 'Kota Yogyakarta',
        address:
          'JL. RANTAUAN DARAT PEKAULAMAN NO. 17 RT. 15, BANJARMASIN',
      },
      coordinates: {
        longitude: 114.5892632,
        latitude: -3.3312407,
      },
      pictures: [
        {
          id: 36,
          url:
            'https://picsum.photos/200/300',
        },
      ],
      picture: 'https://picsum.photos/200/300',
    },
  ]);

  return (
    <Container>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            longitude: 114.5892632,
            latitude: -3.331073,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {
            all_search_lodging_data.map(data => (
              <MapView.Marker key={data.id} coordinate={{ latitude: Number(data.coordinates.latitude), longitude: Number(data.coordinates.longitude) }} title={`${data.name}`} description={`It has a category named`} >
                <Image source={require('../assets/images/marker.png')} style={{ width: 50, height: 55 }} />
                <MapView.Callout onPress={() =>  alert(data.id)}>
                  <View>
                    <Text style={{ fontSize: 11 }}>
                      {data.name}
                    </Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))
          }
        </MapView>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: "100%",
    height: 140,
    position: 'absolute',
    bottom: 0
  },
  item_main: {
    backgroundColor: 'white',
    width: 200,
    height: 120,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 8
  },
  item_sub_main: {
    flexDirection: 'row',
    marginTop: 8
  }
});

export default TestMapScreen;
