import React, { useCallback, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../domain/models/pages';
import { Feather } from '@expo/vector-icons';
import { User, List } from "../domain/models/api";
import { ScreenList } from "../domain/models/pages";
import axios from 'axios';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Perfil'>;
const baseUrl = 'https://api.github.com/users/';

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
    const [form, setForm] = useState<User>({
        name: '',
        login: '',
        avatar_url: ''
    });

    useEffect(() => {
        console.log(props.route.params.id);
        let id = props.route.params.id;
        axios.get(baseUrl + id)
            .then((res: any) => {
                var data = res.data;
                setForm({
                    login: data.login,
                    name: data.name,
                    avatar_url: data.avatar_url
                });
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [props, setForm]);

    const getList = (list: Array<any>, field: string) => {
        let arraylist: Array<List> = [];
        list.map((value) => {
            arraylist.push({ name: value[field] });
        })
        return arraylist;
    }

    const goHomeScreen = () => props.navigation.navigate('Tela de Pesquisa');
    const goListScreen = (lista: List[], title: string) => props.navigation.navigate('Lista', {
        list: lista,
        title: title
    });

    const getUrl = (type: string) => {
        switch (type) {
            case ScreenList.ORGS:
                return 'orgs';
            case ScreenList.REPOS:
                return 'repos';
            case ScreenList.SEGUIDORES:
                return 'followers';
            default:
                return '';
        }
    }
    const getAndGoListScreen = useCallback((data: string, title: string) => {
        const repos = getUrl(title);
        var field = title === ScreenList.REPOS ? 'name' : 'login';
        console.log(field);
        axios.get(baseUrl + data + '/' + repos)
            .then((res: any) => {
                var data = res.data;
                let lista = getList(data, field);
                goListScreen(lista, title);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [setForm]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <View style={[styles.photoBox, { flex: 8 }]}>
                    <Image source={{ uri: form.avatar_url }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={styles.vector}
                        onPress={goHomeScreen}
                    >
                        <Feather name="search" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { flex: 1, marginTop: 5 }]}>
                    <Text style={[styles.textName]}>
                        {form.name}
                    </Text>
                </View>
                <View style={[styles.row, { flex: 1, marginTop: 5 }]}>
                    <Text style={[styles.textNameDesc]}>
                        @{form.login}
                    </Text>
                </View>
            </View>
            <View style={styles.menuBox}>
                <TouchableOpacity
                    style={styles.menuRow}
                >
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather style={styles.menuIcon} name='user' size={20} color="black" />
                    </View>
                    <View style={[styles.column, { flex: 4 }]}>
                        <Text style={[styles.textMenu]}>Bio</Text>
                        <Text style={styles.textMenuDesc}>Um pouco sobre o usuário</Text>
                    </View>
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather name='chevron-right' size={20} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuRow}
                    onPress={() => getAndGoListScreen(form.login, ScreenList.ORGS)}
                >
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather style={styles.menuIcon} name="headphones" size={20} color="black" />
                    </View>
                    <View style={[styles.column, { flex: 4 }]}>
                        <Text style={[styles.textMenu]}>Orgs</Text>
                        <Text style={styles.textMenuDesc}>Organizações que o usuário faz parte</Text>
                    </View>
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather name='chevron-right' size={20} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuRow}
                    onPress={() => getAndGoListScreen(form.login, ScreenList.REPOS)}
                >
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather style={styles.menuIcon} name='file-text' size={20} color="black" />
                    </View>
                    <View style={[styles.column, { flex: 4 }]}>
                        <Text style={[styles.textMenu]}>Repositórios</Text>
                        <Text style={styles.textMenuDesc}>Lista contendo todos os repositórios</Text>
                    </View>
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather name='chevron-right' size={20} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuRow}
                    onPress={() => getAndGoListScreen(form.login, ScreenList.SEGUIDORES)}
                >
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather style={styles.menuIcon} name='smile' size={20} color="black" />
                    </View>
                    <View style={[styles.column, { flex: 4 }]}>
                        <Text style={[styles.textMenu]}>Seguidores</Text>
                        <Text style={styles.textMenuDesc}>Lista de seguidores</Text>
                    </View>
                    <View style={[styles.column, { flex: 1 }]}>
                        <Feather name='chevron-right' size={20} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.reset}>
                <TouchableOpacity
                    style={styles.btnReset}
                    onPress={goHomeScreen}
                >
                    <Feather name='log-out' size={20} color="black" />
                    <Text style={[styles.textMenu]}>Resetar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FC',
        justifyContent: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch',
    },
    menuRowDesc: {
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
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
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black",
    },
    textNameDesc: {
        fontSize: 16,
        color: "#808080",
    },
    textMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
    },
    textMenuDesc: {
        fontSize: 12,
        color: "#808080",
        fontWeight: 'normal',
    },
    profile: {
        flex: 0.5,
        margin: 5,
        alignItems: 'center',
    },
    menuIcon: {
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 5,
        padding: 3,
    },
    menuBox: {
        boxSizing: 'border-box',
        backgroundColor: 'white',
        flex: 0.6,
        borderRadius: 14,
        margin: 20,
    },
    menuRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 14,
        paddingLeft: 10,
    },
    btnReset: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 7,
    },
    reset: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        flex: 0.05,
        justifyContent: 'center',
    },
    vector: {
        position: 'absolute',
        left: '90%',
        bottom: '0%',
        backgroundColor: "black",
        borderRadius: 14,
        width: '30%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    image: {
        borderRadius: 47,
        width: 150,
        height: '100%'
    },
});

export default ProfileScreen;