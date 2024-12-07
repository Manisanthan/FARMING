import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import fontfamillies from '../../styles/fontfamillies';
import Field from '../components/Field';



const Land: React.FC = () => {
    const [filePath, setFilePath] = useState<string>('');
    const [groundTruthLabel, setGroundTruthLabel] = useState<string | null>(null);
    const [predictedLabel, setPredictedLabel] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const predictLand = async () => {
        if (!filePath) {
            Alert.alert('Error', 'Please provide a file path.');
            return;
        }

        // Reset previous results before making the new prediction
        setLoading(true);
        setGroundTruthLabel(null);
        setPredictedLabel(null);
        setImageUrl(null);

        const url = 'http://192.168.40.147:5000/predict_land'; // Replace with your server URL

        try {
            const response = await axios.post(
                url,
                { filename: filePath }
            );

            if (response.status === 200) {
                const result = response.data;
                setGroundTruthLabel(result.ground_truth);
                setPredictedLabel(result.predicted_class);
                // Append a timestamp to force image refresh
                setImageUrl(
                    `http://192.168.40.147:5000/static2/Land_prediction_result.png`
                );
            } else {
                Alert.alert('Error', `Server error: ${response.data}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch prediction.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Realtime Google Earth Engine Land Prediction</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter File Path"
                placeholderTextColor="#888"
                value={filePath}
                onChangeText={setFilePath}
            />
            <TouchableOpacity style={styles.button} onPress={predictLand} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Predicting...' : 'Predict'}</Text>
            </TouchableOpacity>
            <View style={styles.resultContainer}>
                {groundTruthLabel && (
                    <>
                        <Text style={styles.label}>Ground Truth:</Text>
                        <Text style={styles.result}>{groundTruthLabel}</Text>
                    </>
                )}
                {predictedLabel && (
                    <>
                        <Text style={styles.label}>Predicted Label:</Text>
                        <Text style={styles.result}>{predictedLabel}</Text>
                    </>
                )}
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <Text style={styles.noImage}>No prediction image available.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 40,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: fontfamillies.oleo,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 0,
        color: "black",
    },
    resultContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    result: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    noImage: {
        fontSize: 18,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
    image: {
        height: 250,
        width: '100%',
        marginTop: 20,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#003300',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 55,
        marginTop: 20,
        marginLeft: 35,
    },
    buttonText: {
        fontSize: 22,
        color: '#f0f0f0',
        fontWeight: 'bold'
    },
});

export default Land;
