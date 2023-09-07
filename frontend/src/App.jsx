// external import
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// internal import
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container className="my-2">
      <Outlet/>
      </Container>
    </>
  )
}
export default App