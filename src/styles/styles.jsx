import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    setLogInContainers: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    loginContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(248, 250, 252, 1)',
        paddingVertical: 30,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 80,
        elevation: 10,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 10,
    },
    loginInput: {
        height: 50,
        width: '70%',
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 18,
    },
    loginButton: {
        height: 40,
        width: '32%',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#0f766e',
        marginVertical: 10
    },
    buttonText: {
        color: 'honeydew',
        fontWeight: 'bold',
        margin: 7,
        fontSize: 16,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    headerTextChat: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: '#317873',
        fontWeight: 'bold',
        color: 'honeydew',
        fontSize: 18
    },
    logOutButton: {
        height: 40,
        width: '20%',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#0f766e',
        marginVertical: 10,
        marginHorizontal: 10
    },
    contactName: {
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'honeydew',
        fontSize: 18,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    buttonPosition: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    messageInputContainer: {
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
    },
    messageInputField: {
        flex: 1,
        marginRight: 8,
        paddingHorizontal: 20,
        paddingVertical: 11,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    messageSend: {
        borderRadius: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00A693",
        height: 50
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    chatTopBar: {
        flexDirection: 'row',
        backgroundColor: '#317873',
        alignItems: 'center',
        paddingVertical: 10
    },
    messageContent: {
        flex: 1,
        padding: 16,
        marginBottom: 70
    },
    receiverName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    }
});