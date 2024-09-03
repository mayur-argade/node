
var mysql = require("mysql2/promise")

var connection;

async function makeConnection() {
  connection = await mysql.createConnection({
    host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'p@ssw0rd',
      database: 'neosoft',
  });


  return connection;
}

module.exports = makeConnection;

// const mysql = require('mysql2/promise');

// const connectDB = async () => {
//   try {
//   const connection = await mysql.createConnection({
//       host: 'localhost',
//       port: 3306,
//       user: 'root',
//       password: 'p@ssw0rd',
//       database: 'neosoft'
//     });
//     console.log('Connected to the MySQL server.');
//     return connection
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     throw error;
//   }
// };

// const connection = connectDB();

// module.exports = connection;
