import React from "react";
import { FlatList, View, ScrollView, Dimensions, Text, Button, Image, Pressable, StyleSheet, TouchableOpacity, ImageBackground, Alert } from "react-native";
import MapView, {Callout, Marker, Polyline, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY, ONESIGNAL_APP_ID} from '../constants/Constant';
import API from '../api/API';
import { Input, Button as Btn} from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import Rating from '../components/Rating';
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const blue = "#2196F3"
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: "hidden",
    height: 50,
    elevation: 3,
    width: "50%",
    backgroundColor: blue,
  },
  grayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 4,
    overflow: "hidden",
    elevation: 3,
    width: "50%",
    backgroundColor: '#aaa',
    marginRight: 5
  }
});

class CustomButton extends React.Component {
  color = 0;
  render(){
    return(
      <Pressable 
      style={{...this.props.style, opacity: this.color == 0?1:0.6}} 
      onTouchStart={()=>{this.color=1; this.forceUpdate()}}
      onTouchEnd={()=>{this.color=0; this.forceUpdate(); this.props.touch()}}
      >
        <ImageBackground source={require('../images/gradient.png')}
      resizeMode="stretch" style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Text style={{color:"white"}}>{this.props.title}</Text>
      </ImageBackground>
      </Pressable>
    )
  }
}

class CustomButtonCancle extends React.Component {
  color = 0;
  render(){
    return(
      <Pressable 
      style={{...this.props.style, opacity: this.color == 0?1:0.6}} 
      onTouchStart={()=>{this.color=1; this.forceUpdate()}}
      onTouchEnd={()=>{this.color=0; this.forceUpdate(); this.props.touch()}}
      >
        <ImageBackground  style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Text style={{color:"white"}}>{this.props.title}</Text>
      </ImageBackground>
      </Pressable>
    )
  }
}

const getHeader = async() => {
      
  const token = "Bearer " + await getData(TOKEN_KEY);

  const headers = {
    'Authorization': token
  }
  
  return headers
}

const getImage = async (imageName) => {
  let headers = await getHeader();
  try {
    const getUrl = await API.get(`/uploadserver/get_image/${imageName}`, {headers});
    return getUrl.data
  } catch (err) {
    console.log("image not found")
  }
}

export class Question1 extends React.Component {

  state = {
    product: {},
    reviews: [],
    reviewSummary : {},
    rating: 0,
    content: '',
    modalVisible: false,
    visible: true,
    showMore: false,
    countFeedbacks: 0
  }

  name  = ""
  url = ""
  bean = null
  tab = 0
  logger = null
  mapview = 0
  componentDidMount = async () => {
    let headers = await getHeader();
    try {
      const response = await API.get(`/account/companies/${this.props.route.params.product.template.producerId}`, {headers});
      this.name = response.data.name;
      this.bean = response.data
      this.forceUpdate()
    }
    catch (err) {
      console.log(err)
    }
    await this.setFeedbacks(this.props.route.params.product.template.id);

    this.url = await getImage(this.props.route.params.product.template.imageUrl);

    try {
      const response = await API.get(`/logger/distributes/${this.props.route.params.product.id}/10/0`, {headers});
      this.logger = response.data;
      for (let i =0; i< response.data.length ; i++){
        try {
          const response2 = await API.get(`/account/branches/${response.data[i].branchId}`, {headers})
          this.logger[i].branchObj = response2.data
        } catch (err) {
          console.error(err.message);
        }
      }
    }
    catch (err) {
      console.log(err)
    }
    this.forceUpdate();

  }

