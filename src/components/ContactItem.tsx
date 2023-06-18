import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/styles";

interface ContactItemProps {
    selector: string;
    contact: string;
    count: number;
    set: () => void;
}

const ContactItem: React.FC<ContactItemProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.set}>
            <Text style={styles.contactName}>{props.contact}</Text>

            {props.count > 0 && (
                <View>
                    <Text>{props.count}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default ContactItem;