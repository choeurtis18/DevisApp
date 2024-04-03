const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);


const mongoose = require('mongoose');
//Connect to the DB
const dbURI = "mongodb+srv://"+process.env.DB_ADMIN+":"+process.env.DB_PASS+"@devis-db.olldfcw.mongodb.net/?retryWrites=true&w=majority&appName=devis-db"
//const dbURI = "mongodb+srv://admin:g5lJIrYh2w8hHn98@devis-db.olldfcw.mongodb.net/?retryWrites=true&w=majority&appName=devis-db"
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
    }
).then(() => {
    console.log("Connected to MongoDB Atlas");

    mongoose.connection.on("connected", () => {
        console.log("Mongoose connection is open to MongoDB Atlas");
    });

    mongoose.connection.on("error", (err) => {
        console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose connection is disconnected");
    });
}).catch((error) => {
    console.log("Error connecting to MongoDB Atlas: ", error);
});

const init_db = require('./datas/init_db');
//init_db.initDatabase();