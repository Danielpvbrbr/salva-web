import io from 'socket.io-client';
// const socket = io.connect("http://177.153.59.218:5000/");

const socket = io.connect("https://s7200s.vps-kinghost.net/");
export default socket;