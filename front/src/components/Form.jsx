import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FormControl from 'react-bootstrap/FormControl'

{/* <form onSubmit={props.addNote}> 
            <input onChange={props.handleNoteChange} value={props.newNote}/>
            <Button type="submit" variant="info" size="sm">Save</Button>
        </form> */}


const Form = (props) =>{

    return(
      <Col>
        <Row className='justify-content-center'>
          <Col  xs={12} md={4} className="d-flex justify-content-center">
          <form onSubmit={props.addNote}>
            <Row>
            <FormControl value={props.newNote}  onChange={props.handleNoteChange} />
            <Button className='mt-3' type="submit" variant="info" size="sm">Save note</Button>
            </Row>
            
          </form> 
          </Col>
        </Row>
        
      </Col>
    )
  
  }

  export default Form