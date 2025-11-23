/* React router dom */
import { RouterProvider } from 'react-router-dom'
/* Router */
import { router } from './router'
/* Context */
import AuthProvider from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App