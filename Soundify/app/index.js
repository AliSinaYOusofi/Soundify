import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ToastAndroid, Modal, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import BaseSelectButton from '../components/global/BaseSelectButton';
import AudioTypesDropdown from '../components/global/AudioTypesDropdown';
import { Feather } from '@expo/vector-icons';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';

export default function Page() {
    const [selectedAudioType, setSelectedAudioType] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isConverting, setIsConverting] = useState(false);

    const handlePickDocument = async () => {
        let pickedDocument = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
        setSelectedVideo(pickedDocument);
    };

    const handleConvert = async () => {
        if (!selectedVideo || !selectedAudioType) {
            ToastAndroid.show('Please select a file and a format', ToastAndroid.LONG);
            return;
        }
        if (selectedVideo.assets === null) {
            ToastAndroid.show('Please select a video file', ToastAndroid.LONG);
            return;
        }

        if (!selectedVideo.assets[0].mimeType.startsWith('video/')) {
            ToastAndroid.show('Please select a video file', ToastAndroid.LONG);
            return;
        }

        const uri = selectedVideo.assets[0].uri;

        // Show progress modal
        setIsConverting(true);

        try {
            await FFmpegKitConfig.init();
            let resultOfConversion = await FFmpegKit.executeAsync(`ffmepg -i ${uri} -vn -acodec ${selectedAudioType} output.${selectedAudioType}`);
            console.log(resultOfConversion);
            if (ReturnCode.isSuccess(resultOfConversion.returnCode)) {
                // Conversion successful
                ToastAndroid.show('Conversion successful', ToastAndroid.LONG);

                // Copy the converted file to a new location
                const destinationUri = `${FileSystem.documentDirectory}output.${selectedAudioType}`;
                await FileSystem.copyAsync({ from: uri, to: destinationUri });

                // Close progress modal
                setIsConverting(false);
            } else {
                // Conversion failed
                ToastAndroid.show('Conversion failed', ToastAndroid.LONG);
                setIsConverting(false);
            }
        } catch (e) {
            // Exception handling
            ToastAndroid.show(e.message, ToastAndroid.LONG);
            console.log('Error occurred:', e);
            setIsConverting(false);
        }
    };

    useEffect(() => {
        const initFFmpegKit = async () => {
            try {
                await FFmpegKitConfig.init();
                console.log('FFmpegKit initialized');
            } catch (e) {
                console.error('Failed to initialize FFmpegKit:', e);
            }
        };
    
        initFFmpegKit();
    }, []);
    

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={isConverting}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="black" />
                        <Text>Converting...</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});
