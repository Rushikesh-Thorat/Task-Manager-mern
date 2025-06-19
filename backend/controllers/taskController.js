const Task = require("../models/Task");
// const User = require("../models/User");

const getTasks = async (req, res) => {
    try{
        const { status } = req.query;
        let filter = {}; 

        if(status){
            filter.status = status;
        }
        let tasks;

        if (req.user.role === "admin"){
            tasks = await Task.find(filter).populate({
                path: "assignedTo",
                select: "name email profileImageUrl",
            });
                
            
        }else {
            tasks = await Task.find({...filter, assignedTo: req.user_id}).populate({
                path: "assignedTo",
                select: "name email profileImageUrl",
            });
        } 

        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.complete
                ).length;
                return { ...task._doc, completedTodoCount: completedCount };
            })
        );

        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : {assignedTo: req.user_id}
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" && { assignedTo: req.user_id}),
        });
        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user_id}),
        });
        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" && { assignedTo: req.user_id}),
        });

        res.json({
            tasks,
            statusSummary: {
                all : allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks
            },
        });

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const getTaskById = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const createTask = async (req, res) => {
    try{
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body
    if(!Array.isArray(assignedTo)){
        return res
            .status(400)
            .json({ message: " assignedTo must be an array of user IDs" })
    }
    const task = await Task.create({
         title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user_id,
            todoChecklist,
            attachments,
    })
    res.status(201).json({ message: "Task created successfully", task});
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const updateTask = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const daleteTask = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const updateTaskStatus = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const updateTaskChecklist = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const getDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const getUserDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    daleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData,
};

