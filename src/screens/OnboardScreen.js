import React, {useEffect } from 'react'
import { StyleSheet,Image,} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { COLORS, ICONS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardScreen = ({navigation}) => {   
  useEffect(() => {
    setTimeout(() => { 
      AsyncStorage.getItem('MOLO_USER').then((value) => {
            if(value){ 
              const user = JSON.parse(value); 
              navigation.navigate('Dashboard',{user:user});    
            } 
          } );
    }, 1000);
  }, [navigation]);
    return (
        <Onboarding
            onDone ={()=>{navigation.navigate("Login")}}
            onSkip ={()=>{navigation.replace("Login")}}
        pages={[
            {
            backgroundColor: COLORS.primary,
            image: <Image source={require('../assets/icons/molobg.png')} style={{resizeMode:'contain',aspectRatio:3/4, width:"70%", height:150}} />,
            title: 'Partnership',
            subtitle: 'Manage all your partnership in one place',
            },
            {
            backgroundColor: COLORS.DARKERBLUE,
            image: <Image source={require('../assets/icons/molobg.png')} style={{resizeMode:'contain',aspectRatio:3/4, width:"70%", height:150}}/>,
            title: 'Wallet',
            subtitle: 'Send and recieve money, pay utility bills, give offerings',
            },
            {
            backgroundColor: COLORS.GOLD,
            image: <Image source={require('../assets/logo.png')} style={{resizeMode:'contain',aspectRatio:3/4, width:"70%", height:150}}/>,
            title: 'Bible Reading Plans',
            subtitle: 'Bring your spiritual life up to speed with increase in knowledge with the Rapsody reading plans',
            },
        ]}
        />
    );
}

export default OnboardScreen

const styles = StyleSheet.create({
    tab: {
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:"100%",
      },
})
