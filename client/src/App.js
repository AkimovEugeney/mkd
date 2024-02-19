
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useRoutes } from './routes'
import AuthContext  from './context/Auth.context';
import { useAuth } from './hooks/auth.hook';

const App=() =>{
  const {token, userId, isReady, login, logout} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{token, userId, isReady, login, logout, isLogin}}>
    <BrowserRouter>
    {routes}
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
