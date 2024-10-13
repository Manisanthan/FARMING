import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    const [userId,setUserId]=useState('');

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
                setUserId(user.uid);
                await firestore().collection('users').doc(user.uid).set(userData);

                await user.sendEmailVerification();
                Alert.alert('Success', 'Account created. Please verify your email.');
                navigation.navigate('Login');
            } else {
                const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber;
                const user1 = {
                    phoneNumber:phoneNumber,
                    username: username,
                    password: password,
                };
                await firestore().collection('users').doc(userId).set(user1);

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>

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
                <View style={styles.container1}>
                    <Icon name="envelope" size={23} color="#666" style={{ marginRight: 0 }} />
                    <Field
                        placeholder="Email-Id"
                        keyboardType="email-address"
                        marginBottom={1}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                </>
            ) : (
                <>
                <View style={styles.container1}>
                    <Icon name="phone-alt" size={23} color="#666" style={{ marginRight: 0 }} />
                    <Field
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        marginBottom={1}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                </>
            )}
            <View style={styles.container1}>
                <Icon name="user" size={23} color="#666" style={{ marginRight: 0 }} />
            <Field
                placeholder="Username"
                marginBottom={0}
                value={username}
                onChangeText={setUsername}
            />
            </View>
            <View style={styles.container1}>
                <Icon name="lock" size={23} color="#666" style={{ marginRight: 0 }} />
            <Field
                placeholder="Create Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            </View>
            <View style={styles.container1}>
                <Icon name="lock" size={23} color="#666" style={{ marginRight: 0 }} />
            <Field
                placeholder="Confirm Password"
                secureTextEntry={true}
                margin={2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            </View>
            <Buttons btnLabel="SignUp" marginTop={100} onPressHandler={handleSignUp} />
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
        </ScrollView>
    );
};
const styles=StyleSheet.create({
    container1:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 8,
        width: '80%',
        backgroundColor: '#A9A9A9',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default SignUp;
