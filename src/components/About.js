import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const aboutContext = useContext(NoteContext);
  useEffect(() => {
    document.title = "About - iNotebooks"
    aboutContext.update();
  }, [])
  
  return (
    <>
      <div>About</div>
      <div>This is {aboutContext.state.name} from {aboutContext.state.class}</div>
    </>
  )
}

export default About