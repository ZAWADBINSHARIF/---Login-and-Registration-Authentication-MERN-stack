// external import
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

// internal import
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {


    const { userInfo } = useSelector(state => state.auth)

    // * Hooks have been called
    const dispatch = useDispatch()
    const [logoutApiCall] = useLogoutMutation()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            toast.success('Logged out')
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header>
            <Navbar bg="success" data-bs-theme="dark" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>MERN App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} className='' id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={() => handleLogout()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to={'/login'}>
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={'/registration'}>
                                        <Nav.Link>
                                            <FaSignOutAlt /> Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}
export default Header