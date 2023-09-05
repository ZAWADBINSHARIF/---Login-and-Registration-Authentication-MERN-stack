import { Card, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className='d-flex flex-column w-75 border-success'>
          <Card.Body className='p-5 d-flex flex-column align-items-center text-center '>
            <Card.Title>
              <h2>MERN Authentication</h2>
            </Card.Title>
            <Card.Text>
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses Redux Toolkit and the React
              Bootstrap library
            </Card.Text>
            <div className="d-flex">
              <LinkContainer to={'/login'}>
                <Button variant="success">Sign In</Button>
              </LinkContainer>
              <LinkContainer to={'/registration'}>
                <Button variant="warning" className="mx-3">Registration</Button>
              </LinkContainer>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
export default Hero