import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Giveoffering = () => {
    return (
        <View style={styles.container}>
            <Text>Giving offering has never been this easy</Text>
        </View>
    )
}

export default Giveoffering;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    }
})
