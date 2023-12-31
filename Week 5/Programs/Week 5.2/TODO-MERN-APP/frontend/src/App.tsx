import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoutes from './utils/PrivateRoutes';

import './App.css';
import AuthPage from './components/User/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />} path='/' />
        </Route>
        <Route path='/user/signin' element={<AuthPage />} />
        <Route path='/user/signup' element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
