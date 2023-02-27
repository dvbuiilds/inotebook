import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInit = [
    {
      _id: "63fb6783004a15575e4598d1",
      user: "63fb3893817dee705e2d0508",
      title: "Complete DSA prep",
      description:
        "Long ago there was a king who used to own a wealth of more than $30B.",
      tag: "tech",
      date: "2023-02-26T14:06:59.718Z",
      __v: 0,
    },
    {
      _id: "63fc64b956e2d2511f0a580e",
      user: "63fb3893817dee705e2d0508",
      title: "Complete DSA prep 2",
      description:
        "Long ago there was a king who used to own a wealth of more than $30B.",
      tag: "tech",
      date: "2023-02-27T08:07:21.735Z",
      __v: 0,
    },
    {
      _id: "63fc64bd56e2d2511f0a5810",
      user: "63fb3893817dee705e2d0508",
      title: "Complete DSA prep 3",
      description:
        "Long ago there was a king who used to own a wealth of more than $30B.",
      tag: "tech",
      date: "2023-02-27T08:07:25.042Z",
      __v: 0,
    },
    {
      _id: "63fc64c156e2d2511f0a5812",
      user: "63fb3893817dee705e2d0508",
      title: "Complete DSA prep 4",
      description:
        "Long ago there was a king who used to own a wealth of more than $30B.",
      tag: "tech",
      date: "2023-02-27T08:07:29.390Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInit);

  // add a note.
  const addNote = ({title, description, tag})=>{
    // Todo: API call.
    console.log("Adding a new node.");
    const note = {
      _id: makeString(24),
      user: "63fb3893817dee705e2d0508",
      title: title,
      description:description,
      tag: tag,
      date: Date.now(),
      __v: 0,
    };
    setNotes(notes.concat(note))
  }

  // delete a note.
  const deleteNote = (id)=>{
    // console.log('deleting the note with note.id', id);
    let newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes);
  }
  
  // update a note.
  const updateNote = ()=>{}

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

//generates a random string.
function makeString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default NoteState;
