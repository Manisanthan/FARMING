import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Dashboard: undefined;
    VerifyCode: { phoneNumber: string; confirmation: any };
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            let email;
            let p1;

            if (identifier.includes('@')) {
                email = identifier;
            } else {
                const usersRef = firestore().collection('users');
                const querySnapshot = await usersRef.where('username', '==', identifier).get();

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    email = userDoc.data().email;
                    p1=userDoc.data().password;
                    console.log(p1);
                    console.log(password);
                } else {
                    Alert.alert('Error', 'No user found with this username.');
                    return;
                }
            }
            if(email==null){
                if (p1 == password) {
                    navigation.navigate("Dashboard");
                }
                else{
                    Alert.alert('Incorrect password.');
                    return;
                }
            }
            else{

            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            if(user.emailVerified){
                navigation.navigate("Dashboard");
            }
            else {
                Alert.alert('Incorrect Email / password.');
                return;
            }
            
        }
            
        } catch (error) {
            console.error((error as Error).message);
            Alert.alert('Error', (error as Error).message);
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
                placeholder="Email / Username"
                keyboardType="email-address"
                margin={20}
                value={identifier}
                onChangeText={setIdentifier}
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
