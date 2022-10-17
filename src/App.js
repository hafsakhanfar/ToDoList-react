import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import ToDo from "./ToDo";

export default function App() {
  const [inputs, setinputs] = useState({
    task: "",
    assignee: "",
    isCompleted: false,
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("localTasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedTask = (id) => {
    let mapped = tasks.map((task) => {
      return task.id === id
        ? { ...task, isCompleted: !task.isCompleted }
        : { ...task };
    });
    setTasks(mapped);
  };

  const deleteTask = (id) => {
    const deleted = tasks.filter((task) => task.id !== id);
    setTasks(deleted);
  };

  const addTask = (e) => {
    if (!inputs.task == "") {
      const newTask = { ...inputs, id: new Date().getTime().toString() };
      setTasks([...tasks, newTask]);
      setinputs({
        task: "",
        assignee: "",
        isCompleted: false,
      });
    } else {
      alert("you shoud enter some task");
    }
  };

  return (
    <div className="main">
      <h1>ToDo List</h1>
      <div className="input">
        <div>
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            value={inputs.task || ""}
            onChange={(e) =>
              setinputs((values) => ({ ...values, task: e.target.value }))
            }
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Assignee"
            variant="outlined"
            value={inputs.assignee || ""}
            onChange={(e) =>
              setinputs((values) => ({ ...values, assignee: e.target.value }))
            }
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>
      <div className="list">
        {tasks.map((task) => {
          return (
            <ToDo
              {...task}
              key={task.id}
              onDoneClick={completedTask}
              onDelete={deleteTask}
              tasks={tasks}
            />
          );
        })}
      </div>
    </div>
  );
}
