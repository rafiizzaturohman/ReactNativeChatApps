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
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: 6,
                }}>
                    <View style={styles.bubbleSender}>
                        <View>
                            <Text style={{
                                color: 'black',
                                fontSize: 16,
                                textAlign: 'right',
                                letterSpacing: 1.5
                            }}>{props.chat}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            {props.readstatus === true ? (
                                <Icon name="check" size={20} color="black" />
                            ) : (
                                <Icon name="check" size={20} color="white" />
                            )}

                            <Text style={{
                                flexWrap: 'nowrap',
                                paddingLeft: 6,
                                paddingRight: 7,
                                letterSpacing: 1.1
                            }}>{props.date}</Text>
                        </View>
                    </View>

                    <Modal visible={showModal}>
                        <View style={modalStyle.container}>
                            <View style={modalStyle.bgContainer}>
                                <View style={modalStyle.container2}>
                                    <Text style={modalStyle.titleText}>Are you sure want to delete this? chat </Text>

                                    <View style={styles.ModalButton}>
                                        <TouchableOpacity style={modalStyle.delButton} onPress={deleteMessage}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: 18,
                                            }}>Delete</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={modalStyle.cancButton} onPress={() => setShowModal(false)}>
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
            </TouchableNativeFeedback >
        )
    } else if (props.sent === false && data?.sender === data?.id) {
        return (
            <TouchableOpacity style={styles.resend} onPress={resendMessage}>
                <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: 6,
                }}>
                    <View style={styles.bubbleSender}>
                        {/* <Icon name="arrow-circle-right" size={20} color="#cbd5e1" /> */}

                        <Text style={{
                            color: '#000',
                            fontSize: 16,
                            letterSpacing: 1.08,
                            textAlign: 'right'
                        }}>{props.chat}</Text>

                        <View>
                            {/* <Icon name="time" size={20} /> */}

                            <Text>{props.date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            data?.sender !== props.receiver ?
                null
                :
                <View style={styles.receiver}>
                    <View style={styles.bubbleReceiver}>
                        <Text style={{
                            color: 'black',
                            fontSize: 16,
                            letterSpacing: 1.1
                        }}>{props.chat}</Text>

                        <View>
                            <Text style={{
                                textAlign: 'right',
                                letterSpacing: 1.1
                            }}>{props.date}</Text>
                        </View>
                    </View>
                </View>
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
    bubbleReceiver: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 0.8,
        paddingVertical: 10,
        paddingLeft: 16,
        paddingRight: 20,
        marginVertical: 5,
        maxWidth: "80%",
    },
    bubbleSender: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingRight: 16,
        borderRadius: 10,
        paddingLeft: 20,
        backgroundColor: '#0d9488',
        borderWidth: 0.8,
        maxWidth: '80%'
    },
    resend: {
        position: "absolute",
        left: -50,
        top: "40%",
    },
    receiver: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 6,
    }
});


const modalStyle = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    bgContainer: {
        backgroundColor: '#BACDDB',
        height: '20%',
        borderRadius: 10,
        borderWidth: 1
    },
    container2: {
        height: '100%',
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        flexWrap: 'nowrap'
    },
    delButton: {
        height: 40,
        width: '18%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#be123c',
        marginVertical: 8,
        marginHorizontal: 5
    },
    cancButton: {
        height: 40,
        width: '18%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f766e',
        marginVertical: 8,
        marginHorizontal: 5
    }
})