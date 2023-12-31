import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tailwind`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tailwind`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tailwind`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}
          >
            <Image 
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ url: image }}
            />
            <View style={tailwind`-ml-6`}>
              <Text style={tailwind`text-xl font-semibold`}>{title}</Text>
              <Text>Travel time...</Text>
            </View>
            <Text style={tailwind`text-xl`}>$99</Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tailwind`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tailwind`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;