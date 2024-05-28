import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'


const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    
    <ListGroup.Item className="d-flex justify-content-center"> 
        <span style={{ flexGrow: 1 }}>{note.content}</span> 
        <Button onClick={toggleImportance} bg="primary" size="sm">{label}</Button>
    </ListGroup.Item>
        
  )
}
  
  export default Note