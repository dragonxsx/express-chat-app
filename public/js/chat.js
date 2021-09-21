const socket = io();

socket.on('message', (msg) => {
    console.log('message ', msg);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        console.log('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (data) => {
            console.log('Location shared, ', data);
        });
    });
});