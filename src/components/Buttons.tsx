import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface ButtonsProps {
    btnLabel: string;
    marginTop?: number;
    onPressHandler: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ btnLabel, marginTop, onPressHandler }) => {
    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={[styles.button, { marginTop }]}
        >
            <Text style={styles.text}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    );
};

export default Buttons;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#003300',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 60,
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
