import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, {Callout, Marker, Polyline, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';

export default class DetailInfo extends React.Component {
    
    state = {
        distributors: [],
        coordinates: [],
        markers: [],
        scale: 0
    }

    onCarouselItemChange = (index) => {
        let location = this.state.distributors[index];
        this._map.animateToRegion({
            latitude: location.branch.latitude,
            longitude: location.branch.longitude,
            latitudeDelta: this.state.scale/3,
            longitudeDelta: this.state.scale/3
        });

        this.state.markers[index].showCallout()
    }

    onMarkerPress = (index) => {
        this._carousel.snapToItem(index)
    }

    maxDistance = (coordinates) => {
        let x0 = coordinates[0].latitude;
        let y0 = coordinates[0].longitude;
        let distances = [];
        for (let i = 1; i<coordinates.length; i++) {
            let x = coordinates[i].latitude;
            let y = coordinates[i].longitude;
            let distance = Math.sqrt(Math.pow((x-x0), 2) + Math.pow((y-y0), 2));
            distances.push(distance);
        }
        return Math.max(...distances);
    }

    setScale = (coordinates) => {
        let maxDistance = this.maxDistance(coordinates);
        let scale = maxDistance * 0.1 / 0.036;
        this.setState({ scale });
        console.log(scale);
    }

    renderCarouselItem = ({item}) => (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.branch.name}</Text>
            <Text style={styles.cardContent}>{item.branch.address}</Text>
            <Image style={styles.cardImage} source={{uri: item.branch.image}} />
        </View>
    )

    componentDidMount = () => {

        let distributors = this.props.route.params.distributors;
        let coordinates = [];
        
        distributors.forEach(distributor => {
            let coords = {
                latitude: distributor.branch.latitude,
                longitude: distributor.branch.longitude
            }
            coordinates.push(coords);
        })
        this.setState({
            distributors,
            coordinates
        });
        this.setScale(coordinates);
    }

   

  render(){
        return ( 
        <View style={styles.container}>  
            {  this.state.coordinates.length !== 0 &&
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map => this._map = map}
                style={styles.map}
                onLayout={() => this._map.fitToCoordinates(this.state.coordinates, {animated: true })}
                initialRegion={{
                latitude: this.state.coordinates[0].latitude,
                longitude: this.state.coordinates[0].longitude,
                latitudeDelta: this.state.scale,
                longitudeDelta: this.state.scale
            }}>
                {
                    this.state.distributors.map((distributor, index) => (
                        <Marker
                            key={distributor.id}
                            ref={ref => this.state.markers[index] = ref}
                            onPress={() => this.onMarkerPress(index)}
                            coordinate={{latitude: distributor.branch.latitude, longitude: distributor.branch.longitude}}
                        >
                            <Callout>
                                <Text>{distributor.branch.name}</Text>
                            </Callout>

                        </Marker>

                    ))
                }
                <Polyline 
                    coordinates={this.state.coordinates}
                    strokeWidth={5}
                    geodesic={false}
                />
            </MapView>
            }
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.distributors}
              containerCustomStyle={styles.carousel}
              renderItem={this.renderCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              onSnapToItem={(index) => this.onCarouselItemChange(index)}
            />
            <Draggable x={Dimensions.get('window').width - 55} y={100}>
            <Button
                  icon={
                    <Icon
                      name="home"
                      size={35}
                      color='white'
                    />
                  }
                  buttonStyle={{backgroundColor: BASIC_COLOR, borderRadius: 100, width: 50, height: 50}}
                  onPress={() => {this.props.navigation.navigate('Scan')}}
              />
          </Draggable>
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