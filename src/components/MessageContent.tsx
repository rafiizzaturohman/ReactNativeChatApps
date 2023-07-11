import React, { useEffect, useState } from "react";
import { dataJSON } from "../helpers/api";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MessageContentProps {
    sent: boolean;
    id: string;
    chat: string;
    date: string;
    readstatus?: boolean;
    delete(): void;
    resend(): void;
    receiver: string;
}

const MessageContent: React.FC<MessageContentProps> = (props) => {
    const [data, setData] = useState<{ id: string, sender: string } | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function parseDATA() {
            const parseJsonData = await dataJSON();
            setData(parseJsonData);
        }
        parseDATA();
    });

    const deleteMessage = () => {
        props.delete();
        setShowModal(false)
    };

    const resendMessage = () => {
        props.resend();
    };

    if (props.sent === true && props.id === data?.id) {
        return (
            <TouchableNativeFeedback onLongPress={() => setShowModal(true)}>
                <View style={{
                    marginVertical: 8,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                }}>
                    <View>
                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'right',
                        }}>{props.chat}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        {props.readstatus === true ? (
                            <Icon name="check" size={20} color="black" />
                        ) : (
                            <Icon name="check" size={20} color="white" />
                        )}

                        <Text style={{ marginLeft: 6 }}>{props.date}</Text>
                    </View>

                    <Modal visible={showModal}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 40,
                        }}>
                            <View style={{
                                backgroundColor: '#BACDDB',
                                height: '20%',
                                borderRadius: 10,
                                borderWidth: 1
                            }}>
                                <View style={{
                                    height: '100%',
                                    width: '100%',
                                    paddingVertical: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: 'black',
                                        fontSize: 20
                                    }}>Are you sure want to delete this?  chat?</Text>

                                    <View style={styles.ModalButton}>
                                        <TouchableOpacity style={{
                                            height: 40,
                                            width: '18%',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#be123c',
                                            marginVertical: 8,
                                            marginHorizontal: 5
                                        }} onPress={deleteMessage}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: 18,
                                            }}>Delete</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            height: 40,
                                            width: '18%',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#0f766e',
                                            marginVertical: 8,
                                            marginHorizontal: 5
                                        }} onPress={() => setShowModal(false)}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: 16,
                                            }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableNativeFeedback>
        )
    } else if (props.sent === false && data?.sender === data?.id) {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={resendMessage}>
                        <Icon name="arrow-circle-right" size={20} color="#cbd5e1" />

                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'right'
                        }}>{props.chat}</Text>

                        <View>
                            <Icon name="time" size={20} />

                            <Text>{props.date}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            data?.sender === props.receiver ?
                <View style={{
                    marginVertical: 8,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                }}>
                    <View>
                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'left'
                        }}>{props.chat}</Text>

                        <View>
                            <Text style={{ textAlign: 'right' }}>{props.date}</Text>
                        </View>
                    </View>
                </View>
                :
                null
        )
    }
};

export default MessageContent;

const styles = StyleSheet.create({
    ModalButton: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginVertical: 10
    },
    ButtonStyle: {
        paddingHorizontal: 10,
    },
    containerSender: {
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
        marginRight: 10,
    },
    containerReceiver: {
        alignSelf: "flex-start",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        marginLeft: 10,
    },
    bubbleSender: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C5",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        maxWidth: "80%",
    },
    bubbleReceiver: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        maxWidth: "80%",
    },
    textSender: {
        color: "#000",
        fontSize: 16,
        textAlign: "right",
    },
    textReceiver: {
        color: "#000",
        fontSize: 16,
        textAlign: "left",
        fontWeight: "bold",
    },
    timestampContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "#B2B2B2",
        marginRight: 5,
        alignItems: "center",
        flexDirection: "row",
    },
    timeIcon: {
        marginLeft: 5,
        fontSize: 20,
        color: "#B2B2B2",
    },
    timestampText: {
        fontSize: 12,
        color: "#B2B2B2",
    },
    resend: {
        position: "absolute",
        left: -50,
        top: "40%",
    },
});
