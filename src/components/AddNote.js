import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: 'default' })
    const handleAddNote = (e) => {
       // e.preventDefault()
        addNote(note.title, note.description, note.tag)
      //  setNote({title: "", description: "", tag: ""})
    }
    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h2>Add a note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="title" name='title' placeholder="Enter title here" onChange={handleChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name='description' placeholder="Enter discription here" onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" aria-describedby="tag" name='tag' placeholder="Enter tag here" onChange={handleChange} />

                </div>

                <button type="submit" className="btn btn-primary my-2" onClick={handleAddNote}>Add a note</button>
            </form>
        </div>
    )
}

export default AddNote