// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

type Task = {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from fake API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: "Description",
          dueDate: new Date().toISOString().split("T")[0],
          priority: "Medium",
        }));
        setTasks(formattedTasks);
      });
  }, []);

  const addTask = (task: Task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = (id?: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm
        onSubmit={editingTask ? updateTask : addTask}
        initialValues={editingTask || undefined}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border rounded p-4 mb-2">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button
              onClick={() => setEditingTask(task)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
