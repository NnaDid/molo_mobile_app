import React,{ useState} from'react';
import { StyleSheet, ScrollView, TouchableOpacity,KeyboardAvoidingView,SafeAreaView} from 'react-native';
import { Layout, Tab, TabView, Text, Icon,ApplicationProvider, Button, IconRegistry,Input, Card} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { COLORS } from '../../constants';
import Loader from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const smartUserIcon     = (props) => (<Icon {...props} name='person-add-outline'/>);
const paswdIcon         = (props) => (<Icon {...props} name='shield-outline'/>);
const ColorPaletteIcon  = (props) => (<Icon {...props} name='book-outline'/>);
const StarIcon          = (props) => (<Icon {...props} name='star'/>);
const recurrentBillIcon = (props) => (<Icon {...props} name='activity-outline'/>);
const GivingFreqIcon    = (props) => (<Icon {...props} name='refresh-outline'/>);
const PersonIcon        = (props) => (<Icon {...props} name='person-outline'/>);
const EmailIcon         = (props) => (<Icon {...props} name='email-outline'/>);
const PhoneIcon         = (props) => (<Icon {...props} name='phone-outline'/>);
const  CalendarIcon     = (props) => (<Icon {...props} name='calendar'/>);

export const Profile = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index) => index === selectedIndex;

  const [userState, setUserState] = useState({});
  const [name, setName]          = useState('');
  const [email, setEmail]        = useState('');
  const [phone, setPhone]        = useState(''); 
  const [date, setDate]          = useState(new Date());

  const [loading, setLoading]    = useState(false);
  const [errortext, setErrortext]= useState(''); 

  AsyncStorage.getItem('MOLO_USER')
  .then((userDataReturned)=>{
    if(userDataReturned !== null || userDataReturned !== undefined){
         const user = JSON.parse(userDataReturned); 
          setUserState(user); 
    }
  })
      
    const handleUpdateButton = () => {
      setErrortext(''); 
      if (!name || name =='') {
        setName(userState.name);
      }
      if (!email || email =='') {
        setEmail(userState.email);
      }
      if (!phone || phone=='') {
        setPhone(userState.phone);
      }
      //Show Loader
      setLoading(true);
      let dataToSend = {
              fName:   name  || userState.name,
              email:   email || userState.email,
              phone:   phone || userState.phone,
        };

      fetch('http://192.168.43.13:80/works/beyond/api/updateProfile/', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.message === 'success') {             
            AsyncStorage.removeItem('MOLO_USER').then((val)=>{
              props.navigation.replace('Login');
            });
            console.log('Update Successful. Please Login to proceed');
            ToastAndroid.showWithGravityAndOffset(
              'Update Successful', ToastAndroid.LONG, ToastAndroid.BOTTOM,
              25, 500 
              );
          } else {
            setErrortext(responseJson.message);
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };
  

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    <Loader loading={loading} />
      <SafeAreaView>
    <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={index => setSelectedIndex(index)}>
      <Tab title='My profile' style={{padding:15}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Layout style={{...styles.tabContainer}}>
          <KeyboardAvoidingView enabled>

              <Layout style={{ flex:1,alignItems: 'center', justifyContent:'center'}}>               
                              <Layout style={styles.inputBackground}>
                                  <Input
                                    value ={name || userState.name}
                                    label ='Full Name'
                                    size  ='large'
                                    accessoryRight ={PersonIcon}
                                    placeholder='Your full name' 
                                    onChangeText={nextValue => setName(nextValue)}
                                    style ={{ width:'100%'}}
                                />
                              </Layout>

                              <Layout style={styles.inputBackground}>
                                  <Input
                                    value ={email || userState.email}
                                    label ='Email'
                                    size  ='large'
                                    accessoryRight ={EmailIcon}
                                    placeholder='Your Email' 
                                    onChangeText={nextValue => setEmail(nextValue)}
                                    style ={{ width:'100%'}}
                                />
                              </Layout>

                              <Layout style={styles.inputBackground}>
                                  <Input
                                    value ={phone || userState.phone}
                                    label ='Phone Number'
                                    size  ='large'
                                    accessoryRight ={PhoneIcon}
                                    placeholder='Your Phone Number' 
                                    onChangeText={nextValue => setPhone(nextValue)}
                                    style ={{ width:'100%'}}
                                />
                              </Layout> 
                              <Layout style={styles.inputBackground}>
                              <Input
                                    value ={date || userState.dob}
                                    label ='Date of birth (We love to celebrate our own)'
                                    size  ='large'
                                    accessoryRight ={CalendarIcon}
                                    placeholder='date of birth dd/mm/yyyy' 
                                    onChangeText={nextValue => setDate(nextValue)}
                                    style ={{ width:'100%'}}
                                />
                              </Layout> 
                              {errortext !== '' ? (
                                  <Text style={styles.errorTextStyle}>{errortext}</Text>
                              ) : null}
                              <Button style ={styles.btnBg,{ width:'100%',margin:20}} onPress ={handleUpdateButton}> Update Profile </Button>   
                  
                        </Layout>              
               
           </KeyboardAvoidingView>

        </Layout>
     
            </ScrollView>
      </Tab>
      <Tab title='My Donations'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>My Donations</Text>
        </Layout>
      </Tab>
      <Tab title='Subscriptions'>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>My Subscriptions </Text>
        </Layout>
      </Tab> 
    </TabView>
      </SafeAreaView>
     </ApplicationProvider>
   </>
 );
};

export default Profile

const styles = StyleSheet.create({
  tabContainer: {
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    padding:15
  },

});