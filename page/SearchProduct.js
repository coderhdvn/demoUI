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
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';

export default class SearchProduct extends React.Component {
    
    state = {
        location: {latitude: 10.762691093961827, longitude: 106.68154866846568},
        search: '',
        searchList: [],
        markers: [],
        showSearch: false,
        showLoading: false,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    }

    getHeader = async() => {
      
        const token = "Bearer " + await getData(TOKEN_KEY);
    
        const headers = {
          'Authorization': token
        }
        
        return headers
      }

    async searchProduct() {
        this.setState({
            showLoading: true
        });

        let headers = await this.getHeader();

        try {
            let location = this.state.location;
            let search = this.state.search.toLowerCase();
            const response = await API.get(`/product/products/${search}/near/${location.latitude}/${location.longitude}`, {headers});
            console.log("search list",response.data);
            this.setState({ 
                searchList: response.data,
                showSearch: true,
                showLoading: false,
            });
        } catch (err) {
            console.error(err.message)
        }
    }

    updateSearch = (search) => {
        this.setState({ 
            search,
            showSearch: false,
            showLoading: false
        })
    }

    onCarouselItemChange = (index) => {
        let location = this.state.searchList[index];
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
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
            {
                item.image !== '' && 
                <Image style={styles.cardImage} source={{uri: item.image}}/>
            }
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
         this.getLocation();
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
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta
                }}>
                    <Marker
                        coordinate={this.state.location}
                        title="Bạn ở đây"
                        pinColor={BASIC_COLOR}
                    >
                        <Callout>
                            <Text style={{color: BASIC_COLOR, fontWeight: 'bold'}}>Bạn ở đây</Text>
                        </Callout>
                    </Marker>
                    <Circle
                        center={this.state.location}
                        radius={15}
                        strokeColor={BASIC_COLOR}
                        fillColor="rgba(75, 201, 210, 0.3)"
                    />

                {   this.state.showSearch &&
                    this.state.searchList.map((item, index) => (
                        <Marker
                            key={item.id}
                            ref={ref => this.state.markers[index] = ref}
                            onPress={() => this.onMarkerPress(index)}
                            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
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
                    containerStyle={{backgroundColor: "white", borderWidth: 1}}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    inputStyle={{color: BASIC_COLOR}}
                    leftIconContainerStyle={{padding: 5}}
                    lightTheme={true}
                    searchIcon={{
                        onPress: () => this.searchProduct(),
                        size: 35,
                        color: BASIC_COLOR
                    }}
                    clearIcon={{
                        size: 25,
                        color: 'red'
                    }}
                    showLoading={this.state.showLoading}
                    loadingProps={{
                        color: BASIC_COLOR
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