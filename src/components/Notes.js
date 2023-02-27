import React, { useContext } from "react";
import AddNote from "../context/notes/AddNote";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, addNote } = context;
  return (
    <>
      <div className="row my-5">
        <div className="col-4"></div>
        <div className="col-4">
          <AddNote />
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
