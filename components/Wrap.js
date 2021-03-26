import React from 'react';
import { View, StyleSheet } from 'react-native';

const Wrap = ({ children }) => {
    return <View style={styles.spacer}>
        {children}
    </View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: 10,
        alignItems: 'center'
    }
});

export default Wrap;