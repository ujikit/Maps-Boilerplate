import React, { useState } from "react";
import { FlatList, StyleSheet, Image, Dimensions, TextInput, Platform, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { Container, Card, Footer, Text, Thumbnail, Content, View, Button, Header, Icon } from 'native-base'

function HomeScreen ({
  route,
  navigation,
}) {

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
