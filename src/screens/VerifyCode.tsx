import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Buttons from '../components/Buttons';

type VerifyCodeProps = NativeStackScreenProps<RootStackParamList, 'VerifyCode'>;

const VerifyCode: React.FC<VerifyCodeProps> = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const { phoneNumber, confirmation } = route.params;

    const handleVerifyCode = async () => {
        try {
            await confirmation.confirm(code);
            Alert.alert('Success', 'Phone number verified successfully!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Invalid code. Please try again.');
        }
    };

    return (
        <View style={{ padding: 30,marginLeft:5 }}>
            <Text style={{ fontSize: 24,marginTop:300, marginBottom: 20,color:"black",fontWeight:'bold' }}>
                Enter the Verification Code sent to {phoneNumber}
            </Text>
            <TextInput
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                placeholder="Enter the verification code"
                placeholderTextColor='#A9A9A9'
                style={{ paddingLeft: 5,borderBottomWidth: 1, marginBottom: 20, fontSize: 18,color: "black", fontWeight: 'bold' }}
            />
            <View style={{ paddingLeft: 50, marginTop: 10 }}>
                <Buttons btnLabel="Verify Code" onPressHandler={handleVerifyCode} />
            </View>
        </View>
    );
};

export default VerifyCode;
