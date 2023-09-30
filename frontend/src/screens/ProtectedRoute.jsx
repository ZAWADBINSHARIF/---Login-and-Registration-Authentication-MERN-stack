// external import 
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

const ProtectedRoute = ({redirect}) => {

    const { userInfo } = useSelector(state => state.auth)

    return userInfo ? <Outlet /> : <Navigate to={redirect} />

}
export default ProtectedRoute