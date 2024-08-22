import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
};

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await user.sendEmailVerification();

            // Sign up with phone number (requires verification)
            // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            // You need to verify the phone number with the code sent to the user.
            // Here you would typically show a modal or navigate to another screen to enter the verification code.

            Alert.alert('Success', 'Account created. Please verify your email.');
            navigation.navigate('Login');
        } catch (error) {
            console.error((error as Error).message);
            Alert.alert('Error', (error as Error).message);
        }
    };

    const loginNavigation = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <Text
                style={{
                    color: '#003300',
                    fontSize: 70,
                    fontWeight: 'bold',
                    marginVertical: 50,
                }}
            >
                SignUp
            </Text>
            <Text
                style={{
                    color: '#333333',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 30,
                }}
            >
                SignUp To Create Your Account
            </Text>
            <Field
                placeholder="Email / Username"
                keyboardType="email-address"
                marginBottom={25}
                value={email}
                onChangeText={setEmail}
            />
            <Field
                placeholder="Mobile Number"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Field
                placeholder="Create Password"
                secureTextEntry={true}
                margin={25}
                value={password}
                onChangeText={setPassword}
            />
            <Field
                placeholder="Confirm Password"
                secureTextEntry={true}
                margin={0}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <View
                style={{
                    alignItems: 'flex-end',
                    width: '80%',
                    paddingRight: 16,
                    marginBottom: 120,
                }}
            />
            <Buttons btnLabel="SignUp" onPressHandler={handleSignUp} />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
            >
                <Text style={{ color: 'black' }}>Already have an account?{' '}</Text>
                <TouchableOpacity onPress={loginNavigation}>
                    <Text style={{ color: '#003300', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUp;
