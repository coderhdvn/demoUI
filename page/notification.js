import { View, TouchableOpacity, StyleSheet } from "react-native";

import React from 'react';

export default class NotificationPage extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header} />
                <View>
                    <TouchableOpacity onPress={()=>{}} style={styles.item}> 
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {flex:1},
    header: { backgroundColor: "#6FF6FF", height: '10%', width: '100%' },
    item: { height:100, borderColor: "#000", borderWidth: 1}
})
