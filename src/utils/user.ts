type User = {
    username?: string,
    room?: string,
    id?: string
}

const users : User[] = [];

const addUser = ({id, username, room}: User) => {
    // Clean the data
    username = username && username.trim().toLowerCase();
    room = room && room.trim().toLowerCase();

    // Validate the data
    if(!username || !room) {
        return {
            'error': 'Username and room are required'
        };
    }

    // Check existed username
    const existedUser = users.find(i => 
        i.username === username && i.room === room
    );

    // Validate username
    if(existedUser) {
        return {
            'error': 'Username is in use!'
        };
    }

    // Store user
    const user = {id, username, room};
    users.push(user);
    return {user};
}

const removeUser = (id: string) => {
    const index = users.findIndex(i => i.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id: string) => {
    return users.find(i => i.id === id);
}

const getUsersInRoom = (room: string) => {
    return users.filter(i => i.room === room);
}

export { addUser, removeUser, getUser, getUsersInRoom };