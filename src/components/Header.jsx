import Col from 'react-bootstrap/Col'

const Header = ({name}) =>{

    return(
      <Col md={4} className="d-flex justify-content-center"> 
        <h2>{name}</h2>
      </Col>
    )
  
  }

  export default Header