import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Touchable, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';
import axios from 'axios';
import Field from '../components/Field';
import fontfamillies from '../../styles/fontfamillies';
import { Dropdown } from 'react-native-element-dropdown'; 
import Icon from 'react-native-vector-icons/FontAwesome5';


type RootStackParamList = {
    Dashboard: undefined;
    Login: undefined;
    Rainfallpred: undefined;
    Croppred: undefined;
    Yieldpred: undefined;
};

type YieldpredProps = NativeStackScreenProps<RootStackParamList, 'Yieldpred'>;

const Yieldpred: React.FC<YieldpredProps> = ({ navigation }) => {

    const [year, setYear] = useState('');
    const [place, setPlace] = useState<string | null>(null);
    const[crop,setCrop]=useState('');
    const[fertilizer,setFertilizer]=useState('');
    const[pesticide,setPesticide]=useState('');
    const[yieldPrediction,setYieldPrediction]=useState(null)
    const [loading, setLoading] = useState(false);

    const items = [
        { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
        { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
        { label: 'Assam', value: 'Assam' },
        { label: 'Bihar', value: 'Bihar' },
        { label: 'Chhattisgarh', value: 'Chhattisgarh' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Goa', value: 'Goa' },
        { label: 'Gujarat', value: 'Gujarat' },
        { label: 'Haryana', value: 'Haryana' },
        { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
        { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
        { label: 'Jharkhand', value: 'Jharkhand' },
        { label: 'Karnataka', value: 'Karnataka' },
        { label: 'Kerala', value: 'Kerala' },
        { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Manipur', value: 'Manipur' },
        { label: 'Meghalaya', value: 'Meghalaya' },
        { label: 'Mizoram', value: 'Mizoram' },
        { label: 'Nagaland', value: 'Nagaland' },
        { label: 'Odisha', value: 'Odisha' },
        { label: 'Punjab', value: 'Punjab' },
        { label: 'Puducherry', value: 'Puducherry' },
        { label: 'Sikkim', value: 'Sikkim' },
        { label: 'Tamil Nadu', value: 'Tamil Nadu' },
        { label: 'Telangana', value: 'Telangana' },
        { label: 'Tripura', value: 'Tripura' },
        { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
        { label: 'Uttarakhand', value: 'Uttarakhand' },
        { label: 'West Bengal', value: 'West Bengal' }

    ];
    const items1=[
        { label: 'Arecanut', value: 'Arecanut' },
        { label: 'Arhar/Tur', value: 'Arhar/Tur' },
        { label: 'Bajra', value: 'Bajra' },
        { label: 'Banana', value: 'Banana' },
        { label: 'Barley', value: 'Barley' },
        { label: 'Black pepper', value: 'Black pepper' },
        { label: 'Cardamom', value: 'Cardamom' },
        { label: 'Cashewnut', value: 'Cashewnut' },
        { label: 'Castor seed', value: 'Castor seed' },
        { label: 'Coconut ', value: 'Coconut ' },
        { label: 'Coriander', value: 'Coriander' },
        { label: 'Cotton(lint)', value: 'Cotton(lint)' },
        { label: 'Cowpea(Lobia)', value: 'Cowpea(Lobia)' },
        { label: 'Dry chillies', value: 'Dry chillies' },
        { label: 'Garlic', value: 'Garlic' },
        { label: 'Ginger', value: 'Ginger' },
        { label: 'Gram', value: 'Gram' },
        { label: 'Groundnut', value: 'Groundnut' },
        { label: 'Guar seed', value: 'Guar seed' },
        { label: 'Horse-gram', value: 'Horse-gram' },
        { label: 'Jowar', value: 'Jowar' },
        { label: 'Jute', value: 'Jute' },
        { label: 'Khesari', value: 'Khesari' },
        { label: 'Linseed', value: 'Linseed' },
        { label: 'Maize', value: 'Maize' },
        { label: 'Masoor', value: 'Masoor' },
        { label: 'Mesta', value: 'Mesta' },
        { label: 'Moong(Green Gram)', value: 'Moong(Green Gram)' },
        { label: 'Moth', value: 'Moth' },
        { label: 'Niger seed', value: 'Niger seed' },
        { label: 'Oilseeds total', value: 'Oilseeds total' },
        { label: 'Onion', value: 'Onion' },
        { label: 'Other Rabi pulses', value: 'Other Rabi pulses' },
        { label: 'Other Cereals', value: 'Other Cereals' },
        { label: 'Other Kharif pulses', value: 'Other Kharif pulses' },
        { label: 'Other Summer Pulses', value: 'Other Summer Pulses' },
        { label: 'Peas & beans (Pulses)', value: 'Peas & beans (Pulses)' },
        { label: 'Potato', value: 'Potato' },
        { label: 'Ragi', value: 'Ragi' },
        { label: 'Rapeseed & Mustard', value: 'Rapeseed & Mustard' },
        { label: 'Rice', value: 'Rice' },
        { label: 'Safflower', value: 'Safflower' },
        { label: 'Sannhamp', value: 'Sannhamp' },
        { label: 'Sesamum', value: 'Sesamum' },
        { label: 'Small millets', value: 'Small millets' },
        { label: 'Soyabean', value: 'Soyabean' },
        { label: 'Sugarcane', value: 'Sugarcane' },
        { label: 'Sunflower', value: 'Sunflower' },
        { label: 'Sweet potato', value: 'Sweet potato' },
        { label: 'Tapioca', value: 'Tapioca' },
        { label: 'Tobacco', value: 'Tobacco' },
        { label: 'Turmeric', value: 'Turmeric' },
        { label: 'Urad', value: 'Urad' },
        { label: 'Wheat', value: 'Wheat' },
        { label: 'other oilseeds', value: 'other oilseeds' }
    ];

    const handlePredict = async () => {
        setLoading(true);
        setYieldPrediction(null);


        try {
            // Replace with your Flask API URL
            const API_URL = 'https://opposite-leda-manisanthan-fb8be05b.koyeb.app/api/predict'; // For Android emulator
            // const API_URL = 'http://localhost:5000/api/predict'; // For iOS simulator
            // const API_URL = 'http://YOUR_LOCAL_IP:5000/api/predict'; // For physical devices

            const response = await axios.post(API_URL, {
                year: year,
                place: place,
                crop:crop,
                fertilizer:fertilizer,
                pesticide:pesticide,
            });

            setYieldPrediction(response.data.prediction);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to get prediction from the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/Yieldbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Yield Prediction</Text>

                    <View style={styles.inputContainer}>
                        <Icon name="calendar-alt" size={20} color="#666" />
                        <Field
                            placeholder="Enter the Year ( Ex : 2018 )"
                            keyboardType="phone-pad"
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="map-marker-alt" size={20} color="#666" />
                        <Dropdown
                            data={items}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a place"
                            value={place}
                            onChange={item => {
                                setPlace(item.value);
                            }}
                            search
                            searchPlaceholder="Search..."
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={styles.itemTextStyle}  // Added for dropdown item text style
                            containerStyle={styles.dropdownContainer}
                            inputSearchStyle={styles.inputSearchStyle}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="seedling" size={20} color="#666" />
                        <Dropdown
                            data={items1}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a crop"
                            value={crop}
                            onChange={item => {
                                setCrop(item.value);
                            }}
                            search
                            searchPlaceholder="Search..."
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={styles.itemTextStyle}  // Added for dropdown item text style
                            containerStyle={styles.dropdownContainer}
                            inputSearchStyle={styles.inputSearchStyle}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="spray-can" size={20} color="#666" />
                        <Field
                            placeholder="Amount Of Fertilizer Used"
                            keyboardType="phone-pad"
                            value={fertilizer}
                            onChangeText={setFertilizer}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="bug" size={20} color="#666" />
                        <Field
                            placeholder="Amount Of Pesticide Used"
                            keyboardType="phone-pad"
                            value={pesticide}
                            onChangeText={setPesticide}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Predicting...' : 'Predict'}</Text>
                    </TouchableOpacity>

                    {/* Display Prediction */}
                    {yieldPrediction !== null && (
                        <Text style={styles.predictionText}>
                            Predicted Yield : {yieldPrediction} tons/ha.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Yieldpred;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 30,
        borderRadius: 20,
    },
    headerText: {
        color: '#000',
        fontSize: 35,
        fontFamily: fontfamillies.oleo,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#A9A9A9',
        height: 55,
    },

    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 30,
        color: 'black',
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: '78.5%',
        marginLeft: -32,
        maxHeight: 250
    },
    dropdown: {
        backgroundColor: '#A9A9A9',
        borderColor: '#ccc',
        borderRadius: 30,
        height: 55,
        paddingHorizontal: 20,
        width: '100%',
        color: 'black'

    },
    itemTextStyle: {
        color: 'black',
        fontSize: 16,
    },
    placeholderStyle: {
        color: "#003300",
        fontSize: 17,
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 16,
    },
    inputSearchStyle: {
        backgroundColor: '#fafafa',
        borderRadius: 10,
        color: 'black'
    },
    button: {
        backgroundColor: '#003300',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 55,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 22,
        color: '#f0f0f0',
        fontWeight:'bold'
    },
    predictionText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});