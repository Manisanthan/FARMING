import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Dashboard: undefined;
    VerifyCode: { phoneNumber: string; confirmation: any };
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (isNaN(Number(emailOrPhone))) {
            try {
                const userCredential = await auth().signInWithEmailAndPassword(emailOrPhone, password);
                const user = userCredential.user;

                if (user.emailVerified) {
                    Alert.alert('Success', 'Logged in successfully!');
                    navigation.navigate('Dashboard');
                } else {
                    Alert.alert('Error', 'Please verify your email before logging in.');
                }
            } catch (error) {
                Alert.alert('Login Error', (error as Error).message);
            }
        } else {
            const formattedPhoneNumber = emailOrPhone.startsWith('+91') ? emailOrPhone : '+91' + emailOrPhone;

            try {
                const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
                navigation.navigate('VerifyCode', { phoneNumber: formattedPhoneNumber, confirmation });
            } catch (error) {
                Alert.alert('Error', 'Failed to sign in with phone number. Please try again.');
            }
        }
    };

    const signupNavigation = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <Text
                style={{
                    color: '#003300',
                    fontSize: 70,
                    fontWeight: 'bold',
                    marginVertical: 20,
                    marginTop: 230,
                }}
            >
                Login
            </Text>
            <Text style={{ color: '#333333', marginTop: 0, fontSize: 20, fontWeight: 'bold' }}>
                Login To Your Account
            </Text>
            <Field
                placeholder="Email / Mobile Number"
                keyboardType="email-address"
                margin={20}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
            />
            <Field
                placeholder="Password"
                secureTextEntry={true}
                margin={0}
                value={password}
                onChangeText={setPassword}
            />
            <View
                style={{
                    alignItems: 'flex-end',
                    width: '80%',
                    paddingRight: 16,
                    marginBottom: 220,
                }}
            >
                <Text
                    style={{
                        color: '#003300',
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginTop: 15,
                    }}
                >
                    Forgot password?
                </Text>
            </View>
            <Buttons btnLabel="Login" marginTop={15} onPressHandler={handleLogin} />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 15,
                }}
            >
                <Text style={{ color: 'black' }}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={signupNavigation}>
                    <Text style={{ color: '#003300', fontWeight: 'bold' }}>
                        SignUp
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
