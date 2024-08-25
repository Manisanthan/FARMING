import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Dashboard: undefined;
    VerifyCode: { phoneNumber: string; confirmation: any };
};

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerifyingByEmail, setIsVerifyingByEmail] = useState(true);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            if (isVerifyingByEmail) {
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                const userData={
                    email: email,
                    username:username,
                    password:password,
                };
                await firestore().collection('users').doc(user.uid).set(userData);

                await user.sendEmailVerification();
                Alert.alert('Success', 'Account created. Please verify your email.');
                navigation.navigate('Login');
            } else {
                const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber;
                const user1 = {
                    username: username,
                    password: password,
                };
                await firestore().collection('users').add(user1);

                try {
                    const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
                    navigation.navigate('VerifyCode', { phoneNumber: formattedPhoneNumber, confirmation });
                } catch (error) {
                    Alert.alert('Error', 'Failed to sign in with phone number. Please try again.');
                }
            }



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
                    marginVertical: 220,
                    marginBottom:30,
                    
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

            {isVerifyingByEmail ? (
                <>
                    <Field
                        placeholder="Email-Id"
                        keyboardType="email-address"
                        marginBottom={1}
                        value={email}
                        onChangeText={setEmail}
                    />
                </>
            ) : (
                <>
                    <Field
                        placeholder="Mobile Number"
                        keyboardType="email-address"
                        marginBottom={1}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </>
            )}

            <Field
                placeholder="Username"
                margin={20}
                marginBottom={0}
                value={username}
                onChangeText={setUsername}
            />
            <Field
                placeholder="Create Password"
                secureTextEntry={true}
                margin={20}
                value={password}
                onChangeText={setPassword}
            />
            <Field
                placeholder="Confirm Password"
                secureTextEntry={true}
                margin={2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Buttons btnLabel="SignUp" marginTop={110} onPressHandler={handleSignUp} />
            <TouchableOpacity
                style={{ marginVertical: 5 }}
                onPress={() => setIsVerifyingByEmail(!isVerifyingByEmail)}
            >
                <Text style={{ color: '#003300', fontWeight: 'bold' }}>
                    {isVerifyingByEmail ? 'Use Mobile Number Instead' : 'Use Email Instead'}
                </Text>
            </TouchableOpacity>
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
