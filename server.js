const app = require('./app');
const debug = require('debug')('devjitsu_express_react:server');
const http = require('http');

//const port = process.env.PORT || 5000;
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

const server = http.createServer(app);

// console.log that your server is up and running
server.listen(port, () => console.log(`Server Start!(port: ${port})`));
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val){
    var port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port; 
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}