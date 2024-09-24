import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Dashboard: {uid:String};
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
                    p1 = userDoc.data().password;
                } else {
                    Alert.alert('Error', 'No user found with this username.');
                    return;
                }
            }
            if (email == null) {
                if (p1 == password) {
                    const user1=firestore().collection('users');
                    const query = await user1.where('username', '==', identifier).get();
                    const u1=query.docs[0];
                    navigation.navigate("Dashboard", { uid: u1.id });
                }
                else {
                    Alert.alert('Incorrect password.');
                    return;
                }
            }
            else {

                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                if (user.emailVerified) {
                    navigation.navigate("Dashboard",{ uid: user.uid});
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

    const ForgotPassword = async () => {
        if (!identifier) {
            Alert.alert('Error', 'Please enter your email or username.');
            return;
        }
        try {
            let email;
            if (identifier.includes('@')) {
                email = identifier;
            }
            else {
                const usersRef = firestore().collection('users');
                const querySnapshot = await usersRef.where('username', '==', identifier).get();

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    email = userDoc.data().email;
                } else {
                    Alert.alert('Error', 'No user found with this username.');
                    return;
                }
            }

            await auth().sendPasswordResetEmail(email);
            Alert.alert('Success', 'Password reset email sent! Check your inbox.');
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
            <View style={Styles.container}>
                <Icon name="user" size={23} color="#666" style={{ marginRight: 0 }} />
                <Field
                    placeholder="Email / Username"
                    keyboardType="email-address"
                    value={identifier}
                    onChangeText={setIdentifier}
                />
            </View>
            <View style={Styles.container1}>
                <Icon name="lock" size={23} color="#666" style={{ marginRight: 0 }} />
                <Field
                    placeholder="Password"
                    secureTextEntry={true}
                    margin={0}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View
                style={{
                    alignItems: 'flex-end',
                    width: '80%',
                    paddingRight: 16,
                    marginBottom: 220,
                }}
            >
                <TouchableOpacity onPress={ForgotPassword}>
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
                </TouchableOpacity>
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
const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 20,
        width: '80%',
        backgroundColor: '#A9A9A9',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 0,
        width: '80%',
        backgroundColor: '#A9A9A9',
    }
})

export default Login;
