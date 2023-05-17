import io from 'socket.io-client';
// const socket = io.connect("http://177.153.59.218:5000/");
const socket = io.connect("http://localhost:5000");
export default socket;