import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadContact, removeNotification } from '../actions/contacts';
import { selectedChat } from '../actions/chats';
import { request } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ContactItem from '../components/ContactItem';
import { styles } from '../styles/styles';

const ContactList = ({ formChat, navigation }) => {
    const contacts = useSelector((state) => state.contacts.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadContact());
    }, [dispatch]);

    const handleContactSelect = (target, _id) => {
        formChat(target);
        dispatch(selectedChat({ target, _id }));
        dispatch(removeNotification(_id))
    }

    const handleLogOut = async () => {
        try {
            await request.get('users/signout');
            await AsyncStorage.removeItem('users');

            request.interceptors.request.use(function (config) {
                config.headers.Authorization = null

                return config;
            })
            navigation.navigate('LoginForm')
        } catch (e) {
            console.log(e)
        }
    }

    const ContactRender = ({ item, index }) => {
        const isOdd = index % 2 === 0;

        return (
            <View style={[style.item, isOdd && style.oddItem]}>
                <ContactItem
                    key={item.id}
                    id={item.id}
                    count={item.unreadCount}
                    contact={item.username}
                    set={() => handleContactSelect(item.username, item._id)}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={contacts}
                renderItem={ContactRender}
                keyExtractor={(item) => item._id}
                onEndReachedThreshold={0.5}
            />

            <View style={styles.buttonPosition}>
                <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default ContactList;

const style = StyleSheet.create({
    item: {
        backgroundColor: '#f8fafc',
        color: 'black',
        paddingVertical: 20,
        paddingHorizontal: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        letterSpacing: 0.5
    },
    oddItem: {
        backgroundColor: '#f0fdfa',
    },
})