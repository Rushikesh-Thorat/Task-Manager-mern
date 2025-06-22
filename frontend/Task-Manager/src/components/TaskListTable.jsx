import React from 'react'
import moment from 'moment';

const TaskListTable = ({tableData}) => {
    const getStatusBadgeColor = (status) => {
        switch (status){
            case 'Completed': return 'bg-green-200 text-green-700 border border-green-300';
            case 'Pending': return 'bg-purple-200 text-purple-700 border border-purple-300';
            case 'In Progress': return 'bg-cyan-200 text-cyan-700 border border-cyan-300';
            default: return 'bg-gray-200 text-gray-700 border border-gray-300';
        }
    };
    const getPriorityBadgeColor = (priority) => {
        switch (priority){
            case 'High': return 'bg-red-200 text-red-700 border border-red-300';
            case 'Medium': return 'bg-orange-200 text-orange-700 border border-orange-300';
            case 'Low': return 'bg-green-200 text-green-700 border border-green-300';
            default: return 'bg-gray-200 text-gray-700 border border-gray-300';
        }
    };
  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
        <table className="min-w-full">
            <thead>
                <tr className="text-left">
                    <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Name</th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Status</th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Priority</th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">Created On</th>
                </tr>
            </thead>
            <tbody className="">
                {tableData.map((task) => (
                    <tr className="border-t border-gray-200" key={task._id}>
                        <td className="my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden">{task.title}</td>
                        <td className="py-4 px-4"><span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span>
                        </td>
                        <td className="py-4 px-4"><span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>{task.priority}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-[13px] text-nowrap hidden md:table-cell">{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TaskListTable