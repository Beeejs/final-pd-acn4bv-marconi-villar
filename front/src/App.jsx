/* React router dom */
import { RouterProvider } from 'react-router-dom'
/* Router */
import { router } from './router'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App