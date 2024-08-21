import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

// Define the props for the Field component
interface FieldProps extends TextInputProps {
    margin?: number;
    marginBottom?: number;
}

const Field: React.FC<FieldProps> = ({ margin, marginBottom, ...props }) => {
    return (
        <TextInput
            {...props}
            style={{
                borderRadius: 100,
                color: 'darkGreen',
                paddingHorizontal: 20,
                width: '80%',
                backgroundColor: '#A9A9A9',
                marginVertical: margin,
                marginBottom: marginBottom,
            }}
            placeholderTextColor="#003300"
        />
    );
};

export default Field;
