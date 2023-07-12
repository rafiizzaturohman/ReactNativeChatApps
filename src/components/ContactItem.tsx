import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ContactItemProps {
    selector: string;
    contact: string;
    count: number;
    set: () => void;
}

const ContactItem: React.FC<ContactItemProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.set}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: 18,
                    }}>{props.contact}</Text>

                    {props.count > 0 && (
                        <View style={{
                            backgroundColor: 'red',
                            borderWidth: 1,
                            borderRadius: 100,
                        }}>
                            <Text>{props.count}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ContactItem;