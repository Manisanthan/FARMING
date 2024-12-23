import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Touchable, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';
import axios from 'axios';
import Field from '../components/Field';
import fontfamillies from '../../styles/fontfamillies';



type RootStackParamList = {
    Home:undefined;
    DL:undefined;
    ML:undefined;
    Dashboard: undefined;
    Login: undefined;
    Rainfallpred:undefined;
    Croppred:undefined;
    Yieldpred:undefined;
};

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    };

    const ML=()=>{
        navigation.navigate('ML');
    };

    const DL=()=>{
        navigation.navigate('DL');
    };

    return (
        
            
        <View style={{ flex: 1 }}>
            {/* Custom Navbar */}
            <View style={styles.navbar}>
                <Text style={styles.navTitle}>Dashboard</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Dashboard Content */}
            <View style={styles.container}>
                <TouchableOpacity onPress={ML} style={styles.touchable}>
                    <ImageBackground source={require('../assets/ML.jpeg')} style={styles.imageBackground}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Machine Learning Model</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={DL} style={styles.touchable}>
                    <ImageBackground source={require('../assets/DL3.jpg')} style={styles.imageBackground}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Deep Learning Model</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    navbar: {
        height: 70, // Adjust navbar height
        backgroundColor: '#003300',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    navTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft:2,
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