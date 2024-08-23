import React from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import Buttons from '../components/Buttons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const loginNavigation = () => {
        navigation.navigate('Login');
    };

    const signupNavigation = () => {
        navigation.navigate('SignUp');
    };

    return (
        <Background>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 260,
                    height: '100%',
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        color: '#CEFD45',
                        fontSize: 50,
                        fontWeight: 'bold',
                        marginTop: 80,
                    }}
                >
                    AI FARMING
                </Text>
                <Text style={{ color: '#CEFD45', fontSize: 14, fontWeight: '400' }}>
                    Innovate Your Farm with AI Solutions.
                </Text>

                <Buttons
                    btnLabel="SIGNUP"
                    marginTop={290}
                    onPressHandler={signupNavigation}
                />
                <Buttons
                    btnLabel="LOGIN"
                    marginTop={20}
                    onPressHandler={loginNavigation}
                />
            </View>
        </Background>
    );
};

export default Home;