  getDay(timestamp) {
    let date = new Date(timestamp);
    let day = `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
    return day;
  }

  setFeedbacks = async (templateId) => {
    const headers = await getHeader();

    try {
      let response = await API.get(`/product/feedbacks/${templateId}/${this.state.countFeedbacks}/4`, {headers});
      let avg = response.data.average_rate;
      let total = response.data.num_feedbacks;
      this.setState({reviewSummary: {avg, total}})

      let feedbacks = response.data.feedbacks;

      if (feedbacks.length === 4) {
        feedbacks.pop();
        this.setState({
          showMore: true,
          countFeedbacks: this.state.countFeedbacks + 3
        })
      } else {
        this.setState({
          showMore: false 
        })
      }
      if (feedbacks) {
        feedbacks.map(async feedback  => {
          let date = this.getDay(feedback.created_at);

          let review = {
            content: feedback.content,
            rating: feedback.rating,
            created_at: feedback.created_at,
            date
          }
          const customerId = feedback.customerId;

          let response = await API.get(`/account/users/${customerId}`, {headers});
          const customerName = response.data.name;
          review = {...review, customerName};

          this.setState({reviews: [...this.state.reviews, review].sort((a, b) => {return b.created_at - a.created_at})});
        })
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  selectColor(i){
    return this.tab == i? "#05fa53": "white"
  }

  getRating = (rating) => {
    console.log("rating nek", rating);
    this.setState({rating});
  }

  infor(){
    return (<View style={{ width: "90%", height: "43%", borderRadius: 10, elevation: 2, padding: 25, paddingLeft: 10, flexDirection: "row",backgroundColor: "white"}}>
   { //<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../images/pic4.jpg')} />
  }
    <View style={{marginLeft: 20}}>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
        <Text style={{fontWeight: "bold", marginRight: 4}}>Nhà sản xuất: </Text> 
        <Text style={{ textAlign: "right", overflow: "hidden"}}>{this.name}</Text>   
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
        <Text style={{fontWeight: "bold"}}>Ngày sản xuất:</Text> 
        <Text>{new Date(this.props.route.params.product.mfgDate).toLocaleDateString("en-US")}</Text>   
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
        <Text style={{fontWeight: "bold"}}>Hạn sử dụng:</Text> 
        <Text>{new Date(this.props.route.params.product.expDate).toLocaleDateString("en-US")}</Text>   
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between", width: 200}}>
        <Text style={{fontWeight: "bold"}}>Mô tả:</Text> 
      </View>
      <Text style={{height: 100}}>{this.props.route.params.product.template.description}</Text>   

     
    </View>
  </View>)
  }


  transfer(){
    if (this.logger == null) return (<Text>loading</Text>)
    console.log(this.logger)
    return (
      <View style={{height: 300, width: SCREEN_WIDTH, alignItems: "center"}}>
        <View style={{flexDirection: "row", width: SCREEN_WIDTH, justifyContent: "space-around"}}>
          <Text>lịch sử vận chuyển đơn hàng</Text>
          <Icon onPress={() => { this.mapview = 0; this.forceUpdate() }} name="map" color="black" size={15}/>
          <Icon onPress={() => { this.mapview = 1; this.forceUpdate() }} name="list" color="black" size={15}/>
        </View>
        {this.mapview ==0?
        <ScrollView style={{ overflow: "scroll", width: "90%" }}>
          {this.logger.map((i) => (
            <View style={{ width: "90%", borderRadius: 10, elevation: 2, padding: 20, flexDirection: "row", backgroundColor: "white", marginBottom: 10 }}>
              <View style={{flexDirection: "column"}}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", marginRight: 10 }}>chi nhánh:</Text>
                  <Text>{i.branchObj.name}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", marginRight: 10 }}>công ty:</Text>
                  <Text>{i.distributorId}</Text>
                </View>
                <Text>time {new Date(i.createdAt).toLocaleDateString("en-US")}</Text>
              </View>
              <Image source={require('../images/gradient.png')}  style={{width: 70, height: 70, borderRadius: 70, borderColor: "#05fa53", borderWidth: 4, backgroundColor: "grey", margin: 10}}/>
            </View>
          ))}
        </ScrollView>:<MapView style={{ width: "100%", height: 300 }}
            initialRegion={{latitude: 0, longitude: 0,latitudeDelta: 1, longitudeDelta: 1,}}
          />
        }
      </View>
      )
  }

  onSaveReview = async() => {

    const headers = await getHeader();
    console.log("rating nek", this.state.rating);

    if (this.state.rating !== 0) {
      try {
        let feedback = {
          rating: this.state.rating,
          content: this.state.content
        }
        let templateId = this.props.route.params.product.template.id;
        const response = await API.post(`/product/feedbacks/${templateId}`, feedback, {headers});

        this.setFeedbacks(templateId);

        this.setState({modalVisible: false});

      } catch (err) {
        console.error("err nek", err.message)
      }
    } else {
      showMessage({
        message: "Đánh giá không thành công !",
        type: 'danger',
        description: "Bạn không thể đánh giá 0 sao",
        duration: 3000,
        floating: true,
        icon: {
          icon: 'danger', position: "right"
        },
      })
    }
  }

  feedBack(){
    return (
      <ScrollView style={{ width: "90%", height: "43%", borderRadius: 10, elevation: 2, padding: 25, paddingLeft: 10, backgroundColor: "white"}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', padding: 5}}>Đánh giá:</Text>
            <Button
              icon={
                <Icon1
                  name="pencil"
                  size={10}
                  color={'white'}
                />
              }
              title='Thêm đánh giá'
              type='outline'
              titleStyle={{color: 'white', fontSize: 10, padding: 10}}
              buttonStyle={{borderColor: 'white'}}
              onPress={() => this.setState({modalVisible: true})}
            />
          </View>

          {
          this.state.modalVisible &&
          <View style={{alignItems: 'center',
          borderTopWidth: 1,
          borderColor: BASIC_COLOR,
          padding: 10}}>
             
              <Input
                placeholder='Nội dung...'
                onChangeText={value => {
                  this.setState({password: value})
                }}
                autoCapitalize="none"
                inputStyle={{color: BASIC_COLOR}}
                onChangeText={value => {this.setState({content: value})}}
              />
               <Rating
                  customStyle={{marginBottom: 20,
                    flexDirection: 'row',}}
                  size={30}
                  enableRating={true}
                  rating={this.state.rating}
                  getRating={this.getRating}
                /> 
              <Button
                title="Lưu đánh giá"
                type="outline"
                titleStyle={{color: BASIC_COLOR, fontSize: 10, padding: 10}}
                buttonStyle={{borderRadius: 40, borderColor: BASIC_COLOR, borderWidth: 1, color: 'grey', backgroundColor: 'grey'}}
                onPress={this.onSaveReview}
                icon={
                  <Icon
                    name="save"
                    size={20}
                    color={BASIC_COLOR}
                    style={{padding: 5}}
                  />
                }
              />
             
          </View>
        }
          
            {this.state.reviews.map((item, index) => {
              return (
                <View style={{borderColor: BASIC_COLOR, borderTopWidth: 1, padding: 5}} key={index}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 14, padding: 5}}>{item.customerName}</Text>
                    <View style={{marginTop: 10}}>
                      <Rating
                        rating={item.rating}
                        size={15}
                        
                    />  
                    </View>                       
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 12, padding: 5}}>{item.content}</Text>
                    <Text style={{fontSize: 12, fontStyle: 'italic', padding: 6, color:'gray'}}>{item.date}</Text>      
                  </View>
            
                </View>
              )
              })
            }
          
            
        </ScrollView>
              
      )
  }

  render(){
    return (
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, alignItems: "center", backgroundColor: "#eee" }}>
        <ImageBackground
          source={require('../images/gradient.png')}
          resizeMode="cover"
          style={{
            backgroundColor: blue, height: 250, paddingTop: 10,
            overflow: "hidden", borderBottomEndRadius: 0, borderBottomStartRadius: 0,
            paddingLeft: 0, paddingRight: 20, alignItems: "center",
            paddingRight: 0, shadowColor: "red", shadowOffset: { width: 0, height: 30, },
            shadowOpacity: 1.0, shadowRadius: 2.22, elevation: 10, paddingTop: 30, width: SCREEN_WIDTH
          }}>
          <Image source={{uri: this.url}}  style={{width: 100, height: 100, borderRadius: 70, borderColor: "#05fa53", borderWidth: 4, backgroundColor: "grey", margin: 10}}/>
          <Text style={{ fontWeight: "bold", color: "white", size: 40}}>{this.props.route.params.product.template.name}</Text>
          <View style={{ marginTop: 10, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", width: SCREEN_WIDTH, paddingLeft: 20, paddingRight: 20, borderTopColor: "#146791", borderTopWidth: 1 }}>
            <View style={{alignItems: "center"}} onTouchEnd={()=>{this.tab = 0; this.forceUpdate()}}>
              <Icon name="information-circle-outline" color={this.selectColor(0)} size={15}/>
              <Text style={{ color: this.selectColor(0), fontSize: 12, width: 70, textAlign: "center" }}>Thông tin chung</Text>
            </View>
            <View style={{alignItems: "center"}} onTouchEnd={()=>{this.tab = 1; this.forceUpdate()}}>
              <Icon name="paper-plane" color={this.selectColor(1)} size={15}/>
              <Text style={{ color: this.selectColor(1), fontSize: 12, width: 70, textAlign: "center" }}>Vận chuyển</Text>
            </View>
            <View style={{alignItems: "center"}} onTouchEnd={()=>{this.tab = 2; this.forceUpdate()}}>
              <Icon name="chatboxes" color={this.selectColor(2)} size={15}/>
              <Text style={{ color: this.selectColor(2), fontSize: 12, width: 70, textAlign: "center" }}>Đánh giá sản phẩm</Text>
            </View>
          </View>
        </ImageBackground>
        {this.tab == 0?this.infor(): this.tab == 1? this.transfer():this.feedBack()}
        
        <View style={{width: "90%", borderRadius: 10,padding: 20}}>
          <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 14, paddingBottom: 5}}>Có phải bạn vừa quét sản phẩm này ?</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <CustomButtonCancle style={styles.grayButton} title="Sai" touch={() => { this.props.navigation.navigate('FalseResult') }} />
            <CustomButton style={styles.button} title="Đúng" touch={() => { this.props.navigation.navigate('Question2', { id: this.props.route.params.product.branchId, bean: this.bean }) }} />
          </View>
        </View>
      </View>)
  }
}

export class Question2 extends React.Component {

  obj = null

  componentDidMount = async () => {
    let headers = await getHeader();
    try {
      const response = await API.get(`/account/branches/${this.props.route.params.id}`, {headers});
      this.obj = response.data;
      console.log(this.obj)
      this.forceUpdate()
    }
    catch (err) {
      console.log(err)
    }
  }

  render(){
    //console.log(this.props.route.params.id)
    if (this.obj == null) return (<View></View>)
    return (
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", alignItems: "center", backgroundColor: "#eee" }}>
        <ImageBackground
          source={require('../images/gradient.png')}
          resizeMode="stretch"
          style={{
            backgroundColor: blue, height: 180, paddingTop: 10, flexDirection: "row", justifyContent:"space-between",
            overflow: "hidden", borderBottomEndRadius: 10, borderBottomStartRadius: 10,
            paddingLeft: 0, paddingRight: 20, alignItems: "flex-start",
            paddingRight: 0, shadowColor: "red", shadowOffset: { width: 0, height: 30, },
            shadowOpacity: 1.0, shadowRadius: 2.22, elevation: 10, paddingTop: 30, width: SCREEN_WIDTH
          }}>
          <View style={{paddingLeft: 10}}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Icon name="radio-button-on" color="#05fa53" size={20} style={{ marginEnd: 10 }} />
              <Text style={{ fontWeight: "bold", color: "white", textAlign: "left", marginTop: 15 }}>{this.obj.name}</Text>
            </View>
            <Text style={{ fontStyle: "italic", color: "white", textAlign: "left", fontSize: 13 }}>{this.obj.address}</Text>
            <Text style={{ fontStyle: "italic", color: "white", textAlign: "left", fontSize: 13 }}>công ty abc xyz</Text>
          </View>
          <Image source={require('../images/eth.png')}  style={{width: 70, height: 70, borderRadius: 70, borderColor: "#05fa53", borderWidth: 4, backgroundColor: "grey", margin: 10}}/>
        </ImageBackground>
        <View style={{
          width: "90%", borderRadius: 10,
          elevation: 2, padding: 20, flexDirection: "column", backgroundColor: "white"
        }}>
          <MapView
            style={{ width: "100%", height: 300 }}
            initialRegion={{
              latitude: this.obj.latitude,
              longitude: this.obj.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={{
          width: "90%", borderRadius: 10,
           padding: 20
        }}>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>Có phải bạn đang mua hàng tại cửa hàng này?</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <CustomButtonCancle style={styles.grayButton} title="Sai" touch={() => { this.props.navigation.navigate('FalseResult') }} />
            <CustomButton style={styles.button} title="Đúng vậy" touch={() => { this.props.navigation.navigate('Result', { bean: this.props.route.params.bean }) }} />
          </View>
        </View>
      </View>)
  }
}

export class Result extends React.Component {

  s = 0

  renderListItem(content){
    return (
      <View style={{flexDirection:"row", justifyContent: "space-between", borderBottomColor: "#ccc",
      borderBottomWidth: 1
      }}
      onTouchEnd={()=>{this.s=1;this.forceUpdate()}}
      >
          <Text style={{color: "green"}}>{content}</Text>
          <Icon name="checkmark-circle" color="green"/>
      </View>
    )
  }

  render(){
    return (
      <View style={{height: "100%", flexDirection: "column", justifyContent: "space-between"}}>
        <View style={{ alignItems: "center" }}>
          <ImageBackground
          source={require('../images/gradient.png')}
          resizeMode="stretch"
          style={{alignItems: "center", width: "100%", overflow: "hidden",  elevation: 30,
           borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
            <Image style={{ width: 180, height: 180 }} source={require('../images/safe.png')} />
            <Text style={{ fontSize: 30, color: "white" }}>An toàn</Text>
          </ImageBackground>
          <Text style={{ fontSize: 20, color: "green" }}>5/5</Text>
          {
            this.s == 0?
            <View style={{ backgroundColor: "#ddd", padding: 10, margin: 10, width: "100%", borderRadius: 5, overflow: "hidden", elevation: 10, }}>
            {this.renderListItem("Kiểm tra chứng chỉ số")}
            {this.renderListItem("Kiểm tra hạn sử dụng")}
            {this.renderListItem("Kiểm Trạng thái tiêu thụ")}
            {this.renderListItem("Kiểm tra vị trí")}
            {this.renderListItem("Kiểm tra mẫu mã")}
          </View>:
          <View style={{ backgroundColor: "#ddd", padding: 10, margin: 10, width: "100%", borderRadius: 5, overflow: "hidden", elevation: 10, }}>
               <Icon name="arrow-round-back" color="black" onTouchEnd={()=>{this.s=0;this.forceUpdate()}}/>
              <Text>123</Text>
          </View>}
          <Text onTouchEnd={()=>{this.props.navigation.navigate("detail", {product: this.props.route.params.bean})}}>Thông tin sản phẩm {">"}</Text>
        </View>
        <View>
        <CustomButton style={{...styles.button, width: "100%"}} touch={()=>{this.props.navigation.navigate("PrivateScan")}} title = "Quét mã private" />
        </View>
      </View>
    )
  }
} 

export class FalseResult extends React.Component {
  
  renderListItem(content){
    return (
      <View style={{flexDirection:"row", justifyContent: "space-between"}}>
          <Text style={{color: "red"}}>{content}</Text>
          <Icon name="alert" color="red"/>
      </View>
    )
  }
  
  render(){
    return (
    <View style={{alignItems: "center"}}>
      <Image style={{width: 180, height: 180}} source={require('../images/warning.png')} />
      <Text style={{fontSize: 30}}>Hãy cẩn thận!!!</Text>
      <Text>chúng tôi nhận thấy sự bất thường</Text>
      <View style={{backgroundColor: "#ddd", padding: 10, margin: 10, width: "100%"}}>
        {this.renderListItem("Kiểm tra chứng chỉ số")}
      </View>
    </View>)
  }
} 

export class PrivateScan extends React.Component {
  render(){
    return ( 
      <View style={{flex:1}}>
        <View style={{height: 100, backgroundColor: blue, alignItems: "center"}}> 
          <Text style={{color: "white"}}>Quét để cộng đểm và bảo vệ cộng đồng</Text>
          <Text style={{color: "white"}}>Lưu ý: sản phẩm phải có mã private, nếu không có là giả</Text>
        </View>
        <View >
        <QRCodeScanner
          onRead={() => { this.props.navigation.navigate('Point')}}
          showMarker={true}
          customMarker={
            <View style={{width:200, height:200, borderColor: "#3bbf5e", borderWidth: 10, alignItems: "center", 
            position: "relative", top: -100}}>
            </View>
          } 
        />
        </View>
      </View>)
  }
}

export class Point extends React.Component {
  render(){
    return (<View>
      <Text>+10</Text>
      <Text>Tổng điểm: 100</Text>
    </View>)
  }
}