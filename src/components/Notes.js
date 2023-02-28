import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "../context/notes/AddNote";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, fetchAllNotes } = context;
  const ref = useRef(null);
  useEffect(() => {
    (async () => {
      await fetchAllNotes();
    })();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ editTitle: "", editDescription: "", editTag: "" });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag});
  }
  const handleClick = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    // console.log('e.target.value', e.target.value);
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="row my-5">
        <div className="col-4"></div>
        <div className="col-4">
          <AddNote />
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row my-5">
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">Title</label>
                    <input onChange={onChange} type="text" className="form-control" id="editTitle" name="editTitle" aria-describedby="" value={note.editTitle} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">Description</label>
                    <textarea onChange={onChange} type="text" className="form-control" id="editDescription" name="editDescription" value={note.editDescription}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editTag" className="form-label">Tag</label>
                    <input onChange={onChange} type="text" className="form-control" id="editTag" name="editTag" value={note.editTag}/>
                  </div>
                  <button type="submit" onClick={handleClick} className="btn btn-primary" > Submit </button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
