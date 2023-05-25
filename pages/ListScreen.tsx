import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../domain/models/pages';
import { Feather } from '@expo/vector-icons';
import { List } from "../domain/models/api";
import { ScreenList } from "../domain/models/pages";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Lista'>;

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
    const [list, setList] = useState<List[]>([]);
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        setList([...props.route.params.list]);
        setTitle(props.route.params.title);
    }, []);

    const goProfileScreen = (id: string) => {
        props.navigation.navigate('Perfil', {id})
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTitle}>{title}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.menuBox}><>
                    {
                        list.map((value, index) =>
                            <TouchableOpacity
                                style={styles.menuRow}
                                onPress={() => { if(title == ScreenList.SEGUIDORES){goProfileScreen(value.name)}} }
                                key={index}
                            >
                                <View style={[styles.column, { flex: 9 }]}>
                                    <Text style={styles.text}>{value.name}</Text>
                                </View>
                                <View style={[styles.column, { flex: 1 }]}>
                                    <Feather name='chevron-right' size={20} color="black" />
                                </View>
                            </TouchableOpacity>)
                    }</>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        padding: 2,
        alignItems: 'flex-start',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
    },
    text: {
        fontSize: 16,
        color: "black",
    },
    textTitle: {
        fontSize: 20,
        color: "black",
        padding: 10,
    },
    menuBox: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 14,
    },
    menuRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 14,
        padding: 5,
        marginBottom: 5,
    },
});

export default ProfileScreen;