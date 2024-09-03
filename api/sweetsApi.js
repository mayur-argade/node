const connection = require('../config/mysql')

const getAllSweets = async (connection) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM sweets');
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getSweetById = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(`SELECT * from sweets where id = ${id}`);
    return results
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteSweetById = async (connection, id) => {
  try {
    const [results, fields] = await connection.query(`Delete from sweets where id = ${id}`);
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const createSweet = async (connection, userData) => {
  try {
    // Construct columns and values for the query
    const columns = Object.keys(userData).join(', ');
    const values = Object.values(userData).map(value => connection.escape(value)).join(', ');

    const query = `INSERT INTO sweets (${columns}) VALUES (${values})`;
    
    const [results, fields] = await connection.query(query);
    return results;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw error to be caught by the route handler
  }
};


const updateSweetsById = async (connection, id, updatedFields) => {
  try {
    // Construct the SET clause for the query
    const setClause = Object.entries(updatedFields)
      .map(([key, value]) => `${key} = ${connection.escape(value)}`)
      .join(', ');

    // Construct the complete SQL query
    const query = `UPDATE sweets SET ${setClause} WHERE id = ${connection.escape(id)}`;
    
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
 getAllSweets,
 getSweetById,
 deleteSweetById,
 createSweet,
 updateSweetsById
}