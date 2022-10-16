import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
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

  const addTask = (e) => {
    if (inputs) {
      const newTask = { ...inputs, id: new Date().getTime().toString() };
      setTasks([...tasks, newTask]);
      setinputs({
        task: "",
        assignee: "",
        isCompleted: false,
      });
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
          <Button
            
            onClick={addTask}
            size="lg"
            variant="solid"
            className="Button"
          >
            Add
          </Button>
        </div>
      </div>
      <div className="list">
        {tasks.map((task) => {
          return (
            <ToDo
              {...task}
              key={task.id}
              onDoneClick={completedTask}
              tasks={tasks}
            />
          );
        })}
      </div>
    </div>
  );
}
