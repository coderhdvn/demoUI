import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";

export default class Menu_Header extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: "Movies", header: true },
        { name: "Interstellar", header: false },
        { name: "Dark Knight", header: false },
        { name: "People", header: true },
        { name: "Jazzy", header: false },
        { name: "Appie", header: false },
        { name: "Things", header: true },
        { name: "Table", header: false },
        { name: "Chair", header: false } 
      ],
      stickyHeaderIndices: []
    };
  }
  componentMount() {
    var arr = [];
    this.state.data.map(obj => {
      if (obj.header) {
        arr.push(this.state.data.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr
    });
  }
  _renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
        <Left />
        <Body style={{ marginRight: 40 }}>
            <Text style={{ fontWeight: "bold" }}>
            {item.name}
            </Text>
        </Body>
        <Right />
        </ListItem>   
      );
    } else if (!item.header) {
      return (
        <ListItem style={{ marginLeft: 0 }}>
        <Body>
            <Text>{item.name}</Text>
        </Body>
        </ListItem>   
      );
    }
  };
  render() {
    return (
      <FlatList style={styles.menu}
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.name}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    );
  }
}

const styles = StyleSheet.create({
    menu :{
      width: "100%"
    }
})