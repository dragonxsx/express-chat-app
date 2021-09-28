const generateMessage = (text: string, username?: string) => {
    if(!username) {
        username = 'Admin';
    }

    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (username: string, position: {latitude: number, longitude: number}) => {
    return {
        username,
        url: `https://www.google.com/maps?q=${position.latitude},${position.longitude}`,
        createdAt: new Date().getTime()
    }
}

export {
    generateMessage,
    generateLocationMessage
}