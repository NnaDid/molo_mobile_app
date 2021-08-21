import React ,{useState, useContext} from 'react';
import { StyleSheet, ToastAndroid} from 'react-native';
import {  ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Input} from '@ui-kitten/components'; 
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { COLORS , Logo, APIS} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletContext } from '../../Providers/wallet/Wallet.provider';


const card = (props) => (
  <Icon {...props} name='credit-card-outline'/>
);

const INITIAL_STATE ={
    wallet_balance:0
}

const QuickDonate = ({ navigation }) => {
    const { donateFund } = useContext(WalletContext);
    const [amount, setAmount] = useState({...INITIAL_STATE});
    const [userData, setUserData] = useState({});

    React.useEffect(() => {
     AsyncStorage.getItem('MOLO_USER').then((response)=>{
         if(response !== null || response!== undefined){
             const user = JSON.parse(response); 
             setUserData(user); 
         }else{
             setUserData(['No user Data']); 
         }
     }); 
    }, [userData,navigation]) 

  const  DebitWallet = ()=>{
      let dataToSend = {
          email:userData.email, 
          action: "donate", 
          ref:'MOLO_'+Math.floor(new Date()),
          amount:amount.wallet_balance
        };
        // when no donation amount is Supplied or if the 0 amount is supplied as Donation amount
        if (!amount.wallet_balance || amount.wallet_balance<=0) return;

      fetch(APIS.WALLET.DONATION, { method: 'POST',body: JSON.stringify(dataToSend),
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
      })
      .then((response)=> response.json())
      .then((responseJson) => { 
          if (responseJson.message.status === 'Suceess') { 
            ToastAndroid.showWithGravityAndOffset(
              'Successful', ToastAndroid.LONG, ToastAndroid.BOTTOM,
              25, 500 
              );
              // Log out the Response
              console.log(responseJson.message);

              const userAccountBalance ={
                      amount:responseJson.message.amount_funded,
                      wallet_balance:responseJson.message.wallet_balance,
              };
              AsyncStorage.setItem('MOLO_USER_WALLET',JSON.stringify(userAccountBalance)).then((response)=>{
                navigation.navigate('Dashboard',{user:userAccountBalance});
                console.log("stringified data->:",JSON.stringify(userAccountBalance));
                // update the Wallet provider
                donateFund({
                  ...amount.wallet_balance,
                })
                console.log(response);
              }).catch((error)=>{
                  console.error(error);
                  alert(error);
              });
            
          } else {
            alert(responseJson.message);
          }
        })
        .catch((error) => { 
          console.error(" FROM ONLINE: "+error);
        });
    };

    return (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
              
              <Layout style={{ height:"90%",alignItems: 'center', justifyContent:'center'}}>               
                    <Logo />
                   <Text style={{color:COLORS.primary, fontWeight:'bold',fontSize:18}}> Molo Donation </Text>
                <Layout style={styles.inputBackground}>
                        <Input
                          value ={amount.wallet_balance}
                          label ='Amount'
                          size  ='large'
                          accessoryRight ={card}
                          keyboardType="numeric"
                          placeholder='Donation amount eg. 20000' 
                          onChangeText={nextValue => setAmount(nextValue)}
                          style ={{ width:'90%'}}
                      />
                   </Layout> 
                <Button onPress={()=>{DebitWallet}} 
                     title="Continue"
                     style ={{
                          width:'87%',
                          margin:20,
                          backgroundColor:COLORS.primary, 
                          borderColor:COLORS.primary
                          }}>
                    Continue
                </Button>
                      
              </Layout>

          </ApplicationProvider>
        </>
    )
}

export default QuickDonate;

const styles = StyleSheet.create({})
