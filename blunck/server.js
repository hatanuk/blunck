const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const counterFilePath = path.join(__dirname, 'counter.txt')
const indexFilePath = path.join(__dirname, 'index.html')


app.use(express.static(path.join(__dirname, 'public')));


function readCounter() {
    let data = 0
    if (fs.existsSync(counterFilePath)) {
        console.log("HII")
        console.log(fs.readFileSync(counterFilePath, 'utf8'))
        data = parseInt(fs.readFileSync(counterFilePath, 'utf8'))
    }
    console.log(data)
    return data
    

}

function storeCounter(count) {
    console.log(count.toString())
    fs.writeFileSync(counterFilePath, count.toString())
}

// initialise global counter to value stored in the server's text file 
let globalCounter = 0



app.get('/', (req, res) => {
    res.sendFile(indexFilePath);
});

io.on('connection', (socket) => {
    console.log("hi")


    // syncs counter on startup
    socket.emit('sync counter', globalCounter);

    socket.on('increment', () => {
        globalCounter++; 
        io.emit('sync counter', globalCounter);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// saves the global value to text file 
const SAVE_INTERVAL_MS = 5000
setInterval(() => storeCounter(globalCounter), SAVE_INTERVAL_MS)