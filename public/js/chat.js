const socket = io();

let $messageForm = document.querySelector('#message-form');
let $messageInput = $messageForm.querySelector('input');
let $messageButton = $messageForm.querySelector('button');
let $sendLocationButton = document.querySelector('#send-location');

socket.on('message', (msg) => {
    console.log('message ', msg);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageButton.setAttribute('disabled', 'disabled');

    const message = $messageInput.value;
    socket.emit('sendMessage', message, () => {
        $messageButton.removeAttribute('disabled');
        $messageInput.value = "";
    });
});

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return console.log('Your browser does not support geolocation');
    }

    $sendLocationButton.setAttribute("disabled", "disabled");

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (data) => {
            $sendLocationButton.removeAttribute("disabled");
            console.log('Location shared, ', data);
        });
    });
});