import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, fetchAllNotes, setNotes, updateNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    (async () => {
      await fetchAllNotes();
    })();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ editTitle: "", editDescription: "", editTag: "" });
  const updateThisNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag});
  }
  const handleClick = (e) => {
    // updateNote();
    updateNote(note.id, note.editTitle, note.editDescription, note.editTag);
    refClose.current.click();
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
                  <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" disabled={note.editTitle.length <= 5 && note.editDescription.length <= 5} onClick={handleClick} className="btn btn-primary">Save</button>
                  </div>
                  {/* <button type="submit" disabled={note.editTitle.length <= 5 && note.editDescription.length <= 5} onSubmit={handleClick} className="btn btn-primary" > Submit </button> */}
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        <p>{notes.length === 0 && "No notes to display!"}</p>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateThisNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
