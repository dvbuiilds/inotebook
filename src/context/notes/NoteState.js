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
  const hostURL = "http://localhost:5000/api/notes/";
  
  const getAPIresponse = async(url, data)=>{
    const response = await fetch(
      url,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjM4OTM4MTdkZWU3MDVlMmQwNTA4In0sImlhdCI6MTY3NzQwODU5M30.OPEcdAtthMVwYLXr9T2bB7yFwwB3JC65f-pkLGBcYgw",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }

  // add a note.
  const addNote = async ({ title, description, tag }) => {
    const jsonRes = await getAPIresponse(`${hostURL}addnote`, {title, description, tag});
    console.log('jsonRes', jsonRes);
    // Todo: API call.
    console.log("Adding a new node.");
    const note = {
      _id: makeString(24),
      user: "63fb3893817dee705e2d0508",
      title: title,
      description: description,
      tag: tag,
      date: Date.now(),
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // delete a note.
  const deleteNote = async (id) => {
    const jsonRes = await getAPIresponse(`${hostURL}deletenote/${id}`, {});
    // console.log('deleting the note with note.id', id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // update a note.
  const updateNote = async (id, title, description, tag) => {
    const jsonRes = await getAPIresponse(`${hostURL}updatenote/${id}`, {});
    for (let i = 0; i < notes.length; i++) {
      if (id === notes[i]._id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

//generates a random string.
function makeString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default NoteState;
