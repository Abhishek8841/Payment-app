import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ loggedin, children }) => {
  if (loggedin) return (
    <div>
      {children}
    </div>
  )
  else return <Navigate to="/signup" replace></Navigate>;
}

export default ProtectedRoute