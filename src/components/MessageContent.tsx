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
    const [data, setData] = useState<{ _id: string; id: string; sender: string } | null>(null);
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

    if (props.sent === true && props.id === data?.id) {
        return (
            <TouchableNativeFeedback onLongPress={() => setShowModal(true)}>
                <View>
                    <View>
                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'right',
                        }}>{props.chat}</Text>
                    </View>
                    <View>
                        <Text>{props.date}</Text>
                        {props.readstatus === true ? (
                            <Icon name="check" size={20} color="black" />
                        ) : (
                            <Icon name="check" size={20} color="white" />
                        )}
                    </View>

                    <Modal visible={showModal}>
                        <View style={{
                            backgroundColor: '#BACDDB',
                            flex: 1,
                            marginHorizontal: 100,
                            marginVertical: 100,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginVertical: 10
                            }}>Are you sure want to delete this chat?</Text>

                            <View style={styles.ButtonStyle}>
                                <View style={styles.ModalButton}>
                                    <TouchableOpacity onPress={deleteMessage}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setShowModal(false)}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
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
                    <TouchableOpacity>
                        <Icon name="sync" size={20} color="#cbd5e1" />

                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'left'
                        }}>{props.chat}</Text>

                        <View>
                            <Text>{props.date}</Text>

                            <Icon name="time-outline" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            data?.sender === props.receiver ?
                <View>
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
        // flex: 1,
        // justifyContent: "space-evenly",
        // alignItems: "center",
    },
    ButtonStyle: {},
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
