const Task = require("../models/Task");
const User = require("../models/User")
const excelJS = require("exceljs");

const exportTasksReport = async (req, res) =>{
    try{
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 35},
            { header: "Title", key: "title", width: 35},
            { header: "Description", key: "description", width: 50},
            { header: "Priority", key: "priority", width: 15},
            { header: "Status", key: "status", width: 20},
            { header: "Due Date", key: "dueDate", width: 20},
            { header: "Assigned To", key: "assignedTo", width: 60},
        ];

        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
                .map((user) => `${user.name} (${user.email})`)
                .join(", ");
            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate.toISOString().split("T")[0],
                assignedTo: assignedTo || "Unassigned",
            });
        });
        res.setHeader(
            "Content-disposition",
            'attachment; filename = "tasks_report.xlsx"'
        );
        return workbook.xlsx.write(res).then(() => {
            res.end();
        })
    }catch(error){
        res
            .status(500)
            .json({ message: "Error Exporting tasks", error: error.message});
    }
};

const exportUsersReport = async (req, res) =>{
    try{
        const users = await User.find().select("name email").lean();
        const userTasks = await Task.find().populate("assignedTo", "name email").lean();

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email_id: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });
        
        userTasks.forEach((task) => {
            if (task.assignedTo) {
                task.assignedTo.forEach((assignedUser) => {
                    const userTask = userTaskMap[assignedUser._id];
                    if (userTask) {
                        userTask.taskCount += 1;
                        switch (task.status) {
                            case "Pending":
                                userTask.pendingTasks = (userTask.pendingTasks || 0) + 1;
                                break;
                            case "In Progress":
                                userTask.inProgressTasks = (userTask.inProgressTasks || 0) + 1;
                                break;
                            case "Completed":
                                userTask.completedTasks = (userTask.completedTasks || 0) + 1;
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");

        worksheet.columns = [
            { header: "Name", key: "name", width: 30},
            { header: "Email", key: "email_id", width: 40},
            { header: "Total Assigned Tasks", key: "taskCount", width: 20},
            { header: "Pending Tasks", key: "pendingTasks", width:20},
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20},
            { header: "Completed Tasks", key: "completedTasks", width: 20},
        ];
        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow({
                ...user,
                taskCount: user.taskCount || 0,
                pendingTasks: user.pendingTasks || 0,
                inProgressTasks: user.inProgressTasks || 0,
                completedTasks: user.completedTasks || 0,
            });
        });


        res.setHeader(
            "Content-Type",
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            "Content-disposition",
            'attachment; filename = "users_report.xlsx"'
        );
        return workbook.xlsx.write(res).then(() => {
            res.end();
        })
    }catch(error){
        res
            .status(500)
            .json({ message: "Error Exporting tasks", error: error.message});
    }
};


module.exports = {
    exportTasksReport,
    exportUsersReport,
};
