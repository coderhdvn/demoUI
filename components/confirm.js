import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const Confirm = ({ message, button, popup, submit }) => {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
      <View style={styles.centeredView}>
        <TouchableHighlight
          style={styles.submitBtn}
          onPress={() => {
                popup();
                showDialog();
          }}
        >
          <Text style={styles.textStyle}>{button}</Text>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>

              { message !== "Something wrong!" && <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginBottom: 5 }}
                onPress={() => {
                    hideDialog();
                    submit();
                }}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableHighlight>}
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={hideDialog}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
}
export default Confirm;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  submitBtn: {
    width: "70%",
    backgroundColor:"#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  }
});