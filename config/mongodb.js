const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://mayurargade:ViIM8m8pHK3k35JP@cluster0.acvpr6c.mongodb.net/production?retryWrites=true&w=majority&appName=Cluster0")
.then((success)=>{console.log("connected......")
    require("../mongoose_model/emp_model"); // what schema and models we are using
})
.catch(err=>console.log(err))