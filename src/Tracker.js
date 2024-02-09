import React, { useState } from 'react';
import './Tracker.css';
const Tracker = () => {
 const [tasks, setTasks] = useState([]);
 const [inputValue, setInputValue] = useState('');
 const [commentValue, setCommentValue] = useState('');
 const assignedToOptions = ['Md Yousuf', 'Shiva', 'Safwan', 'Vijay']; // List of assigned names
 const handleInputChange = (e) => {
   setInputValue(e.target.value);
 };
 const handleAddTask = () => {
   if (inputValue.trim() !== '') {
     const currentTime = new Date().toLocaleString(); // Get current local date and time
     const newTask = { text: inputValue, completed: false, assignedTo: '', assignedOn: currentTime, timeTaken: '', action: '' };
     setTasks([...tasks, newTask]);
     setInputValue('');
   }
 };
 const handleAssignTo = (index, assignedTo) => {
   const newTasks = [...tasks];
   newTasks[index].assignedTo = assignedTo;
   setTasks(newTasks);
 };
 const handleToggleTask = (index, action) => {
   const newTasks = [...tasks];
   const task = newTasks[index];
   if (action === 'Completed') {
     task.completed = true;
     task.timeTaken = calculateTimeTaken(task.assignedOn); // Calculate time taken when task is marked as complete
   } else if (action === 'Pending') {
     task.completed = false;
     task.timeTaken = ''; // Reset time taken when task is marked as pending
   } else if (action === 'Discrepancy Found') {
     const comment = prompt('Please provide comments:');
     if (comment !== null) {
       task.comment = comment;
     }
   }
   task.action = action;
   setTasks(newTasks);
 };
 const calculateTimeTaken = (startTime) => {
   const endTime = new Date();
   const timeDifference = endTime - new Date(startTime);
   const seconds = Math.floor(timeDifference / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
 };
 const handleDeleteTask = (index) => {
   setTasks(tasks.filter((_, i) => i !== index));
 };
 const getCompletedTasksCount = (assignedTo) => {
   return tasks.filter(task => task.assignedTo === assignedTo && task.completed).length;
 };
 return (
<div className="tracker-container">
<h2>Task Tracker</h2>
<div className="input-container">
<input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add task..." />
<button onClick={handleAddTask}>Add Task</button>
</div>
<table className="task-table">
<thead>
<tr>
<th>Task</th>
<th>Status</th>
<th>Assigned To</th>
<th>Assigned On</th>
<th>Time Taken</th>
<th>Action</th>
</tr>
</thead>
<tbody>
         {tasks.map((task, index) => (
<tr key={index}>
<td className={task.completed ? 'completed' : ''}>{task.text}</td>
<td>{task.completed ? 'Completed' : 'Pending'}</td>
<td>
               {!task.completed ? (
<select
                   value={task.assignedTo}
                   onChange={(e) => handleAssignTo(index, e.target.value)}
>
<option value="">Assign to...</option>
                   {assignedToOptions.map((name, i) => (
<option key={i} value={name}>{name}</option>
                   ))}
</select>
               ) : (
                 task.assignedTo // Display assigned name if task is completed
               )}
</td>
<td>{task.assignedOn}</td>
<td>{task.timeTaken}</td>
<td>
<select
                 value={task.action}
                 onChange={(e) => handleToggleTask(index, e.target.value)}
>
<option value="">Action</option>
<option value="Completed">Completed</option>
<option value="Pending">Pending</option>
<option value="Discrepancy Found">Discrepancy Found</option>
</select>
</td>
</tr>
         ))}
</tbody>
</table>
<table className="completed-tasks-table">
<thead>
<tr>
<th>Assigned To</th>
<th>Completed Tasks Count</th>
</tr>
</thead>
<tbody>
         {assignedToOptions.map((name, index) => (
<tr key={index}>
<td>{name}</td>
<td>{getCompletedTasksCount(name)}</td>
</tr>
         ))}
</tbody>
</table>
</div>
 );
};
export default Tracker;