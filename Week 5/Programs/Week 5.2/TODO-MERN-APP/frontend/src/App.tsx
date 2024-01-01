import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './components/User/Login';
import Signup from './components/User/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />} path='/' />
        </Route>
        <Route path='/user/signin' element={<Login />} />
        <Route path='/user/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
