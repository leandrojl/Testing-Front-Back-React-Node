import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Note from "./components/Note"
import Form from "./components/Form"
import Notification from "./components/Notification"
import axios from 'axios'
import noteService from './services/notes'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

const App = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newNote, setNewNote] = useState(
    'Type a new note'
  )
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log("this is the response", initialNotes)
        setNotes(initialNotes)
      })
  }, [])
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
      console.log(returnedNote)
    })
  }

  const handleNoteChange = (event) => {
    
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    console.log("note", note)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <Container>
      <Row className='m-1 justify-content-center'>
      <Header name={"Notes"}/>
      </Row>
      <Row className='m-1'>
      <Form addNote={addNote} handleNoteChange={handleNoteChange} newNote={newNote}/>
      </Row>
      <Row className='m-1'>
      <Notification message={errorMessage} />
      </Row>
      
      <Row className='m-1 justify-content-center'>
        <Col md={4} className="d-flex justify-content-center">
        <Button onClick={() => setShowAll(!showAll)} variant="danger" size="sm">
        Show {showAll ? 'important notes' : 'all notes' }
        </Button>
        </Col>
      </Row>
        
      <Row>
      <ListGroup>
      {notesToShow.map(note =>
          <Note key={note.id} 
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ListGroup>
      </Row>
      </Container> 
    </div>
  )
}

export default App 