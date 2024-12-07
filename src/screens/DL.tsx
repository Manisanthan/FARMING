import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Touchable, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';
import axios from 'axios';
import Field from '../components/Field';
import fontfamillies from '../../styles/fontfamillies';



type RootStackParamList = {
    Home: undefined;
    Land:undefined;
    Vgg16Model:undefined;
    DL:undefined;
    Dashboard: undefined;
    Login: undefined;
    Rainfallpred: undefined;
    Croppred: undefined;
    Yieldpred: undefined;
    ML: undefined;
};

type DLProps = NativeStackScreenProps<RootStackParamList, 'DL'>;

const DL: React.FC<DLProps> = ({ navigation }) => {

    const Vgg16Model = () => {
        navigation.navigate('Vgg16Model');
    };

    const LandClassification = () => {
        navigation.navigate('Land');
    };
    

    return (


        <View style={{ flex: 1 }}>
            {/* Custom Navbar */}
            <View style={styles.navbar}>
                <Text style={styles.navTitle}>AI-FARMING-DL</Text>
            </View>

            {/* Dashboard Content */}
            <View style={styles.container}>
                <TouchableOpacity onPress={Vgg16Model} style={styles.touchable}>
                    <ImageBackground source={require('../assets/DL2.jpg')} style={styles.imageBackground}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Arial View Crop Prediction</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={LandClassification} style={styles.touchable}>
                    <ImageBackground source={require('../assets/land.png')} style={styles.imageBackground}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Realtime Google Earth Engine Land Prediction</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>


            </View>
            
        </View>
    );
};

export default DL;

const styles = StyleSheet.create({
    navbar: {
        height: 70, // Adjust navbar height
        backgroundColor: '#003300',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        
    },
    navTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 2,
    },
    logoutButton: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
    logoutText: {
        color: '#003300',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10, // Adds padding around the container
    },
    touchable: {
        marginBottom: 20, // Gap between images
        borderRadius: 30, // Ensures the touchable area also has rounded corners
        overflow: 'hidden', // Ensures that overflow is hidden
    },
    imageBackground: {
        width: 390,
        height: 230,
        justifyContent: 'center',
        borderRadius: 30, // Ensure border radius is applied
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Padding for the text inside the box
    },
    text: {
        color: 'white',
        fontSize: 36,
        textAlign: 'center',
        fontFamily: fontfamillies.oleo,
    },
});