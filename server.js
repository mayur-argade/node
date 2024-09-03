const api = require("./api/mongodbAPI");
// const { getAllEmployees, getEmployeeById } = api;
const makeConnection = require('./config/mysql')
const { deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployee, aggregateEmployees, addEmployee, uploadEmployeePic } = require('./api/mongodbAPI')
const { getAllUsers, getUserbyId, deleteUserById, createUser, updateUserById } = require('./api/Api')
const express = require("express");
const { getAllSweets, getSweetById, deleteSweetById, createSweet, updateSweetsById } = require("./api/sweetsApi");
// const { connection } = require("mongoose");
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const mongodb = require('./config/mongodb')

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// middleware for cors 
app.use(cors());

// Middleware to parse URL-encoded request bodies with extended option
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });


app.listen(5000, () => console.log("application server started..."))

// Set up multer for file handling
// require("./config/mongodb");


app.post('/employee/create', async function (request, response) {

    try {
        const { _id, emp_name, emp_salary, emp_email, joining_date } = request.body;
        const employeeData = {
            _id: _id,
            emp_name: emp_name,
            emp_salary: emp_salary,
            emp_email: emp_email,
            joining_date: joining_date
        }
        const data = await addEmployee(employeeData);

        response.status(201).json({ message: 'user created successfully' })

    } catch (error) {
        console.log(error)
    }
});

app.get("/getall", async function (request, response) {
    // const connection = await makeConnection();
    const results = await getAllEmployees()
    console.log(results);
    response.send(results);
});

app.get("/users/getdata/:empid", async function (request, response) {
    // const connection = await makeConnection();
    const data = await getEmployeeById(request.params.empid);
    response.send(data);
});

app.delete("/users/delete/:empid", async function (request, response) {
    const connection = await makeConnection();
    const data = await deleteEmployeeById(request.params.empid);
    response.send("Deleted successfully");
});

app.post("/users/create", upload.single('file'), async function (request, response) {
    // let connection;
    try {
        // console.log(request.body)
        // Extract user data from request body
        const { _id, emp_name, emp_salary, emp_email, joining_date } = request.body;

        console.log(request.files)
        const image = request.file ? request.file.buffer : null;

        console.log(image)

        // Validate incoming data (basic validation example)
        //   if (!emp_id || !emp_name || !emp_salary || !emp_email) {
        //     return response.status(400).send("All fields are required");
        //   }

        // Establish a database connection
        connection = await makeConnection();

        //   // Insert the new user into the database
        const result = await createUser(connection, {
            emp_id: _id,
            emp_name: emp_name,
            emp_salary: emp_salary,
            emp_email: emp_email,
            emp_hire_date: joining_date
        });

        // Send success response
        response.status(201).send("User created successfully");
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end(); // Close the database connection
        }
    }
});

app.put("/users/update/:emp_id", async function (request, response) {
    let connection;
    try {
        // Extract user ID from request parameters
        const { emp_id } = request.params;
        // Extract user data from request body
        const { emp_name, emp_salary, emp_email } = request.body;

        // // // Validate incoming data (basic validation example)
        // // if (!emp_id || !emp_name || !emp_salary || !emp_email) {
        // //     return response.status(400).send("All fields are required");
        // // }

        // // Establish a database connection
        // connection = await makeConnection();

        // Update the user in the database
        const result = await updateEmployee(emp_id, {
            emp_name,
            emp_salary,
            emp_email,
            // emp_hire_date
        });

        // Check if the update was successful
        // if (result.affectedRows === 0) {
        //     return response.status(404).send("User not found");
        // }

        // Send success response
        response.status(200).send("User updated successfully");
    } catch (error) {
        console.error('Error updating user:', error);
        response.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end(); // Close the database connection
        }
    }
});


app.get('/sweets/all', async function (request, response) {
    const connection = await makeConnection();
    const results = await getAllSweets(connection)
    console.log(results);
    response.send(results);
});


app.get('/sweets/:id', async function (request, response) {
    const connection = await makeConnection();
    const data = await getSweetById(connection, request.params.id);
    response.send(data);
})

app.get("/sweets/delete/:id", async function (request, response) {
    const connection = await makeConnection();
    const data = await deleteSweetById(connection, request.params.id);
    response.send("Deleted successfully");
});

app.post("/sweets/create", upload.single('image'), async function (request, response) {
    let connection;
    try {
        // Extract user data from request body
        const { id, name, description, price, ingredients } = request.body;

        // Validate incoming data (basic validation example)
        if (!id || !name || !description || !price || !ingredients) {
            return response.status(400).send("All fields are required");
        }

        // Establish a database connection
        connection = await makeConnection();

        // Insert the new user into the database
        const result = await createSweet(connection, {
            id, name, description, price, ingredients, image
        });

        // Send success response
        response.status(201).send("sweet created successfully");
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end(); // Close the database connection
        }
    }
});

app.put("/sweets/update/:id", async function (request, response) {
    let connection;
    try {
        // Extract user ID from request parameters
        const { id } = request.params;
        // Extract user data from request body
        const { name, description, price, ingredients } = request.body;

        // Validate incoming data (basic validation example)
        if (!id || !name || !description || !price || !ingredients) {
            return response.status(400).send("All fields are required");
        }

        // Establish a database connection
        connection = await makeConnection();

        // Update the user in the database
        const result = await updateSweetsById(connection, id, {
            name, description, price, ingredients
        });

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return response.status(404).send("User not found");
        }

        // Send success response
        response.status(200).send("Sweet updated successfully");
    } catch (error) {
        console.error('Error updating user:', error);
        response.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end(); // Close the database connection
        }
    }
});

app.post("/sweets/update-image", upload.single('image'), async function (request, response) {
    let connection;
    try {
        // Extract user data from request body
        const { id } = request.body;
        const image = request.file ? request.file.buffer : null;

        // Validate incoming data
        if (!id || !image) {
            return response.status(400).send("ID and image are required");
        }

        // Establish a database connection
        connection = await makeConnection();

        // Prepare the query and parameters
        const query = "UPDATE sweets SET image = ? WHERE id = ?";
        const params = [image, id];

        // Execute the query
        connection.query(query, params, (error, results) => {
            if (error) {
                console.error('SQL error:', error);
                response.status(500).send("Internal Server Error");
            } else if (results.affectedRows > 0) {
                response.status(200).send("Image updated successfully");
            } else {
                response.status(404).send("Sweet not found");
            }
        });

        response.status(201).json("Image updated successfully.")
    } catch (error) {
        console.error('Error:', error);
        response.status(500).send("Internal Server Error");
    } finally {
        console.log("end")
    }
});

app.put("/upload/:empid", upload.single('employee_pic'), async function (request, response) {

    console.log(request.params.empid)
    
    const data = await uploadEmployeePic(request.params.empid, request.file.buffer)

    console.log(data)

    response.status(200).json("image uploaded")
})