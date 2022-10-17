import { useState } from "react";
import Modal from "./Modal";

export default function ToDo(props) {
  const [showModal, setShowModal] = useState(false);
  const handelDoneClick = () => {
    props.onDoneClick(props.id);
  };

  const handelDeleteclick = () => {
    props.onDelete(props.id);
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={props.isCompleted ? "toDo completed" : "toDo"}>
      <div className="task">
        {props.task} <br /> {props.assignee}
      </div>
      <div className="buttons">
        <div className="delete">
          <i className="fa-solid fa-trash" onClick={toggleShowModal}></i>
        </div>

        {showModal ? (
          <Modal>
            <h3>Are you sure Delete this Task</h3>
            <div className="modalButton">
              <button className="button" onClick={toggleShowModal}>
                CANCEL
              </button>
              <button className="deleteButton" onClick={handelDeleteclick}>
                DELETE
              </button>
            </div>
          </Modal>
        ) : null}

        <div className="done">
          <i
            className="fa-regular fa-circle-check"
            onClick={handelDoneClick}
          ></i>
        </div>
      </div>
    </div>
  );
}
