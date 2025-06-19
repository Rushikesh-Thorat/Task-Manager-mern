const Task = require("../models/Task");
const User = require("../models/User")
const excelJS = require("exceljs");

const exportTasksReport = async (req, res) =>{
    try{
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25},
            { header: "Title", key: "title", width: 30},
            { header: "Description", key: "description", width: 50},
            { header: "priority", key: "priority", width: 15},
            { header: "Status", key: "status", width: 20},
            { header: "Due Date", key: "dueDate", width: 20},
            { header: "Assigned To", key: "assignedTo", width: 30},
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
                deuDate: task.dueDate.toISOString().split("T")[0],
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
        const users = await User.find().select("name email_id").lean();
        const userTasks = await Task.find().populate("assignedTo", "name email_id");

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email_id: user.email,
                taskCount: 0,
                pendingCount: 0,
                inProgressCount: 0,
                completedCount: 0,
            };
        });
        
        userTasks.forEach((task) => {
            if(task.assignedTo){
                task.assignedTo.forEach((assignedUser) => {
                    if(userTaskMap[assignedUser._id]){
                        userTaskMap[assignedUser._id].taskCount +=1;
                        if(task.status === "Pending"){
                            userTaskMap[assignedUser._id].pendingTasks +=1;
                        }else if(task.status === "In Progress"){
                            userTaskMap[assignedUser._id].inProgressTasks +=1;
                        }else if(task.status === "Completed"){
                            userTaskMap[assignedUser._id].completedTasks +=1;
                        }
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");

        worksheet.columns = [
            { header: "Name", key: "name", width: 303},
            { header: "Email", key: "email_id", width: 40},
            { header: "Total Assigned Tasks", key: "taskCount", width: 20},
            { header: "Pending Tasks", key: "pendingTasks", width:20},
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20},
            { header: "Completed Tasks", key: "completedTasks", width: 20},
        ];
        Object.values[userTaskMap].forEach((user) => {
            worksheet.addRow(user);
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
