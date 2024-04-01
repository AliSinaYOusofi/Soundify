import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

const AudioTypesDropdown = ({selectedAudioType, setSelectedAudioType}) => {

    const data = [
        { key: 'mp3', value: 'MP3' },
        { key: 'wav', value: 'WAV' },
        { key: 'aac', value: 'AAC' },
        { key: 'flac', value: 'FLAC' },
        { key: 'ogg', value: 'OGG' },
        { key: 'm4a', value: 'M4A' },
    ];
    

    return (
        <View style={styles.container}>
            <SelectList 
                setSelected={(val) => setSelectedAudioType(val)} 
                data={data} 
                save="value"
                placeholder='selecte audio type'
            />
        </View>
    );
};

export default AudioTypesDropdown;

const styles = StyleSheet.create( {
    container: {
        
        width: "50%"
    },
})