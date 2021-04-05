import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import MapView, {Callout, Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';

export default class DetailInfo extends React.Component {
    
    state = {
        contributors: [
            {
                id: 1,
                name: 'Siêu thị điện máy', 
                address: 'Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam',
                coordinate: {latitude: 10.762622, longitude: 106.660172},
                image: 'https://lh5.googleusercontent.com/p/AF1QipMstLauTVkrxPUJpivVrGit61U9kpmIByCkf1Sc=w408-h261-k-no'
            },
            {
                id: 2,
                name: 'Chợ lớn', 
                address: 'Công trường An Đông, Phường 9, Quận 5, Thành phố Hồ Chí Minh 700000, Vietnam',
                coordinate: {latitude: 10.732622, longitude: 106.680172},
                image: 'https://lh5.googleusercontent.com/p/AF1QipNHBeSM6fMb3mT_tgm32QMtUeJYaWBhETouPasi=w480-h240-k-no'
            },
            {
                id: 3,
                name: 'Siêu thị bách hóa', 
                address: '37 Bạch Vân, Phường 5, Quận 5, Thành phố Hồ Chí Minh, Vietnam',
                coordinate: {latitude: 10.752622, longitude: 106.620172},
                image: 'https://lh5.googleusercontent.com/p/AF1QipOxSL1fGvGuOdrYkisuEH6o6pUOQoArkjtrlL7d=w408-h306-k-no'
            },
            {
                id: 4,
                name: 'Big C', 
                address: '381 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh, Vietnam',
                coordinate: {latitude: 10.782622, longitude: 106.610172},
                image: 'https://lh5.googleusercontent.com/p/AF1QipN7TTlndraZOt7uVuYczqaOXTCoT_ejI8WViEQj=w426-h240-k-no'
            }
        ],
        coordinates: [],
        markers: []
    }

    onCarouselItemChange = (index) => {
        let location = this.state.contributors[index];
        this._map.animateToRegion({
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09
        });

        this.state.markers[index].showCallout()
    }

    onMarkerPress = (index) => {
        this._carousel.snapToItem(index)
    }

    renderCarouselItem = ({item}) => (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardContent}>{item.address}</Text>
            <Image style={styles.cardImage} source={{uri: item.image}} />
        </View>
    )

    componentDidMount = () => {
        this.state.contributors.forEach(contributor => {
            this.state.coordinates.push(contributor.coordinate)
        });
    }

  render(){
        return ( 
        <View style={styles.container}>    
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map => this._map = map}
                style={styles.map}
                initialRegion={{
                latitude: this.state.contributors[0].coordinate.latitude,
                longitude: this.state.contributors[0].coordinate.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09
            }}>
                {
                    this.state.contributors.map((contributor, index) => (
                        <Marker
                            key={contributor.id}
                            ref={ref => this.state.markers[index] = ref}
                            onPress={() => this.onMarkerPress(index)}
                            coordinate={contributor.coordinate}
                        >
                            <Callout>
                                <Text>{contributor.name}</Text>
                            </Callout>
                        </Marker>
                    ))
                }
                <Polyline 
                    coordinates={this.state.coordinates}
                    strokeWidth={3}
                />
            </MapView>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.contributors}
              containerCustomStyle={styles.carousel}
              renderItem={this.renderCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              onSnapToItem={(index) => this.onCarouselItemChange(index)}
            />
            <Button
                icon={
                  <Icon
                    name="home"
                    size={30}
                    color='white'
                  />
                }
                containerStyle={{position: 'absolute', right: 5, top: '20%'}}
                buttonStyle={{backgroundColor: BASIC_COLOR, borderRadius: 100, width: 50, height: 50}}
                onPress={() => {this.props.navigation.navigate('Scan')}}
            />
        </View>
        )
    }  
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {
        height:100,
        width: 100
    },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 35
    },
    cardTitle: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center'
    },
    cardImage: {
        height: 130,
        width: 300,
        bottom: 0,
        position: 'absolute',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    cardContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 200,
        width: 300,
        padding: 5,
        borderRadius: 15
    },
    cardContent: {
        color: 'white',
        fontSize: 11,
        alignSelf: 'center'
    }
});