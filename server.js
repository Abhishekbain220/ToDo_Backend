require("dotenv").config()
let db=require("./model/connect")
let express=require("express")
let cookieParser=require("cookie-parser")
let morgan=require("morgan")
let cors=require("cors")
const { errorHandler } = require("./middleware/errorHandler")
let PORT=process.env.PORT || 3000
let app=express()
let userRouter=require("./Routes/userRouter")
let taskRouter=require("./Routes/taskRouter")


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("tiny"))

const allowedOrigins = [
  "http://localhost:5173",             // for local development
  "https://to-do-frontend-black.vercel.app",  // replace with your real frontend domain
];

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))



// Routes
app.use("/user",userRouter)
app.use("/task",taskRouter)



app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route not Found"
    })
})

app.use((req,res)=>{
    res.send("Backend is running")
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("Server running on PORT",PORT)
})