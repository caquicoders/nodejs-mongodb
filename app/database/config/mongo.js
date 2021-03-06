const mongoose = require('mongoose');
const { user, password, host, port, database } = require('credentials');

mongoose.Promise = Promise;

const createConnection = () => {
  const credentials = `mongodb://${user}:${password}@${host}:${port}/${database}`;
  const connection = mongoose.createConnection(credentials, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 5,
    authSource: 'admin',
    useNewUrlParser: true,
  })
  .on('error', (args) => {
    console.log(`Unable to connect to the database MONGODB`, args);
  })
  .on('open', () => {
    console.log(`Connection to MONGODB has been established succesfully`);
  });

  connection.mongoose = mongoose;

  return connection;
}

module.exports = exports = {
  createConnection,
};
