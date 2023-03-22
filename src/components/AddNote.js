import React, { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const { displayAlert } = useContext(AlertContext);
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
    displayAlert( "Note has been created!", "Success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <form>
          <h3>Add Note</h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby=""
              placeholder="Title should be unique."
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              onChange={onChange}
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
            disabled={note.title.length <= 5 && note.description.length <= 5}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
