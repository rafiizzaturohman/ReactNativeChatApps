import React, { PureComponent, useEffect, useMemo, useRef } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChat, loadChat, resendChat } from "../actions/chats";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageContent from "../components/MessageContent";

class MessageContents extends PureComponent {
    render() {
        const {
            chat, id, receiver, sent, date, readstatus, deleteMessage, resendMessage
        } = this.props

        return (
            <MessageContent
                chat={chat}
                id={id}
                receiver={receiver}
                sent={sent}
                date={date}
                readstatus={readstatus}
                deleteMessage={deleteMessage}
                resendMessage={resendMessage}
            />
        );
    };
};

const ChatBody = (props) => {
    const selected = useSelector((state) => state.chats.selectedChat)
    const dispatch = useDispatch()
    const messagesListRef = useRef(null)

    useEffect(() => {
        dispatch(loadChat())
    }, [dispatch])

    const submitChat = () => {
        dispatch(addChat(props.message, props.name))
        props.setMessage('')
    }

    const resendMessage = (_id, message, name) => {
        dispatch(resendChat(_id, message, name))
        props.setMessage('')
    }

    const renderItem = useMemo(() => {
        return ({ item }) => {
            <MessageContents
                chat={item.message}
                id={item.sender}
                receiver={item.receiver}
                sent={item.sent}
                date={item.date}
                readstatus={item.readstatus}
                deleteMessage={() => dispatch(removeChat(item._id, props.name))}
                resendMessage={() => resendMessage(item._id, item.message, props.name)}
            />
        }
    }, [dispatch, props.name])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "android" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "android" ? 0 : 25}
            enabled={Platform.OS === "android" ? true : false}
            style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
            }}
        >
            <View style={{ flexDirection: 'row', backgroundColor: '#317873', alignItems: 'center' }}>
                <TouchableOpacity onPress={props.back} style={{ marginHorizontal: 18 }}>
                    <Icon name="arrow-left" size={35} color='white' />
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                    {props.name}
                </Text>
            </View>

            <View style={{
                flex: 1,
                padding: 16,
                marginBottom: 70
            }}>
                <FlatList
                    ref={messagesListRef}
                    data={selected}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    onEndReachedThreshold={0.5}
                    onContentSizeChange={() => messagesListRef.current.scrollToEnd({ animated: false })}
                />
            </View>

            <View style={{
                borderTopWidth: 0.5,
                backgroundColor: '#e2e8f0',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
            }}>
                <TextInput onChangeText={message => props.setMessage(message)} placeholder="Write a message here" defaultValue={props.message}
                    style={{
                        flex: 1,
                        marginRight: 8,
                        paddingHorizontal: 20,
                        paddingVertical: 11,
                        backgroundColor: '#fff',
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: '#ddd',
                    }} />

                <TouchableOpacity onPress={submitChat} style={{
                    borderRadius: 30,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#00A693",
                    height: 50
                }}>
                    <Icon name="rocket" size={30} color='black' />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatBody;

const style = StyleSheet.create({

})