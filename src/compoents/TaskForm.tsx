// src/components/TaskForm.tsx
import React from "react";
import { useForm } from "react-hook-form";

type Task = {
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};

type TaskFormProps = {
  onSubmit: (data: Task) => void;
  initialValues?: Task;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    defaultValues: initialValues || {
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
    },
  });

  const submitHandler = (data: Task) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="w-full p-2 mb-2 border rounded"
      />
      <p className="text-red-600">{errors.title?.message}</p>

      <textarea
        placeholder="Description"
        {...register("description")}
        className="w-full p-2 mb-2 border rounded"
      ></textarea>

      <input
        type="date"
        {...register("dueDate", { required: "Due date is required" })}
        className="w-full p-2 mb-2 border rounded"
      />
      <p className="text-red-600">{errors.dueDate?.message}</p>

      <select
        {...register("priority")}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {initialValues ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
