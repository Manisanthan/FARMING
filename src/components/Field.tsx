import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface FieldProps extends TextInputProps {
    margin?: number;
    marginBottom?: number;
}

const Field: React.FC<FieldProps> = ({ margin, marginBottom, ...props }) => {
    return (
        <TextInput
            {...props}
            style={{
                fontSize:16,
                color:"black",
                borderRadius: 100,
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
