const CustomError = require("../utils/customError")
let Task = require("../model/taskSchema")

module.exports.createTask = async (req, res, next) => {
    try {
        let { heading, task } = req.body
        if (!heading && !task) {
            return
        }
        let newTask = await Task.create({
            heading,
            task,
            user: req.user._id
        })
        await newTask.save()
        res.status(200).json({
            message: "New task created ",
            newTask
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.viewTasks = async (req, res, next) => {
    try {
        let tasks = await Task.find({ user: req.user._id })
        if (!tasks) return next(new CustomError("Task is not found ", 400))
        res.status(200).json({
            tasks
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleteTask = await Task.findByIdAndDelete(id)
        if (!deleteTask) return next(new CustomError("Task not Found ", 400))
        res.status(200).json({
            message: "task deleted Successfully",
            deleteTask
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        let { heading, task } = req.body
        let { id } = req.params
        let updateTask = await Task.findByIdAndUpdate(id, req.body)
        await updateTask.save()
        if (!updateTask) return next(new CustomError("task not found", 400))
        res.status(200).json({
            message: "Task updated successfully",
            updateTask
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}