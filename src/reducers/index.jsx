import { combineReducers } from 'redux';
import chats from './chat';
import contacts from './contact';

export default combineReducers({
    chats,
    contacts
})