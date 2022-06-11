import React, { useState } from "react";
import NoteContext from "./NoteContext";




function NoteState(props) {
  const url = 'http://localhost:5000'
  const note = []
  const [notes, setNotes] = useState(note)

  //get notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/allnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
       //mode: 'no-cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWY3N2FhOTA1ZDQxYzA5ZDkyNjliNSIsImVtYWlsIjoicGVkZGkuaGFyaXNoMkBlbWFpbC5jb20iLCJpYXQiOjE2NTQ2OTI0NDh9.NrCXzkg1jyJoKfoUZC7agvzFBczFTOna3AW55ald6Gs'
      },
      
    });
    const temp = await response.json()
    console.log(temp)
    setNotes(temp)
  }
  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWY3N2FhOTA1ZDQxYzA5ZDkyNjliNSIsImVtYWlsIjoicGVkZGkuaGFyaXNoMkBlbWFpbC5jb20iLCJpYXQiOjE2NTQ2OTI0NDh9.NrCXzkg1jyJoKfoUZC7agvzFBczFTOna3AW55ald6Gs"
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const temp1 = await response.json();
    console.log(temp1);
    // const tempNote = {
    //   "_id": "62a05040da5de670b442d1f5",
    //   "user": "629f77aa905d41c09d9269b5",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-06-08T07:31:12.292Z",
    //   "__v": 0
    // }
    setNotes(notes.concat(temp1))
  }

  //Delete a note

  const deleteNote = async (id) => {
    // delete api call with backend
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWY3N2FhOTA1ZDQxYzA5ZDkyNjliNSIsImVtYWlsIjoicGVkZGkuaGFyaXNoMkBlbWFpbC5jb20iLCJpYXQiOjE2NTQ2OTI0NDh9.NrCXzkg1jyJoKfoUZC7agvzFBczFTOna3AW55ald6Gs"
      },
      
    });
    console.log(response.json())
//console.log("Deleting the note with id" + id);
    // Update frontend
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }
  //Edit a note
  //fetch api
  

  const editNote = async (id, title, description, tag ) => {
    const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWY3N2FhOTA1ZDQxYzA5ZDkyNjliNSIsImVtYWlsIjoicGVkZGkuaGFyaXNoMkBlbWFpbC5jb20iLCJpYXQiOjE2NTQ2OTI0NDh9.NrCXzkg1jyJoKfoUZC7agvzFBczFTOna3AW55ald6Gs"
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = response.json()
    console.log(json)
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState