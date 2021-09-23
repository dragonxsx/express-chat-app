const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageInput = $messageForm.querySelector('input');
const $messageButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('message', (msg) => {
    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (msg) => {
    const html = Mustache.render(locationMessageTemplate, {
        map_url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm a')
    });
    console.log(html);
    $messages.insertAdjacentHTML('beforeend', html);
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