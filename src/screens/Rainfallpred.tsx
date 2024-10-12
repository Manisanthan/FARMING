import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Field from '../components/Field';
import fontfamillies from '../../styles/fontfamillies';
import { Dropdown } from 'react-native-element-dropdown';  // Importing Dropdown

const Rainfallpred: React.FC = () => {
    const [year, setYear] = useState('');
    const [place, setPlace] = useState<string | null>(null);
    const [rainfallPrediction, setRainfallPrediction] = useState<number | null>(null);
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

    const handlePredict = async () => {
        setLoading(true);
        setRainfallPrediction(null);

        try {
            const API_URL = 'http://192.168.29.6:5000/api/predict'; // Replace with your Flask API URL
            const response = await axios.post(API_URL, {
                year: year,
                place: place,
            });

            setRainfallPrediction(response.data.prediction);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to get prediction from the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/rainfallbackground.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Rainfall Prediction</Text>

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

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Predicting...' : 'Predict'}</Text>
                    </TouchableOpacity>

                    {/* Display Prediction */}
                    {rainfallPrediction !== null && (
                        <Text style={styles.predictionText}>
                            Predicted Rainfall: {rainfallPrediction} mm.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Rainfallpred;

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
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
        paddingHorizontal:15,
        paddingVertical:15,
        width:'78.5%',
        marginLeft:-32,
        maxHeight:250
    },
    dropdown: {
        backgroundColor: '#A9A9A9',
        borderColor: '#ccc',
        borderRadius: 30,
        height: 55,
        paddingHorizontal: 20,
        width: '100%',
        color:'black'
        
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
        color:'black'
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
        fontWeight: 'bold'
    },
    predictionText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});