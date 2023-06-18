import { request, dataJSON } from '../helpers/api';

export const loadContactSuccess = (payload) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    payload
})

const loadContactFailure = (error) => ({
    type: 'LOAD_CONTACT_FAILURE',
    error
})

export const loadContact = (payload) => {
    return async (dispatch, getState) => {
        try {
            const parseJsonData = await dataJSON()
            const { data } = await request.get('users')
            const response = await request.get('chats', { params: { user: parseJsonData?.id } })
            if (data.success) {
                let cnt = []
                let temp = data.data
                let chatData = response.data.data
                for (let i = 0; i < temp.length; i++) {
                    if (parseJsonData?.username !== temp[i].username) {
                        if (payload && !temp[i]) {
                            cnt.push({ username: payload.username, _id: payload._id, unreadCount: payload.unreadCount })
                        } else {
                            cnt.push({ username: temp[i].username, _id: temp[i]._id, unreadCount: 0 })
                        }
                    }
                }

                for (let j = 0; j < chatData.length; j++) {
                    for (let k = 0; k < cnt.length; k++) {
                        if (chatData[j].readstatus === false && chatData[j].sender === cnt[k]._id) {
                            cnt[k].unreadCount = cnt[k].unreadCount + 1
                        }
                    }
                }
                await dispatch(loadContactSuccess({ cnt }))
            } else {
                alert('Failed to load contact')
            }
        } catch (error) {
            dispatch(loadContactFailure(error))
        }
    }
}

const removeNotificationSuccess = (payload) => ({
    type: 'REMOVE_NOTIFICATION_SUCCESS',
    payload
})

const removeNotificationFailure = (error) => ({
    type: 'REMOVE_NOTIFICATION_FAILURE',
    error
})

export const removeNotification = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(removeNotificationSuccess(payload))
        } catch (error) {
            dispatch(removeNotificationFailure(error))
        }
    }
}
