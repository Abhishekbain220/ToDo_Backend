let express=require("express")
const { createTask, viewTasks, deleteTask, updateTask } = require("../controller/taskController")
const { authenticateUser } = require("../middleware/authMiddleware")
let router=express.Router()

router.post("/createTask",authenticateUser, createTask)
router.get("/viewTasks",authenticateUser,viewTasks)
router.delete("/deleteTask/:id",authenticateUser,deleteTask)
router.put("/updateTask/:id",authenticateUser,updateTask)

module.exports=router