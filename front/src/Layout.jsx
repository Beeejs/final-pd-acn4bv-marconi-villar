/* Components */ 
import { useContext, useEffect } from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
/* React Router DOM */
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
/* Context */
import { AuthContext } from './context/AuthContext'

const Layout = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Mientras Firebase resuelve, NO hacemos nada
    if (loading) return;

    // Si no hay usuario y no estamos ya en /auth, redirigimos
    if (!user && location.pathname !== '/auth') {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  // Mostramos un loader mientras loading es true
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto p-4">
        <Header />
        <div className="flex flex-col justify-center items-center gap-6 h-screen">
          {/* Loader */}
          <Loader width={'100px'} height={'100px'} borderWidth={'6px'}/>
          <span className="text-primary font-secondary font-bold">Cargando sesión...</span>
        </div>
      </main>
    );
  }

  return (
    <main className='max-w-7xl mx-auto p-4'>
      <Header/>
      <Navbar/>
      <Outlet/>
    </main>
  );
}

export default Layout;
