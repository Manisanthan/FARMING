import React, { ReactNode } from 'react';
import { View, ImageBackground } from 'react-native';

interface BackgroundProps {
    children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    return (
        <View>
            <ImageBackground
                source={require('../assets/bgImg.jpg')}
                style={{ height: '100%' }}
            />
            <View style={{ position: 'absolute', flex: 1, height: '100%', width: '100%' }}>
                {children}
            </View>
        </View>
    );
};

export default Background;
