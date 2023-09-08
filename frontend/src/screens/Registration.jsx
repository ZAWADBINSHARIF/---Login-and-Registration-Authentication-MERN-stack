// external import
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

// internal import
import FormContainer from '../components/FormContainer.jsx'
import { useRegistrationMutation } from '../slices/usersApiSlice.js'
import { setCredentials } from '../slices/authSlice.js'
import Loading from '../components/Loading.jsx'

const Registration = () => {

  // * hooks have been called
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registration, { isLoading }] = useRegistrationMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { userInfo } = useSelector(state => state.auth)

  async function handleRegistration() {
    if (password === confirmPassword) {
      try {
        const response = await registration({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...response }))
        toast.success(`${response.name} has logged in`)
        navigate('/')
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err?.error.message)
      }
    } else {
      toast.error('Confirm password does not match')
    }
  }

  useEffect(() => {
    if (userInfo)
      navigate('/')
  }, [navigate, userInfo])

  return (
    <FormContainer>

      <h1 className='text-bg-success text-center py-2 mb-3 rounded-2'>Sign Up form</h1>

      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup className='mb-2' controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={'formInput'}
          />
        </FormGroup>

        <FormGroup className='mb-2' controlId='email'>
          <FormLabel>Email address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={'formInput'}
          />
        </FormGroup>

        <FormGroup className='mb-2' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={'formInput'}
          />
        </FormGroup>

        <FormGroup className='mb-2' controlId='confirmPassword'>
          <FormLabel>Confirm password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={'formInput'}
          />
        </FormGroup>

        {isLoading ? (
          <Loading
            variant='warning'
          />
        ) : (
          <Button className='mt-3' type='submit' variant='warning' onClick={() => handleRegistration()}>
            Sign Up
          </Button>
        )}

        <Row className='py-3'>
          <Col>
            <p>
              Have you an account? <b><Link to={'/login'}>Sign In</Link></b>
            </p>
          </Col>
        </Row>

      </Form>
    </FormContainer >
  )
}
export default Registration