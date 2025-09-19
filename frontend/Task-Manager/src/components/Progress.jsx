import React from 'react'

const Progress = ({progress, status}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500 text-cyan-700 border border-cyan-300"
      case "Completed":
        return "bg-indigo-500 text-indigo-700 border border-indigo-300"
      default:
        return "bg-voilet-500 text-voilet-700 border border-voilet-300"
    }
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div className={`${getStatusColor(status)} h-1.5 rounded-full text-center text-xs font-medium`} style={{ width: `${progress}%` }}>
      </div>
    </div>
  )
};

export default Progress
