import io from 'socket.io-client';
const socket = io.connect("http://149.56.166.222:5000/");
export default socket;