import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

export const request: AxiosInstance = axios.create({
    baseURL: 'http://192.168.144.11:3000/'
});

request.interceptors.request.use(async (config) => {
    config.headers.Authorization = await parseJSON();

    return config;
});

async function parseJSON(): Promise<string | null> {
    try {
        const asyncData: string | null = await AsyncStorage.getItem('user');
        const data = JSON.parse(asyncData || '');

        if (data && data?.token) {
            return 'Bearer ' + data?.token;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function dataJSON(): Promise<any> {
    try {
        const asyncData: string | null = await AsyncStorage.getItem('user');
        const data = JSON.parse(asyncData || '');

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

