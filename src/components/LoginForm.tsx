import React, { useState } from "react"
import { GestureResponderEvent, Text, TextInput, TouchableOpacity, View } from "react-native";
import { request } from "../helpers/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InternalAxiosRequestConfig } from "axios";
import { NavigationProp } from "@react-navigation/native";
import socket from "../socket";
import { styles } from "../styles/styles";

interface LoginFormProps {
    navigation: NavigationProp<any>;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
    const [userName, setUserName] = useState('')

    const handleSubmit = async (event: GestureResponderEvent) => {
        event.preventDefault();
        try {
            const { data } = await request.post('users/auth', { username: userName });

            if (data.success) {
                await AsyncStorage.setItem('user', JSON.stringify(data.data));

                type PromiseAxiosReq = Promise<InternalAxiosRequestConfig<any>>;

                request.interceptors.request.use((config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | PromiseAxiosReq => {
                    config.headers.Authorization = `Bearer ${data.data.token}`;

                    return config;
                })

                navigation.navigate('ChatForm');
                socket.emit('send new user', {
                    username: data.data.username,
                    _id: data.data.id,
                    unreadCount: 0,
                });
                socket.emit('join room', data.data.username);
                setUserName('');
            } else {
                alert('Falied to log in');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (name: string) => setUserName(name)

    return (
        <View style={styles.setLogInContainers}>
            <View
                style={styles.loginContainer}
            >
                <Text style={styles.titleText}>Chat App</Text>

                <TextInput
                    style={styles.loginInput}
                    placeholder="Username"
                    onChangeText={handleChange}
                    defaultValue={userName}
                />

                <TouchableOpacity style={styles.loginButton} onPressIn={handleSubmit}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginForm;

function alert(arg0: string) {
    throw new Error("Falied to log in");
}