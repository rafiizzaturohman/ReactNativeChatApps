import React, { Fragment, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import ContactList from './ContactList'
import { useDispatch } from 'react-redux'
import { addMessage, receiverReadNotice, removeMessage, selectedReadNotice } from '../actions/chats';
import { dataJSON } from '../helpers/api';
import ChatBody from './ChatBody';
import socket from '../socket';
import { styles } from '../styles/styles';

const ChatForm = ({ navigation }) => {
    const dispatch = useDispatch()
    const [dataUsername, setDataUsername] = useState(null)
    const [chat, setChat] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        parseDataConnect()

        socket.on('connect', () => {
            socket.emit('join room', dataUsername?.username)
            setIsConnected(true);
        });

        socket.on('receive message', (data) => {
            dispatch(addMessage({ _id: data._id, message: data.message, date: data.date, sender: data.sender, receiver: data.receiver, readstatus: data.readstatus }, name))
        })

        socket.on('receive selected read notice', (id) => {
            dispatch(selectedReadNotice(id))
        })

        socket.on('receive receiver read notice', (id) => {
            dispatch(receiverReadNotice(id))
        })

        socket.on('receive new user', (data) => {
            dispatch(loadContact({ username: data.username, _id: data._id, unreadCount: data.unreadCount }))
        })

        socket.on('delete message', (id) => {
            dispatch(removeMessage(id))
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        console.log(isConnected);

        return () => {
            socket.off('connect');
            socket.off('receive message');
            socket.off('delete message');
            socket.off('receive notification')
            socket.off('disconnect');
        };
    }, [dispatch, name, isConnected]);

    const handleFormChat = (target) => {
        setChat(true)
        setName(target)
    }

    const parseDataConnect = async () => {
        const parseJsonData = await dataJSON()
        setDataUsername(parseJsonData)
    }

    return (
        <View style={styles.chatContainer}>
            {chat ?
                <ChatBody name={name} back={() => setChat(false)} message={message} setMessage={setMessage} />
                :
                <Fragment>
                    <Text style={styles.headerTextChat}>CONTACT</Text>

                    <ContactList
                        formChat={handleFormChat}
                        navigation={navigation} />
                </Fragment>
            }
        </View >
    )
}



export default ChatForm;