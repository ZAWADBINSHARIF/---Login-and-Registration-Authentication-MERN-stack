// external import
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// internal import
import FormContainer from '../components/FormContainer.jsx'
import { setCredentials } from '../slices/authSlice.js'
import { useLoginMutation } from '../slices/usersApiSlice.js'
import { toast } from 'react-toastify'
import Loading from '../components/Loading.jsx'

const Login = () => {

  // * Hooks have been called
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (userInfo)
      navigate('/')
  }, [navigate, userInfo])

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...response }))
      toast.success(`${response.name} has logged in`)
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

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

        {isLoading ? (
          <Loading
          variant='success'
          />
        ) : (
          <Button className='mt-3' type='submit' variant='success' onClick={() => handleLogin()}>
            Sign In
          </Button>
        )}

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