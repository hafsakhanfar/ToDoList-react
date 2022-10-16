import './style.css';
import { useCallback } from 'react';
export default function ToDo(props) {

const handelDoneClick = useCallback((id) => {
  props.onDoneClick(id);
  
},[props.onDoneClick]);

  return (
    <div className={props.isCompleted ? "toDo completed" : "toDo"}>
     
      <div className="task">
        {props.task} <br /> {props.assignee}
      </div>
      <div className="buttons">
        <div className="delete">
          <i className="fa-solid fa-trash" onClick="clickDelete(this)"></i>
        </div>
        <div className="done">
          <i
            className="fa-regular fa-circle-check"
            onClick={()=>handelDoneClick(props.id)}
          ></i>
        </div>
      </div>
    </div>
  );
}
