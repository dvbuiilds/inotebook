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
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;