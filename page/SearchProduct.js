import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, {Callout, Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, SearchBar } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from 'react-native';

export default class SearchProduct extends React.Component {
    
    state = {
        location: {latitude: 55.7887626, longitude: 37.7916801},
        search: '',
        searchList: [
            {
                id: 1,
                name: 'Cellphones',
                address: '349 QL13, Hiệp Bình Phước, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam',
                location: {latitude: 55.789066, longitude: 37.791363},
                image: 'https://lh5.googleusercontent.com/p/AF1QipOjNTm271c-6rFgqTQKalVDtBcPlsPb2ummN9-X=w426-h240-k-no'
            },
            {
                id: 2,
                name: 'Viettel',
                address: '90 Nguyễn Oanh, Phường 7, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam',
                location: {latitude: 55.789364, longitude: 37.793365},
                image: 'https://lh5.googleusercontent.com/p/AF1QipNndHUFg2cuhpsBbRuIzp8rEaqXryI1pcA-TRaT=w408-h544-k-no'
            },
            {
                id: 3,
                name: 'Thế Giới Di Động',
                address: '137 QL13, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam',
                location: {latitude: 55.789764, longitude: 37.799362},
                image: 'https://lh5.googleusercontent.com/p/AF1QipMFLGLc_t2FvSz4ZY6V-sBeA4yMvnuUapLWailJ=w426-h240-k-no'
            },
        ],
        markers: [],
        showSearch: false
    }

    searchProduct() {
        console.log(this.state.search);
        this.setState({showSearch: true})
    }

    updateSearch = (search) => {
        this.setState({ 
            search,
            showSearch: false 
        })
    }

    onCarouselItemChange = (index) => {
        let location = this.state.searchList[index].location;
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
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

    getLocation = async () => {
        Geolocation.getCurrentPosition(
          position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            this.setState({ location: { latitude, longitude }})
          },
          error => {
            showMessage({
              message: "Không thể định vị vị trí của bạn !",
              type: 'danger',
              description: "Hãy chắc chắn rằng bạn đang bật định vị",
              duration: 5000,
              floating: true,
              icon: {
                icon: 'danger', position: "right"
              },
            })
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
      }
      componentDidMount() {
        // this.getLocation();
      }

  render(){
        return ( 
        <View style={styles.container}>  
        { this.state.location ?
            (<>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    style={styles.map}
                    initialRegion={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}>
                    <Marker
                        coordinate={this.state.location}
                        title="Bạn ở đây"
                        pinColor={BASIC_COLOR}
                    />
                    <Circle
                        center={this.state.location}
                        radius={15}
                        strokeColor="white"
                        fillColor={BASIC_COLOR}
                    />

                {   this.state.showSearch &&
                    this.state.searchList.map((item, index) => (
                        <Marker
                            key={item.id}
                            ref={ref => this.state.markers[index] = ref}
                            onPress={() => this.onMarkerPress(index)}
                            coordinate={item.location}
                        >
                            <Callout>
                                <Text>{item.name}</Text>
                            </Callout>
                        </Marker>
                    ))
                }
                        
                </MapView>
                <SearchBar
                    placeholder="Tìm kiếm sản phẩm..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    containerStyle={{backgroundColor: BASIC_COLOR}}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    leftIconContainerStyle={{padding: 5}}
                    lightTheme={true}
                    searchIcon={{
                        onPress: () => this.searchProduct(),
                        size: 35
                    }}
                    clearIcon={{
                        size: 25
                    }}
                />
                {
                    this.state.showSearch &&
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.searchList}
                            containerCustomStyle={styles.carousel}
                            renderItem={this.renderCarouselItem}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={300}
                            onSnapToItem={(index) => this.onCarouselItemChange(index)}
                        />
                }
                

            </>) 
            : (<View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                <ActivityIndicator
                size="large"
                color={BASIC_COLOR}    
                />
                <Text style={{padding: 10, fontSize: 18}}>Đang định vị vị trí của bạn</Text>
            </View>
            )
        }
            
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