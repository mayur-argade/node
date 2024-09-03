// Function to get all employees
const EmployeeModel = require('../mongoose_model/emp_model')

async function getAllEmployees() {
    try {
        return await EmployeeModel.find({}).exec();
        console.log('All Employees:', data);
    } catch (err) {
        console.log('Error fetching all employees:', err);
    }
}

// Function to get an employee by ID
async function getEmployeeById(empId) {
    try {
        return await EmployeeModel.findById(empId).exec();
        console.log('Employee by ID:', data);
    } catch (err) {
        console.log('Error fetching employee by ID:', err);
    }
}

// Function to delete an employee by ID
async function deleteEmployeeById(empId) {
    try {
        const result = await EmployeeModel.deleteOne({ _id: empId });
        console.log('Deleted Employee:', result);
    } catch (err) {
        console.log('Error deleting employee by ID:', err);
    }
}

// Function to update an employee
async function updateEmployee(empId, updates) {
    try {
        const result = await EmployeeModel.updateOne({ _id: empId }, updates);
        console.log('Updated Employee:', result);
    } catch (err) {
        console.log('Error updating employee:', err);
    }
}

// Function to add a new employee
async function addEmployee(employee) {
    try {
        const EmployeeDoc = new EmployeeModel(employee);
        const res = await EmployeeDoc.save();
        console.log('Inserted Employee:', res);
    } catch (err) {
        console.log('Error adding employee:', err);
    }
}

// Function to perform aggregation
async function aggregateEmployees() {
    try {
        const employees = await EmployeeModel.find({ emp_salary: { $gte: 50000 } }).exec();
        console.log('Aggregation Result:', employees);
    } catch (err) {
        console.log('Error during aggregation:', err);
    }
}

async function uploadEmployeePic(_id, employee_pic){
    const filter={_id:_id};
    const updates={employee_pic:employee_pic};
    return await EmployeeModel.updateOne(filter,updates);
}


module.exports = { uploadEmployeePic, updateEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, aggregateEmployees, addEmployee }