import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

function Notes() {
    const context = useContext(NoteContext)
  const {notes, getNotes} = context
  useEffect(() => {
    getNotes()
  }, [])
  
 // console.log(notes)
  return (
      <>
      <AddNote />
    <div className="row my-3">
    <h2>Your Notes</h2>
      {notes.map((note)=>{ 

        return <div className="container col-md-4" key={note._id}> <NoteItem note = {note}/> </div>
      })}
      </div>
      </>
  )
}

export default Notes