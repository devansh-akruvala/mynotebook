import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000/"
  const authToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZmM4NDFhMmRlMDZjYTY0ZjA3MzA1In0sImlhdCI6MTY3NDU2MjMxOX0.mheaQ0IcOKSkDby2ijOZWJcuVvwCm6CHfN_ETWH8_lI'
  const notesinitial = [
  ]
  const [notes, setnotes] = useState(notesinitial)


  const getNotes = async () => {

    const response = await fetch(`${host}api/notes/getallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
    });
    const json = await response.json();
    setnotes(json)
  }


  /// add note
  const addNote = async (title, desc, tag) => {
    console.log("ADD")
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ title,body: desc, tag })
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
        'auth-token': authToken
      },    
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  // edit note
  const editNote = async (id, title, desc, tag) => {

    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ title, desc, tag })
    });
    const json = response.json();


    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        // element.title = title,
        // element.desc = desc,
        //     element.tag = tag  
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