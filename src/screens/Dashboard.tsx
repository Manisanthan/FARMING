import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';

type RootStackParamList = {
    Dashboard: undefined;
    Login: undefined;
};

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Login'); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Dashboard!</Text>
            <Text style={styles.subtitle}>You are successfully logged in.</Text>
            <Buttons btnLabel="Logout" onPressHandler={handleLogout} />
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
});
