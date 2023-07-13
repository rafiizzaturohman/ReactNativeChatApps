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
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: 17,
                    }} numberOfLines={1} ellipsizeMode="clip">{props.contact}</Text>

                    {props.count > 0 && (
                        <View style={{
                            backgroundColor: 'red',
                            borderWidth: 0.5,
                            borderRadius: 100,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
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