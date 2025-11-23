/* React router dom */
import { RouterProvider } from 'react-router-dom'
/* Router */
import { router } from './router'
/* Context */
import ProductContext from './context/ProductContext'
import FilterContext from './context/FilterContext'
import AuthProvider from './context/AuthContext'

const App = () => {
  return (
    <ProductContext>
        <FilterContext>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </FilterContext>
    </ProductContext>
  )
}

export default App