import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function BaseSelectButton({onPress, title = "Save", icon}) {
    
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
            {icon}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        width: '50%',
        flexDirection: 'row',
        columnGap: 10
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
