const connection = require('../config/mysql')

const getAllUsers = async (connection) => {
  try {
    // Ensure that connection is initialized and available
    console.log(connection)
    if (!connection) {
      throw new Error('Database connection is not established.');
    }

    const [results, fields] = await connection.query('SELECT * FROM employee');
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getUserbyId = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(`SELECT * from employee where emp_id = ${id}`);
    return results
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteUserById = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(`Delete from employee where emp_id = ${id}`);
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const createUser = async (connection, userData) => {
  try {
    // Construct columns and values for the query
    const columns = Object.keys(userData).join(', ');
    const values = Object.values(userData).map(value => connection.escape(value)).join(', ');

    const query = `INSERT INTO employee (${columns}) VALUES (${values})`;
    
    const [results, fields] = await connection.query(query);
    return results;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw error to be caught by the route handler
  }
};


const updateUserById = async (connection, id, updatedFields) => {
  try {
    // Construct the SET clause for the query
    const setClause = Object.entries(updatedFields)
      .map(([key, value]) => `${key} = ${connection.escape(value)}`)
      .join(', ');

    // Construct the complete SQL query
    const query = `UPDATE employee SET ${setClause} WHERE emp_id = ${connection.escape(id)}`;
    
    // Execute the query
    const [results] = await connection.query(query);
    
    return results;
  } catch (error) {
    // Log the error
    console.error('Error updating user:', error);
    // Optionally, you can rethrow the error if you want to handle it further up the call stack
    throw error;
  }
};


module.exports = {
  getAllUsers,
  getUserbyId,
  deleteUserById,
  createUser,
  updateUserById
}