const receiveNotification = (noti = {}, action) => {
    if (action.type === 'PUSHER') {
        return action.noti
    }
    return noti;
};

export default receiveNotification;
