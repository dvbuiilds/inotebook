import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, setNotes } = context;

  const date = Date(notes.date);

  return (
    <>
      {notes.map((note) => (
        <div className="card w-75 my-2" key={`${note}`}>
          <div className="card-body">
            <h5 className="card-title">
              {note.title}
              <span className="badge bg-primary">{note.tag}</span>
            </h5>
            <p className="text-muted">{date}</p>
            <p className="card-text">{note.description}</p>
            {/* <a href="#" className="btn btn-primary">Button</a> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default NoteItem;
