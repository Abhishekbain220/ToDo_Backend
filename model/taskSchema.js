let mongoose=require("mongoose")
let taskSchema=mongoose.Schema({

    heading:{
        type:String,
        
    },
    task:{
        type:String
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},{timestamps:true})

module.exports=mongoose.model("task",taskSchema)