import React, { useState } from 'react';
import {
    View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Install: react-native-image-picker
import fontfamillies from '../../styles/fontfamillies';


const CropPrediction: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<any>(null); // Stores selected image
    const [predictedLabel, setPredictedLabel] = useState<string | null>(null); // Predicted label
    const [confidence, setConfidence] = useState<number | null>(null); // Confidence score
    const [resultImageUrl, setResultImageUrl] = useState<string | null>(null); // URL of prediction plot
    const [loading, setLoading] = useState(false); // Loading state

    const pickImage = async () => {
        ImagePicker.launchImageLibrary(
            { mediaType: 'photo', quality: 1 },
            (response) => {
                if (response.didCancel) {
                    Alert.alert('Cancelled', 'Image selection was cancelled.');
                } else if (response.errorCode) {
                    Alert.alert('Error', `ImagePicker Error: ${response.errorMessage}`);
                } else if (response.assets && response.assets.length > 0) {
                    const image = response.assets[0];
                    setSelectedImage(image); // Save the selected image
                }
            }
        );
    };

    const predictCrop = async () => {
        if (!selectedImage) {
            Alert.alert('Error', 'Please select an image first.');
            return;
        }

        setLoading(true); // Start loading
        setPredictedLabel(null);
        setConfidence(null);
        setResultImageUrl(null);

        const formData = new FormData();
        formData.append('file', {
            uri: selectedImage.uri,
            name: selectedImage.fileName || 'image.jpg',
            type: selectedImage.type || 'image/jpeg',
        });

        try {
            const response = await fetch('http://192.168.29.6:5000/predict_crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to get prediction from the server.');
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            // Update state with results
            setPredictedLabel(result.predicted_label);
            setConfidence(result.confidence);
            setResultImageUrl(
                `http://192.168.29.6:5000/static/prediction_result.png?timestamp=${Date.now()}`
            ); // Force image refresh
        } catch (error) {
            Alert.alert('Error', `Failed to predict crop: ${error}`);
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Arial View Crop Prediction</Text>

            {/* Button to Select Image */}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>

            {/* Display Selected Image */}
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.selectedImage}
                />
            )}

            {/* Button to Predict */}
            <TouchableOpacity style={styles.button} onPress={predictCrop} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Predict</Text>
                )}
            </TouchableOpacity>

            {/* Prediction Results */}
            <View style={styles.resultContainer}>
                {predictedLabel && (
                    <>
                        <Text style={styles.label}>Predicted Crop:</Text>
                        <Text style={styles.result}>{predictedLabel}</Text>
                    </>
                )}
                {confidence !== null && (
                    <>
                        <Text style={styles.label}>Confidence:</Text>
                        <Text style={styles.result}>{(confidence * 100).toFixed(2)}%</Text>
                    </>
                )}
                {resultImageUrl ? (
                    <Image source={{ uri: resultImageUrl }} style={styles.resultImage} />
                ) : (
                    <Text style={styles.noImage}>No result image available.</Text>
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
        fontSize: 30,
        color: '#003300',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: fontfamillies.oleo,

    },
    selectedImage: {
        height: 200,
        width: '100%',
        marginTop: 20,
        borderRadius: 8,
    },
    resultContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    result: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    noImage: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
    resultImage: {
        height: 250,
        width: '100%',
        marginTop: 20,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#003300',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 50,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CropPrediction;
