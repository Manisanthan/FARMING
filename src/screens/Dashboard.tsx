import React,{useState} from 'react';
import { View, Text, Button, StyleSheet,Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';
import axios from 'axios';
import Field from '../components/Field';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


type RootStackParamList = {
    Dashboard: {uid:string};
    Login: undefined;
};

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC<DashboardProps> = ({ route,navigation }) => {
    const {uid}=route.params;
    const [year,setYear] = useState('');
    const [place,setPlace]= useState('');
    const [rainfallprediction, setRainfallPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        setLoading(true);
        setRainfallPrediction(null);
        

        try {
            // Replace with your Flask API URL
            const API_URL = 'http://192.168.87.147:5000/predict'; // For Android emulator
            // const API_URL = 'http://localhost:5000/predict'; // For iOS simulator
            // const API_URL = 'http://YOUR_LOCAL_IP:5000/predict'; // For physical devices

            const response = await axios.post(API_URL, {
                year:year,
                place:place,
            });

            const prediction = response.data.predicted_rainfall;
            setRainfallPrediction(prediction);

            const data = {
                Year: year,
                Place: place,
                RainfallPrediction: prediction // Save the actual predicted value
            };
            await firestore().collection('users').doc(uid).update({predictions:firestore.FieldValue.arrayUnion(data)});

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to get prediction from the server.');
        } finally {
            setLoading(false);
        }
    };


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
            <Text style={{ color: "black",marginBottom:10 }}>Flask API prediction:</Text>
            <Field
                placeholder="Enter the Year of prediction"
                keyboardType="phone-pad"
                value={year}
                marginBottom={15}
                onChangeText={setYear}
            />
            <Field
                placeholder="Enter the name of place for prediction"
                value={place}
                marginBottom={15}
                onChangeText={setPlace}
            />
            <View style={styles.buttons}>
                <Buttons  btnLabel="Get Prediction" onPressHandler={handlePredict}  />
            </View>
            <Text style={{marginTop:10,marginBottom:25,color:"black"}}> Predicted Rainfall : {rainfallprediction}</Text>
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
    buttons:{
        backgroundColor:"green",
        borderRadius:100
    },
});
