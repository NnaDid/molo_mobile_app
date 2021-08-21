import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CableTv = () => {
    return (
        <View style ={styles.container}>
            <Text> Cable TV Subscription</Text>
        </View>
    )
}

export default CableTv

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    }
})
