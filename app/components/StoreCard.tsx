import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

type StoreCardProps = {
  info: {
    store_id: number;
    store_name: string;
    store_description: string;
    rating: number;
    image: any;
  };
};

const StoreCard: React.FC<StoreCardProps> = ({ info }) => {

  
  return (
    <Link
    href={`/store/${info.store_id}`}  // Just pass the path with dynamic id
    asChild
    >
      <TouchableOpacity style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={{uri: info.image}} />
        <View style={styles.descriptionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{info.store_name}</Text>
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {info.store_description}
            </Text>
          </View>
          <View style={styles.starContainer}>
            <Text style={styles.rating}>{info.rating?.toFixed(1) || "N/A"}</Text>
            <Icon style={styles.star} name="star" size={20} color="#FFD43B" />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth - 20,
    backgroundColor: 'white',
    height: 330,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 3.5,
  },
  starContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 250,
    width: deviceWidth - 40,
    opacity: 0.9,
    alignSelf: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '400',
  },
  description: {
    marginTop: 5,
    fontSize: 12,
  },
  rating: {
    fontSize: 20,
    fontWeight: '900',
  },
  star: {
    position: 'relative',
  },
});

export default StoreCard;
