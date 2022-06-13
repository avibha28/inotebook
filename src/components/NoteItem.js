import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const deleteNotes = () => {
      //  console.log(note._id)
        deleteNote(note._id);
    }
    //console.log(deleteNote)
    // console.log(note._id)
    return (
        <div> 
            <div className="card my-4"> 
                <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <div onClick={()=>{updateNote(note)}}>
                <i className="fas fa-edit mx-2" style={{cursor: "pointer"}}  ></i>
                </div>
                <div onClick={deleteNotes}>
                <i className="fa fa-trash mx-2" style={{cursor: "pointer"}}  ></i>
                </div>
               
               
                </div>
                <p className="card-text">{note.description}</p> 
                </div>
            </div>
        </div>
    )
}

export default Noteitem