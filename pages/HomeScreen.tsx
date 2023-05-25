import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../domain/models/pages';
import { Feather } from '@expo/vector-icons';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Tela de Pesquisa'>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
    const [id, setId] = useState<string>('');
    const handlerId = useCallback((data: string) => {
        setId(data);
    }, [setId]);

    const goProfileScreen = () => props.navigation.navigate('Perfil', {id});

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.row]}>
                <TextInput
                    style={styles.input}
                    onChangeText={handlerId}
                    value={id}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={goProfileScreen}
                >
                    <Feather name="search" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        padding: 5,
    },
    button: {
        backgroundColor: "#22252D",
        borderRadius: 10,
        margin: 6,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 28,
        color: "black",
    },
    input: {
        width: '95%',
        height: 40,
        margin: 6,
        borderWidth: 1,
        padding: 10,
        borderRadius: 14,
    },
});

export default HomeScreen;