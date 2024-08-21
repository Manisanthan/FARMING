import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Field from '../components/Field';
import Buttons from '../components/Buttons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
};

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
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
            />
            <Field placeholder="Mobile Number" keyboardType="number-pad" />

            <Field placeholder="Create Password" secureTextEntry={true} margin={25} />

            <Field placeholder="Confirm Password" secureTextEntry={true} margin={0} />
            <View
                style={{
                    alignItems: 'flex-end',
                    width: '80%',
                    paddingRight: 16,
                    marginBottom: 120,
                }}
            />
            <Buttons
                btnLabel="SignUp"
                onPressHandler={() =>
                    Alert.alert(
                        'Successfully created account. Go to Login screen to Login in to your account.'
                    )
                }
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
            >
                <Text style={{ color: 'black' }}>
                    Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={loginNavigation}>
                    <Text style={{ color: '#003300', fontWeight: 'bold' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUp;
