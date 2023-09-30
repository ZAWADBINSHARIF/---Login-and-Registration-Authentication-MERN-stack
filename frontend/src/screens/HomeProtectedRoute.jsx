import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const HomeProtectedRoute = () => {

    const { userInfo } = useSelector(state => state.auth)

    return userInfo ? <Navigate to={'/feeds'}/> : <Outlet />
}
export default HomeProtectedRoute