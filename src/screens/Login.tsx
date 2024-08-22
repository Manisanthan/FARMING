import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Dashboard: undefined; // Assuming you have a Dashboard screen
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
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
                    marginVertical: 50,
                }}
            >
                Login
            </Text>
            <Text style={{ color: '#333333', fontSize: 20, fontWeight: 'bold' }}>
                Login To Your Account
            </Text>
            <Field
                placeholder="Email / Username"
                keyboardType="email-address"
                margin={25}
                value={email}
                onChangeText={setEmail}
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
                    marginBottom: 230,
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
                    Forgot password ?
                </Text>
            </View>
            <Buttons btnLabel="Login" onPressHandler={handleLogin} />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 5,
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
