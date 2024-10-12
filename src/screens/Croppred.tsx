import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Touchable, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Buttons from '../components/Buttons';
import axios from 'axios';
import Field from '../components/Field';


type RootStackParamList = {
    Dashboard: undefined;
    Login: undefined;
    Rainfallpred: undefined;
    Croppred: undefined;
    Yieldpred: undefined;
};

type CroppredProps = NativeStackScreenProps<RootStackParamList, 'Croppred'>;

const Croppred: React.FC<CroppredProps> = ({ navigation }) => {
    

    

    return (
        <View >
            
        </View>
    );
};

export default Croppred;

