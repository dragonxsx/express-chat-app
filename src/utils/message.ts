const generateMessage = (text: string) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (position: {latitude: number, longitude: number}) => {
    return {
        url: `https://www.google.com/maps?q=${position.latitude},${position.longitude}`,
        createdAt: new Date().getTime()
    }
}

export {
    generateMessage,
    generateLocationMessage
}