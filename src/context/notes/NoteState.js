import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const hostURL = "http://localhost:5000/api/notes/";
  
  const getAPIresponse = async(url, method, data)=>{
    let response = null;
    if(Object.keys(data).length){
      response = await fetch(
        url,
        {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token") // ?localStorage.getItem("token"):"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjM4OTM4MTdkZWU3MDVlMmQwNTA4In0sImlhdCI6MTY3NzQwODU5M30.OPEcdAtthMVwYLXr9T2bB7yFwwB3JC65f-pkLGBcYgw",
          },
          body: JSON.stringify(data)
        }
      );
    } else{
      response = await fetch(
        url,
        {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token") // ?localStorage.getItem("token"):"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjM4OTM4MTdkZWU3MDVlMmQwNTA4In0sImlhdCI6MTY3NzQwODU5M30.OPEcdAtthMVwYLXr9T2bB7yFwwB3JC65f-pkLGBcYgw",
          }
        }
      );
    }
    return response.json();
  }

  const fetchAllNotes = async () =>{
    const notesResponse = await getAPIresponse(`${hostURL}allnotes`, "GET", {});
    setNotes(notesResponse);
  }

  // add a note.
  const addNote = async ({ title, description, tag }) => {
    const jsonRes = await getAPIresponse(`${hostURL}addnote`, "POST", {title, description, tag});
    const note = {
      _id: jsonRes._id  ,
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
    await getAPIresponse(`${hostURL}deletenote/${id}`, "DELETE", {});
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // update a note.
  const updateNote = async (id, title, description, tag) => {
    await getAPIresponse(`${hostURL}updatenote/${id}`, "PUT", {title, description, tag});

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
      value={{ notes, fetchAllNotes, setNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

//generates a random string.
// function makeString(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

export default NoteState;
