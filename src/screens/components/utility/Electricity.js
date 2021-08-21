import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Electricity = () => {
    return (
        <View style={styles.container}>
            <Text>Electricity</Text>
        </View>
    )
}

export default Electricity

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    }
})
