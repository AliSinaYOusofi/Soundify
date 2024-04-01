import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ToastAndroid } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import BaseSelectButton from '../components/global/BaseSelectButton';
import AudioTypesDropdown from '../components/global/AudioTypesDropdown';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export default function Page() {

    const [selectedAudioType, setSelectedAudioType] = useState(null)
    const [selectedVideo, setSelectedVideoType] = useState(null)

    const handlePickDocument = async () => {
        let pickedDocument = await DocumentPicker.getDocumentAsync({ type: 'video/*' })
        setSelectedVideoType(pickedDocument)
        console.log(pickedDocument)
        
    }
    
    const handleConvert = () => {
        if ( ! selectedVideo || ! selectedAudioType) {
            ToastAndroid.show('Please select a file and a format', ToastAndroid.LONG)
            return
        }
        if (selectedVideo.assets === null) {
            ToastAndroid.show('Please select a video file', ToastAndroid.LONG)
            return
        }

        if (!selectedVideo.assets[0].mimeType.startsWith('video/')) {
            ToastAndroid.show('Please select a video file', ToastAndroid.LONG)
            return
        } 
        // starting conversion()
        const uri = selectedVideo.assets[0].uri;
        const videoName = selectedVideo.assets[0].name;

        FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        }).then((fileBase64) => {
            console.log(fileBase64);
            ToastAndroid.show('Conversion completed!', ToastAndroid.LONG);
        }).catch((error) => {
            console.error(error);
            ToastAndroid.show('Error converting file', ToastAndroid.LONG);
        });
    }

    return (
        <View style={styles.container}>
            <BaseSelectButton 
                onPress={handlePickDocument} 
                title={"Select file"}
                icon={<Feather name="file-plus" size={24} color="white" />}
            />
            <AudioTypesDropdown 
                selectedAudioType={selectedAudioType} 
                setSelectedAudioType={setSelectedAudioType}
                
            />
            <BaseSelectButton 
                onPress={handleConvert} 
                title={"Convert"}
                icon={<Feather name="refresh-ccw" size={24} color="white" />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 10
    },
  });