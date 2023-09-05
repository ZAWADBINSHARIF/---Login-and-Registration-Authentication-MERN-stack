// external import
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// internal import
import FormContainer from '../components/FormContainer.jsx'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <FormContainer>

      <h1 className='text-bg-success text-center py-2 mb-3 rounded-2'>Sign In form</h1>

      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup className='mb-2' controlId='email'>
          <FormLabel>Email address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='formInput'
          />
        </FormGroup>

        <FormGroup className='mb-2' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='formInput'
          />
        </FormGroup>

        <Button className='mt-3' type='submit' variant='success'>
          Sign In
        </Button>

        <Row className='py-3'>
          <Col>
            <p>
              New customer? <b><Link to={'/registration'}>Sign Up</Link></b>
            </p>
          </Col>
        </Row>

      </Form>
    </FormContainer>
  )
}
export default Login