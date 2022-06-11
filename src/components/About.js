import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

function About() {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  }, [])
  return (
    <div>This is about  page created by {a.state.name} and he stays at {a.state.address} </div>
  )
}

export default About