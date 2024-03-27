import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';


export default function Page() {

    const handleVidePick = async () => {
        try {

            const file = await DocumentPicker.getDocumentAsync({type: "video/*"})
        } catch (error) {
            console.error(error)
        }
    }

    return (
       <View>
            <Pressable onPress={handleVidePick}>
               <Text> Slect file</Text>
            </Pressable>
            
       </View>
    )
}


const styles = StyleSheet.create({
    bottomBanner: {
      position: "absolute",
      bottom: 0
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
});