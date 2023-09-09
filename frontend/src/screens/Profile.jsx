// external import
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// internal import
import FormContainer from "../components/FormContainer"
import Loading from '../components/Loading'
import { useProfileUpdateMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const Profile = () => {

    // hooks has been used
    const [profileUpdate, { isLoading }] = useProfileUpdateMutation()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [editMode, setEditMode] = useState(false)
    const { userInfo } = useSelector(state => state.auth)

    async function handleUpdate() {
        if (newPassword !== '' && confirmNewPassword !== ''
            && newPassword !== confirmNewPassword) {
            return toast.error('Confirm new password does not match')
        }
        try {
            const response = await profileUpdate(
                {
                    _id: userInfo._id,
                    name,
                    email,
                    newPassword,
                    oldPassword
                }
            ).unwrap()
            dispatch(setCredentials({ ...response }))
            toast.success('Profile is updated')
            setEditMode(false)
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err?.error.message)
        }

    }


    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setOldPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }
    }, [userInfo, editMode])

    return (
        <FormContainer>

            <h1 className='text-bg-success text-center py-2 mb-3 rounded-2'>Profile</h1>

            <Form onSubmit={(e) => e.preventDefault()}>
                <FormGroup className='mb-2' controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        disabled={!editMode}
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
                        disabled={!editMode}
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={'formInput'}
                    />
                </FormGroup>

                <FormGroup className='mb-2' controlId='oldPassword'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        disabled={!editMode}
                        type='password'
                        placeholder='Enter password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={'formInput'}
                    />
                </FormGroup>

                <FormGroup className='mb-2' controlId='newPassword'>
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                        disabled={!editMode}
                        type='password'
                        placeholder='Enter password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={'formInput'}
                    />
                </FormGroup>

                <FormGroup className='mb-2' controlId='confirmNewPassword'>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl
                        disabled={!editMode}
                        type='password'
                        placeholder='Enter confirm password'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className={'formInput'}
                    />
                </FormGroup>

                <Row>

                    <Col>
                        {isLoading ? (
                            <Loading
                                variant='warning'
                            />
                        ) : editMode ? (
                            <Button className='mt-3' type='submit' variant='success' onClick={() => handleUpdate()}>
                                Update
                            </Button>
                        ) : (<></>)}
                    </Col>

                    <Col className='text-end'>
                        <Button className='mt-3' type='submit' variant='success' onClick={() => setEditMode(!editMode)}>
                            {editMode ? 'Cancle' : 'Edit'}
                        </Button>
                    </Col>

                </Row>
            </Form>

        </FormContainer>
    )
}
export default Profile