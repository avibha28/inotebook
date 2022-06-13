import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

function Notes() {
  const context = useContext(NoteContext)
  const { notes, getNotes, editNote } = context
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: '' })
  const ref = useRef(null)
  const refClose = useRef(null)
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])
  
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleAddNote = (e) => {
    // e.preventDefault()
  //   addNote(note.title, note.description, note.tag)
   //  setNote({title: "", description: "", tag: ""})
  // console.log('update note ', note)
   editNote(note.id, note.etitle, note.edescription, note.etag)
   refClose.current.click()
 }
  return (
    <>
      <AddNote />
      <div id="modal">

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="etitle">Title</label>
                    <input type="text" className="form-control" id="etitle" aria-describedby="etitle" name='etitle' value={note.etitle} onChange={handleChange} minLength={5} required />

                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">Description</label>
                    <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handleChange} rows="3" minLength={5} required></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="etag">Tag</label>
                    <input type="text" className="form-control" id="etag" aria-describedby="etag" name='etag' value={note.etag} onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length < 5 || note.edescription.length <5}  className="btn btn-primary" onClick={handleAddNote}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {

          return <div className="container col-md-4" key={note._id}> <NoteItem note={note} updateNote={updateNote} /> </div>
        })}
      </div>
    </>
  )
}

export default Notes