import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


const width = Dimensions.get('window').width


const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View style={styles.btnContainerStyle}>
        <Text style={styles.btnTextStyle}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        padding: 10
    },
    btnContainerStyle: {
        backgroundColor: '#3F51B5',
        paddingVertical: 8,
        width: width / 2,
        borderRadius: 5
    },
    btnTextStyle: {
        color: '#ffffff',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    }
})

export default Button