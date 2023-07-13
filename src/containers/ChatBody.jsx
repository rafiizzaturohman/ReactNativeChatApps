import React, { PureComponent, useEffect, useMemo, useRef } from "react"; ``
import {
    FlatList,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChat, loadChat, removeChat, resendChat } from "../actions/chats";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageContents from "../components/MessageContent";
import { styles } from "../styles/styles";

class MemorizedMessageContents extends PureComponent {
    render() {
        const { chat, id, receiver, sent, date, readstatus, deleteMessage, resendMessage } = this.props

        return (
            <MessageContents
                chat={chat}
                id={id}
                receiver={receiver}
                sent={sent}
                date={date}
                readstatus={readstatus}
                delete={deleteMessage}
                resend={resendMessage}
            />
        );
    };
};

const ChatBody = (props) => {
    const dispatch = useDispatch()
    const messagesListRef = useRef(null)
    const selected = useSelector((state) => state.chats.selectedChat)

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

    const chatRender = useMemo(() => {
        return ({ item }) => (
            <MemorizedMessageContents
                chat={item.message}
                id={item.sender}
                receiver={item.receiver}
                sent={item.sent}
                date={item.date}
                readstatus={item.readstatus}
                deleteMessage={() => dispatch(removeChat(item._id, props.name))}
                resendMessage={() => resendMessage(item._id, item.message, props.name)}
            />
        )
    }, [dispatch, props.name])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "android" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "android" ? -212 : 10}
            enabled={Platform.OS === "android" ? true : false}
            style={styles.chatContainer}
        >
            <View style={styles.chatTopBar}>
                <TouchableOpacity onPress={props.back} style={{ marginLeft: 18, marginRight: 16 }}>
                    <Icon name="arrow-left" size={20} color='white' />
                </TouchableOpacity>

                <Text style={styles.receiverName}>
                    {props.name}
                </Text>
            </View>

            <View style={styles.messageContent}>
                <FlatList
                    ref={messagesListRef}
                    data={selected}
                    renderItem={chatRender}
                    keyExtractor={(item) => item._id}
                    onEndReachedThreshold={0.5}
                    onContentSizeChange={() => messagesListRef.current.scrollToEnd({ animated: true })}
                    style={{ maxHeight: 880 }}
                />
            </View>

            <View style={styles.messageInputContainer}>
                <TextInput onChangeText={message => props.setMessage(message)} placeholder="Write a message here" defaultValue={props.message}
                    style={styles.messageInputField} />

                <TouchableOpacity onPress={submitChat} style={styles.messageSend}>
                    <Icon name="send" size={25} color='white' style={{ borderWidth: 0 }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatBody;