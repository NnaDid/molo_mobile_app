import React ,{useState, useContext} from 'react';
import { StyleSheet, ToastAndroid} from 'react-native';
import {  
    ApplicationProvider, Button, Icon, 
    IconRegistry, IndexPath, Layout, 
    Select, SelectItem,Text, 
    Input
  } from '@ui-kitten/components'; 
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { COLORS , Logo, APIS} from '../../../constants/index';

const card = (props) => ( <Icon {...props} name='credit-card-outline'/>);
const ActivityIcon = (props) => (<Icon {...props} name='activity-outline'/>); 
const PhoneIcon         = (props) => (<Icon {...props} name='phone-outline'/>);

// array("airtel"=>1,"9mobile"=>2,"mtn"=>5,"glo"=>6);
const NetworkData =[
  "airtel",
  "9mobile",
  "mtn",
  "glo",
];

const Airtime = ({ navigation }) => {
    const [amount, setAmount]   = useState(0);
    const [phone, setPhone]     = useState('');
    const [network, setNetwork] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const displayValue = NetworkData[selectedIndex.row];

    const renderOption = (title) => (  <SelectItem title={title}/> );

    return (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
              
              <Layout style={{ height:"90%",alignItems: 'center', justifyContent:'center'}}>               
                    <Logo />
                <Text style={{color:COLORS.primary, fontWeight:'bold',fontSize:18}}> Molo Airtime Recharge </Text>
                <Layout style={styles.inputBackground}>
                  <Select
                      style={styles.select}
                      placeholder='Select Network'
                      value={displayValue}
                      selectedIndex={selectedIndex}
                      onSelect={index => setSelectedIndex(index)}>
                      {NetworkData.map(renderOption)}
                      accessoryRight ={ActivityIcon}
                  </Select>
                   </Layout> 
                <Layout style={styles.inputBackground}>
                        <Input
                          value ={phone}
                          label ='Phone Number'
                          size  ='large'
                          accessoryRight ={PhoneIcon}
                          keyboardType="numeric"
                          placeholder='Phone number eg. 08140324567' 
                          onChangeText={nextValue => setAmount(nextValue)}
                          style ={{ width:'90%'}}
                      />
                   </Layout> 
                <Layout style={styles.inputBackground}>
                        <Input
                          value ={amount}
                          label ='Amount'
                          size  ='large'
                          accessoryRight ={card}
                          keyboardType="numeric"
                          placeholder='Recharge amount eg. 20000' 
                          onChangeText={nextValue => setAmount(nextValue)}
                          style ={{ width:'90%'}}
                      />
                   </Layout> 
                <Button onPress={()=>{alert('Recharge Successful')}} 
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

export default Airtime;

const styles = StyleSheet.create({
  select: {
    flex: 0.1,
    margin: 2,
    width:'90%'
  },
})
