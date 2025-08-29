const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        text:{type: String, required: true},
        completed:{type: Boolean, default: false},
    });

const prioritySchema = (
    {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    }
);
const statusSchema = (
    {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    }
);

const assignedToSchema = (
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
);

const taskSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        priority: prioritySchema,
        status: statusSchema,
        dueDate: {type: Date, required: true},
        assignedTo: [assignedToSchema],
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        attachments: [{type: String}],
        todoChecklist: [todoSchema],
        progress: {type: Number, default: 0},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Task", taskSchema);