const mongoose = require("mongoose")
const empSchema=new mongoose.Schema({
    _id:Number,
    emp_name :{ type: String, default:"neosoft" },
    emp_email:String,
    emp_salary:Number,
    joining_date: Date,
    employee_pic:{
        data: Buffer,
        contentType: String
    } 
});

// _id, emp_name, emp_salary, emp_email, joining_date
const EmployeeModel=mongoose.model("Employee",empSchema);

module.exports=EmployeeModel;