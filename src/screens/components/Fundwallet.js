import React ,{useState, useContext} from 'react';
import { StyleSheet, ToastAndroid} from 'react-native';
import {  ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Input, View} from '@ui-kitten/components'; 
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { COLORS , Logo, APIS} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PaystackWebView from 'react-native-paystack-popup';
import { WalletContext } from '../../Providers/wallet/Wallet.provider';
import Loader from '../Loader';


const card = (props) => (
  <Icon {...props} name='credit-card-outline'/>
);

const INITIAL_STATE ={
    wallet_balance:0
}

const Fundwallet = ({ navigation }) => {
    const { fundWallet } = useContext(WalletContext);
    const [amount, setAmount] = useState({...INITIAL_STATE});
    const ref    = React.useRef(null);
    const [showPayment, setShowPayment] = useState(false);
    const [loading, setLoading]         = useState(false);
    const [userData, setUserData]       = useState({});

    React.useEffect(() => {
     AsyncStorage.getItem('MOLO_USER').then((response)=>{
         if(response !== null || response!== undefined){
             const user = JSON.parse(response); 
             setUserData(user); 
         }
     }); 
    }, [userData,navigation]) 

  const FundMyWallet=(action,amount,email,ref)=>{
      setLoading(true);
      let dataToSend = {
              email:email, 
              action: action,
              ref:ref,
              amount:amount
          };

     fetch(APIS.WALLET.FUND,{ 
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
          }
      })
      .then((response)=> response.json())
      .then((responseJson) => { 
        if (responseJson.message.status =='Success') { 
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset(
              'Successful', ToastAndroid.LONG, ToastAndroid.BOTTOM,
              25, 500 
              );
              fundWallet({
                ...amount,
              })
              // Log out the Response
              console.log(` NETWORK ERROR : ${responseJson.message}`);
          } else {
            alert(responseJson.message);
          }
        }).catch((error) => { console.error(" FROM ONLINE: "+error);});
    };

    return (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
          <Loader loading={loading} />
              <Layout style={{ height:"90%",alignItems: 'center', justifyContent:'center'}}>               
               {!showPayment &&<Logo />}
                   <Text style={{color:COLORS.primary, fontWeight:'bold',fontSize:18}}>Funding Molo Wallet</Text>
                    {!showPayment &&<Layout style={styles.inputBackground}>
                        <Input
                          value ={amount.wallet_balance}
                          label ='Amount'
                          size  ='large'
                          accessoryRight ={card}
                          keyboardType="numeric"
                          placeholder='Funding amount eg. 20000' 
                          onChangeText={nextValue => setAmount(nextValue)}
                          style ={{ width:'90%'}}
                      />
                   </Layout> } 
                    {!showPayment && <Button onPress={()=>{setShowPayment(true)}} title="Continue"
                     style ={{ width:'87%',margin:20,backgroundColor:COLORS.primary, borderColor:COLORS.primary}}>Continue</Button>
                     }
                        {showPayment && 
                        <PaystackWebView
                            ref={ref} 
                            onError={(err) => {
                            setShowPayment(false);
                            alert(`Failed...:${err}`);
                            }}    
                            metadata={{ custom_fields: [{ display_name: "MOLO WALLET FUNDING"}] }}
                            onDismissed={() => {
                                ref.current.reload(); //reload if dismissed. pk_live_7568eb1ef389bd0454df4d963ac0d4593e9cd567
                            }}
                            onSuccess={(response) => { 
                              setShowPayment(false);
                              console.log({response});
                              console.log("User Data: "+userData.email);
                              FundMyWallet("fund",amount.wallet_balance,userData.email,response.reference);
                              alert(`Transaction successful: ${response.reference}`);
                              
                            }}
                            paystackKey={"pk_test_19664bf78caa8b47737e664c103295aea5e1475d"} 
                            customerEmail={userData.email} 
                            amount={amount*100} 
                            />}   
              </Layout>

          </ApplicationProvider>
        </>
    )
}

export default Fundwallet;

const styles = StyleSheet.create({})
