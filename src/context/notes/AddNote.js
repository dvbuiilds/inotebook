import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              {" "}
              Description{" "}
            </label>
            <textarea
              onChange={onChange}
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              {" "}
              Tag{" "}
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
            />
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
