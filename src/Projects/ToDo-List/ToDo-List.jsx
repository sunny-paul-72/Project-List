import React, { useState, useEffect } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { format } from "date-fns";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskText, setTaskText] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: taskText,
          dueDate: taskDueDate,
          completed: false,
        },
      ]);
      setTaskText("");
      setTaskDueDate("");
    }
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, text: updatedTask.text } : task
      )
    );
    setEditTask(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const FilterButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg transform scale-105"
          : "bg-gray-600 text-gray-400 hover:bg-gray-500"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 transition-all duration-300">
      {/* Header */}
      <header className="text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-5xl font-extrabold transition-all duration-300 animate__animated animate__fadeIn animate__delay-1s">
          Interactive To-Do
        </h1>
        <p className="text-gray-400 mt-2 transition-all duration-300 animate__animated animate__fadeIn animate__delay-2s">
          Organize your tasks smoothly!
        </p>
      </header>

      {/* Task Input */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 max-w-xl mx-auto animate__animated animate__fadeIn animate__delay-3s">
        <div className="flex items-center gap-3 transition-all duration-300">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-700 text-white transition-all duration-200"
          />
          <input
            type="time"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-700 text-white transition-all duration-200"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 rounded-lg shadow bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-6 transition-all duration-300 animate__animated animate__fadeIn animate__delay-4s">
        <FilterButton
          label="All"
          isActive={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="Completed"
          isActive={filter === "completed"}
          onClick={() => setFilter("completed")}
        />
        <FilterButton
          label="Pending"
          isActive={filter === "pending"}
          onClick={() => setFilter("pending")}
        />
      </div>

      {/* Task List with Drag-and-Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="max-w-xl mx-auto transition-all duration-300 animate__animated animate__fadeIn animate__delay-5s"
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md transition-all duration-200 transform ${
                          task.completed
                            ? "bg-green-100 text-gray-700"
                            : "bg-gray-800 text-white"
                        } hover:shadow-xl hover:scale-105 animate__animated animate__fadeIn`}
                      >
                        <div
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`flex-1 cursor-pointer transition-all duration-300 ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "hover:text-blue-500"
                          }`}
                        >
                          {task.text}
                          {task.dueDate && (
                            <span className="text-xs text-gray-500 ml-2">
                              Due: {format(new Date(`1970-01-01T${task.dueDate}:00`), "HH:mm")}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditTask(task)}
                            className="px-3 py-2 rounded bg-yellow-300 text-yellow-800 hover:bg-yellow-400 transition-all duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-center text-gray-500">No tasks available.</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-all duration-300 animate__animated animate__fadeIn">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md animate__animated animate__fadeIn animate__delay-6s">
            <h2 className="text-lg font-bold mb-4 transition-all duration-200">Edit Task</h2>
            <input
              type="text"
              value={editTask.text}
              onChange={(e) =>
                setEditTask((prev) => ({ ...prev, text: e.target.value }))
              }
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 bg-gray-700 text-white transition-all duration-200"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => updateTask(editTask)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
