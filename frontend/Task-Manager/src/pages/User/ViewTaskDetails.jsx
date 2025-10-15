import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import AvatarGroup from '../../components/AvatarGroup';
import { LuSquareArrowOutUpLeft, LuSquareArrowOutUpRight } from 'react-icons/lu';
import axios from 'axios';

const ViewTaskDetails = () => {
  const {id} = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return " text-cyan-500 bg-cyan-200 border border-cyan-500/10";
      case "Completed":
        return " text-lime-500 bg-lime-100 border border-lime-500/20";
      
      default:
        return "text-purple-500 bg-purple-100 border border-purple-500/10"
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

const updateTodoChecklist = async (index) => {
  if (!task?.todoChecklist) return;

  const updatedTodoChecklist = task.todoChecklist.map((item, idx) =>
    idx === index ? { ...item, completed: !item.completed } : item
  );

  // Recalculate status locally
  let updatedStatus = "Pending";
  const allCompleted = updatedTodoChecklist.every(item => item.completed);
  const someCompleted = updatedTodoChecklist.some(item => item.completed);

  if (allCompleted) updatedStatus = "Completed";
  else if (someCompleted) updatedStatus = "In Progress";

  try {
    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
      { todoChecklist: updatedTodoChecklist }
    );

    if (response.status === 200) {
      setTask(prev => ({ 
        ...prev, 
        todoChecklist: updatedTodoChecklist,
        status: updatedStatus // <-- update status immediately
      }));
    }
  } catch (error) {
    console.error("Error updating todo checklist:", error);
  }
};


  const handleLinkClick = (url) => {
    if(!/^https?:\/\//.test(url)){
     url = "https://" + url; 
    }
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
    return () => {};
}, [id]);
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
       {task && ( 
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-xl font-medium">
                {task?.title}
              </h2>
              <div className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
                {task?.status}
              </div>
            </div>

            <div className="mt-4">
              <InfoBox label="Description" value={task?.description}/>
            </div>

            <div className="grid grid-cols-12  mt-4">
              <div className="col-span-6 md:col-span-4">
                <InfoBox label="Priority" value={task?.priority}/>
              </div>
              <div className="col-span-6 md:col-span-4">
                <InfoBox label="Due Date" value={task?.dueDate ? moment(task?.dueDate).format("DD-MM-YYYY") : "N/A"}/>
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-500">
                  Assigned To
                </label>

                <AvatarGroup avatars={task?.assignedTo?.map((items) => items.profileImageUrl) || [] } maxVisible={5} />
              </div>
            </div>

            <div className="mt-2">
              <label className="text-xs font-medium text-slate-500">
                Todo Checklist
              </label>

              {task?.todoChecklist?.map((item, index) => (
                <TodoChecklist 
                key= {`todo_${index}`}
                text={item.text}
                isChecked={item.completed}
                onClick={() => updateTodoChecklist(index)}
                />
              ))}
            </div>
            
            {task?.attachments?.length > 0 && (
              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Attachments
                </label>

                {task?.attachments?.map((link, index) => (
                  <Attachment 
                  key= {`link_${index}`}
                  link = {link}
                  index = {index}
                  onClick = { () =>handleLinkClick(link)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  )
}

export default ViewTaskDetails

const InfoBox = ({label, value}) =>{
  return <>
    <label className=" text-xs font-medium text-slate-500">{label} </label>
    <p className="text-[12px] md:text-[13px] font-medium text-gray-700">{value}</p>
    </>
}

const TodoChecklist = ({text, isChecked, onClick}) => {
  return <div className="flex items-center gap-3 mt-3">
    <input type="checkbox" checked={isChecked} onChange={onClick} className='w-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer ' />
    <p className="text-[13px] text-gray-700">{text}</p>
  </div>
}

const Attachment = ({link, index, onClick}) =>{
  return <div className=" flex justify-between ng-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer " onClick={onClick}>
    <div className="flex-1 flex items-center gap-3">
      <span className="text-xs text-gray-400 font-semibold mr-2">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <p className="text-xs text-black ">{link}</p>
    </div>
    <LuSquareArrowOutUpRight className="text-gray-500"/>
  </div>
}