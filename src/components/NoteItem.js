import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(NoteContext);
  const {displayAlert } = useContext(AlertContext);
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-md-3">
        <div className="card w-40 my-2" >
          <div className="card-body">
            <h5 className="card-title">
              {note.title}
              <span className="badge bg-primary">{note.tag}</span>
              <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); displayAlert("Note deleted permanently!", "Success");}}></i>
              <i className="far fa-edit mx-2" onClick={()=>{updateNote(note); displayAlert("Note updated!", "Success");}}></i>
            </h5>
            <p className="text-muted">{Date(note.date)}</p>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
