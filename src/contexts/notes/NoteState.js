import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000/"
  
  
  const notesinitial = []
  const [notes, setnotes] = useState(notesinitial)


  const getNotes = async () => {

    const response = await fetch(`${host}api/notes/getallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    console.log(json)
    setnotes(json)
  }


  /// add note
  const addNote = async (title, desc, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, desc, tag })
    });
    const json = await response.json();
    console.log(json)
    setnotes(notes.concat(json))
  }

  // delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  // edit note
  const editNote = async (id, title, desc, tag) => {
    console.log("EDIT")
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')      },
      body: JSON.stringify({ title, desc, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        newNotes[index].tag = tag;
        setnotes(newNotes)
        break;
      }
    }

  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;